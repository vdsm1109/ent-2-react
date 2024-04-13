import axios from 'axios';
import React, { useRef, useState } from 'react'
import './Style/SearchBar.css';

const SearchBar = ({setWeather, setErrorInfo}) => {

    const [search, setSearch] = useState('');
    const formRef = useRef(); 

    const handleSearch = (e) => {
        e?.preventDefault();
        const apiKey =
        'fb4d161e34db82bee6e5a07cd36ad7bb';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;
        axios.get(url)
        .then (res => {
            if (search.trim() !== '') {
                setWeather(res.data);
                setErrorInfo(null);
                formRef.current.reset();
            }
        })
        .catch(err => {
            console.error('Location not found 🙈', err);
            if (err.response && err.response.status === 404) {
                    setErrorInfo('City name is not valid 🙈');
            }else {
                setErrorInfo('error');
            }
            formRef.current.reset();
        })

    }

    const handleInputChange = e => {
        setSearch(e.target.value.toLowerCase().trim());
    }

  return (
    <form onSubmit={handleSearch} ref={formRef}>
      <input className='input__search' type="text" placeholder='Search Location' onChange={handleInputChange}/>
      <button className='Btn__search' onClick={handleSearch}>Search</button>
    </form>
  )
}

export default SearchBar
