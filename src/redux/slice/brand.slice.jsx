import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../axios/axios";

const initialState = {
  brandListData: {},
  brandData: {},
};


export const addBrands = createAsyncThunk(
  "/brands",
  async (params, { rejectWithValue }) => {
    try {
      return await instance.post("/brands", params);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);


export const brandsList = createAsyncThunk(
  "/brands",
  async (params, { rejectWithValue }) => {
    try {
      return await instance.get(`/brands`);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

export const brandsTrush = createAsyncThunk( "brands/trush", async (id, { rejectWithValue }) => {
    try {
      return await instance.delete(`brands/${id}`);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);


export const brandsUpdate = createAsyncThunk(
  "/brands/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      return await instance.patch(`brands/${id}`, userData);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const brandsListById = createAsyncThunk( "brands/list", async (id, { rejectWithValue }) => {
    try {
      return await instance.get(`brands/${id}` );
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

const brandsSlice = createSlice({
  name: "brands",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(brandsList.pending, (state) => {
        state.loading = false;
        state.brandListData = {};
      })
      .addCase(brandsList.fulfilled, (state, action) => {
        state.loading = false;
        state.brandListData = action.payload;
      })
      .addCase(brandsList.rejected, (state) => {
        state.loading = false;
        state.brandListData = {};
      })


      .addCase(brandsUpdate.pending, (state) => {
        state.loading = false;
        state.brandData = {};
      })
      .addCase(brandsUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.brandData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(brandsUpdate.rejected, (state) => {
        state.loading = false;
        state.brandData = {};
      })


      .addCase(brandsListById.pending, (state) => {
        state.loading = false;
        state.brandData = {};
      })
      .addCase(brandsListById.fulfilled, (state, action) => {
        state.loading = false;
        state.brandData = action.payload;
      })
      .addCase(brandsListById.rejected, (state) => {
        state.loading = false;
        state.brandData = {};
      })


      .addCase(brandsTrush.pending, (state) => {
        state.loading = false;
        state.brandData = {};
      })
      .addCase(brandsTrush.fulfilled, (state, action) => {
        state.loading = false;
        state.brandData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(brandsTrush.rejected, (state) => {
        state.loading = false;
        state.brandData = {};
      })

  },
});

export default brandsSlice.reducer;
