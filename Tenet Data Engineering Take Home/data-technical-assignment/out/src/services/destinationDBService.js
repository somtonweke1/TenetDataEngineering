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
exports.loadToDestinationDB = void 0;
const client_1 = require("@prisma/client");
// This assumes you've configured prisma to point to the destination DB
const destinationDBClient = new client_1.PrismaClient();
function loadToDestinationDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // For instance, to load data into UserAnalytics table
            yield destinationDBClient.userAnalytics.create({
                data: {
                    email: data.email,
                    name: data.name,
                    // ... other fields and relations
                }
            });
        }
        catch (error) {
            console.error(`Failed to load data to destination DB: ${error.message}`);
            throw error;
        }
    });
}
exports.loadToDestinationDB = loadToDestinationDB;
