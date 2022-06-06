import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    likeBlog: (state, { payload }) =>
      state.map((blog) =>
        blog.id === payload.id ? { ...blog, likes: payload.likes } : blog
      ),
    deleteBlog: (state, { payload }) =>
      state.filter((blog) => blog.id !== payload.id),
    addComment: (state, { payload }) =>
      state.map((blog) =>
        blog.id === payload.id ? { ...blog, comments: payload.comments } : blog
      ),
  },
});

export const { setBlogs, likeBlog, deleteBlog, addComment } =
  blogsSlice.actions;
export default blogsSlice.reducer;
