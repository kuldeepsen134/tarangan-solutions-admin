import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/axios";

const initialState = {
  categorieslistData: {},
  categoryData: {},
};


export const addCategories = createAsyncThunk(
  "/categories",
  async (params, { rejectWithValue }) => {
    try {
      return await instance.post("/product-categories", params);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);


export const categoriesList = createAsyncThunk(
  "/categories",
  async (params, { rejectWithValue }) => {
    try {
      return await instance.get(`/product-categories`);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

export const categoriesTrush = createAsyncThunk( "categories/trush", async (id, { rejectWithValue }) => {
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

export const categoriesListById = createAsyncThunk( "categories/list", async (id, { rejectWithValue }) => {
    try {
      return await instance.get(`product-categories/${id}` );
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
        state.categorieslistData = {};
      })


      .addCase(categoriesUpdate.pending, (state) => {
        state.loading = false;
        state.categoryData = {};
      })
      .addCase(categoriesUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(categoriesUpdate.rejected, (state) => {
        state.loading = false;
        state.categoryData = {};
      })


      .addCase(categoriesListById.pending, (state) => {
        state.loading = false;
        state.categoryData = {};
      })
      .addCase(categoriesListById.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = action.payload;
      })
      .addCase(categoriesListById.rejected, (state) => {
        state.loading = false;
        state.categoryData = {};
      })


      .addCase(categoriesTrush.pending, (state) => {
        state.loading = false;
        state.categoryData = {};
      })
      .addCase(categoriesTrush.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(categoriesTrush.rejected, (state) => {
        state.loading = false;
        state.categoryData = {};
      })

  },
});

export default categoriesSlice.reducer;
