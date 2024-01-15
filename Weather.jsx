import React, { useState } from 'react';
import './Weather.css';

const api = {
    key: "0b77ce0e5abbf66fd2eb148b36a3bd92",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query, setquery] = useState('');
    const [weather, setweather] = useState({});
    const DateBuilder = (d) => {
        let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`
    }
    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setweather(result);
                    setquery('');
                    console.log(result);
                })
        }
    }
    return (
        <div>
            <div className='search'>
                <input type="text" className='search-bar' placeholder='Search...' value={query} onChange={e => setquery(e.target.value)} onKeyPress={search} />
            </div>
            {(typeof weather.main != "undefined") ? (
            <div className='location-box'>
                <div className="location">
                    {weather.name},{weather.sys.country}
                    <div className="date">
                        {DateBuilder(new Date())}
                    </div>
                </div>
                <div className="weather-box">
                    <div className="temp">
                        {Math.round(weather.main.temp)}°C
                    </div>
                    <div className="report">
                        {weather.weather[0].main}
                    </div>
                </div>
            </div>
            ):('')}
        </div>
    )
}

export default Weather