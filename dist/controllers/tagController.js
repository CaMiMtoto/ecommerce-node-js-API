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
exports.deleteTag = exports.updateTag = exports.getTag = exports.getTags = exports.createTag = void 0;
const tagModel_1 = __importDefault(require("../models/tagModel"));
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const tag = yield tagModel_1.default.findOne({ name: name });
        if (tag) {
            res.status(400).json({ message: "Tag already exists" });
            return;
        }
        const newTag = new tagModel_1.default(req.body);
        yield newTag.save();
        res.status(201).json(newTag);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to create a tag" });
    }
    return;
});
exports.createTag = createTag;
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield tagModel_1.default.find();
        res.status(200).json(tags);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to get a tag" });
    }
    return;
});
exports.getTags = getTags;
const getTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield tagModel_1.default.findOne({ name: req.params._id });
        res.status(200).json(tag);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to get a tag" });
    }
    return;
});
exports.getTag = getTag;
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield tagModel_1.default.findOneAndUpdate({ name: req.params._id }, req.body, { new: true });
        if (!tag) {
            res.status(404).json({ message: "Tag not found" });
            return;
        }
        res.status(200).json(tag);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to update a tag" });
    }
    return;
});
exports.updateTag = updateTag;
const deleteTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield tagModel_1.default.findOneAndDelete({ name: req.params._id });
        if (!tag) {
            res.status(404).json({ message: "Tag not found" });
            return;
        }
        res.status(200).json({ message: "Tag deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Unable to delete a tag" });
    }
    return;
});
exports.deleteTag = deleteTag;
