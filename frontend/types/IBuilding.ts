import { ITemperatureRecords } from "./ITemperatureRecords";

export interface IBuilding {
  id: number;
  name?: string;
  address: string;
  currentTemperature: number;
  createdAt?: Date;
  updatedAt?: Date;
  temperatureScale: "Celsius" | "Fahrenheit";
  temperatureRecords: ITemperatureRecords[];
}
