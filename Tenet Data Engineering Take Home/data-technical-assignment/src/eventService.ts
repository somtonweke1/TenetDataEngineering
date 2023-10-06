import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class EventService {
  constructor() {
    // Initialization logic, if any, should go here.
  }

  private validateEventStructure(body: any): boolean {
    return body.eventType && body.userId && body.activity;
  }

  private async saveToDatabase(body: any): Promise<void> {
    try {
      await prisma.event.create({ data: body });
    } catch (error: any) {
      console.error(`Failed to save the event to the database: ${error.message}`);
      throw new Error("Database error");
    }
  }

  private async handleDocumentUploadEvent(body: any): Promise<string> {
    //  handling document upload events if any
    await this.saveToDatabase(body);
    return "Document upload event processed successfully";
  }

  public async processEvent(body: any): Promise<string> {
    if (!this.validateEventStructure(body)) {
      throw new Error("Invalid event structure");
    }

    switch (body.eventType) {
      case "UserUploadedIncomeDocs":
      case "UserUploadedDriversLicense":
      case "UserUploadedPurchaseOrder":
        return await this.handleDocumentUploadEvent(body);
      // additional cases for other event types if they emerge...
      default:
        throw new Error("Unsupported event type");
    }
  }
}
