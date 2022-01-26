import React, {useState, useEffect} from 'react'
import contactsService from './services/contacts'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({message: null})

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
          setNotification({message:`Contact updated: ${returnedUpdate.name}`, type: 'update'})
          setTimeout(() => setNotification({message: null}), 5000)
        })
        .catch(error => {
          setNotification({message:`Contact already deleted: ${person.name}`, type: 'error'})
          setTimeout(() => setNotification({message: null}), 5000)
          setPersons(persons.filter(contact => contact.id !== person.id))
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
        setNotification({message: `New contact added: ${returnedContact.name}`, type: 'add'})
        setTimeout(() => setNotification({message: null}), 5000)
        
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
      <Notification message={notification.message} type={notification.type}/>
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

const Notification = ({ message, type }) => {
  const notifStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,

  }
  if (message === null) {
    return null
  }

  if(type === 'error') notifStyle.color = 'red'

  return (
    <div className='notification' style={notifStyle}>
      {message}
    </div>
  )
}



export default App