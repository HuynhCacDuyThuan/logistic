import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage

// Cấu hình persist
const persistConfig = {
  key: 'user', // key cho persisted state
  storage, // lưu trữ trong localStorage
};

// Trạng thái ban đầu
const initialState = {
  user: null, // Đảm bảo rằng user ban đầu là null
  isLoggedIn: false, // Trạng thái đăng nhập ban đầu là false
  selectedOrderId: null, // ID đơn hàng đã chọn ban đầu là null
};

// Khai báo slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Lưu người dùng vào state
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      // Đặt lại thông tin người dùng khi logout
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('persist:root'); // Xóa persisted state khi logout
    },
    setSelectedOrderId: (state, action) => {
      state.selectedOrderId = action.payload;
    },
    clearSelectedOrderId: (state) => {
      state.selectedOrderId = null;
    },
  },
});

// Export actions
export const { setUser, logoutUser, setSelectedOrderId, clearSelectedOrderId } = userSlice.actions;

// Lấy persisted reducer
const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export default persistedUserReducer;
