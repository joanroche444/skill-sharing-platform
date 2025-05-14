import React, { useState, useEffect } from "react";
import { Heart, MoreVertical, Bookmark } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { bookmarkPost, removeBookmark } from './redux/actions/bookmarkActions';

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

// Comment Section Component
const CommentSection = ({ postId, comments, handleAddComment, handleCommentDelete, handleCommentEdit }) => {
  const [newCommentText, setNewCommentText] = useState(""); // For adding new comments
  const [editingCommentId, setEditingCommentId] = useState(null); // For tracking which comment is being edited
  const [editingText, setEditingText] = useState(""); // For storing the current editing text
  const [openDropdownId, setOpenDropdownId] = useState(null); // Track which dropdown is currently open
  const currentUserId = "68242d782c31f279cc1a36b2"; // Static user ID for the current user

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
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Toggle dropdown menu for a specific comment
  const toggleDropdown = (e, commentId) => {
    e.stopPropagation(); // Prevent the document click event from immediately closing it
    setOpenDropdownId(openDropdownId === commentId ? null : commentId);
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
                {/* Only show dropdown for comments by current user */}
                {comment.userid === currentUserId && (
                  <div className="relative">
                    <button
                      onClick={(e) => toggleDropdown(e, comment.commentid)}
                      className="text-gray-400 hover:text-gray-700 transition p-1"
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {openDropdownId === comment.commentid && (
                      <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <ul className="py-1">
                          <li>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingCommentId(comment.commentid);
                                setEditingText(comment.description);
                                setOpenDropdownId(null);
                              }}
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                            >
                              <span className="mr-2">✏️</span> Edit
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCommentDelete(postId, comment.commentid);
                                setOpenDropdownId(null);
                              }}
                              className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left flex items-center"
                            >
                              <span className="mr-2">🗑️</span> Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
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

// Bookmarks tab component
const BookmarksTab = ({ showBookmarks, setShowBookmarks }) => {
  const bookmarkedPosts = useSelector(state => state.bookmarks.bookmarkedPosts);
  const dispatch = useDispatch();
  
  const handleRemoveBookmark = (postId) => {
    dispatch(removeBookmark(postId));
  };
  
  if (!showBookmarks) return null;
  
  return (

<div className="fixed inset-0 z-50 bg-gradient-to-br from-[#e8f0fe] to-[#f0f4ff] backdrop-blur-md flex flex-col">
  {/* Header */}
  <div className="flex items-center justify-between px-8 py-6 border-b border-white/40 bg-white/30 backdrop-blur-xl shadow-sm">
    <h2 className="text-2xl font-semibold text-[#1a3b5d] tracking-tight">📚 My Bookmarks</h2>
    <button
      onClick={() => setShowBookmarks(false)}
      className="text-[#1a3b5d] hover:text-red-400 text-3xl font-light transition duration-200"
      aria-label="Close"
    >
      &times;
    </button>
  </div>

  {/* Content */}
  <div className="flex-1 overflow-y-auto px-8 py-6">
    {bookmarkedPosts.length > 0 ? (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {bookmarkedPosts.map((post) => (
          <div
            key={post.postid}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                
                <span className="text-sm font-medium text-gray-800">
                  {post.createdBy || "Anonymous"}
                </span>
              </div>
              <button
                onClick={() => handleRemoveBookmark(post.postid)}
                className="text-blue-500 hover:text-blue-700 transition"
                title="Remove bookmark"
              >
                <Bookmark size={18} fill="currentColor" />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{post.description}</p>

            {post.mediaUrl && (
              <img
                src={post.mediaUrl}
                alt="Post"
                className="w-full h-40 object-cover rounded-xl mt-4 border border-white/60"
              />
            )}

            <p className="text-xs text-gray-500 mt-4">
              Bookmarked on {new Date().toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
        <div className="bg-white/60 p-10 rounded-2xl shadow-md backdrop-blur-xl border border-white/30">
          <Bookmark size={48} className="mx-auto mb-4 text-blue-500" />
          <p className="text-lg font-semibold text-gray-700">No bookmarks yet</p>
          <p className="text-sm mt-1 text-gray-500">Start saving posts to see them here</p>
        </div>
      </div>
    )}
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
  const [likedPosts, setLikedPosts] = useState({}); // Track which posts are liked
  const [likeCounts, setLikeCounts] = useState({}); // Track like counts separately
  const [showBookmarks, setShowBookmarks] = useState(false); // Control bookmarks sidebar visibility
  
  // Get bookmark state from Redux
  const bookmarkedPosts = useSelector(state => state.bookmarks.bookmarkedPosts);
  const dispatch = useDispatch();

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
        // Generate posts with extra properties: random timestamp and random like count
        const postsWithExtras = data.map((post) => ({
          ...post,
          createdAt: getRandomTimestamp(),
          mediaUrl: "https://woz-u.com/wp-content/uploads/2022/02/Coding-Tips-Featured.jpg",
          likeCount: Math.floor(Math.random() * 10), // Adding random like count
        }));
        
        setPosts(postsWithExtras);
  
        // Initialize like counts from fetched posts, but only if not already set
        setLikeCounts(prevCounts => {
          const initialLikeCounts = {...prevCounts};
          postsWithExtras.forEach((post) => {
            // Only set if not already tracked
            if (initialLikeCounts[post.postid] === undefined) {
              initialLikeCounts[post.postid] = post.likeCount; 
            }
          });
          return initialLikeCounts;
        });
      })
      .catch((err) => console.error("Error fetching posts:", err));
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLikeToggle = (postId) => {
    const wasLiked = likedPosts[postId];
    const nowLiked = !wasLiked;
  
    setLikedPosts(prev => ({
      ...prev,
      [postId]: nowLiked
    }));
  
    setLikeCounts(prevCounts => ({
      ...prevCounts,
      [postId]: (prevCounts[postId] || 0) + (nowLiked ? 1 : -1)
    }));
  
    // Optional: Update backend like count
    // fetch(`http://localhost:8081/post/${postId}/like`, { method: 'POST' });
  };
  
  // Handle bookmark toggle
  const handleBookmarkToggle = (post) => {
    const isBookmarked = bookmarkedPosts.some(bookmarkedPost => 
      bookmarkedPost.postid === post.postid
    );
    
    if (isBookmarked) {
      dispatch(removeBookmark(post.postid));
      showToast("Post removed from bookmarks");
    } else {
      dispatch(bookmarkPost(post));
      showToast("Post added to bookmarks");
    }
  };

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
      userid: "68242d782c31f279cc1a36b2", // Add the current user ID
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
          userid: "68242d782c31f279cc1a36b2", // Include user ID
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
      
      {/* Fixed Header with Bookmark Button */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-[#1f467d]">Social App</div>
          <button 
            onClick={() => setShowBookmarks(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-[#1f467d] hover:bg-blue-100"
          >
            <Bookmark size={18} />
            <span className="hidden sm:inline">Bookmarks</span>
            {bookmarkedPosts.length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {bookmarkedPosts.length}
              </span>
            )}
          </button>
        </div>
      </header>
      
      {/* Bookmarks Sidebar */}
      <BookmarksTab showBookmarks={showBookmarks} setShowBookmarks={setShowBookmarks} />
      
      <div className="max-w-3xl mx-auto py-10 px-4 pt-20">
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
              className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
            const isBookmarked = bookmarkedPosts.some(bookmarkedPost => 
              bookmarkedPost.postid === post.postid
            );
            
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

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-6">
                    <button
                      className={`flex items-center space-x-1 ${
                        likedPosts[post.postid] ? "text-red-500" : "text-gray-500"
                      } hover:text-red-600`}
                      onClick={() => handleLikeToggle(post.postid)}
                    >
                      <span>{likedPosts[post.postid] ? "❤️" : "🤍"}</span>
                      <span>{likeCounts[post.postid] || 0} Like{(likeCounts[post.postid] || 0) !== 1 ? "s" : ""}</span>
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
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleBookmarkToggle(post)}
                    className={`flex items-center space-x-1 ${
                      isBookmarked ? "text-blue-600" : "text-gray-500"
                    } hover:text-blue-700`}
                    title={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
                  >
                    <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
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
export default Page;