import SingleDisplay from "./SingleDisplay"

const MultipleCountries = ({ countries, handleDisplay }) => { 
    return (
        <ul>
            {countries.map(country => {
                if (country.toBeShown) {
                    return (
                        <SingleDisplay key={country.id} country={country} />
                    )
                }
                return (
                    <li key={country.id}>
                        {country.name.common}
                        <button onClick={() => handleDisplay(country.id)}>show</button>
                    </li>
                )
            })}
        </ul>
    )
}


export default MultipleCountries;