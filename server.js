import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Make sure this is correctly set up
import productRouter from "./routes/productRoute.js"; // Product routes
import userRouter from "./routes/userRoute.js"; // User routes (important for authentication)
import cartRouter from "./routes/cartRoute.js"; // Cart routes (if you are dealing with shopping cart)
import orderRouter from "./routes/orderRoute.js"; // Order routes
import "dotenv/config"; // Ensure environment variables are loaded
import path from "path"
const app = express();
const port = 4000 ;
const __dirname = path.resolve();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Define routes for different API endpoints
app.use("/api/product", productRouter); // Route for product-related operations
app.use("/images", express.static('uploads')); // Serve static image files from the 'uploads' directory
app.use("/api/user", userRouter); // Route for user-related operations (login, registration, etc.)
app.use("/api/cart", cartRouter); // Route for cart operations (add to cart, remove, etc.)
app.use("/api/order", orderRouter); // Route for order-related operations

// Basic route to check if the API is working
app.get('/', (req, res) => {
    res.send("API IS WORKING");
});
if(process.env.NODE_ENV --- "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist"))); 
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(_))
    })
}
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
