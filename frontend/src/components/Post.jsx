import React from "react";

const Post = ({ post }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded shadow">
      {post.description && <p className="mb-2">{post.description}</p>}

      {post.mediaType === "image" && (
        <img
          src={`http://localhost:8081${post.mediaUrl}`}
          alt="Post media"
          className="max-w-full h-auto rounded"
        />
      )}

      {post.mediaType === "video" && (
        <video controls className="max-w-full h-auto rounded">
          <source src={`http://localhost:8081${post.mediaUrl}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Post;
