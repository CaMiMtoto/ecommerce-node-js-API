import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '86wPYvFdcJQJbMowLucswgNTElOik8ua';

// Middleware to verify JWT token from cookie
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(403).json({message: 'Access denied'});
        return;
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET); // Attach user information to request object
        next();
    } catch (error) {
        console.log(error);
        // Return an error response if the token is invalid
        res.status(401).json({message: 'Invalid token'});
        return; // Ensure we return here after sending the response
    }
};
// Admin middleware - Check if the user is an admin
export const admin = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user && req.body.user.isAdmin) {
        next();
    } else {
        res.status(403).json({message: 'Not authorized as an admin'});
    }
};
