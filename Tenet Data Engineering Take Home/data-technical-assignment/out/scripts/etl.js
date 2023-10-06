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
const databaseClient = new client_1.PrismaClient();
function extractUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield databaseClient.user.findMany({
            include: {
                applications: {
                    include: {
                        offers: true
                    }
                }
            }
        });
    });
}
function transformUsersForAnalytics(users) {
    const analyticsData = [];
    users.forEach(user => {
        var _a;
        (_a = user.applications) === null || _a === void 0 ? void 0 : _a.forEach(application => {
            var _a;
            (_a = application.offers) === null || _a === void 0 ? void 0 : _a.forEach(offer => {
                const dataPoint = {
                    userEmail: user.email,
                    userName: user.name,
                    userFicoScore: user.credit_score || 0,
                    offerStatus: offer.status || null,
                    offerLoanAmount: offer.loanAmount || null,
                    applicationPartner: application.partner,
                    createdAt: new Date() // Or use offer.createdAt if you want the time the offer was made
                };
                analyticsData.push(dataPoint);
            });
        });
    });
    return analyticsData;
}
function loadUserAnalyticsToDestination(data) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let item of data) {
            yield databaseClient.userAnalytics.create({ data: item });
        }
    });
}
function performETL() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const extractedUsers = yield extractUsers();
            const analyticsData = transformUsersForAnalytics(extractedUsers);
            yield loadUserAnalyticsToDestination(analyticsData);
            console.log("ETL process completed.");
        }
        catch (error) {
            console.error("Error in ETL process:", error.message);
        }
        finally {
            yield databaseClient.$disconnect();
        }
    });
}
performETL();
/* import { PrismaClient, User, UserAnalytics } from '@prisma/client';

const databaseClient = new PrismaClient();

async function extractUsers(): Promise<User[]> {
    return await databaseClient.user.findMany({
        include: {
            applications: {
                include: {
                    offers: true
                }
            }
        }
    });
}

function transformUsersForAnalytics(users: User[]): UserAnalytics[] {
    let analyticsData: UserAnalytics[] = [];
    users.forEach(user => {
        user.applications.forEach(application => {
            application.offers.forEach(offer => {
                const dataPoint: UserAnalytics = {
                    userEmail: user.email,
                    userName: user.name,
                    userFicoScore: user.ficoScore!,
                    offerStatus: offer.status,
                    offerLoanAmount: offer.loanAmount,
                    applicationPartner: application.partner,
                    createdAt: new Date() // Or use offer.createdAt if you want the time the offer was made
                };
                analyticsData.push(dataPoint);
            });
        });
    });
    return analyticsData;
}

async function loadUserAnalyticsToDestination(data: UserAnalytics[]): Promise<void> {
    for (let item of data) {
        await databaseClient.userAnalytics.create({ data: item });
    }
}

async function performETL(): Promise<void> {
    try {
        const extractedUsers = await extractUsers();
        const analyticsData = transformUsersForAnalytics(extractedUsers);
        await loadUserAnalyticsToDestination(analyticsData);
        console.log("ETL process completed.");
    } catch (error: any) {
        console.error("Error in ETL process:", error.message);
    }
}

performETL();

*/ 
