import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const buildingResolvers = {
  Query: {
    buildings: async () => {
      return await prisma.building.findMany({
        include: { temperatureRecords: true },
      });
    },
    building: async (_: any, { id }: { id: number }) => {
      return await prisma.building.findUnique({
        where: { id },
        include: { temperatureRecords: true },
      });
    },
  },
  Mutation: {
    async createBuilding(
      _: unknown,
      args: {
        name?: string;
        address: string;
        currentTemperature: number;
        temperatureScale: string;
      }
    ) {
      const { name, address, currentTemperature, temperatureScale } = args;
      return await prisma.building.create({
        data: {
          name,
          address,
          currentTemperature,
          temperatureScale,
          temperatureRecords: {
            create: [{ temperature: currentTemperature, action: "initial" }],
          },
        },
      });
    },

    async updateBuilding(
      _: unknown,
      args: {
        id: number;
        name?: string;
        address?: string;
        currentTemperature?: number;
        temperatureScale?: string;
        // temperatureAction?: string
      }
    ) {
      const { id, name, address, currentTemperature, temperatureScale } = args;

      return await prisma.building.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(address && { address }),
          ...(currentTemperature && { currentTemperature }),
          ...(temperatureScale && { temperatureScale }),
          ...(currentTemperature && {
            temperatureRecords: {
              create: [
                {
                  temperature: currentTemperature, 
                  action: "update",
                },
              ],
            },
          }),
        },
      });
    },

    async deleteBuilding(_: unknown, args: { id: number }) {
      const { id } = args;

      return await prisma.building.delete({
        where: { id },
      });
    },
  },
};
