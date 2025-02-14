import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

// Define the correct router variable name
const cartRouter = express.Router(); // Correct router name

// Define your routes
cartRouter.post("/add", authMiddleware, addToCart);  // Ensure authMiddleware is used here
cartRouter.post("/remove", authMiddleware, removeFromCart);  // You can implement removeFromCart later
cartRouter.post("/get", authMiddleware, getCart);  // Ensure that authMiddleware is used here

// Export the cartRouter
export default cartRouter;
