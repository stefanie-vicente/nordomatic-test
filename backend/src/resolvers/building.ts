import { PrismaClient, Building, Prisma } from "@prisma/client";
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("Database error when fetching buildings:", error);
          throw new Error(
            "Failed to retrieve buildings due to a database error. Please try again later."
          );
        }
        console.error("Unexpected error when fetching buildings:", error);
        throw new Error(
          "An unexpected error occurred while retrieving buildings. Please try again later."
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error(`Prisma error fetching building with ID ${id}:`, error);
        } else if (
          error instanceof Error &&
          error.message.includes("not found")
        ) {
          throw error;
        } else {
          console.error(
            `Unexpected error fetching building with ID ${id}:`,
            error
          );
        }
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("Prisma error creating building:", error);
          throw new Error("Failed to create building due to database error.");
        }
        console.error("Unexpected error creating building:", error);
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
        const existingBuilding = await prisma.building.findUniqueOrThrow({
          where: { id },
        });

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
          include: { temperatureRecords: true },
        });

        return updatedBuilding;
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2025"
        ) {
          throw new Error(`Building with ID ${id} not found.`);
        }
        console.error("Error in updateBuilding:", error);
        throw new Error(
          error instanceof Error
            ? `Failed to update building: ${error.message}`
            : "An unexpected error occurred during the update operation."
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
          message: `Building with ID ${args.id} was successfully deleted.`,
          id: args.id,
          operation: "deleteBuilding",
        };
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2025"
        ) {
          console.warn(`Building with ID ${args.id} not found.`);
          return {
            success: false,
            message: `Building with ID ${args.id} does not exist.`,
            id: args.id,
            operation: "deleteBuilding",
            errorCode: "NOT_FOUND",
          };
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error(
            `Prisma error deleting building with ID ${args.id}:`,
            error
          );
          return {
            success: false,
            message: `Failed to delete building with ID ${args.id} due to a database error.`,
            id: args.id,
            operation: "deleteBuilding",
            errorCode: "DATABASE_ERROR",
          };
        } else {
          console.error(
            `Unexpected error deleting building with ID ${args.id}:`,
            error
          );
          return {
            success: false,
            message:
              "An unexpected error occurred during the delete operation.",
            id: args.id,
            operation: "deleteBuilding",
            errorCode: "UNEXPECTED_ERROR",
          };
        }
      }
    },
  },
};
