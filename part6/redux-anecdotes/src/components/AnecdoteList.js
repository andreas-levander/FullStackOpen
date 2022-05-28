import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotif, hideNotif } from '../reducers/notifReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdote }) => {
        if(filter === '') return anecdote
        else {
            return anecdote.filter(a => a.content.includes(filter))
        }
    })
    const dispatch = useDispatch()

    const handleVote = (anecdote) => {
        dispatch(addVote(anecdote.id))
        dispatch(showNotif(`you voted '${anecdote.content}'`))
        setTimeout(() => dispatch(hideNotif()), 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
        </div>
      )}
      </div>
    )
}

export default AnecdoteList