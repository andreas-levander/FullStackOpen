import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

const AnecdoteForm = ({ createAnecdote, setNotification }) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        createAnecdote(content)

        setNotification(`added new anecdote '${content}'`, 2)
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

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)
