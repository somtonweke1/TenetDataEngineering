import { PrismaClient, User } from "@prisma/client";
import cron from "node-cron";


const databaseClient = new PrismaClient();


const exampleUser = {
   email: "janedoe@tenet.com",
   name: "Jane Doe",
};


async function createUser(): Promise<User> {
   console.log("Attempting to create user...");
   try {
       const persistedExampleUser = await databaseClient.user.create({
           data: exampleUser,
       });
       console.log("User successfully created!");
       return persistedExampleUser;
   } catch (error: any) {
       console.error(`Error creating user: ${error.message}`);
       throw error;
   }
}


async function fetchAllUsers(): Promise<User[]> {
   console.log("Fetching all users...");
   try {
       const allUsers = await databaseClient.user.findMany({});
       console.log("Successfully fetched all users!");
       return allUsers;
   } catch (error: any) {
       console.error(`Error fetching users: ${error.message}`);
       throw error;
   }
}


async function updateUser(userId: number, updatedName: string): Promise<User> {
   console.log(`Attempting to update user with ID ${userId}...`);
   try {
       const updatedExampleUser = await databaseClient.user.update({
           where: { id: userId },
           data: { name: updatedName },
       });
       console.log("User successfully updated!");
       return updatedExampleUser;
   } catch (error: any) {
       console.error(`Error updating user with ID ${userId}: ${error.message}`);
       throw error;
   }
}


async function main() {
   console.log("Executing main process...");
   try {
       const createdUser = await createUser();
       const allUsers = await fetchAllUsers();
       const updatedUser = await updateUser(createdUser.id, createdUser.name + " II");


       // Additional logging for transparency
       console.log("Created user:", JSON.stringify(createdUser));
       console.log("All users:", JSON.stringify(allUsers));
       console.log("Updated user:", JSON.stringify(updatedUser));
   } catch (error: any) {
       console.error("An error occurred while executing the script:", error.message);
   } finally {
       await databaseClient.$disconnect(); // Ensure the Prisma client connection is closed after execution
       console.log("Database connection closed!");
   }
}


// Schedule the main function to run once every day at midnight
cron.schedule("0 0 * * *", () => {
   console.log("Starting scheduled job...");
   main();
});
