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
  },
  Mutation: {
    async createBuilding(
      _: unknown,
      args: { name?: string; address: string; currentTemperature: number; temperatureScale: string }
    ) {
      const { name, address, currentTemperature, temperatureScale } = args;
      return await prisma.building.create({
        data: {
          name,
          address,
          currentTemperature,
          temperatureScale,
        },
      });
    },

    async updateBuilding(
      _: unknown,
      args: { id: number; name?: string; address?: string; currentTemperature?: number; temperatureScale?: string }
    ) {
      const { id, name, address, currentTemperature, temperatureScale } = args;

      return await prisma.building.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(address && { address }),
          ...(currentTemperature && { currentTemperature }),
          ...(temperatureScale && { temperatureScale }),
        },
      });
    },

    async deleteBuilding(
      _: unknown,
      args: { id: number }
    ) {
      const { id } = args;

      return await prisma.building.delete({
        where: { id },
      });
    },
  },
};
