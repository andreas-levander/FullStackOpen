import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdote }) => {
        if(filter === '') return anecdote
        else {
            return anecdote.filter(a => a.content.includes(filter))
        }
    })
    const dispatch = useDispatch()

    const handleVote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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