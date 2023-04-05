import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', email: '' },
  reducers: {
    login: (state) => {
      return {
        name: 'Thet',
        email: 'thet@gmail.com'
      }

    },
    logout: (state) => {
      state = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
