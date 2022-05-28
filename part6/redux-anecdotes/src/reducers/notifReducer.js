import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    display: 'none',
    text: null
}
const notifSlice = createSlice({
    name: 'notif',
    initialState,
    reducers: {
        showNotif: (state, action) => ({ display: '', text: action.payload }),
        hideNotif: (state) => initialState

    }
})

export const { showNotif, hideNotif } = notifSlice.actions
export default notifSlice.reducer