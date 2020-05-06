import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {

  // Created array with the length of anecdotes array where every value is 0
  const array = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(array)
  
  // Random anecdote
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 6))
  }
  var copy = [...votes]

  // sets the votes into the votes[] array
  const handleVote = () => {
  copy[selected] += 1
  setVotes(copy)
  console.log(copy);
}

// index of the most voted anecdote
const index = votes.indexOf(Math.max(...votes))




  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <p>has {votes[selected]} votes</p>
      </div>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <div>
        <h1>Anecdote with the most votes</h1>
        <p>{props.anecdotes[index]}</p>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)