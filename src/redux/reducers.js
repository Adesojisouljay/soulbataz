import { combineReducers } from 'redux';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import themeReducer from './themeSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  theme: themeReducer,
});

export default rootReducer;
