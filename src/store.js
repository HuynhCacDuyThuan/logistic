// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage
import persistedUserReducer from '../src/redux/userSlice';
// Cấu hình persist
const persistConfig = {
  key: 'root', // Tên key trong storage
  storage, // Chọn storage (localStorage)
  whitelist: ['user'], // Chỉ lưu trữ reducer 'user' vào localStorage
};

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, persistedUserReducer);

// Tạo store Redux
export const store = configureStore({
  reducer: {
    user: persistedReducer, // Sử dụng persistedReducer cho user
  },
});

// Tạo persistor để quản lý việc lưu trữ và phục hồi state
export const persistor = persistStore(store);