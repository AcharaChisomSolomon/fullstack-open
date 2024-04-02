import { useState, useEffect } from 'react';
import axios from 'axios';
import SingleDisplay from './components/SingleDisplay';
import MultipleCountries from './components/MultipleCountries';

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState('')


  useEffect(() => { 
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data.map((country, index) => ({
          ...country,
          id: index,
          toBeShown: false
        })))
      })
  }, [])


  const handleDisplay = (id) => { 
    let country = filteredCountries.find(country => country.id === id)
    let newCountry = { ...country, toBeShown: !country.toBeShown }

    setFilteredCountries(filteredCountries.map(country => country.id !== id ? {...country, toBeShown: false} : newCountry))
  }


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }


  let display = null
  if (countries) {
    if (filteredCountries.length > 10) {
      display = <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      display = <SingleDisplay country={country} />
    } else {
      display = <MultipleCountries
        handleDisplay={handleDisplay}
        countries={filteredCountries} />
    }
  }


  return (
    <div>
      <div>
        find countries: <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        {display}
      </div>
    </div>
  );
}

export default App;