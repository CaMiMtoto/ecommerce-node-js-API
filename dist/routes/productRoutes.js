"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../middlewares/authMiddleware");
const productController_1 = require("../controllers/productController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// GET all products
router.get('/', authMiddleware_1.authenticateToken, productController_1.getAllProducts);
router.post('/', authMiddleware_1.authenticateToken, productController_1.createProduct);
router.get('/:id', authMiddleware_1.authenticateToken, productController_1.getProductById);
router.put('/:id', authMiddleware_1.authenticateToken, productController_1.updateProductById);
router.delete('/:id', authMiddleware_1.authenticateToken, productController_1.deleteProductById);
exports.default = router;
