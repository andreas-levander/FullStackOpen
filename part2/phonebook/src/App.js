import React, {useState, useEffect} from 'react'
import contactsService from './services/contacts'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    contactsService
      .getAll()
      .then(contacts => {
        console.log('promise fulfilled')
        setPersons(contacts)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    
    if (JSON.stringify(persons).includes(JSON.stringify(newName))) {
      const person = persons.filter(person => person.name === newName)[0];

      if(person.number === phonenumber) alert(`${newName} is already added to the phonebook`);

      else if(window.confirm(`${newName} is already added to the phonebook, replace old number with new one?`)) {
        const changedPerson = {...person, number: phonenumber}

        contactsService
        .update(person.id, changedPerson)
        .then(returnedUpdate => {
          console.log(returnedUpdate)
          setPersons(persons.map(person => person.id !== returnedUpdate.id ? person : returnedUpdate))
        })
        .catch(error => {
          console.log(error)
        })
      }
      return;
    }
    
    const data = { name: newName, number: phonenumber, id: persons.length +1 }
    
    contactsService
      .create(data)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact));
        setNewName('');
        setPhoneNumber('');
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deletePerson = id => {
    const name = persons.filter(person => person.id === id)
    
    if(window.confirm(`Do you really wish to delete ${name[0].name} ?`)) {
      contactsService
      .remove(id)
      .then(returned => {
        console.log(`deleted contact `, name[0])
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log(error)
      })
    }
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
      <Persons contactsToShow={contactsToShow} deletePerson={deletePerson} />
    </div>
  )
}

const Persons = ({contactsToShow, deletePerson}) => {
  return (
    contactsToShow.map(person => 
      <div key={person.id}>
      {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
      </div>
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