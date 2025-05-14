import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BookmarkX, Heart } from 'lucide-react';
import { selectBookmarksByUser, removeBookmark } from '../redux/bookmarksSlice';
import BookmarkButton from '../Components/BookmarkButton';
import { useDispatch } from 'react-redux';

// Toast Notification Component (reusing from existing code)
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
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

const BookmarksPage = () => {
    const userId = "68242d782c31f279cc1a36b2"; // Static user ID
    const [toast, setToast] = useState(null);
    const dispatch = useDispatch();
    
    // Get bookmarked posts for the current user
    const bookmarkedPosts = useSelector(state => selectBookmarksByUser(state, userId));
    const bookmarkedPostsArray = Object.values(bookmarkedPosts);
    
    const [likedPosts, setLikedPosts] = useState({}); // Track which posts are liked
    const [likeCounts, setLikeCounts] = useState({}); // Track like counts
    
    // Toast handlers
    const showToast = (message, type = 'success') => {
      setToast({ message, type });
    };
  
    const hideToast = () => {
      setToast(null);
    };
    
    // Handle like toggle (similar to main page)
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
    };
    
    // Remove bookmark handler
    const handleRemoveBookmark = (post) => {
      dispatch(removeBookmark({ userId, postId: post.postid }));
      showToast("Post removed from bookmarks", "success");
    };
    
    // CSS animation for toast (reused from existing code)
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
    
    return (
      <div className="bg-[#f2f3f4] min-h-screen">
        <style>{toastAnimationStyle}</style>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={hideToast} 
          />
        )}
        
        <div className="max-w-3xl mx-auto py-10 px-4">
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Bookmark size={24} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Your Bookmarks</h1>
                <p className="text-gray-600">All your saved posts in one place</p>
              </div>
            </div>
            
            {bookmarkedPostsArray.length > 0 ? (
              <div className="space-y-6">
                {bookmarkedPostsArray.map((post) => (
                  <div key={post.postid} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="p-6">
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
                      {post.mediaUrl && (
                        <img 
                          src={post.mediaUrl} 
                          className="w-full rounded-lg mb-4" 
                          alt="Post" 
                        />
                      )}
  
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <button
                          className={`flex items-center space-x-1 ${
                            likedPosts[post.postid] ? "text-red-500" : "text-gray-500"
                          } hover:text-red-600`}
                          onClick={() => handleLikeToggle(post.postid)}
                        >
                          <Heart 
                            size={18} 
                            className={likedPosts[post.postid] ? "fill-current" : ""} 
                          />
                          <span>{(likeCounts[post.postid] || post.likeCount || 0)} Like{(likeCounts[post.postid] || post.likeCount || 0) !== 1 ? "s" : ""}</span>
                        </button>
                        
                        <button 
                          className="flex items-center space-x-1 text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveBookmark(post)}
                        >
                          <BookmarkX size={18} />
                          <span>Remove</span>
                        </button>
                        
                        <BookmarkButton 
                          post={post} 
                          userId={userId}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <Bookmark size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No bookmarks yet</h3>
                <p className="text-gray-500 mb-6">Save posts you want to revisit later</p>
                <a 
                  href="/" 
                  className="bg-blue-600 text-white py-2 px-6 rounded-full inline-flex items-center hover:bg-blue-700 transition-colors"
                >
                  Browse Posts
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default BookmarksPage;