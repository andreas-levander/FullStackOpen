import { createSlice } from "@reduxjs/toolkit"
import * as anecdoteService from '../services/anecdotes'

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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort((a, b) => b.votes - a.votes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newanecdote = await anecdoteService.createNew(content)
    dispatch(newAnecdote(newanecdote))
  }
}

export const voteForAnecdote = content => {
  return async dispatch => {
    await anecdoteService.addVote(content)
    dispatch(addVote(content.id))
  }
}

export default anecdoteSlice.reducer