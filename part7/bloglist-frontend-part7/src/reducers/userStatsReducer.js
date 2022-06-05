import { createSlice } from "@reduxjs/toolkit";

const userStatsSlice = createSlice({
  name: "userstats",
  initialState: [],
  reducers: {
    setUserStats: (state, action) =>
      action.payload.map((user) => ({
        name: user.name,
        created: user.blogs.length,
      })),
  },
});

export const { setUserStats } = userStatsSlice.actions;
export default userStatsSlice.reducer;
