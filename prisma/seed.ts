import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const pakistan = await prisma.country.create({
    data: { country_code: "+92", name: "Pakistan", flag: "PK" },
  });
  const admin = await prisma.user.create({
    data: {
      name: "Hammad Amjad",
      phone_number: "3136260090",
      role: "ADMIN",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.log(error);
  });
