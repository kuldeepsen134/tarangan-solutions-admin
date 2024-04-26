import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/axios";

const initialState = {
  productListData: {},
  productData: {},
};

export const addProduct = createAsyncThunk( "add/products", async (params, { rejectWithValue }) => {
    try {
      return await instance.post("/products", params);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

export const productList = createAsyncThunk( "products", async (params, { rejectWithValue }) => {
    try {
      return await instance.get(`/products`);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

export const productUpdate = createAsyncThunk("products/update", async (id) => {
  try {
    return await instance.patch(`products/:${id}`);
  } catch (error) {
    return error.responce;
  }
});

export const productTrush = createAsyncThunk( "products/trush", async (id, { rejectWithValue }) => {
    try {
      return await instance.delete(`products/${id}`);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

const foodSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productList.pending, (state) => {
        state.loading = false;
        state.productListData = {};
      })
      .addCase(productList.fulfilled, (state, action) => {
        state.loading = false;
        state.productListData = action.payload;
      })
      .addCase(productList.rejected, (state) => {
        state.loading = false;
        state.productListData = {};
      })

      // Handle product Trush actions
      .addCase(productTrush.pending, (state) => {
        state.loading = false;
        state.productData = {};
      })
      .addCase(productTrush.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(productTrush.rejected, (state, action) => {
        state.loading = false;
        state.productData = {};
        toast.success(action.payload.message);
      })

      // Handle foodUpdate actions
      .addCase(productUpdate.pending, (state) => {
        state.loading = false;
        state.productData = {};
      })
      .addCase(productUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(productUpdate.rejected, (state, action) => {
        state.loading = false;
        state.productData = {};
        toast.success(action.payload.message);
      });
  },
});

export default foodSlice.reducer;
