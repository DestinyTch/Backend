import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Import bcryptjs for password hashing

// Login user
// userController.js
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    // Compare the plain password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    // Update last login time
    user.lastLogin = new Date();
    await user.save();  // Save the updated user

    // Generate JWT token
    const token = createToken(user._id);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error occurred during login" });
  }
};

// Create JWT Token function
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); // Token expires in 100 years
};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Check if the user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt rounds

    // Create new user with hashed password
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword, // store hashed password
    });

    // Save user to the database
    const user = await newUser.save();

    // Create JWT token
    const token = createToken(user._id);

    // Send success response with token
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error occurred during registration" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0, __v: 0 }); // Don't return passwords or version key
    return res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error occurred while fetching users" });
  }
};

export { loginUser, registerUser, getUsers };
