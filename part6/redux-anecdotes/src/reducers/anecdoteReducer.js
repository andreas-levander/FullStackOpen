import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote: (state, action) => state.map(anecdote => 
      anecdote.id === action.payload 
      ? { ...anecdote, votes: anecdote.votes + 1 } 
      : anecdote
      ).sort((a, b) => b.votes - a.votes),
    newAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => action.payload
  }

})
export const { addVote, newAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer