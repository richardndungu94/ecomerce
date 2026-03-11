import type { Request, Response } from "express";
import User from "./users.model.js";
import bcrypt from "bcryptjs";
import { z } from "zod";

import {signToken} from "../../utils/jwt.js"

// Validation schema

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerUser = async (req: Request, res: Response) => {
    try {
        // Validate input
        const { name, email, password } = registerSchema.parse(req.body);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
           
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {

        console.error("Error registering user:", error);
       
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Validation error", errors: error.issues });
        }
       
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password"); // Exclude password from response
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = signToken({ id: user._id,role:user.role });
         res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};

export const createAdminUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = registerSchema.parse(req.body);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "ADMIN",
        });

        await newUser.save();

        res.status(201).json({ message: "Admin user created successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });
    }
    catch (error) {

        console.error("Error creating admin user:", error);
        
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Validation error", errors: error.issues });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
