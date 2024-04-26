import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/axios";

const initialState = {
  categorieslistData: {},
  categoriesList: {},
};

export const addCategories = createAsyncThunk(
  "/categories/register",
  async (params, { rejectWithValue }) => {
    try {
      return await instance.post("/categories", params);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

export const categoriesList = createAsyncThunk(
  "/categories",
  async (params, { rejectWithValue }) => {
    try {
      return await instance.get(`/categories`);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

export const categoriesTrush = createAsyncThunk(
  "categories/trush",
  async (id, { rejectWithValue }) => {
    try {
      return await instance.delete(`categories/${id}`);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);


export const categoriesUpdate = createAsyncThunk(
  "/categories/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      return await instance.patch(`categories/${id}`, userData);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const categoriesListById = createAsyncThunk(
  "categories/list/id",
  async (id, { rejectWithValue }) => {
    try {
      return await instance.get(`categories/${id}` , console.log("listbyid",id));
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoriesList.pending, (state) => {
        state.loading = false;
        state.categorieslistData = {};
      })
      .addCase(categoriesList.fulfilled, (state, action) => {
        state.loading = false;
        state.categorieslistData = action.payload;
      })
      .addCase(categoriesList.rejected, (state) => {
        state.loading = false;
        state.categoriesList = {};
      })
      .addCase(categoriesTrush.pending, (state) => {
        state.loading = false;
        state.categorieslistData = {};
      })
      .addCase(categoriesTrush.fulfilled, (state, action) => {
        state.loading = false;
        state.categorieslistData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(categoriesTrush.rejected, (state) => {
        state.loading = false;
        state.categoriesList = {};
      })
      .addCase(categoriesUpdate.pending, (state) => {
        state.loading = false;
        state.categorieslistData = {};
      })
      .addCase(categoriesUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.categorieslistData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(categoriesUpdate.rejected, (state) => {
        state.loading = false;
        state.categoriesList = {};
      })
      .addCase(categoriesListById.pending, (state) => {
        state.loading = false;
        state.categorieslistData = {};
      })
      .addCase(categoriesListById.fulfilled, (state, action) => {
        state.loading = false;
        state.categorieslistData = action.payload;
      })
      .addCase(categoriesListById.rejected, (state) => {
        state.loading = false;
        state.categoriesList = {};
      });
  },
});

export default categoriesSlice.reducer;
