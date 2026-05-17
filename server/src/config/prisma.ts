import "./env.ts";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to server/.env");
}

const pool = new Pool({ connectionString });

// Pass the pool into the Prisma driver adapter
const adapter = new PrismaPg(pool)

// // Exports the Prisma  Client configured with the adapter
// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
export const prisma = new PrismaClient({ adapter });
