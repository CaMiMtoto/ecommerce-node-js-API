import {Request, Response} from 'express';
import Product, {IProduct} from '../models/productModel';
import {validateProduct} from "../validations/productValidation";
import Tag from "../models/tagModel";

export const createProduct = async (req: Request, res: Response) => {
    const {name, description, price, stock, category, imageUrl, variants, tags} = req.body;
    try {
        const {error, value} = validateProduct.validate(req.body);
        if (error) {
            res.status(400).send({message: error.details[0].message});
            return;
        }

        // Check if all tags exist in the database
        const tagsInDb = await Tag.find({_id: {$in: tags}});
        // If tags don't exist, return an error
        if (tagsInDb.length !== tags.length) {
             res.status(400).json({message: 'Some tags are invalid'});
            return;
        }
        const product = new Product({
            name,
            description,
            price,
            stock,
            category,
            imageUrl,
            variants,
            tags: tagsInDb.map(tag => tag._id)
        });
        await product.save();

        res.status(201).json(product);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        // Destructure query parameters with defaults
        const {search = '', sort = 'createdAt', order = 'desc', page = '1', limit = '10'} = req.query;

        // Search filter: Search in product name and description (case-insensitive)
        const searchFilter = search
            ? {
                $or: [
                    {name: {$regex: search as string, $options: 'i'}},
                    {description: {$regex: search as string, $options: 'i'}},
                ],
            }
            : {};

        // Pagination: Convert page and limit to numbers
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const skip = (pageNumber - 1) * limitNumber;

        // Sorting: Convert order to `asc` or `desc`
        const sortOrder = order === 'asc' ? 1 : -1;

        // Fetch products with filters, pagination, and sorting
        const products = await Product.find(searchFilter)
            .populate('tags') // Populate the tags field
            .sort({[sort as string]: sortOrder}) // Dynamically sort by a given field (e.g., price, name)
            .skip(skip) // Skip the first set of results for pagination
            .limit(limitNumber); // Limit the number of results per page

        // Get total count for pagination info
        const totalProducts = await Product.countDocuments(searchFilter);

        // Send the response with products and additional pagination info
        res.status(200).json({
            data: products,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalProducts / limitNumber),
            totalElements: totalProducts,
            showingElements: `Showing elements from ${skip + 1} to ${skip + products.length} of ${totalProducts}`,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({message: error.message});
        } else {
            res.status(500).json({message: 'Unknown error occurred'});
        }
    }
};
// Get a single product by id
export const getProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({message: "Product not found"});
            return;
        }
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({message: error.message});
        return;
    }
}

// Update a product by id
export const updateProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const {name, description, price, stock, category, imageUrl, variants, tags} = req.body;
        // Check if all tags exist in the database
        const tagsInDb = await Tag.find({_id: {$in: tags}});
        // If tags don't exist, return an error
        if (tagsInDb.length !== tags.length) {
            res.status(400).json({message: 'Some tags are invalid'});
            return;
        }
        const product = await Product.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            stock,
            category,
            imageUrl,
            variants,
            tags: tagsInDb.map(tag => tag._id)
        }, {new: true});
        if (!product) {
            res.status(404).json({message: "Product not found"});
            return;
        }
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({message: error.message});
        return;
    }
}

// Delete a product by id
export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            res.status(404).json({message: "Product not found"});
            return;
        }
        res.status(200).json({message: "Product deleted successfully"});
        return
    } catch (error: any) {
        res.status(500).json({message: error.message});
        return;
    }
}
