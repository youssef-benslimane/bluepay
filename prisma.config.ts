import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Dev local : charge .env.local puis .env (Vercel injecte directement process.env)
if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.local", override: true });
  config({ path: ".env" });
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // DIRECT_URL : connexion directe (sans pooler) pour les migrations CLI
    url: env("DIRECT_URL") ?? env("DATABASE_URL"),
  },
});
