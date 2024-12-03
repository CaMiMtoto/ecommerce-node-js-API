import {Request, Response} from "express";
import Tag from "../models/tagModel";

export const createTag = async (req: Request, res: Response) => {
    try {
        const {name} = req.body;
        const tag = await Tag.findOne({name: name});
        if (tag) {
            res.status(400).json({message: "Tag already exists"});
            return;
        }
        const newTag = new Tag(req.body);
        await newTag.save();
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({message: "Unable to create a tag"});
    }
    return;
}

export const getTags = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({message: "Unable to get a tag"});
    }
    return;
}

export const getTag = async (req: Request, res: Response) => {
    try {
        const tag = await Tag.findOne({name: req.params._id});
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({message: "Unable to get a tag"});
    }
    return;
}

export const updateTag = async (req: Request, res: Response) => {
    try {
        const tag = await Tag.findOneAndUpdate({name: req.params._id}, req.body, {new: true});
        if (!tag) {
            res.status(404).json({message: "Tag not found"});
            return;
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({message: "Unable to update a tag"});
    }
    return;
}

export const deleteTag = async (req: Request, res: Response) => {
    try {
        const tag = await Tag.findOneAndDelete({name: req.params._id});
        if (!tag) {
            res.status(404).json({message: "Tag not found"});
            return;
        }
        res.status(200).json({message: "Tag deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Unable to delete a tag"});
    }
    return;
}