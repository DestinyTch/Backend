import mongoose from "mongoose";

export const connectDB = async () => {
    // Define a variable for retry attempts
    let retries = 0;
    const maxRetries = 10; // Set a maximum retry limit to prevent infinite attempts
 
    const connectWithRetry = async () => {
        try {
            // Wait for MongoDB connection to complete
            await mongoose.connect('mongodb+srv://admin:DestinyTch@destinytch.wnetl.mongodb.net/?retryWrites=true&w=majority&appName=DestinyTch');
            console.log("DB Connected");
        } catch (error) {
            // Catch and log any errors
            console.error("Error connecting to the database:", error);
            retries++;
            if (retries <= maxRetries) {
                console.log(`Retrying connection... Attempt ${retries} of ${maxRetries}`);
                // Retry connection every 5 seconds
                setTimeout(connectWithRetry, 5000);
            } else {
                console.log("Max retries reached. Exiting...");
                process.exit(1); // Exit the process after max retries
            }
        }
    };

    connectWithRetry(); // Start the initial connection attempt
};
