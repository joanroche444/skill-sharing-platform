import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

// Load bookmarks from localStorage if available
const preloadedState = {
  bookmarks: {
    bookmarkedPosts: JSON.parse(localStorage.getItem('bookmarkedPosts')) || []
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState
});

// Subscribe to store changes to save bookmarks in localStorage
store.subscribe(() => {
  const { bookmarkedPosts } = store.getState().bookmarks;
  localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts));
});

export default store;