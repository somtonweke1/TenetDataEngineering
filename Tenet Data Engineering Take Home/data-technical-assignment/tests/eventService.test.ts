import EventService from "../src/eventService";

describe("EventService", () => {

    let service: EventService;

    beforeEach(() => {
        service = new EventService();
    });

    test("should process valid events", async () => {
        const mockEvent = {
            eventType: "UserUploadedIncomeDocs",
            userId: "123",
            activity: "Uploaded Income Documents"
        };
        const result = await service.processEvent(mockEvent);
        expect(result).toBe("Event processed successfully");
    });

    test("should throw error for invalid events", async () => {
        const mockEvent = {
            userId: "123",
            activity: "Uploaded Income Documents"
        };
        await expect(service.processEvent(mockEvent)).rejects.toThrow("Invalid event structure");
    });

    test("should handle specific event types correctly", async () => {
        const mockUploadEvent = {
            eventType: "UserUploadedDriversLicense",
            userId: "123",
            activity: "Uploaded Driver's License"
        };
        const result = await service.processEvent(mockUploadEvent);
        expect(result).toBe("Event processed successfully");
    });

    test("should handle FICO bands correctly", async () => {
        const mockFicoEvent = {
            eventType: "UserCheckedFicoScore",
            userId: "123",
            activity: "FICO score 720"
        };
        const result = await service.processEvent(mockFicoEvent);
        expect(result).toBe("Event processed successfully");
    });

    
});
