// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage
import userSlice from '../src/redux/userSlice';
/// Cấu hình persist cho toàn bộ store
const persistConfig = {
  key: 'root', // key cho persisted state của toàn bộ store
  storage, // Chọn storage (localStorage)
  whitelist: ['user'], // Chỉ lưu trữ reducer 'user' vào localStorage
};

// Tạo persisted reducer cho toàn bộ store (bao gồm user và các reducer khác nếu có)
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

// Tạo store Redux với persistedReducer
export const store = configureStore({
  reducer: {
    user: persistedReducer, // Sử dụng persistedReducer cho user
  },
});

// Tạo persistor để quản lý việc lưu trữ và phục hồi state
export const persistor = persistStore(store);