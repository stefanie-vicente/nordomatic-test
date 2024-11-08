import { PrismaClient, Building } from "@prisma/client";
import { TemperatureRecordAction } from "../types/temperatureRecordType";
import { TemperatureScale } from "../types/temperatureScale";
import { DeleteResponse } from "../types/deleteResponse";

const prisma = new PrismaClient();

export const buildingResolvers = {
  Query: {
    buildings: async (): Promise<Building[]> => {
      try {
        const buildings = await prisma.building.findMany({
          include: { temperatureRecords: true },
        });
        return buildings;
      } catch (error) {
        console.error("Error fetching buildings:", error);
        throw new Error(
          "Failed to retrieve buildings. Please try again later."
        );
      }
    },

    building: async (
      _: any,
      { id }: { id: number }
    ): Promise<Building | null> => {
      try {
        const building = await prisma.building.findUnique({
          where: { id },
          include: { temperatureRecords: true },
        });

        if (!building) {
          throw new Error(`Building with ID ${id} not found.`);
        }

        return building;
      } catch (error) {
        if (error instanceof Error && error.message.includes("not found")) {
          throw error;
        }
        console.error(`Error fetching building with ID ${id}:`, error);
        throw new Error(
          "Failed to retrieve the building. Please try again later."
        );
      }
    },
  },

  Mutation: {
    async createBuilding(
      _: unknown,
      args: {
        name?: string;
        address: string;
        currentTemperature: number;
        temperatureScale: TemperatureScale;
      }
    ): Promise<Building> {
      const { name, address, currentTemperature, temperatureScale } = args;
      const initialAction: TemperatureRecordAction = "Initial";

      try {
        const newBuilding: Building = await prisma.building.create({
          data: {
            name,
            address,
            currentTemperature,
            temperatureScale,
            temperatureRecords: {
              create: [
                {
                  temperature: currentTemperature,
                  action: initialAction,
                },
              ],
            },
          },
          include: { temperatureRecords: true },
        });

        return newBuilding;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to create building: ${error.message}`);
        }
        throw new Error(
          "An unexpected error occurred while creating the building."
        );
      }
    },

    async updateBuilding(
      _: unknown,
      args: {
        id: number;
        name?: string;
        address?: string;
        currentTemperature?: number;
        temperatureScale?: TemperatureScale;
      }
    ): Promise<Building> {
      const { id, name, address, currentTemperature, temperatureScale } = args;
      try {
        const existingBuilding = await prisma.building.findUnique({
          where: { id },
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

        const updatedBuilding: Building = await prisma.building.update({
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

        return updatedBuilding;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to update building: ${error.message}`);
        }
        throw new Error(
          "An unexpected error occurred during the update operation."
        );
      }
    },

    async deleteBuilding(
      _: unknown,
      args: { id: number }
    ): Promise<DeleteResponse> {
      try {
        await prisma.building.delete({
          where: { id: args.id },
        });
        return {
          success: true,
          message: `Building with ID ${args.id} successfully deleted.`,
        };
      } catch (error) {
        if (error instanceof Error) {
          return {
            success: false,
            message: `Failed to delete building with ID ${args.id}: ${error.message}`,
          };
        }
        return {
          success: false,
          message: "An unexpected error occurred during the delete operation.",
        };
      }
    },
  },
};
