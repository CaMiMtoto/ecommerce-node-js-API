import {NextFunction, Request, Response} from 'express';
import express from 'express';
import {registerUser, loginUser, logout} from '../controllers/authController';
import {authenticateToken} from "../middlewares/authMiddleware";

const router = express.Router();

// Register user
router.post('/register', (req: Request, res: Response) =>
    registerUser(req, res).then(r => {
        console.log(r);
    }));

// Login user
router.post('/login', (req: Request, res: Response) =>
    loginUser(req, res).then(r => {
        console.log(r);
    }));

router.post('/logout', authenticateToken, logout);

export default router;
