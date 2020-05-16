import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import peopleService from './services/people'
import people from './services/people'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  useEffect(() => {
    peopleService.getAll()
    .then(initialPeople => {
      setPersons(initialPeople)
      
    })
    
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    const personExists = persons.some(p => p.name === newName)
    const findPerson = persons.find(p => p.name === newName)
    if (personExists) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one ?`)
      if (result === true) {
        peopleService.update(findPerson.id, nameObject)
          .then(returnedPeople => {
            console.log(returnedPeople)
            console.log(findPerson)
            setPersons(persons.map(p => p.id === findPerson.id ? returnedPeople : p))
          })
      } else {
        return null
      }
    } else {
      peopleService.create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

    }

  }

  const handleDelete = (id) => {
    console.log(id);
    const findPerson = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${findPerson.name} ?`)
    if (result === true) {
      peopleService.remove(id)
      .then(filteredPeople => {
        console.log('removed')
        setPersons(persons.filter(p => p.id !== id))
      })
    } else {
      return null
    }


  }

  const handleUpdate = (id) => {
    console.log(id);


    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={handleSubmit} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handleDelete={handleDelete} />
    </div>
  )

}

export default App