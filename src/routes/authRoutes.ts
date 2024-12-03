import {NextFunction, Request, Response} from 'express';
import express from 'express';
import {registerUser, loginUser} from '../controllers/authController';

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

export default router;
