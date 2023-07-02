import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    clearAuthData: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
    },
  },
});

export const { setUsername, setEmail, setPassword, clearAuthData } =
  authSlice.actions;

export default authSlice.reducer;
