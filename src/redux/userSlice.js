import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userId: null, // ✅ Thêm userId vào state
  isLoggedIn: false,
  selectedOrderId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload?.id || null; // ✅ Gán userId từ payload (giả sử payload có trường id)
      state.isLoggedIn = true;
    },
    setUserId: (state, action) => {  // ✅ THÊM REDUCER setUserId
      state.userId = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.userId = null; // ✅ Reset userId khi logout
      state.isLoggedIn = false;
      localStorage.removeItem('persist:user'); // Xóa persisted state user khi logout
      localStorage.removeItem('persist:root'); // Xóa persisted state root khi logout
    },
    setSelectedOrderId: (state, action) => {
      state.selectedOrderId = action.payload;
    },
    clearSelectedOrderId: (state) => {
      state.selectedOrderId = null;
    },
  },
});

export const { setUser, setUserId, logoutUser, setSelectedOrderId, clearSelectedOrderId } =
  userSlice.actions;

export default userSlice;