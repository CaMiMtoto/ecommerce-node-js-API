"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || '86wPYvFdcJQJbMowLucswgNTElOik8ua';
// Middleware to verify JWT token from cookie
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(403).json({ message: 'Access denied' });
        return;
    }
    try {
        req.user = jsonwebtoken_1.default.verify(token, JWT_SECRET); // Attach user information to request object
        next();
    }
    catch (error) {
        console.log(error);
        // Return an error response if the token is invalid
        res.status(401).json({ message: 'Invalid token' });
        return; // Ensure we return here after sending the response
    }
};
exports.authenticateToken = authenticateToken;
// Admin middleware - Check if the user is an admin
const admin = (req, res, next) => {
    if (req.body.user && req.body.user.isAdmin) {
        next();
    }
    else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
exports.admin = admin;
