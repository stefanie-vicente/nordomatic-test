// src/resolvers/buildingResolver.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const buildingResolvers = {
  Query: {
    buildings: async () => {
      return await prisma.building.findMany();
    },
    building: async (_: any, { id }: { id: number }) => {
      return await prisma.building.findUnique({
        where: { id },
      });
    },
  }
};
