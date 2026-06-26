import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Dev local : charge .env.local puis .env (Vercel injecte directement process.env)
if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.local", override: true });
  config({ path: ".env" });
}

// prisma generate n'ouvre pas de connexion — une URL placeholder suffit au build Vercel
const databaseUrl =
  process.env.DIRECT_URL ??
  process.env.DATABASE_URL ??
  "postgresql://build:build@localhost:5432/build";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
