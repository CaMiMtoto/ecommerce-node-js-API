import express from 'express';
import {authenticateToken} from "../middlewares/authMiddleware";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategory,
    updateCategory
} from "../controllers/categorController";

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', authenticateToken, createCategory);
router.put('/:id', authenticateToken, updateCategory);
router.delete('/:id', authenticateToken, deleteCategory);
router.get('/:id', authenticateToken, getCategory);

export default router;
