import { PrismaClient, Building } from "@prisma/client";
import { TemperatureRecordAction } from "../types/temperatureRecordType";

const prisma = new PrismaClient();

export const buildingResolvers = {
  Query: {
    buildings: async (): Promise<Building[]> => {
      return await prisma.building.findMany({
        include: { temperatureRecords: true },
      });
    },

    building: async (
      _: any,
      { id }: { id: number }
    ): Promise<Building | null> => {
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
    ): Promise<Building> {
      const { name, address, currentTemperature, temperatureScale } = args;
      const initialAction: TemperatureRecordAction = "Initial";

      return await prisma.building.create({
        data: {
          name,
          address,
          currentTemperature,
          temperatureScale,
          temperatureRecords: {
            create: [
              { temperature: currentTemperature, action: initialAction },
            ],
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
      }
    ): Promise<Building> {
      const { id, name, address, currentTemperature, temperatureScale } = args;

      const existingBuilding = await prisma.building.findUnique({
        where: { id },
        select: { currentTemperature: true },
      });

      if (!existingBuilding) {
        throw new Error(`Building with ID ${id} not found`);
      }

      let temperatureChangeAction: TemperatureRecordAction = "Maintained";

      if (
        currentTemperature &&
        currentTemperature > existingBuilding.currentTemperature
      ) {
        temperatureChangeAction = "Increased";
      } else if (
        currentTemperature &&
        currentTemperature < existingBuilding.currentTemperature
      ) {
        temperatureChangeAction = "Decreased";
      }

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
                  action: temperatureChangeAction,
                },
              ],
            },
          }),
        },
        include: {
          temperatureRecords: true,
        },
      });
    },

    async deleteBuilding(_: unknown, args: { id: number }): Promise<Building> {
      const { id } = args;

      return await prisma.building.delete({
        where: { id },
      });
    },
  },
};
