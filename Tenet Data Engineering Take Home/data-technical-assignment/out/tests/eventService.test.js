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
const eventService_1 = __importDefault(require("../src/eventService"));
describe("EventService", () => {
    let service;
    beforeEach(() => {
        service = new eventService_1.default();
    });
    test("should process valid events", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockEvent = {
            eventType: "UserUploadedIncomeDocs",
            userId: "123",
            activity: "Uploaded Income Documents"
        };
        const result = yield service.processEvent(mockEvent);
        expect(result).toBe("Event processed successfully");
    }));
    test("should throw error for invalid events", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockEvent = {
            userId: "123",
            activity: "Uploaded Income Documents"
        };
        yield expect(service.processEvent(mockEvent)).rejects.toThrow("Invalid event structure");
    }));
    test("should handle specific event types correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUploadEvent = {
            eventType: "UserUploadedDriversLicense",
            userId: "123",
            activity: "Uploaded Driver's License"
        };
        const result = yield service.processEvent(mockUploadEvent);
        expect(result).toBe("Event processed successfully");
    }));
    test("should handle FICO bands correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockFicoEvent = {
            eventType: "UserCheckedFicoScore",
            userId: "123",
            activity: "FICO score 720"
        };
        const result = yield service.processEvent(mockFicoEvent);
        expect(result).toBe("Event processed successfully");
    }));
    // ... other tests. For instance, if you had error logging or any other functionality, you'd want to test that as well.
});
