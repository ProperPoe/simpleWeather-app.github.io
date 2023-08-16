import React, { useEffect, useState } from 'react'
import './App.css'

const page = Math.floor(Math.random() * 20) + 1


export default function Weather() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("Colorado Springs");
  const [bg, setBg] = useState("");
  //const [backState, setBackState] = useState("");
  const [search, setSearch] = useState("");
  const [photo, setPhoto] = useState("Colorado Springs")

  console.log(page)
 

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.REACT_APP_WEATHER}`)
      .then(resp => resp.json())
      .then(data => {
        setWeather(data)
      }
  )}, [city])


  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(search);
  }

  const handleClick = () => {
    setPhoto(search)
  }

  useEffect(() => {
    fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${photo}&client_id=${process.env.REACT_APP_BG_PIC}`)
      .then(res => res.json())
      .then(pics => {
        if(photo === "Colorado Springs"){
          setBg(pics.results[Math.floor(Math.random() * 9) + 1].urls.raw)
        }else if(photo == search){
          setBg(pics.results[Math.floor(Math.random() * 9) + 1].urls.raw) 
        }
        console.log(pics)
      })
  }, [photo])

  return (
    <div className='weather'  >
      <div className='background' style={ { backgroundImage: `url('${bg}')`} }>
        <div className='card-container'>
        <div className='card'>
        <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='search'/>
        <button className='btn-weather' onClick={handleClick} type='submit'>Search</button>
        </form>
        <div className='weather--display'>
          <div>City: {weather.name}</div>
          <div>Temp: {weather.main && Math.round(weather.main.temp)}℉</div>
          <div>Conditions: {weather.weather && weather.weather[0].main}</div>
        </div>
      </div>
        </div>
      
      </div>
      
    </div>
  )
}
