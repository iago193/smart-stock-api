// src/prisma.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/*
prisma.product.create()

prisma.product.findMany()

prisma.product.findUnique()

prisma.product.update()

prisma.product.delete()
*/
