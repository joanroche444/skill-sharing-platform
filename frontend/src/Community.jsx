import React, { useState, useEffect } from "react";
import Page from "./Page"; // Make sure path is correct

const Community = () => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activePostId, setActivePostId] = useState(null);
  const [commentsByPostId, setCommentsByPostId] = useState({});

  const placeholderAvatar = "https://randomuser.me/api/portraits/lego/1.jpg";
  const placeholderMediaImage = "https://via.placeholder.com/600x300?text=Google+Image";

  useEffect(() => {
    fetch("http://localhost:8081/all")
      .then((res) => res.json())
      .then((data) => {
        const backendPosts = data.map((p) => ({
          id: p.postid,
          user: { name: p.createdBy || "Anonymous", avatar: placeholderAvatar },
          time: new Date(p.createdAt).toLocaleString(),
          text: p.description,
          image: p.mediaUrl ? placeholderMediaImage : null,
          likes: 0,
          comments: [], // initial empty
        }));
        setPosts(backendPosts);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handlePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      user: { name: "You", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
      time: "Just now",
      text: postText,
      image: postImage,
      likes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setPostText("");
    setPostImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPostImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCommentClick = async (postId) => {
    if (activePostId === postId) {
      setActivePostId(null); // collapse if already open
      return;
    }

    if (!commentsByPostId[postId]) {
      try {
        const res = await fetch(`http://localhost:8081/getCommentsByPostId/${postId}`);
        const data = await res.json();
        setCommentsByPostId((prev) => ({
          ...prev,
          [postId]: data,
        }));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    setActivePostId(postId);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      {/* Share a Post Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Share a Post</h2>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="4"
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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

      {/* All Posts via Page */}
      <Page
        posts={posts}
        onCommentClick={handleCommentClick}
        activePostId={activePostId}
        commentsByPostId={commentsByPostId}
      />
    </div>
  );
};

export default Community;
