/**
 * Provision or reset an administrator account.
 *
 *   npm run admin:create -- --email you@example.org --name "Your Name"
 *   npm run admin:create -- --email you@example.org --reset     (new password; signs out all sessions)
 *   npm run admin:create -- --email you@example.org --deactivate
 *
 * The password is read from a hidden prompt, or from ADMIN_PASSWORD for
 * non-interactive use (e.g. a one-off job). It is never logged or stored in
 * plain text. Minimum 12 characters.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline";

const prisma = new PrismaClient();

function arg(name: string) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
}
const flag = (name: string) => process.argv.includes(`--${name}`);

function promptHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    const out = rl as unknown as { _writeToOutput: (s: string) => void; output: NodeJS.WriteStream };
    let muted = false;
    out._writeToOutput = (s: string) => {
      if (!muted) out.output.write(s);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
    muted = true;
  });
}

async function readPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (!process.stdin.isTTY) throw new Error("No TTY: set ADMIN_PASSWORD for non-interactive use.");
  const a = await promptHidden("New password (min 12 characters): ");
  const b = await promptHidden("Repeat password: ");
  if (a !== b) throw new Error("Passwords do not match.");
  return a;
}

async function main() {
  const email = arg("email")?.trim().toLowerCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Provide --email you@example.org");
  const existing = await prisma.adminUser.findUnique({ where: { email } });

  if (flag("deactivate")) {
    if (!existing) throw new Error("No such administrator.");
    await prisma.adminUser.update({ where: { email }, data: { isActive: false, tokenVersion: { increment: 1 } } });
    await prisma.auditLog.create({ data: { action: "admin.deactivate", entityType: "AdminUser", entityId: existing.id, details: { via: "cli" } } });
    console.log(`Deactivated ${email} and revoked its sessions.`);
    return;
  }
  if (existing && !flag("reset")) throw new Error(`${email} already exists. Use --reset to set a new password.`);

  const password = await readPassword();
  if (password.length < 12) throw new Error("Password must be at least 12 characters.");
  if (password.length > 200) throw new Error("Password too long.");
  const passwordHash = await bcrypt.hash(password, 12);

  if (existing) {
    await prisma.adminUser.update({
      where: { email },
      data: { passwordHash, isActive: true, failedLoginCount: 0, lockedUntil: null, tokenVersion: { increment: 1 } },
    });
    await prisma.auditLog.create({ data: { action: "admin.password_reset", entityType: "AdminUser", entityId: existing.id, details: { via: "cli" } } });
    console.log(`Password reset for ${email}. Existing sessions were signed out.`);
  } else {
    const admin = await prisma.adminUser.create({ data: { email, name: arg("name") ?? email, passwordHash } });
    await prisma.auditLog.create({ data: { action: "admin.create", entityType: "AdminUser", entityId: admin.id, details: { via: "cli", email } } });
    console.log(`Administrator ${email} created.`);
  }
}

main()
  .catch((e) => {
    console.error(`Error: ${e.message ?? e}`);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
