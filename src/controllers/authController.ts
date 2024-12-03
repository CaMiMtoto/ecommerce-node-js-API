import {Request, Response} from 'express';
import User, {IUser} from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {registerSchema} from "../validations/authValidation";
import {StatusCodes} from 'http-status-codes';

export const registerUser = async (req: Request, res: Response) => {
    try {
        // Validate user data with Joi
        const {error, value} = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
        const {name, email, password} = value;

        // Check if user already exists
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: 'User already exists'});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign(
            {
                id: newUser._id,
                isAdmin: newUser.isAdmin,
                name: name,
                email: email
            },
            process.env.JWT_SECRET as string,
            {expiresIn: '1d'});
        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,     // Cannot be accessed via JavaScript
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            // sameSite: 'strict', // Protect against CSRF
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.status(201).json({message: 'User registered'});
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Internal Server Error'});
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400)
                .json({message: "We didn't find any user with that email"});
        }

        const isMatch =  bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1d',
            });
        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,     // Cannot be accessed via JavaScript
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            // sameSite: 'strict', // Protect against CSRF
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.status(200).json({message: 'Login successful'});
    } catch (error: any) {
        res.status(500).json({message: error?.message ?? "Unable to log in , please try again later"});
    }
};


export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Logout successful'});
};
