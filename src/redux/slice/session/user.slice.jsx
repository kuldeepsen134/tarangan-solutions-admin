import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/axios";

const initialState = {
  userlistData: {},
  userData: {},
};

export const register = createAsyncThunk(
  "account/register",
  async (params, { rejectWithValue }) => {
    try {
      return await instance.post("/users/register", params);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

export const userList = createAsyncThunk(
  "/users",
  async (params, { rejectWithValue }) => {
    try {
      return await instance.get(`users`);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

// export const userUpdate = createAsyncThunk(
//   "/users/update/id",
//   async (id, { rejectWithValue }) => {
//     try {
//       return await instance.patch(`users/${id}`, console.log("update",id));
//     } catch (error) {
//       return rejectWithValue(error.responce);
//     }
//   }
// );

export const userUpdate = createAsyncThunk(
  "/users/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      return await instance.patch(`users/${id}`, userData);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);


export const userTrush = createAsyncThunk(
  "users/trush",
  async (id, { rejectWithValue }) => {
    try {
      return await instance.delete(`users/${id}` );
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

export const userListById = createAsyncThunk(
  "users/list/id",
  async (id, { rejectWithValue }) => {
    try {
      return await instance.get(`users/${id}` , console.log("listbyid",id));
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userList.pending, (state) => {
        state.loading = false;
        state.userlistData = {};
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.loading = false;
        state.userlistData = action.payload;
      })
      .addCase(userList.rejected, (state) => {
        state.loading = false;
        state.userList = {};
      })
      .addCase(userTrush.pending, (state) => {
        state.loading = false;
        state.userlistData = {};
      })
      .addCase(userTrush.fulfilled, (state, action) => {
        state.loading = false;
        state.userlistData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(userTrush.rejected, (state) => {
        state.loading = false;
        state.userList = {};
      })
      .addCase(userUpdate.pending, (state) => {
        state.loading = false;
        state.userlistData = {};
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.userlistData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(userUpdate.rejected, (state) => {
        state.loading = false;
        state.userList = {};
      })
      // Handle userListById actions
      .addCase(userListById.pending, (state) => {
        state.loading = false;
        state.userlistData = {};
      })
      .addCase(userListById.fulfilled, (state, action) => {
        state.loading = false;
        state.userlistData = action.payload;
      })
      .addCase(userListById.rejected, (state) => {
        state.loading = false;
        state.userList = {};
      });
  },
});

export default userSlice.reducer;
