import { exit } from "process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const buildingsData = [
    {
      name: "Building A",
      address: "Sveavägen 1, 111 57 Stockholm, Sweden",
      currentTemperature: 22.5,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 22.5, action: "Initial" },
        { temperature: 23.0, action: "Increased" },
      ],
    },
    {
      name: "Building B",
      address: "Lilla Nygatan 3, 111 28 Stockholm, Sweden",
      currentTemperature: 19.3,
      temperatureScale: "Celsius",
      temperatureRecords: [{ temperature: 19.3, action: "Initial" }],
    },
    {
      name: "Building C",
      address: "Drottninggatan 45, 111 21 Stockholm, Sweden",
      currentTemperature: 25.1,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 25.1, action: "Initial" },
        { temperature: 26.0, action: "Increased" },
      ],
    },
    {
      name: "Building D",
      address: "Kungsgatan 60, 112 22 Stockholm, Sweden",
      currentTemperature: 21.0,
      temperatureScale: "Celsius",
      temperatureRecords: [{ temperature: 21.0, action: "Initial" }],
    },
    {
      name: "Building E",
      address: "Östermalmsgatan 45, 114 26 Stockholm, Sweden",
      currentTemperature: 20.5,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 20.5, action: "Initial" },
        { temperature: 21.5, action: "Increased" },
      ],
    },
    {
      name: "Building F",
      address: "Vasagatan 12, 111 20 Stockholm, Sweden",
      currentTemperature: 18.9,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 18.9, action: "Initial" },
        { temperature: 19.4, action: "Increased" },
      ],
    },
    {
      name: "Building G",
      address: "Hantverkargatan 3, 112 21 Stockholm, Sweden",
      currentTemperature: 22.0,
      temperatureScale: "Celsius",
      temperatureRecords: [{ temperature: 22.0, action: "Initial" }],
    },
    {
      name: "Building H",
      address: "Götgatan 15, 116 21 Stockholm, Sweden",
      currentTemperature: 24.0,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 24.0, action: "Initial" },
        { temperature: 24.5, action: "Increased" },
      ],
    },
    {
      name: "Building I",
      address: "Sankt Eriksgatan 52, 112 34 Stockholm, Sweden",
      currentTemperature: 23.1,
      temperatureScale: "Celsius",
      temperatureRecords: [{ temperature: 23.1, action: "Initial" }],
    },
    {
      name: "Building J",
      address: "Vikingsgatan 9, 113 48 Stockholm, Sweden",
      currentTemperature: 19.8,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 19.8, action: "Initial" },
        { temperature: 20.2, action: "Increased" },
      ],
    },
    {
      name: "Building K",
      address: "Fridhemsgatan 22, 112 40 Stockholm, Sweden",
      currentTemperature: 26.5,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 26.5, action: "Initial" },
        { temperature: 27.0, action: "Increased" },
      ],
    },
    {
      name: "Building L",
      address: "Sundbybergsvägen 1, 172 68 Sundbyberg, Sweden",
      currentTemperature: 21.8,
      temperatureScale: "Celsius",
      temperatureRecords: [{ temperature: 21.8, action: "Initial" }],
    },
    {
      name: "Building M",
      address: "Alviks Torg 1, 167 71 Bromma, Sweden",
      currentTemperature: 22.4,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 22.4, action: "Initial" },
        { temperature: 23.0, action: "Increased" },
      ],
    },
    {
      name: "Building N",
      address: "Norr Mälarstrand 6, 112 20 Stockholm, Sweden",
      currentTemperature: 20.1,
      temperatureScale: "Celsius",
      temperatureRecords: [{ temperature: 20.1, action: "Initial" }],
    },
    {
      name: "Building O",
      address: "Sankt Eriksgatan 80, 113 62 Stockholm, Sweden",
      currentTemperature: 18.2,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 18.2, action: "Initial" },
        { temperature: 18.9, action: "Increased" },
      ],
    },
    {
      name: "Building P",
      address: "Brommaplan 16, 168 37 Bromma, Sweden",
      currentTemperature: 23.3,
      temperatureScale: "Celsius",
      temperatureRecords: [{ temperature: 23.3, action: "Initial" }],
    },
    {
      name: "Building Q",
      address: "Odenplan 3, 113 51 Stockholm, Sweden",
      currentTemperature: 22.2,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 22.2, action: "Initial" },
        { temperature: 22.8, action: "Increased" },
      ],
    },
    {
      name: "Building R",
      address: "Hälsingegatan 45, 113 31 Stockholm, Sweden",
      currentTemperature: 21.3,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 21.3, action: "Initial" },
        { temperature: 21.8, action: "Increased" },
      ],
    },
    {
      name: "Building S",
      address: "Västmannagatan 10, 113 25 Stockholm, Sweden",
      currentTemperature: 22.7,
      temperatureScale: "Celsius",
      temperatureRecords: [
        { temperature: 22.7, action: "Initial" },
        { temperature: 23.3, action: "Increased" },
      ],
    },
  ];

  for (const building of buildingsData) {
    await prisma.building.create({
      data: {
        name: building.name,
        address: building.address,
        currentTemperature: building.currentTemperature,
        temperatureScale: building.temperatureScale,
        temperatureRecords: {
          create: building.temperatureRecords,
        },
      },
    });
  }

  console.log("Seed data created!");
}

main()
  .catch((e) => {
    console.error(e);
    exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
