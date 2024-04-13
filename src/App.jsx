import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';
import WeatherCards from './components/WeatherCards';
import SearchBar from './components/SearchBar';

function App() {

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000);
    return () => clearTimeout(timer);
  }, [])

  const success = (pos) => {
    console.log(pos);
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    }
    setCoords(obj);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  
  useEffect(() => {
    if (coords) {
      const apiKey =
      'fb4d161e34db82bee6e5a07cd36ad7bb';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;
      axios.get(url)
        .then (res => {
          const cel = (res.data.main.temp - 272.15).toFixed(1);
          const fah = (cel * 9/5 + 32).toFixed(1);
          setTemp({cel,fah});          
          setWeather((res.data));
          })
        
        .catch(err => console.log(err))
        .finally(() => {
          // setIsLoading(false);
        })
    }
  }, [coords]);


  return (
    
    <div className='container'>
      {
        isLoading ?
          <img src='/assets/loadingimg.gif' alt="load" />
        :
        errorInfo ?
        <div>
        <h2 className='error__info'>{errorInfo}</h2>
        <SearchBar 
          setWeather={setWeather}
          setErrorInfo={setErrorInfo}
        />
        </div>
        :

        <div>
        <WeatherCards
        weather={weather}
        temp={temp}
        />
        <SearchBar 
          setWeather={setWeather}
          setErrorInfo={setErrorInfo}
        />
        </div>
      }
    </div>
  )
}

export default App
