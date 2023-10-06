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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const node_cron_1 = __importDefault(require("node-cron"));
const databaseClient = new client_1.PrismaClient();
const exampleUser = {
    email: "janedoe@tenet.com",
    name: "Jane Doe",
};
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Attempting to create user...");
        try {
            const persistedExampleUser = yield databaseClient.user.create({
                data: exampleUser,
            });
            console.log("User successfully created!");
            return persistedExampleUser;
        }
        catch (error) {
            console.error(`Error creating user: ${error.message}`);
            throw error;
        }
    });
}
function fetchAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Fetching all users...");
        try {
            const allUsers = yield databaseClient.user.findMany({});
            console.log("Successfully fetched all users!");
            return allUsers;
        }
        catch (error) {
            console.error(`Error fetching users: ${error.message}`);
            throw error;
        }
    });
}
function updateUser(userId, updatedName) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Attempting to update user with ID ${userId}...`);
        try {
            const updatedExampleUser = yield databaseClient.user.update({
                where: { id: userId },
                data: { name: updatedName },
            });
            console.log("User successfully updated!");
            return updatedExampleUser;
        }
        catch (error) {
            console.error(`Error updating user with ID ${userId}: ${error.message}`);
            throw error;
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Executing main process...");
        try {
            const createdUser = yield createUser();
            const allUsers = yield fetchAllUsers();
            const updatedUser = yield updateUser(createdUser.id, createdUser.name + " II");
            // Additional logging for transparency
            console.log("Created user:", JSON.stringify(createdUser));
            console.log("All users:", JSON.stringify(allUsers));
            console.log("Updated user:", JSON.stringify(updatedUser));
        }
        catch (error) {
            console.error("An error occurred while executing the script:", error.message);
        }
        finally {
            yield databaseClient.$disconnect(); // Ensure the Prisma client connection is closed after execution
            console.log("Database connection closed!");
        }
    });
}
// Schedule the main function to run once every day at midnight
node_cron_1.default.schedule("0 0 * * *", () => {
    console.log("Starting scheduled job...");
    main();
});
