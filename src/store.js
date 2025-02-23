// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/redux/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
