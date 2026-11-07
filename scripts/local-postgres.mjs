// Development helper: runs a real PostgreSQL server from the `embedded-postgres`
// npm package for machines without Docker. Data lives in ./.local-postgres.
// Not for production use. Stop with Ctrl+C.
import EmbeddedPostgres from "embedded-postgres";
import { existsSync } from "node:fs";
import path from "node:path";

const dataDir = path.resolve(".local-postgres");
const port = Number(process.env.LOCAL_PG_PORT ?? 5432);
const pg = new EmbeddedPostgres({
  databaseDir: dataDir,
  user: "exhibition",
  password: "exhibition_dev_password",
  port,
  persistent: true,
  autoRehydrateSymlinks: true,
  // UTF-8 is required for Sinhala text (Windows would otherwise default to WIN1252).
  initdbFlags: ["--encoding=UTF8", "--locale=C"],
  onLog: () => {},
});

const fresh = !existsSync(path.join(dataDir, "PG_VERSION"));
if (fresh) await pg.initialise();
await pg.start();
for (const db of ["exhibition", "exhibition_test"]) {
  try {
    await pg.createDatabase(db);
  } catch {
    // already exists
  }
}
console.log(`PostgreSQL running on localhost:${port} (databases: exhibition, exhibition_test)`);

const shutdown = async () => {
  await pg.stop();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
setInterval(() => {}, 1 << 30);
