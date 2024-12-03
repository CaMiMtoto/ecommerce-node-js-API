"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importing controllers
const tagController_1 = require("../controllers/tagController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
router.get("/", tagController_1.getTags);
router.post("/", authMiddleware_1.authenticateToken, tagController_1.createTag);
router.put("/:id", authMiddleware_1.authenticateToken, tagController_1.updateTag);
router.delete("/:id", authMiddleware_1.authenticateToken, tagController_1.deleteTag);
router.get("/:id", tagController_1.getTag);
exports.default = router;
