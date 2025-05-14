import { combineReducers } from 'redux';
import bookmarkReducer from './bookmarkReducer';

const rootReducer = combineReducers({
  bookmarks: bookmarkReducer,
  // Add other reducers here as needed
});

export default rootReducer;