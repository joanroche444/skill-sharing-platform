// components/PostsSection.jsx
import { Heart, MessageSquare, Share2, TrendingUp, BookOpen } from 'lucide-react';

const PostsSection = ({ isVisible, posts, isLoading, activeCategory }) => {
  const getPostBadge = (type) => {
    switch (type) {
      case 'skill-sharing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Share2 className="w-3 h-3 mr-1" />
            Skill Share
          </span>
        );
      case 'progress-update':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <TrendingUp className="w-3 h-3 mr-1" />
            Progress Update
          </span>
        );
      case 'learning-plan':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <BookOpen className="w-3 h-3 mr-1" />
            Learning Plan
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      id="posts" 
      className={`max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
          <p className="text-gray-500 mt-1">
            {activeCategory === 'All' 
              ? 'Discover what the community is sharing' 
              : `Browsing ${activeCategory} category`}
          </p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300">
            Recent
          </button>
          <button className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300">
            Popular
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white shadow rounded-lg p-6 animate-pulse">
              <div className="flex space-x-4">
                <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 h-48 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg flex flex-col"
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: 0,
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s forwards` : 'none'
              }}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={post.avatar} alt={post.username} />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">@{post.username}</div>
                    <div className="text-xs text-gray-500">{post.timeAgo}</div>
                  </div>
                  <div className="ml-auto">
                    {getPostBadge(post.type)}
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 line-clamp-1">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.description}</p>
              </div>
              
              <div className="relative border-t border-gray-200 flex-grow mt-auto">
                {post.images.length === 1 ? (
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      className="w-full h-48 object-cover"
                      src={post.images[0]}
                      alt={`Post image for ${post.title}`}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1">
                    {post.images.slice(0, 2).map((image, idx) => (
                      <div key={idx} className="aspect-w-1 aspect-h-1">
                        <img
                          className="w-full h-24 sm:h-32 object-cover"
                          src={image}
                          alt={`Post image ${idx + 1}`}
                        />
                      </div>
                    ))}
                    {post.images.length > 2 && (
                      <div className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        +{post.images.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-200">
                      <Heart className="h-5 w-5 mr-1" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-indigo-500 transition-colors duration-200">
                      <MessageSquare className="h-5 w-5 mr-1" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium hover:underline">
                    View Full Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-12 flex justify-center">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105">
          Load More
        </button>
      </div>
    </div>
  );
};

export default PostsSection;