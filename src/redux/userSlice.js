import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  selectedOrderId: null,
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
      localStorage.removeItem('persist:user'); // Xóa persisted state user khi logout
      localStorage.removeItem('persist:root'); // Xóa persisted state user khi logout
    },
    setSelectedOrderId: (state, action) => {
      state.selectedOrderId = action.payload;
    },
    clearSelectedOrderId: (state) => {
      state.selectedOrderId = null;
    },
  },
});

export const { setUser, logoutUser, setSelectedOrderId, clearSelectedOrderId } = userSlice.actions;

export default userSlice;
