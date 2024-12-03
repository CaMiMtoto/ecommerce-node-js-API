import {Request, Response} from 'express';
import Category from '../models/categoryModel';
import {validateCategory} from "../validations/categoryValidation";

export const createCategory = async (req: Request, res: Response) => {
    const {name, description} = req.body;
    try {

        const {error, value} = validateCategory.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).json({message: error.details[0].message});
            return;
        }
        let category = await Category.findOne({name: name});
        if (category) {
            res.status(400).json({message: 'Category already exists'});
            return;
        }

        category = new Category({
            name: name,
            description: description
        });
        await category.save();
        res.status(201).json({message: 'Category created successfully', data: category});
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
        return;
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    const {name, description} = req.body;
    const {id} = req.params;
    try {
        let category = await Category.findById(id);
        if (!category) {
            res.status(404).json({message: 'Category not found'});
            return;
        }
        if (name) {
            let categoryExists = await Category.findOne({name: name});
            if (categoryExists && categoryExists.id.toString() !== id.toString()) {
                res.status(400).json({message: 'Category already exists'});
                return;
            }
        }
        category.name = name;
        category.description = description;
        await category.save();
        res.status(200).json({message: 'Category updated successfully', data: category});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
        return;
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        let category = await Category.findById(id);
        if (!category) {
            res.status(404).json({message: 'Category not found'});
            return;
        }
        await category.deleteOne();
        res.status(200).json({message: 'Category deleted successfully'});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
        return;
    }
}

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json({message: 'Categories retrieved successfully', data: categories});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
        return;
    }
}

export const getCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const category = await Category.findById(id);
        if (!category) {
            res.status(404).json({message: 'Category not found'});
            return
        }
        res.status(200).json({message: 'Category retrieved successfully', data: category});
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
        return
    }
}