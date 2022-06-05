import notifReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import userStatsReducer from "./reducers/userStatsReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notif: notifReducer,
    blogs: blogsReducer,
    user: userReducer,
    userStats: userStatsReducer,
  },
});

export default store;
