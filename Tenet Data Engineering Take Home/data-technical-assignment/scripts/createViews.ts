import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTotalLoanView() {
  await prisma.$executeRaw`
    CREATE OR REPLACE VIEW total_loan_by_user AS
    SELECT userEmail, SUM(offerLoanAmount) as totalLoanAmount
    FROM UserAnalytics
    GROUP BY userEmail;
  `;
  console.log("View created successfully");
  await prisma.$disconnect();
}

createTotalLoanView();
