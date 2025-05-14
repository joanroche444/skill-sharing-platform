import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { bookmarkPost, removeBookmark } from '../redux/actions/bookmarkActions';

const BookmarkButton = ({ post }) => {
  const dispatch = useDispatch();
  const bookmarkedPosts = useSelector(state => state.bookmarks.bookmarkedPosts);

  // Check if this post is already bookmarked
  const isBookmarked = bookmarkedPosts.some(
    bookmarkedPost => bookmarkedPost.postid === post.postid
  );

  const handleBookmarkToggle = (e) => {
    e.stopPropagation(); // Prevent event bubbling

    if (isBookmarked) {
      dispatch(removeBookmark(post.postid));
    } else {
      dispatch(bookmarkPost(post));
    }
  };

  return (
    <button
      onClick={handleBookmarkToggle}
      className={`flex items-center space-x-1 ${
        isBookmarked ? 'text-yellow-500' : 'text-gray-500'
      } hover:text-yellow-600 transition-colors`}
      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
    >
      {isBookmarked ? (
        <BookmarkCheck size={18} className="text-yellow-500" />
      ) : (
        <Bookmark size={18} />
      )}
      <span>Bookmark</span>
    </button>
  );
};

export default BookmarkButton;