import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';
import WeatherCards from './components/WeatherCards';

function App() {

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  

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
          setIsLoading(false);
        })
    }
  }, [coords]);


  return (
    
    <div className='container'>
      {
        isLoading ?
          <h2>Loading...</h2>
        :
          <WeatherCards
            weather={weather}
            temp={temp}
          />
    }
    </div>
  )
}

export default App
