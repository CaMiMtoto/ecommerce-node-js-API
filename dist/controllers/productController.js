"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductById = exports.updateProductById = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const productValidation_1 = require("../validations/productValidation");
const tagModel_1 = __importDefault(require("../models/tagModel"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock, category, imageUrl, variants, tags } = req.body;
    try {
        const { error, value } = productValidation_1.validateProduct.validate(req.body);
        if (error) {
            res.status(400).send({ message: error.details[0].message });
            return;
        }
        // Check if all tags exist in the database
        const tagsInDb = yield tagModel_1.default.find({ _id: { $in: tags } });
        // If tags don't exist, return an error
        if (tagsInDb.length !== tags.length) {
            res.status(400).json({ message: 'Some tags are invalid' });
            return;
        }
        const product = new productModel_1.default({
            name,
            description,
            price,
            stock,
            category,
            imageUrl,
            variants,
            tags: tagsInDb.map(tag => tag._id)
        });
        yield product.save();
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure query parameters with defaults
        const { search = '', sort = 'createdAt', order = 'desc', page = '1', limit = '10' } = req.query;
        // Search filter: Search in product name and description (case-insensitive)
        const searchFilter = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ],
            }
            : {};
        // Pagination: Convert page and limit to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const skip = (pageNumber - 1) * limitNumber;
        // Sorting: Convert order to `asc` or `desc`
        const sortOrder = order === 'asc' ? 1 : -1;
        // Fetch products with filters, pagination, and sorting
        const products = yield productModel_1.default.find(searchFilter)
            .populate('tags') // Populate the tags field
            .sort({ [sort]: sortOrder }) // Dynamically sort by a given field (e.g., price, name)
            .skip(skip) // Skip the first set of results for pagination
            .limit(limitNumber); // Limit the number of results per page
        // Get total count for pagination info
        const totalProducts = yield productModel_1.default.countDocuments(searchFilter);
        // Send the response with products and additional pagination info
        res.status(200).json({
            data: products,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalProducts / limitNumber),
            totalElements: totalProducts,
            showingElements: `Showing elements from ${skip + 1} to ${skip + products.length} of ${totalProducts}`,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.getAllProducts = getAllProducts;
// Get a single product by id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const product = yield productModel_1.default.findById(productId);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
});
exports.getProductById = getProductById;
// Update a product by id
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const { name, description, price, stock, category, imageUrl, variants, tags } = req.body;
        // Check if all tags exist in the database
        const tagsInDb = yield tagModel_1.default.find({ _id: { $in: tags } });
        // If tags don't exist, return an error
        if (tagsInDb.length !== tags.length) {
            res.status(400).json({ message: 'Some tags are invalid' });
            return;
        }
        const product = yield productModel_1.default.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            stock,
            category,
            imageUrl,
            variants,
            tags: tagsInDb.map(tag => tag._id)
        }, { new: true });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
});
exports.updateProductById = updateProductById;
// Delete a product by id
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const product = yield productModel_1.default.findByIdAndDelete(productId);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        return;
    }
});
exports.deleteProductById = deleteProductById;
