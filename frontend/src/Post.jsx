import React from "react";
import CommentSection from "./CommentSection";

const Post = ({ post, comments, visibleCommentsPostId, handleCommentToggle, handleCommentDelete }) => {
  const user = post.createdBy || "Unknown User";
  const isCommentsVisible = visibleCommentsPostId === post.postid;

  return (
    <div key={post.postid} className="bg-white p-6 rounded-xl shadow-md mb-6">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-3"
          src="https://randomuser.me/api/portraits/men/45.jpg"
          alt={user}
        />
        <div>
          <p className="font-semibold text-sm">{user}</p>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <h2 className="font-semibold text-lg">{post.title}</h2>
      <p className="mb-3 text-sm">{post.description}</p>
      <img
        className="w-full rounded-lg mb-4"
        src={post.mediaUrl}
        alt="Post"
      />

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
          comments={comments} 
          handleCommentDelete={handleCommentDelete}
        />
      )}
    </div>
  );
};

export default Post;
