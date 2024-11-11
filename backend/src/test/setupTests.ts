import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import seed from "./prisma/seed";

dotenv.config({ path: ".env.test" });

const prisma = new PrismaClient();

beforeAll(async () => {
  // Reset database to ensure a fresh start before each test
  execSync("npx prisma migrate reset --force --skip-seed", {
    stdio: "inherit",
  });

  await seed();
});

afterAll(async () => {
  await prisma.$disconnect();
});
