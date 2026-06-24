import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Prisma CLI lit .env par défaut — on charge aussi .env.local pour le dev local
config({ path: ".env.local", override: true });
config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // DIRECT_URL : connexion directe (sans pooler) pour les migrations CLI
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
