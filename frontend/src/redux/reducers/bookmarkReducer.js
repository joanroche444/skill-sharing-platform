import { BOOKMARK_POST, REMOVE_BOOKMARK } from '../actions/bookmarkActions';

const initialState = {
  bookmarkedPosts: [],
  currentUserId: "68242d782c31f279cc1a36b2" // Static user ID 
};

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKMARK_POST:
      // Don't add if already bookmarked
      if (state.bookmarkedPosts.some(post => post.postid === action.payload.postid)) {
        return state;
      }
      return {
        ...state,
        bookmarkedPosts: [...state.bookmarkedPosts, action.payload]
      };

    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarkedPosts: state.bookmarkedPosts.filter(
          post => post.postid !== action.payload
        )
      };

    default:
      return state;
  }
};

export default bookmarkReducer;