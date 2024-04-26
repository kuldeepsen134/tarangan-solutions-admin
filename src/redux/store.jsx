import { configureStore } from "@reduxjs/toolkit";

import sessionSlice from "./slice/session/session.slice";
import userSlice from "./slice/session/user.slice";
import categorySilce from "./slice/session/category.silce";

const store = configureStore({
  reducer: {
    session: sessionSlice,
    user: userSlice,
    categories: categorySilce,
  },
});
export default store;
