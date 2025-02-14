import mongoose from "mongoose";

// Define the order schema
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Payment Under Review" },
    date: { type: Date, default: Date.now },
    payment: { type: Boolean, default: false }
});

// Create and export the order model
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
