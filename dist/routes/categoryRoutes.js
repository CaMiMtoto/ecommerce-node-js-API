"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const categorController_1 = require("../controllers/categorController");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticateToken, categorController_1.getAllCategories);
router.post('/', authMiddleware_1.authenticateToken, categorController_1.createCategory);
router.put('/:id', authMiddleware_1.authenticateToken, categorController_1.updateCategory);
router.delete('/:id', authMiddleware_1.authenticateToken, categorController_1.deleteCategory);
router.get('/:id', authMiddleware_1.authenticateToken, categorController_1.getCategory);
exports.default = router;
