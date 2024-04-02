import { useEffect, useState } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");


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
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
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
      });
  }


  let personsToShow = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;
  

  return (
    <div>

      <h2>Phonebook</h2>
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
      />

    </div>
  );
};

export default App;
