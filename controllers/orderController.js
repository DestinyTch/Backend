import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


const frontend_url = "http://localhost:5174";
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // Clear the cart after placing the order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Bank details for manual transfer
    const bankDetails = {
      bankName: "XYZ Bank",
      accountNumber: "1234567890",
      accountName: "Seller Name",
      reference: `Order-${newOrder._id}`,
    };

    // Send the bank details along with the order confirmation
    res.json({ success: true, bankDetails });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};


const userOrders = async (req,res)=>{
try{
  const orders = await orderModel.find({userId:req.body.userId})
  res.json({success:true, data:orders})
} catch (error) {
 console.log("Error")
 res.json({success:false, message: "Error"})
}
}

const listOrders = async (req, res) => {
  try {
    // Sorting orders in descending order by createdAt (newest first)
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error fetching orders:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
}

const updateStatus = async (req, res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error) 
    res.json({success:false, message:"Error"})
  }
}





export { placeOrder, userOrders, listOrders, updateStatus };
