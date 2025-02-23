// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Thông tin người dùng, ban đầu là null
  isLoggedIn: false, // Trạng thái đăng nhập, ban đầu là false
  selectedOrderId: null, // ID đơn hàng được chọn, ban đầu là null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setSelectedOrderId: (state, action) => {
      state.selectedOrderId = action.payload; // Cập nhật selectedOrderId
    },
    clearSelectedOrderId: (state) => {
      state.selectedOrderId = null; // Xóa selectedOrderId khi cần thiết
    },
  },
});

export const { setUser, logoutUser, setSelectedOrderId, clearSelectedOrderId } = userSlice.actions;

export default userSlice.reducer;
