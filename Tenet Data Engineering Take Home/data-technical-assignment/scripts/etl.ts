import { PrismaClient, User, UserAnalytics as AnalyticsData } from '@prisma/client';


const sourceDatabaseClient = new PrismaClient();


const destinationDatabaseClient = new PrismaClient({ datasources: { db: "destinationDB" }});

async function extractUsers(): Promise<User[]> {
    return await sourceDatabaseClient.user.findMany({
        include: {
            applications: {
                include: {
                    offers: true
                }
            }
        }
    });
}

function transformUsersForAnalytics(users: User[]): AnalyticsData[] {
    let analyticsData: AnalyticsData[] = [];

    users.forEach(user => {
        user.applications?.forEach(application => {
            application.offers?.forEach(offer => {
                const dataPoint: AnalyticsData = {
                    userEmail: user.email,
                    userName: user.name,
                    userFicoScore: user.ficoScore || 0,  // defaulting to 0 if not provided
                    offerStatus: offer.status,
                    offerLoanAmount: offer.loanAmount,
                    applicationPartner: application.partner,
                    createdAt: new Date()  // Or use offer.createdAt if you want the time the offer was made
                };
                analyticsData.push(dataPoint);
            });
        });
    });

    return analyticsData;
}

async function loadUserAnalyticsToDestination(data: AnalyticsData[]): Promise<void> {
    for (let item of data) {
        await destinationDatabaseClient.userAnalytics.create({ data: item });
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
    } finally {
        //  disconnect after the ETL operation.
        await sourceDatabaseClient.$disconnect();
        await destinationDatabaseClient.$disconnect();
    }
}

performETL();
