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
const prisma = new client_1.PrismaClient();
class EventService {
    constructor() {
        // Initialization logic, if any, should go here.
    }
    // Validate the structure of the incoming payload.
    validateEventStructure(body) {
        return body.eventType && body.userId && body.activity;
    }
    // Save the event data to the source database
    saveToDatabase(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.event.create({ data: body });
            }
            catch (error) {
                console.error(`Failed to save the event to the database: ${error.message}`);
                throw new Error("Database error");
            }
        });
    }
    // Handle document upload event
    handleDocumentUploadEvent(body) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add specific logic for handling document upload events if any
            yield this.saveToDatabase(body);
            return "Document upload event processed successfully";
        });
    }
    // Handle other specific events...
    processEvent(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.validateEventStructure(body)) {
                throw new Error("Invalid event structure");
            }
            switch (body.eventType) {
                case "UserUploadedIncomeDocs":
                    return yield this.handleDocumentUploadEvent(body);
                // Handle other event types...
                default:
                    throw new Error("Unsupported event type");
            }
        });
    }
}
exports.default = EventService;
