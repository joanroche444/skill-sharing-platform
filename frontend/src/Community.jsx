import React, { useState } from "react";

// Single Post Component
const Post = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-3"
          src={post.user.avatar}
          alt={post.user.name}
        />
        <div>
          <p className="font-semibold text-sm">{post.user.name}</p>
          <p className="text-xs text-gray-500">{post.time}</p>
        </div>
      </div>
      <p className="mb-3 text-sm">{post.text}</p>
      {post.image && (
        <img className="w-full rounded-lg mb-4" src={post.image} alt="Post" />
      )}
      <div className="flex items-center space-x-6 text-sm text-gray-500">
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <span>👍</span>
          <span>{post.likes} Likes</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <span>💬</span>
          <span>{post.comments.length} Comments</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <span>🔄</span>
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

// CommunityPage Component
const Community = () => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: "Jane Doe", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      time: "2 hours ago",
      text: "Sharing my latest tech blog on React and Tailwind CSS. Check it out!",
      image: "https://via.placeholder.com/600x300?text=React+and+Tailwind+Blog",
      likes: 35,
      comments: [
        { id: 1, author: "Alex", text: "Great post!" },
        { id: 2, author: "Sam", text: "Thanks for sharing!" }
      ],
    },
  ]);

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

      {/* Feed of Posts */}
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Community;
