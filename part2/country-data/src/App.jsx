import { useState, useEffect } from 'react';
import axios from 'axios';
import SingleDisplay from './components/SingleDisplay';
import MultipleCountries from './components/MultipleCountries';

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')


  useEffect(() => { 
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  let display = null
  if (countries) {
    let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

    if (filteredCountries.length > 10) {
      display = <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      display = <SingleDisplay country={country} />
    } else {
      display = <MultipleCountries countries={filteredCountries} />
    }
  }


  return (
    <div>
      <div>
        find countries: <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
      <div>
        {display}
      </div>
    </div>
  );
}

export default App;