import { prisma } from "../db";
import { ApiError } from "../errors";
import {
  formatRecoveryCode,
  generateRecoveryCode,
  hmac,
  issueCredential,
  normalizeRecoveryCode,
} from "../participant-auth";

export async function registerParticipant(input: {
  nickname: string;
  consentToDisplayNickname: boolean;
  locale: "en" | "si";
}) {
  const recoveryCode = generateRecoveryCode();
  return prisma.$transaction(async (tx) => {
    const participant = await tx.participant.create({
      data: {
        nickname: input.nickname,
        nicknameConsent: input.consentToDisplayNickname,
        preferredLocale: input.locale,
        recoveryCodeHash: hmac(recoveryCode),
      },
      select: { id: true, nickname: true, nicknameConsent: true },
    });
    const token = await issueCredential(participant.id, tx);
    return { participant, token, recoveryCode: formatRecoveryCode(recoveryCode) };
  });
}

export async function recoverParticipant(recoveryCode: string) {
  const participant = await prisma.participant.findUnique({
    where: { recoveryCodeHash: hmac(normalizeRecoveryCode(recoveryCode)) },
    select: { id: true, nickname: true, nicknameConsent: true },
  });
  if (!participant) throw new ApiError(404, "NOT_FOUND", "That recovery code was not recognised.");
  const token = await issueCredential(participant.id);
  return { participant, token };
}

/** The visitor's current or most recent session, to resume after a refresh. */
export async function currentMembership(participantId: string) {
  const m = await prisma.sessionParticipant.findFirst({
    where: { participantId, session: { status: { in: ["OPEN", "LIVE", "COMPLETED"] } } },
    orderBy: { admittedAt: "desc" },
    select: { session: { select: { id: true, code: true, status: true } } },
  });
  return m?.session ?? null;
}
