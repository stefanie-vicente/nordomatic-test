export interface ITemperatureRecords {
  id: number;
  buildingId: number;
  temperature: number;
  createdAt: Date;
  action: "Initial" | "Maintained" | "Increased" | "Decreased";
}
