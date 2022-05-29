import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    display: 'none',
    text: null,
    lastcalled: undefined
}
const notifSlice = createSlice({
    name: 'notif',
    initialState,
    reducers: {
        showNotif: (state, { payload }) => ({ display: '', text: payload.message, lastcalled: payload.lastcalled }),
        hideNotif: (state) => initialState,
        cancelTimeout(state) { clearTimeout(state.lastcalled) }
    }
})

export const setNotification = (message, timeout) => {
    return dispatch => {
      dispatch(cancelTimeout())
      const lastcalled = setTimeout(() => dispatch(hideNotif()), timeout * 1000)
      dispatch(showNotif({message, lastcalled}))
    }
  }

export const { showNotif, hideNotif, cancelTimeout } = notifSlice.actions
export default notifSlice.reducer