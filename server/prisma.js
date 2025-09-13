// server/prisma.js
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

prisma = global.prisma;

export { prisma };
