import React from 'react';

const Course = (props) => {
    const course = props.course
    const Content = (props) => {
        return(
          <div>
            <Part part={props.part} exercises={props.exercises} />
          </div>
        )
      }

    const content = course.parts.map((part) => <Content key={part.id} part={part.name} exercises={part.exercises}/>)

    const Header = (props) => {
      return(
        <div>
          <h1>{props.course}</h1>
        </div>
      )
    }
    
    const Part = (props) => {
      return(
        <div>
          <p>{props.part} {props.exercises}</p>
        </div>
      )
    }
    

    
    const Total = (props) => {
      const total = props.parts.reduce((previousValue, currentValue) =>  previousValue + currentValue.exercises, 0)
      return(
        <div>
          <p><b>total of {total} exercises</b></p>
        </div>
      )
    }
  
    return(
      <div>
        <Header course={course.name} />
        {content}
        <Total parts={course.parts} exercises={content.exercises} />
      </div>
    )
  }

export default Course;
