import express from 'express';
import multer from 'multer';

const productRouter = express.Router();

// Configure storage for multer
const storage = multer.diskStorage({
  destination: "uploads", // Directory where files will be stored
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`); // Creating a unique filename
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Route to add a product (handling file upload and dynamic function import)
productRouter.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { addProduct } = await import('../controllers/productController.js'); // Dynamically import addProduct function
    await addProduct(req, res);  // Await to ensure it finishes before responding
  } catch (error) {
    res.status(500).json({ success: false, message: "Error while adding product", error: error.message });
  }
});

// Route to list all products (dynamic import of listProduct function)
productRouter.get("/list", async (req, res) => {
  try {
    const { listProduct } = await import('../controllers/productController.js'); // Dynamically import listProduct function
    await listProduct(req, res);  // Await to ensure it finishes before responding
  } catch (error) {
    res.status(500).json({ success: false, message: "Error while fetching products", error: error.message });
  }
});

// Route to remove a product by ID (using DELETE method)
productRouter.delete("/remove/:id", async (req, res) => {
  try {
    const { removeProduct } = await import('../controllers/productController.js');
    await removeProduct(req, res);  // Await to ensure it finishes before responding
  } catch (error) {
    res.status(500).json({ success: false, message: "Error while removing product", error: error.message });
  }
});

// Route to update a product by ID (with image upload if applicable)
productRouter.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { updateProduct } = await import('../controllers/productController.js'); // Dynamically import updateProduct function
    await updateProduct(req, res);  // Await to ensure the update is processed
  } catch (error) {
    res.status(500).json({ success: false, message: "Error while updating product", error: error.message });
  }
});

export default productRouter;
