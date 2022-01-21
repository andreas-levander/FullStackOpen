import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;

  return (
    <div>
      <h1>give feedback</h1>
      <br />
      <Button onClick={() => setGood(good +1)} text="good"/>
      <Button onClick={() => setNeutral(neutral +1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <br />
      
      <Statistics all={all} good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const StatisticLine = (props) => (
  <tr><td>{props.text}</td><td>{props.value}</td><td>{props.text2}</td></tr>
)

const Statistics = ({all,good,bad,neutral}) => {
  if (all === 0) return <p>No feedback given</p>
  return (
    <div>
      <h1>statistics</h1>
      <table>
      <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={(good - bad)/all}/>
      <StatisticLine text="positive" value={good/all * 100} text2="%"/>
      </tbody>
      </table>
    </div>
  )
}


export default App;
