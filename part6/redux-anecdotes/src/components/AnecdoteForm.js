import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotif, hideNotif } from '../reducers/notifReducer'
import * as anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        const returnedAnecdote = await anecdoteService.createNew(content)
        dispatch(newAnecdote(returnedAnecdote))

        dispatch(showNotif(`added new anecdote '${content}'`))
        setTimeout(() => dispatch(hideNotif()), 5000)
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input type='text' name='anecdote'/></div>
            <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
