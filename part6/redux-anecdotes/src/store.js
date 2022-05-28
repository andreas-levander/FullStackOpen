import anecdoteReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: {
    anecdote: anecdoteReducer,
    notif: notifReducer,
    filter: filterReducer
}})

export default store