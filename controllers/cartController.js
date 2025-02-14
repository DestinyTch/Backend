import userModel from "../models/userModel.js";

// Add item to the cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = userData.cartData || {}; // Ensure cartData is initialized
    let updatedCartData = { ...cartData }; // Make a copy to avoid direct mutation

    if (!updatedCartData[req.body.itemId]) {
      updatedCartData[req.body.itemId] = 1; // Add item if not present
    } else {
      updatedCartData[req.body.itemId] += 1; // Increment quantity
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: updatedCartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Error in addToCart:", error.message); // Log specific error message
    res.json({ success: false, message: "Error" });
  }
};

// Remove item from the cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId] || cartData[itemId] === 0) {
      return res.json({ success: false, message: "Item not found or quantity is zero" });
    }

    delete cartData[itemId];

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Error in removeFromCart:", error.message); // Log specific error message
    res.json({ success: false, message: "Error occurred while removing item from cart" });
  }
};

// Get the user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    let userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getCart:", error.message); // Log specific error message
    res.json({ success: false, message: "Error occurred while fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };