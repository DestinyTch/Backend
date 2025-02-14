import productModel from "../models/productModel.js";
import fs from "fs";

// Function to add a product
const addProduct = async (req, res) => {
  let image_filename = req.file ? req.file.filename : null; // Get the filename from the uploaded file, check if file exists

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await product.save();
    res.json({ success: true, message: "Added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while adding product" });
  }
};

// Function to list all products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log("Error occurred while listing products", error);
    res.json({ success: false, message: "Error" });
  }
};

// Function to remove a product by ID
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the product has an image and delete it from the file system
    if (product.image) {
      fs.unlink(`uploads/${product.image}`, (err) => {
        if (err) {
          console.log("Error while deleting image:", err);
        } else {
          console.log("Image deleted successfully");
        }
      });
    }

    await productModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product removed successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error while removing product:", error);
    res.status(500).json({
      success: false,
      message: "Error while removing product",
      error: error.message,
    });
  }
};

// Function to update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update product fields with new data
    const updatedData = {
      name: req.body.name || product.name,
      description: req.body.description || product.description,
      price: req.body.price || product.price,
      category: req.body.category || product.category,
    };

    // If a new image is uploaded, delete the old one and update
    if (req.file) {
      if (product.image) {
        // Delete old image from the server
        fs.unlink(`uploads/${product.image}`, (err) => {
          if (err) {
            console.log("Error while deleting image:", err);
          } else {
            console.log("Old image deleted successfully");
          }
        });
      }
      updatedData.image = req.file.filename; // Update image with new file
    }

    // Update product in the database
    const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error while updating product:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating product",
      error: error.message,
    });
  }
};

export { addProduct, listProduct, removeProduct, updateProduct }; // Export the controller functions
