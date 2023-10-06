import { PrismaClient } from "@prisma/client";


const destinationDBClient = new PrismaClient();

export async function loadToDestinationDB(data: any) {
    try {
        // loading data into UserAnalytics table
        await destinationDBClient.userAnalytics.create({
            data: {
                email: data.email,
                name: data.name,
                
            }
        });
    } catch (error: any) {
        console.error(`Failed to load data to destination DB: ${error.message}`);
        throw error;
    }
}
