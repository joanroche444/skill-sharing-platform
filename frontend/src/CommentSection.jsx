import React from "react";
import { FaCommentAlt } from "react-icons/fa"; // Importing the comment icon

const CommentSection = ({ postId, comments }) => {
  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm mb-2">Comments:</h3>
        <button className="flex items-center space-x-2 bg-[#a569bd] hover:bg-[#8b48a5] text-white py-2 px-4 rounded-full shadow-md transition-all ease-in-out duration-300">
          <FaCommentAlt className="text-lg" />
          <span className="text-sm font-medium">Add a comment</span>
        </button>
      </div>

      {comments[postId] ? (
        comments[postId].length > 0 ? (
          comments[postId].map((comment, idx) => (
            <div
              key={comment.commentid || idx}
              className="mb-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-2">
                <img
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt={comment.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <p className="font-semibold text-sm">{comment.name}</p>
              </div>
              <p className="text-sm text-gray-700">{comment.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(comment.createdDate).toLocaleString()}
              </p>
            </div>
          ))
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
