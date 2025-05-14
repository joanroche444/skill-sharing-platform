import React, { useState } from 'react';

const generatePostId = () => {
  return Math.random().toString(36).substring(2, 10);
};

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    postid: '',
    title: '',
    description: '',
    mediaUrl: '',
    mediaType: 'image',
    createdBy: '',
    createdAt: '',
    likes: 0,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'likes' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const generatedPost = {
      ...formData,
      postid: generatePostId(),
      createdBy: 'james_smith',
      createdAt: Date.now(),
    };

    try {
      const response = await fetch('http://localhost:8081/post/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generatedPost),
      });

      if (!response.ok) {
        throw new Error('Failed to add post.');
      }

      setSuccessMessage('🎉 Post added successfully!');
      setErrorMessage('');
      setFormData({
        postid: '',
        title: '',
        description: '',
        mediaUrl: '',
        mediaType: 'image',
        createdBy: '',
        createdAt: '',
        likes: 0,
      });
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-8 py-10 bg-white rounded-3xl shadow-lg border border-blue-200">
      <h2 className="text-3xl font-bold text-blue-500 text-center mb-8">✨ Add a New Post</h2>

      {successMessage && (
        <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg border border-green-300">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg border border-red-300">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
        />

        <input
          type="text"
          name="mediaUrl"
          placeholder="Media URL (e.g., https://...)"
          value={formData.mediaUrl}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <select
          name="mediaType"
          value={formData.mediaType}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="image">🖼️ Image</option>
          <option value="video">🎥 Video</option>
        </select>

        

        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-500 text-white text-lg font-semibold py-3 rounded-xl transition duration-200 ease-in-out shadow-md hover:shadow-lg"
        >
          🚀 Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
