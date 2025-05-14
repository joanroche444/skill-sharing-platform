import React, { useState, useEffect } from "react";
import { FaCommentAlt, FaTrashAlt, FaEdit } from "react-icons/fa";

// CSS animation for toast
const toastAnimationStyle = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}
`;

// Helper: Generate random timestamps
const getRandomTimestamp = () => {
  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  return Math.floor(Math.random() * (now - oneWeekAgo + 1) + oneWeekAgo);
};

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
      <div className={`px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
        <span className={`text-2xl ${type === 'success' ? 'text-green-200' : 'text-red-200'}`}>
          {type === 'success' ? '✓' : '✕'}
        </span>
        <p className="font-medium">{message}</p>
        <button 
          onClick={onClose}
          className="ml-2 text-white opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [visibleCommentsPostId, setVisibleCommentsPostId] = useState(null);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [toast, setToast] = useState(null);
  
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };
  
  const fetchPosts = () => {
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
  };

  useEffect(() => {
    fetchPosts();
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

    try {
      const res = await fetch(`http://localhost:8081/deleteComment/${commentId}`, { method: "DELETE" });
      const data = await res.json();
      console.log(data)
      if (data) {
        showToast("Comment deleted successfully!");
      } else {
        showToast("Failed to delete comment", "error");
      }
      
      // After successful deletion, refresh the comments list
      fetchCommentsForPost(postId);
    } catch (err) {
      console.error("Failed to delete comment:", err);
      showToast("Failed to delete comment", "error");
    }
  };

  const handleAddComment = async (postId, commentText) => {
    if (!commentText.trim()) return;
  
    // Create a temporary comment object with a temporary ID
    const tempComment = {
      commentid: `temp-${Date.now()}`, // Temporary ID that will be replaced
      postid: postId,
      name: "User",
      description: commentText,
      createdDate: new Date().toISOString(),
    };
  
    // Optimistically update the UI
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), tempComment]
    }));
  
    try {
      const res = await fetch("http://localhost:8081/addComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postid: postId,
          name: "User",
          description: commentText,
          createdDate: new Date().toISOString(),
        }),
      });
  
      const data = await res.json();
      if (data) {
          
        // Show success toast
        showToast("Comment added successfully!");
        // Refresh comments to ensure UI matches server state
        fetchCommentsForPost(postId);
      } else {

        console.error("Server rejected the update");
        showToast("Failed to update comment", "error");
        // If server update fails, re-fetch to restore correct state
        fetchCommentsForPost(postId);
      }
    } catch (err) {
      console.error("Edit failed:", err);
      showToast("Failed to update comment", "error");
      // If there's an error, re-fetch to restore correct state
      fetchCommentsForPost(postId);
    }
  };

  const handleCommentEdit = async (postId, commentId, newText) => {
    if (newText.trim()) {
      try {
        // First update the UI immediately for better user experience
        setComments((prev) => ({
          ...prev,
          [postId]: prev[postId].map((c) =>
            c.commentid === commentId ? { ...c, description: newText } : c
          ),
        }));
        
        // Then send the update to the server
        const res = await fetch(`http://localhost:8081/updateComment/${commentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: newText }),
        });
        
        const data = await res.json();
        console.log(data)
        if (data) {
          
          // Show success toast
          showToast("Comment updated successfully!");
          // Refresh comments to ensure UI matches server state
          fetchCommentsForPost(postId);
        } else {

          console.error("Server rejected the update");
          showToast("Failed to update comment", "error");
          // If server update fails, re-fetch to restore correct state
          fetchCommentsForPost(postId);
        }
      } catch (err) {
        console.error("Edit failed:", err);
        showToast("Failed to update comment", "error");
        // If there's an error, re-fetch to restore correct state
        fetchCommentsForPost(postId);
      }
    }
  };
  
  // New function to fetch comments for a specific post
  const fetchCommentsForPost = (postId) => {
    fetch(`http://localhost:8081/getCommentsByPostId/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setComments((prev) => ({ ...prev, [postId]: data.data }));
        }
      })
      .catch((err) => console.error("Error refreshing comments:", err));
  };

  return (
    <div className="bg-[#f2f3f4]">
      <style>{toastAnimationStyle}</style>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
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
                    handleCommentEdit={handleCommentEdit}
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

const CommentSection = ({ postId, comments, handleAddComment, handleCommentDelete, handleCommentEdit }) => {
  const [newCommentText, setNewCommentText] = useState(""); // For adding new comments
  const [editingCommentId, setEditingCommentId] = useState(null); // For tracking which comment is being edited
  const [editingText, setEditingText] = useState(""); // For storing the current editing text

  const handlePostComment = async () => {
    if (!newCommentText.trim()) return;
    await handleAddComment(postId, newCommentText.trim());
    setNewCommentText("");
  };

  const handleSaveEdit = async (commentId) => {
    if (editingText.trim()) {
      await handleCommentEdit(postId, commentId, editingText.trim());
      setEditingCommentId(null);
      setEditingText("");
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePostComment();
    }
  };

  return (
    <div className="mt-6">
      {/* New Comment Input */}
      <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-6">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-grow outline-none text-sm bg-transparent placeholder-gray-400"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handlePostComment}
          className={`ml-3 text-sm font-medium ${newCommentText.trim() ? "text-purple-600" : "text-gray-300 cursor-default"}`}
          disabled={!newCommentText.trim()}
        >
          Post
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-5">
        {comments.map((comment) => (
          <div key={comment.commentid} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl shadow-sm">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{comment.name || "User"}</p>
                  <p className="text-xs text-gray-400">{new Date(comment.createdDate).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingCommentId(comment.commentid);
                      setEditingText(comment.description);
                    }}
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

              {editingCommentId === comment.commentid ? (
                <div className="mt-2">
                  <textarea
                    className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleSaveEdit(comment.commentid)}
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingCommentId(null);
                        setEditingText("");
                      }}
                      className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-700 mt-2">{comment.description}</p>
              )}

              <p className="text-xs text-gray-500 mt-1">{new Date(comment.createdDate).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;