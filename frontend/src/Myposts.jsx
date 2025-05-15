import React, { useEffect, useState } from 'react';
import { Edit, Trash } from 'lucide-react';

const Myposts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [editPost, setEditPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    mediaUrl: '',
    mediaType: '',
  });

  const defaultImageUrl = 'https://woz-u.com/wp-content/uploads/2022/02/Coding-Tips-Featured.jpg';

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await fetch('http://localhost:8081/post/search/createdBy/james_smith');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMyPosts();
  }, []);

  const handleDelete = async (postid) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8081/post/delete/${postid}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPosts(posts.filter((post) => post.postid !== postid));
      } else {
        throw new Error('Failed to delete the post');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (postid) => {
    const postToEdit = posts.find((post) => post.postid === postid);
    setEditPost(postToEdit);

    setNewPost({
      title: postToEdit.title,
      description: postToEdit.description,
      mediaUrl: postToEdit.mediaUrl || defaultImageUrl,
      mediaType: postToEdit.mediaType,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedPost = {
      ...newPost,
      postid: editPost.postid,
      createdBy: 'james_smith',
    };

    try {
      const response = await fetch(`http://localhost:8081/post/update/${editPost.postid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        const updatedPostData = await response.json();
        setPosts(posts.map((post) => (post.postid === updatedPostData.postid ? updatedPostData : post)));
        setEditPost(null);
        setNewPost({ title: '', description: '', mediaUrl: '', mediaType: '' });
      } else {
        throw new Error('Failed to update the post');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const isVideo = (url) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">My Posts</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {editPost ? (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">Edit Post</h3>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={newPost.description}
                onChange={handleChange}
                rows="5"
                className="mt-2 block w-full px-4 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Media URL</label>
              <input
                type="text"
                name="mediaUrl"
                value={newPost.mediaUrl}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Media Type</label>
              <input
                type="text"
                name="mediaType"
                value={newPost.mediaType}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-lg text-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500"
            >
              Update Post
            </button>
          </form>
        </div>
      ) : (
        <div>
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center">No posts found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div key={post.postid} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                  {isVideo(post.mediaUrl) ? (
                    <video controls className="w-full h-48 object-cover rounded-lg">
                      <source src={post.mediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={post.mediaUrl && post.mediaUrl !== '' ? post.mediaUrl : defaultImageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg transition transform hover:scale-105"
                    />
                  )}

                  <h3 className="text-xl font-semibold mt-4 text-blue-800">{post.title}</h3>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                  <p className="text-sm text-gray-400">Posted by: {post.createdBy}</p>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => handleEdit(post.postid)}
                      className="text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.postid)}
                      className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Myposts;
