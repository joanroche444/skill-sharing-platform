import React, { useState, useEffect } from "react";
import Post from "./Post"; // Import the Post component

// Helper function to generate random timestamps within the last 7 days
const getRandomTimestamp = () => {
  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  return Math.floor(Math.random() * (now - oneWeekAgo + 1) + oneWeekAgo);
};

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [visibleCommentsPostId, setVisibleCommentsPostId] = useState(null);
  const [postText, setPostText] = useState(""); // Added state for post text
  const [postImage, setPostImage] = useState(null); // Added state for post image

  useEffect(() => {
    fetch("http://localhost:8081/post/all")
      .then((res) => res.json())
      .then((data) => {
        const postsWithExtras = data.map((post) => ({
          ...post,
          createdAt: getRandomTimestamp(),
          mediaUrl: "https://woz-u.com/wp-content/uploads/2022/02/Coding-Tips-Featured.jpg",
        }));
        setPosts(postsWithExtras);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handleCommentToggle = (postId) => {
    if (visibleCommentsPostId === postId) {
      setVisibleCommentsPostId(null); // Hide comments if already open
    } else {
      setVisibleCommentsPostId(postId);
      if (!comments[postId]) {
        fetch(`http://localhost:8081/getCommentsByPostId/${postId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setComments((prev) => ({ ...prev, [postId]: data.data }));
            } else {
              setComments((prev) => ({
                ...prev,
                [postId]: [{ description: "No comments found." }],
              }));
            }
          })
          .catch((err) => {
            console.error("Error fetching comments:", err);
            setComments((prev) => ({
              ...prev,
              [postId]: [{ description: "Failed to load comments." }],
            }));
          });
      }
    }
  };

  // Handle file input for images
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPostImage(imageUrl);
    }
  };

  // Handle the post submission
  const handlePost = () => {
    // You can send the post data to your server here, or just log it
    console.log("Post Created:", { postText, postImage });
    // Clear the form fields after posting
    setPostText("");
    setPostImage(null);
  };

  return (
    <div className="bg-[#f2f3f4]">
    <div className="max-w-3xl mx-auto py-10 bg-[#f2f3f4]">
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Share a Post</h2>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="4"
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)} // Handling the text input
        />
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Handling the image input
            className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
        </div>
        {postImage && (
          <div className="mt-4">
            <img
              src={postImage}
              alt="Post Preview"
              className="max-w-full rounded-lg mb-4"
            />
          </div>
        )}
        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePost}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
          >
            Post
          </button>
        </div>
      </div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.postid}
            post={post}
            comments={comments}
            visibleCommentsPostId={visibleCommentsPostId}
            handleCommentToggle={handleCommentToggle}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
    </div>
  );
};

export default Page;
