import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Filter = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])
    const [buttonClick, setButtonClick] = useState(false)
    const [index, setIndex] = useState(undefined)
    const [weather, setWeather] = useState([])


    useEffect(() => {
        console.log("effect");
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            console.log('promise fulfilled');
            setCountries(response.data)
            
            })

    }, [])


    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleClick = (i) =>{
        setButtonClick(!buttonClick)
        setIndex(i);
        
    }

    const WeatherInfo = (props) => {

        axios.get('http://api.weatherstack.com/current?access_key='+process.env.REACT_APP_API_KEY+'&query='+props.capital)
        .then(response => {
            console.log('weather data pulled');
            setWeather(response.data.current)
            
            })
        return(
            <div>
                <p><b>temperature: </b>{weather.temperature} Celcius</p>
                <img src={weather.weather_icons} alt="WeatherIcon"/>
                <p><b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</p>
            </div>
        )
    }


 

    const results = () => {


        const filtering = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
        const filtered = filtering.map((countryName, i) => <div key={i}>{countryName.name}<button key={i} onClick={() => handleClick(i)}>show</button></div>)
        const languages = filtering.map((countryLanguage) => countryLanguage.languages.map(language => <li key={language.name}>{language.name}</li> ))
        
        const filteredInfo = filtering.map((countryInfo, i) => {
            return(
                <div key={countryInfo.name}>
                <h3>{countryInfo.name}</h3>
                <div>
                    <p>capital: {countryInfo.capital}</p>
                    <p>population: {countryInfo.population}</p>
                </div>
                <div>
                    <h3>Spoken languages</h3>
                    <ul>
                        {languages}
                    </ul>
                </div>
                <img src={countryInfo.flag} alt="flag"/>
                <h3>Weather in {countryInfo.capital}</h3>
                <WeatherInfo capital={countryInfo.capital} />


            </div>

            )
        }

        )

        console.log(filteredInfo);

        if (filtered.length > 10) {
            return <p>Too many matches, specify another filter</p>
        }
        // returns country info if button clicked
        else if (buttonClick === true) { 
            return(
                <div>
                    {filtered}
                    <div>{filteredInfo[index]}</div>
                </div>
            )
            
        }
        // returns search results if there are less than 10 results
        else if (filtered.length < 10 && filtered.length > 1) { 
            return filtered
        }
        // returns country info if search results are down to one
        else if (filtered.length === 1) {
        return(
            <div>
                <div>{filteredInfo}</div>
            </div>

        )
        }
    }



    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange} />
            {results()}
        </div>
    );
}

export default Filter;
