"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const csv_parse_1 = require("csv-parse");
const fs = require("fs");
const prisma = new client_1.PrismaClient();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        // Load Users from CSV
        const usersData = yield loadCSV("prisma/seed_data/users.csv");
        const users = yield prisma.user.createMany({
            data: usersData.map((row) => ({
                email: row.email,
                name: row.name,
                credit_score: parseInt(row.credit_score),
                past_delinquencies: parseInt(row.past_delinquencies),
            })),
        });
        // Load Applications from CSV
        const applicationsData = yield loadCSV("prisma/seed_data/applications.csv");
        const applications = yield prisma.application.createMany({
            data: applicationsData.map((row) => ({
                id: parseInt(row.id),
                partner: row.partner,
                userId: parseInt(row.userId),
            })),
        });
        // Load Offers from CSV
        const offersData = yield loadCSV("prisma/seed_data/offers.csv");
        const offers = yield prisma.offer.createMany({
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
        applicationsData.forEach((row) => __awaiter(this, void 0, void 0, function* () {
            if (row.selectedOfferId) {
                yield prisma.application.update({
                    where: {
                        id: parseInt(row.id),
                    },
                    data: {
                        selectedOfferId: parseInt(row.selectedOfferId),
                    },
                });
            }
        }));
        console.log("Data seeded successfully.");
        yield prisma.$disconnect();
    });
}
function loadCSV(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const data = [];
            fs.createReadStream(filename)
                .pipe((0, csv_parse_1.parse)({ columns: true }))
                .on("data", (row) => data.push(row))
                .on("end", () => resolve(data))
                .on("error", (error) => reject(error));
        });
    });
}
seed().catch((error) => {
    console.error("Error seeding data:", error);
});
