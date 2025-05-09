import React, { useState } from "react";
import { FaCommentAlt, FaTrashAlt } from "react-icons/fa";

const CommentSection = ({ postId, comments, setComments }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);

  const handlePostComment = async () => {
    if (!commentText.trim()) return;

    setPosting(true);

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

      if (res.ok) {
        const response = await res.json();
        const addedComment = response.data;

        if (addedComment && typeof addedComment === "object") {
          setComments((prev) => ({
            ...prev,
            [postId]: [...(prev[postId] || []), addedComment],
          }));
        } else {
          console.warn("Unexpected response format:", response);
        }

        setCommentText("");
        setShowCommentBox(false);
      } else {
        alert("Failed to post comment.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setPosting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!commentId) {
      console.error("No comment ID provided!");
      return;
    }

    console.log("Deleting comment with ID:", commentId); // Log the ID to ensure it's correct

    try {
      const res = await fetch(`http://localhost:8081/deleteComment/${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setComments((prev) => ({
          ...prev,
          [postId]: prev[postId].filter((comment) => comment.commentid !== commentId),
        }));
      } else {
        alert("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm mb-2">Comments:</h3>
        <button
          onClick={() => setShowCommentBox((prev) => !prev)}
          className="flex items-center space-x-2 bg-[#1f467d] hover:bg-[#8b48a5] text-white py-2 px-4 rounded-full shadow-md transition-all duration-300"
        >
          <FaCommentAlt className="text-lg" />
          <span className="text-sm font-medium">Add a comment</span>
        </button>
      </div>

      {showCommentBox && (
        <div className="mb-4 bg-gray-50 p-4 rounded-lg shadow-inner">
          <textarea
            rows="3"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write your comment here..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            disabled={posting}
            onClick={handlePostComment}
            className="mt-2 bg-[#1f467d] text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all duration-200"
          >
            {posting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      )}

      {Array.isArray(comments[postId]) ? (
        comments[postId].length > 0 ? (
          comments[postId].map((comment, idx) => {
            if (!comment || typeof comment !== "object") return null;

            return (
              <div
                key={comment.commentid || idx} // Ensure unique key using commentid or idx
                className="mb-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src="https://randomuser.me/api/portraits/men/45.jpg"
                      alt={comment.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <p className="font-semibold text-sm">{comment.name}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment.commentid)} // Pass the comment ID
                    className="text-[#1f467d] hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
                <p className="text-sm text-gray-700">{comment.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(comment.createdDate).toLocaleString()}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )
      ) : (
        <p className="text-sm text-gray-400">Loading comments...</p>
      )}
    </div>
  );
};

export default CommentSection;
