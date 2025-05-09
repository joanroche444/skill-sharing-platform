import React, { useState, useEffect } from "react";
import Post from "./Post";

const getRandomTimestamp = () => {
  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  return Math.floor(Math.random() * (now - oneWeekAgo + 1) + oneWeekAgo);
};

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [visibleCommentsPostId, setVisibleCommentsPostId] = useState(null);
  const [postText, setPostText] = useState("");
  const [postFile, setPostFile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/post/all")
      .then((res) => res.json())
      .then((data) => {
        const postsWithExtras = data.map((post) => ({
          ...post,
          createdAt: getRandomTimestamp(),
        }));
        setPosts(postsWithExtras);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handleCommentToggle = (postId) => {
    if (visibleCommentsPostId === postId) {
      setVisibleCommentsPostId(null);
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

  const handleFileChange = (e) => {
    setPostFile(e.target.files[0]);
  };

const handlePost = () => {
  if (!postFile && !postText.trim()) {
    alert("Please enter a description or select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("title", "Skill Sharing Post"); // Or use an input field if you want
  formData.append("description", postText);
  formData.append("createdBy", "user123"); // Replace with actual user info
  formData.append("mediaType", postFile?.type.startsWith("video") ? "video" : "image");
  if (postFile) formData.append("mediaFile", postFile);

  fetch("http://localhost:8081/post/add", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Post uploaded successfully!");
      setPosts((prevPosts) => [data, ...prevPosts]);
      setPostText("");
      setPostFile(null);
    })
    .catch((err) => {
      console.error("Error posting:", err);
      alert("An error occurred.");
    });
};


  return (
    <div className="bg-[#f2f3f4] min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Create a Post</h2>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#1f467d] text-sm"
            rows="3"
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className="mt-3">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#1f467d] file:text-white file:cursor-pointer hover:file:bg-opacity-90 transition"
            />
          </div>
          {postFile && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">File selected: {postFile.name}</p>
            </div>
          )}
          <div className="mt-4 text-right">
            <button
              onClick={handlePost}
              className="bg-[#1f467d] text-white py-2 px-5 rounded-lg transition hover:bg-opacity-90"
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
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Page;


