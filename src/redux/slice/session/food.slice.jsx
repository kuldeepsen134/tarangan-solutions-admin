import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../axios/axios";

const initialState = {
  foodlistData: {},
  foodData: {},
};


export const addFood = createAsyncThunk('food/register', async (params, { rejectWithValue }) => {
  try {
    return await instance.post('/food-items', params)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})


export const foodList = createAsyncThunk(
  "food-items",
  async (params, { rejectWithValue }) => {
    try {
      return await instance.get(`/food-items`);
    } catch (error) {
      return rejectWithValue(error.responce);
    }
  }
);

export const foodUpdate = createAsyncThunk('food/update', async (id) => {
  try {
    return await instance.patch(`food-items/:${id}`)
  } catch (error) {
    return (error.responce)
  }
})

export const foodTrush = createAsyncThunk('food/trush', async (id, { rejectWithValue }) => {
  try {
    return await instance.delete(`food-items/${id}`)
  } catch (error) {
    return rejectWithValue(error.responce)
  }
})

const foodSlice = createSlice({
  name: "food",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(foodList.pending, (state) => {
        state.loading = false;
        state.foodlistData = {};
      })
      .addCase(foodList.fulfilled, (state, action) => {
        state.loading = false;
        state.foodlistData = action.payload;
      })
      .addCase(foodList.rejected, (state) => {
        state.loading = false;
        state.foodList = {};
      })
      .addCase(foodTrush.pending, (state) => {
        state.loading = false;
        state.foodlistData = {};
      })
      .addCase(foodTrush.fulfilled, (state, action) => {
        state.loading = false;
        state.foodlistData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(foodTrush.rejected, (state) => {
        state.loading = false;
        state.foodList = {};
      })
      // Handle foodUpdate actions
      .addCase(foodUpdate.pending, (state) => {
        state.loading = false;
        state.foodlistData = {};
      })
      .addCase(foodUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.foodlistData = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(foodUpdate.rejected, (state) => {
        state.loading = false;
        state.foodList = {};
      });
  },
});


export default foodSlice.reducer;
