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
exports.getCategory = exports.getAllCategories = exports.deleteCategory = exports.updateCategory = exports.createCategory = void 0;
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const categoryValidation_1 = require("../validations/categoryValidation");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const { error, value } = categoryValidation_1.validateCategory.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        let category = yield categoryModel_1.default.findOne({ name: name });
        if (category) {
            res.status(400).json({ message: 'Category already exists' });
            return;
        }
        category = new categoryModel_1.default({
            name: name,
            description: description
        });
        yield category.save();
        res.status(201).json({ message: 'Category created successfully', data: category });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const { id } = req.params;
    try {
        let category = yield categoryModel_1.default.findById(id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        if (name) {
            let categoryExists = yield categoryModel_1.default.findOne({ name: name });
            if (categoryExists && categoryExists.id.toString() !== id.toString()) {
                res.status(400).json({ message: 'Category already exists' });
                return;
            }
        }
        category.name = name;
        category.description = description;
        yield category.save();
        res.status(200).json({ message: 'Category updated successfully', data: category });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        let category = yield categoryModel_1.default.findById(id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        yield category.deleteOne();
        res.status(200).json({ message: 'Category deleted successfully' });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
});
exports.deleteCategory = deleteCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryModel_1.default.find();
        res.status(200).json({ message: 'Categories retrieved successfully', data: categories });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
});
exports.getAllCategories = getAllCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const category = yield categoryModel_1.default.findById(id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        res.status(200).json({ message: 'Category retrieved successfully', data: category });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
});
exports.getCategory = getCategory;
