import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display: "none",
  text: null,
  lastcalled: undefined,
  type: "error",
};
const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    showNotif: (state, { payload }) => ({
      display: "",
      text: payload.message,
      lastcalled: payload.lastcalled,
      type: payload.type,
    }),
    hideNotif: () => initialState,
    cancelTimeout(state) {
      clearTimeout(state.lastcalled);
    },
  },
});

export const setNotification = (message, type, timeout) => {
  return (dispatch) => {
    dispatch(cancelTimeout());
    const lastcalled = setTimeout(() => dispatch(hideNotif()), timeout * 1000);
    dispatch(showNotif({ message, type, lastcalled }));
  };
};

export const { showNotif, hideNotif, cancelTimeout } = notifSlice.actions;
export default notifSlice.reducer;
