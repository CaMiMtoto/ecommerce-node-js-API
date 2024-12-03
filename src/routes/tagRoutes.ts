import express from "express";

const router = express.Router();

// Importing controllers
import {createTag, getTags, getTag, updateTag, deleteTag} from "../controllers/tagController";
import {authenticateToken} from "../middlewares/authMiddleware";

router.get("/", getTags);
router.post("/", authenticateToken, createTag);
router.put("/:id", authenticateToken, updateTag);
router.delete("/:id", authenticateToken, deleteTag);
router.get("/:id", getTag);

export default router;