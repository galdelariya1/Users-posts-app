import express from "express";
import { getAllUsers, getUserPosts, deletePost } from "./BL.js";

const router = express.Router();

router.route("/users").get(async (req, res) => {
  try {
    const data = await getAllUsers();
    return res.json(data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/posts/:id").get(async (req, res) => {
  try {
    const data = await getUserPosts(req.params.id);
    return res.json(data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/posts/:id").delete(async (req, res) => {
  try {
    const status = await deletePost(req.params.id);
    return res.json(status);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
