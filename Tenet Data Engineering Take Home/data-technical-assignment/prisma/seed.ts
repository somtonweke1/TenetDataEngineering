import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse";

const fs = require("fs");

const prisma = new PrismaClient();

async function seed() {
  // Load Users from CSV
  const usersData = await loadCSV("prisma/seed_data/users.csv");
  const users = await prisma.user.createMany({
    data: usersData.map((row) => ({
      email: row.email,
      name: row.name,
      credit_score: parseInt(row.credit_score),
      past_delinquencies: parseInt(row.past_delinquencies),
    })),
  });

  // Load Applications from CSV
  const applicationsData = await loadCSV("prisma/seed_data/applications.csv");
  const applications = await prisma.application.createMany({
    data: applicationsData.map((row) => ({
      id: parseInt(row.id),
      partner: row.partner,
      userId: parseInt(row.userId),
    })),
  });

  // Load Offers from CSV
  const offersData = await loadCSV("prisma/seed_data/offers.csv");
  const offers = await prisma.offer.createMany({
    data: offersData.map((row) => ({
      loanAmount: parseInt(row.loanAmount),
      apr: parseFloat(row.apr),
      term: parseInt(row.term),
      monthlyPayment: parseFloat(row.monthlyPayment),
      rejectionReason: row.rejectionReason || null,
      status: row.status,
      applicationId: parseInt(row.applicationId),
    })),
  });

  // Update Applications with offerId
  applicationsData.forEach(async (row) => {
    if (row.selectedOfferId) {
      await prisma.application.update({
        where: {
          id: parseInt(row.id),
        },
        data: {
          selectedOfferId: parseInt(row.selectedOfferId),
        },
      });
    }
  });

  console.log("Data seeded successfully.");

  await prisma.$disconnect();
}

async function loadCSV(filename: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const data: string[] = [];
    fs.createReadStream(filename)
      .pipe(parse({ columns: true }))
      .on("data", (row: string) => data.push(row))
      .on("end", () => resolve(data))
      .on("error", (error: string) => reject(error));
  });
}

seed().catch((error) => {
  console.error("Error seeding data:", error);
});
