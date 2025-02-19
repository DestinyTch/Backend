import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Ensure database connection is properly set up
import productRouter from "./routes/productRoute.js"; // Product routes
import userRouter from "./routes/userRoute.js"; // User routes for authentication
import cartRouter from "./routes/cartRoute.js"; // Cart routes for shopping cart functionality
import orderRouter from "./routes/orderRoute.js"; // Order routes for handling orders
import "dotenv/config"; // Load environment variables

const app = express();
const port = 4000;

// CORS configuration
const allowedOrigins = [
    /\.impulsee\.pro$/, 
    "http://impulsee.pro",
    "http://admin.impulsee.pro",
    "https://impulsee.pro",
    "https://admin.impulsee.pro"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.some(pattern => new RegExp(pattern).test(origin))) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true // Allow cookies and authentication headers
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to the database
connectDB();

// Define routes for different API endpoints
app.use("/api/product", productRouter); // Product-related operations
app.use("/images", express.static('uploads')); // Serve static image files from the 'uploads' directory
app.use("/api/user", userRouter); // User authentication (login, registration, etc.)
app.use("/api/cart", cartRouter); // Cart operations (add, remove items)
app.use("/api/order", orderRouter); // Order management

// Basic route to check if the API is working
app.get('/', (req, res) => {
    res.send("API IS WORKING");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
