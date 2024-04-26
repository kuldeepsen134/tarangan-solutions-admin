import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/axios";

const initialState = {
  loading: false,
  loggedInUser: {},
  isUserLoggedIn: document.cookie ? true : false,
};

export const login = createAsyncThunk(
  "account/login",
  async (params, { rejectWithValue }) => {
    try {
      return await instance.post("/login", params, { withCredentials: true });
    } catch (error) {
      return rejectWithValue(error.response); 
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isUserLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isUserLoggedIn = true;
        state.loggedInUser = action.payload;
        localStorage.setItem("token", action.payload.data.token);
        toast.success(action.payload.message);
        console.log("Login successful. Result:", action.payload);
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.isUserLoggedIn = false;
      });
  },
});

export default sessionSlice.reducer;
