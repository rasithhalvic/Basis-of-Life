// Point Prisma at the dedicated test database before any module loads it.
import "dotenv/config";

if (!process.env.TEST_DATABASE_URL) throw new Error("TEST_DATABASE_URL must be set for tests.");
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
process.env.DIRECT_URL = process.env.TEST_DATABASE_URL;
process.env.PARTICIPANT_TOKEN_SECRET ??= "test-only-participant-secret-0123456789abcdef";
process.env.APP_ENV = "test";
