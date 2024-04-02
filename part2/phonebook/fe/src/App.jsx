import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";


const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");


  const handleSubmit = (e) => { 
    e.preventDefault();

    if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) { 
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    setPersons([...persons, {
      name: newName,
      number: newNumber,
    }]);
    setNewName("");
    setNewNumber("");
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
