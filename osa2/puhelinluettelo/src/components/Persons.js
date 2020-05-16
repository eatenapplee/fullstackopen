import React from 'react';


const Persons = (props) => {


    const filtering = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
    const filtered = filtering.map(person => <div key={person.name}>{person.name} &nbsp; {person.number} &nbsp; <button onClick={props.handleDelete}>delete</button></div>)
    const nonFiltered = props.persons.map(person => <div key={person.name}>{person.name} &nbsp; {person.number} &nbsp; <button onClick={() => props.handleDelete(person.id)}>delete</button></div>)
    return (
        
        <div>
            {props.filter === '' ? nonFiltered : filtered}
        </div>
    );
}

export default Persons;
