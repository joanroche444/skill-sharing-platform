import { useState } from 'react';

export default function LearningPlanForm({ onSubmit, initialValues = {} }) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [skill, setSkill] = useState(initialValues.skill || '');
  const [tags, setTags] = useState(initialValues.tags?.join(', ') || '');
  const [learningPeriodInDays, setLearningPeriodInDays] = useState(initialValues.learningPeriodInDays || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      skill,
      tags: tags.split(',').map(tag => tag.trim()),
      learningPeriodInDays,
      tasks: [],
      userId: 'test-user-1', // Replace with real user
    });
  };

  return (
    <div className="py-10 flex justify-center bg-gray-200 px-7 animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl space-y-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >

        <div className="space-y-4">
          {/* Title Input */}
          <input
            className="border border-gray-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Description Textarea */}
          <textarea
            className="border border-gray-300 p-4 w-full rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105"
            placeholder="Enter Description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Skill Input */}
          <input
            className="border border-gray-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105"
            placeholder="Skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />

          {/* Tags Input */}
          <input
            className="border border-gray-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          {/* Learning Period Input */}
          <input
            type="number"
            className="border border-gray-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105"
            placeholder="Learning Period (in days)"
            value={learningPeriodInDays}
            onChange={(e) => setLearningPeriodInDays(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Save Plan
          </button>
        </div>
      </form>
    </div>
  );
}
