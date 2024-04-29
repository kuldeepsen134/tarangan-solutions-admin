import { configureStore } from "@reduxjs/toolkit";

import sessionSlice from "./slice/session/session.slice";
import userSlice from "./slice/session/user.slice";
import categorySilce from "./slice/session/category.silce";
import productSlice from "./slice/session/product.slice";
import brandSlice from "./slice/brand.slice";



const store = configureStore({
  reducer: {
    session: sessionSlice,
    user: userSlice,
    categories: categorySilce,
    products:productSlice,
    brands:brandSlice,
  },
});
export default store;
