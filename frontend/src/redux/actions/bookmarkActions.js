export const BOOKMARK_POST = 'BOOKMARK_POST';
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';

// Action Creators
export const bookmarkPost = (post) => {
  return {
    type: BOOKMARK_POST,
    payload: post
  };
};

export const removeBookmark = (postId) => {
  return {
    type: REMOVE_BOOKMARK,
    payload: postId
  };
};