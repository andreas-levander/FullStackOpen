import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0);

  const array = new Array(7).fill(0);
  const [points, setPoints] = useState(array);

  const [mostvotes, setMostvotes] = useState(0);

  const voteClickHandler = () => {
    const newvotes = addvote(points,selected);
    setPoints(newvotes);

    const mostvotesindex = checkvotes(newvotes);
    
    if(mostvotesindex !== mostvotes) setMostvotes(mostvotesindex);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button onClick={voteClickHandler} text="vote"/>
      <Button onClick={() => setSelected(Math.floor(Math.random() * 7))} text="next anecdote"/>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostvotes]}</p>
      <p>has {points[mostvotes]} votes</p>

      
    </div>
  )
}



const addvote = (array, position) => {
  const copy = [ ...array];
  copy[position] += 1;
  return copy;
}

const checkvotes = (array) => {
  let mostvotes_pos = 0;
  let mostvotes_value = 0;
  
  for(let i = 0;i<array.length;i++) {
    
    if(array[i] > mostvotes_value) {
      
      mostvotes_pos = i;
      mostvotes_value = array[i];
    }
  }
  return mostvotes_pos;
}

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)




export default App;
