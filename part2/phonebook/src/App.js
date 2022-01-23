import React, {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    

    if (JSON.stringify(persons).includes(JSON.stringify(newName))) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    
    setPersons(persons.concat({name: newName, number: phonenumber, id: persons.length +1}));
    setNewName('');
    setPhoneNumber('');

  }

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value);
    setFilter(event.target.value);
    
  }

  const contactsToShow = filter.length < 1
    ? persons
    : persons.filter(person => person.name.toString().toLowerCase().includes(filter))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <Personform addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} phonenumber={phonenumber} setPhoneNumber={setPhoneNumber}/>
      <h3>Numbers</h3>
      <Persons contactsToShow={contactsToShow} />
    </div>
  )
}

const Persons = ({contactsToShow}) => {
  return (
    contactsToShow.map(person => 
      <p key={person.name}>{person.name} {person.number}</p>
    )
  )
}

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter with:<input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const Personform = ({addPerson,newName,handleNameChange,phonenumber, setPhoneNumber}) => {
  return (
    <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      phone: <input value={phonenumber} onChange={(event) => setPhoneNumber(event.target.value)}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}



export default App