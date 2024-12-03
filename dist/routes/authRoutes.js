"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Register user
router.post('/register', (req, res) => (0, authController_1.registerUser)(req, res).then(r => {
    console.log(r);
}));
// Login user
router.post('/login', (req, res) => (0, authController_1.loginUser)(req, res).then(r => {
    console.log(r);
}));
router.post('/logout', authMiddleware_1.authenticateToken, authController_1.logout);
exports.default = router;
