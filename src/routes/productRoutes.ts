import {authenticateToken} from "../middlewares/authMiddleware";
import {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProductById
} from "../controllers/productController";

import express from "express";

const router = express.Router();

// GET all products
router.get('/', authenticateToken, getAllProducts);
router.post('/', authenticateToken, createProduct);
router.get('/:id', authenticateToken, getProductById);
router.put('/:id', authenticateToken, updateProductById);
router.delete('/:id', authenticateToken, deleteProductById);
export default router;