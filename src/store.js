/**Created by Parta Cana */

import { configureStore } from "@reduxjs/toolkit";
import fetchUsersReducer from "./slices/fetchUsersSlice";

//creating the redux store
const store = configureStore({
  reducer: {
    users: fetchUsersReducer,
  },
});

export default store;