import { useEffect, useState } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);


  useEffect(() => { 
    personService
      .getAll()
      .then((initialPersons) => { 
        setPersons(initialPersons);
      });
  }, []);


  const handleSubmit = (e) => { 
    e.preventDefault();

    if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) { 
      let person = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) { 
        personService
          .update(person.id, { ...person, number: newNumber })
          .then((returnedPerson) => { 
            setPersons(persons.map((person) => (person.id !== returnedPerson.id ? person : returnedPerson)));
            setNewName("");
            setNewNumber("");
            setNotification({ type: "success", message: `Updated ${returnedPerson.name}` });
            setTimeout(() => { 
              setNotification(null);
            }, 5000);
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then((returnedPerson) => { 
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotification({ type: "success", message: `Added ${returnedPerson.name}` });
        setTimeout(() => { 
          setNotification(null);
        }, 5000);
      });
  }


  let personsToShow = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;
  
  
  const handleDelete = (id) => { 
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) { 
      personService
        .remove(id)
        .then(() => { 
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  }
  

  return (
    <div>

      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter
        filter={filter}
        setFilter={setFilter}
      />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons
        persons={personsToShow}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default App;
