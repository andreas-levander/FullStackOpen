import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotif, hideNotif } from '../reducers/notifReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))

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
