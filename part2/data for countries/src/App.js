import React, {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});




  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        //console.log(response.data)
        setCountries(response.data);
      })
  }, [])

  const handleFilterChange = (event) => {
    //console.log(event.target.value);
    setFilter(event.target.value);
  }

  const countriesToShow = countries.filter(country => 
    country.name.common.toString().toLowerCase().includes(filter.toLocaleLowerCase()));

  
  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries  showCountries={countriesToShow} setFilter={setFilter} weather={weather} setWeather={setWeather}/>
    </div>
  )
}

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter with:<input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const Countries = ({showCountries, setFilter, weather, setWeather}) => {
  if(showCountries.length > 10) return (<p>Too many matches, be more specific</p>)

  if (showCountries.length === 1) {
    const country = showCountries[0];

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt='country flag'/>
        <Weather city={country.capital} weather={weather} setWeather={setWeather}/>
      </div>
    )
  }
  return (
      showCountries.map(country => 
      <div key={country.name.common}>
        {country.name.common} <button onClick={() => setFilter(country.name.common)}>Show</button>
      </div>
      )    
  )
}

const Weather = ({city, weather, setWeather}) => {

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data);
        
      })
  }, [city, setWeather])
  
  if(Object.keys(weather).length < 1) return <p>no weather data</p>
  return (
  <div>
    <h3>Weather in {city}</h3>
    <p>temperature: {Math.floor(weather.main.temp - 273.15)} degrees</p>
    <p>{weather.weather[0].main}</p>
    <p>wind: {weather.wind.speed} mph</p>
  </div>)
}




export default App