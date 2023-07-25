import axios from "axios";
import pool from "./DAL.js";

const getAllUsers = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const allUsers = res.data;
    const formatedArray = allUsers.map((user) => {
      const { id, name, email, address } = user;
      return { id, name, email, address };
    });
    return formatedArray;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while fetching all users.");
  }
};

const getUserPosts = async (userId, page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const [row] = await pool.query(
      `
    SELECT *
    FROM users
    WHERE userId = ?
    LIMIT ?, ?
    `,
      [userId, offset, pageSize]
    );
    if (row.length !== 0) return row;
    else {
      const newPosts = await insertPostsFromExternalApi(userId);
      return newPosts;
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`An error occurred while fetching user ${userId} posts.`);
  }
};

const insertPostsFromExternalApi = async (userId) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const posts = response.data;
    const insertedPosts = [];
    for (const post of posts) {
      const { body, title } = post;
      const result = await pool.query(
        "INSERT INTO users (userId, body, title) VALUES (?, ?, ?)",
        [userId, body, title]
      );
      insertedPosts.push({ id: result[0].insertId, userId, body, title });
    }
    return insertedPosts;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while inserting new posts.");
  }
};

const deletePost = async (id) => {
  try {
    const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    if (result[0].affectedRows === 1) {
      return {
        success: true,
        message: `Post in row id - ${id} deleted successfully!`,
      };
    } else {
      return { success: false, message: `Post in row id - ${id} not found!` };
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error(
      `An error occurred while deleting the post with id: ${id}.`
    );
  }
};

export { getAllUsers, getUserPosts, deletePost };
