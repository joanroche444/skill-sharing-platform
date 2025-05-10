import React, { useState, useEffect } from "react";
import { FaCommentAlt, FaTrashAlt,FaEdit } from "react-icons/fa";

// Helper: Generate random timestamps
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
  const [postImage, setPostImage] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPostImage(imageUrl);
    }
  };

  const handlePost = () => {
    console.log("Post Created:", { postText, postImage });
    setPostText("");
    setPostImage(null);
  };

  const handleCommentDelete = async (postId, commentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmed) return;

    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((c) => c.commentid !== commentId),
    }));

    try {
      await fetch(`http://localhost:8081/deleteComment/${commentId}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const handleAddComment = async (postId, commentText) => {
    if (!commentText.trim()) return;

    const newComment = {
      postid: postId,
      name: "User",
      description: commentText,
      createdDate: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:8081/addComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      const response = await res.json();
      if (res.ok && response.data) {
        setComments((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), response.data],
        }));
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div className="bg-[#f2f3f4]">
      <div className="max-w-3xl mx-auto py-10">
        {/* Create Post */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Share a Post</h2>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3"
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
              className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
          {postImage && (
            <div className="mt-4">
              <img src={postImage} alt="Preview" className="max-w-full rounded-lg mb-4" />
            </div>
          )}
          <button
            onClick={handlePost}
            className="bg-[#1f467d] text-white py-2 px-4 rounded-lg hover:bg-purple-700 mt-4"
          >
            Post
          </button>
        </div>

        {/* Display Posts */}
        {posts.length > 0 ? (
          posts.map((post) => {
            const isCommentsVisible = visibleCommentsPostId === post.postid;
            return (
              <div key={post.postid} className="bg-white p-6 rounded-xl shadow-md mb-6">
                <div className="flex items-center mb-4">
                  <img
                    className="w-12 h-12 rounded-full mr-3"
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt={post.createdBy}
                  />
                  <div>
                    <p className="font-semibold text-sm">{post.createdBy || "Unknown User"}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <h2 className="font-semibold text-lg">{post.title}</h2>
                <p className="mb-3 text-sm">{post.description}</p>
                <img src={post.mediaUrl} className="w-full rounded-lg mb-4" alt="Post" />

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-blue-600">
                    <span>👍</span>
                    <span>0 Likes</span>
                  </button>
                  <button
                    className="flex items-center space-x-1 hover:text-blue-600"
                    onClick={() => handleCommentToggle(post.postid)}
                  >
                    <span>💬</span>
                    <span>{isCommentsVisible ? "Hide Comments" : "View Comments"}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600">
                    <span>🔄</span>
                    <span>Share</span>
                  </button>
                </div>

                {isCommentsVisible && (
                  <CommentSection
                    postId={post.postid}
                    comments={comments[post.postid] || []}
                    handleAddComment={handleAddComment}
                    handleCommentDelete={handleCommentDelete}
                  />
                )}
              </div>
            );
          })
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

const CommentSection = ({ postId, comments, handleAddComment, handleCommentDelete }) => {
    const [commentText, setCommentText] = useState("");
    const [posting, setPosting] = useState(false);
  
    const handlePostComment = async () => {
      if (!commentText.trim()) return;
      setPosting(true);
      await handleAddComment(postId, commentText.trim());
      setCommentText("");
      setPosting(false);
    };
  
    return (
      <div className="mt-6">
        {/* Comment Input */}
        <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-6">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-grow outline-none text-sm bg-transparent placeholder-gray-400"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            onClick={handlePostComment}
            className={`ml-3 text-sm font-medium ${
              commentText.trim() ? "text-purple-600" : "text-gray-300 cursor-default"
            }`}
            disabled={!commentText.trim() || posting}
          >
            Post
          </button>
        </div>
  
        {/* Comments List */}
        <div className="space-y-5">
          {comments.map((comment) => (
            <div
              key={comment.commentid || Math.random()}
              className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl shadow-sm"
            >
              {/* Avatar */}
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
  
              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{comment.name || "User"}</p>
                    {/* Timestamp below name */}
                    <p className="text-xs text-gray-400">{new Date(comment.createdDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2">
                  <button
                    onClick={() => handleCommentEdit(postId, comment.commentid)}
                    className="text-gray-400 hover:text-blue-500 transition"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleCommentDelete(postId, comment.commentid)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>
                  </div>
                </div>
  
                {/* Comment text */}
                <p className="text-sm text-gray-700 mt-2">{comment.description}</p>
  
                {/* Date below comment */}
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.createdDate).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default Page;
