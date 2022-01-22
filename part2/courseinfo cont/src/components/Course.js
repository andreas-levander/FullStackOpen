import React from "react";

const Course = ({course})  => {
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
  
    //console.log(name);
    return (
    <div>
      <h1>{name}</h1>
    </div>
    )
  }
  
  const Content = ({parts}) => {
    //console.log(parts[0]);
    return (parts.map(part => 
      <Part key={part.id} parts={part} />
      ));
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
    const total = parts.reduce((sum, {exercises}) => sum + exercises, 0);
    
    return (<p><b>total of {total} exercises</b></p>)
  }

  export default Course;