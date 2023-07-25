import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, IconButton, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

const UserPosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
      const posts = response.data;
      setPosts(posts);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the searchQuery state with the current value of the input
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removePost = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/posts/${id}`
      );
      if (response.data.success) {
        alert(response.data.message);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } else alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while deleting the post.");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to All Users
      </Button>
      <TextField
        sx={{ width: "500px", mt: 4 }}
        id="outlined-basic"
        label="Search Post"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {filteredPosts.map((post) => {
        return (
          <Paper
            key={post.id}
            elivation={2}
            sx={{ m: 4, p: 4, width: "600px", background: "lightblue" }}
          >
            <Typography variant="h4" sx={{ m: 2 }}>
              {post.title}
            </Typography>
            <Typography variand="body1">{post.body}</Typography>
            <IconButton
              sx={{ mt: 2 }}
              onClick={() => {
                removePost(post.id);
              }}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Paper>
        );
      })}
    </>
  );
};

export default UserPosts;
