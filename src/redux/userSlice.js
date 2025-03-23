import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userId: null, 
  isLoggedIn: false,
  selectedOrderId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload?.id || null; 
      state.isLoggedIn = true;
    },
    setUserId: (state, action) => {  
      state.userId = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.userId = null; //
      state.isLoggedIn = false;
      localStorage.removeItem('persist:user'); 
      localStorage.removeItem('persist:root'); 
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