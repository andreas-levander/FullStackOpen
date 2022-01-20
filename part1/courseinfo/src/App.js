import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts:  [
    {
      name: 'Fundamentals of React',
      exercises: 10
    }, 
    {
      name: 'Using props to pass data',
      exercises: 7
    }, 
    {
      name: 'State of a component',
      exercises: 14
    } 
  ]
}
 

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
     
    </div>
  )
}

const Header = ({course}) => {
  const {name} = course;

  console.log(name);
  return (
  <div>
    <h1>{name}</h1>
  </div>
  )
}

const Content = ({parts}) => {
  //console.log(parts[0]);
  return (
    <div>
      <Part parts={parts[0]}/>
      <Part parts={parts[1]}/>
      <Part parts={parts[2]}/>
    </div>
  )
}

const Part = ({parts}) => {
  const {name,exercises} = parts;
  return (
  <div>
    <p>{name} {exercises}</p>
  </div>
  )
}

const Total = ({parts}) => {
  console.log(parts);
  return (
  <div>
    <p>Number of exercises {parts[0].exercises + parts[1].exercises  + parts[2].exercises }</p>
  </div>
  )
}

export default App