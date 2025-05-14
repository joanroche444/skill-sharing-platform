import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BookmarkX } from 'lucide-react';
import { removeBookmark } from '../redux/actions/bookmarkActions';
import { Link } from 'react-router-dom';

const BookmarkPage = () => {
  const bookmarkedPosts = useSelector(state => state.bookmarks.bookmarkedPosts);
  const dispatch = useDispatch();
  
  const handleRemoveBookmark = (postId) => {
    dispatch(removeBookmark(postId));
  };
  
  return (
    <div className="bg-[#f2f3f4] min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h1 className="text-2xl font-bold mb-6 text-[#1f467d]">Your Bookmarks</h1>
          
          {bookmarkedPosts.length === 0 ? (
            <div className="text-center py-10">
              <div className="bg-gray-100 p-8 rounded-lg">
                <Bookmark className="mx-auto text-gray-400 mb-4" size={64} />
                <h2 className="text-xl font-semibold text-gray-700 mb-2">No bookmarks yet</h2>
                <p className="text-gray-500 mb-4">
                  You haven't bookmarked any posts. Browse the feed and click the bookmark icon to save posts you'd like to revisit.
                </p>
                <Link to="/" className="bg-[#1f467d] text-white py-2 px-6 rounded-lg hover:bg-purple-700">
                  Back to Feed
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {bookmarkedPosts.map((post) => (
                <div key={post.postid} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
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
                    
                    <button
                      onClick={() => handleRemoveBookmark(post.postid)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Remove bookmark"
                    >
                      <BookmarkX size={20} />
                    </button>
                  </div>
                  
                  <h2 className="font-semibold text-lg">{post.title}</h2>
                  <p className="mb-3 text-sm">{post.description}</p>
                  
                  {post.mediaUrl && (
                    <img 
                      src={post.mediaUrl} 
                      className="w-full rounded-lg mb-4" 
                      alt="Post content" 
                    />
                  )}
                  
                  <div className="flex justify-end">
                    <Link 
                      to="/" 
                      className="text-[#1f467d] hover:underline text-sm"
                    >
                      View original post
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Bookmark = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
  </svg>
);

export default BookmarkPage;