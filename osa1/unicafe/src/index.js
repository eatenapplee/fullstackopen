import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => (
  <p>{props.text} {props.value}</p>
)

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
      return(
        <table>
          <tbody>
          <tr>
            <td><StatisticsLine text="good" value={props.good} /></td>
          </tr>
          <tr>
            <td><StatisticsLine text="neutral" value={props.neutral} /></td>
          </tr>
          <tr>
            <td><StatisticsLine text="bad" value={props.bad} /></td>
          </tr>
          <tr>
            <td><StatisticsLine text="all" value={props.good + props.bad + props.neutral} /></td>
          </tr>
          <tr>
            <td><StatisticsLine text="average" value={((props.good*1) + (props.bad*-1) + (props.neutral*0)) / (props.good + props.bad + props.neutral)} /></td>
          </tr>
          <tr>
            <td><StatisticsLine text="positive" value={props.good / (props.good + props.bad + props.neutral) * 100 + "%"}  /></td>
          </tr>
          </tbody>
        </table>
      )

  }

}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1);
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleClickBad = () => {
    setBad(bad + 1);
  }



  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleClickGood} text="good" />
        <Button onClick={handleClickNeutral} text="neutral" />
        <Button onClick={handleClickBad} text="bad" />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)