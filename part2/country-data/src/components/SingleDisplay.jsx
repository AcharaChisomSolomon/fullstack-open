import { useState, useEffect } from 'react';
import axios from 'axios';
const api_key = import.meta.env.VITE_SOME_KEY

const SingleDisplay = ({ country }) => { 
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&APPID=${api_key}`
          )
          .then((response) => {
            setWeather(response.data);
          });
    }, [country.capital[0]])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital: {country.capital[0]}</div>
            <div>area: {country.area}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common} width="200" />

            {weather && (
                <div>
                    <h2>Weather in {country.capital[0]}</h2>
                    <div>temperature: {(weather.main.temp - 273.15).toFixed(2)} Celsius</div>
                    <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
                    <div>wind: {weather.wind.speed} m/s</div>
                </div>
            )}
        </div>
    )
}

export default SingleDisplay;