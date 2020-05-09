import React from 'react';

const Persons = (props) => {

    const filtering = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
    const filtered = filtering.map(pname => <p>{pname.name} {pname.number}</p>)
    const nonFiltered = props.persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)

    return (
        
        <div>
            {props.filter === '' ? nonFiltered : filtered}
        </div>
    );
}

export default Persons;
