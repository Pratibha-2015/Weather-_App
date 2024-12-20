import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import humidity_icon from '../assets/humidity.png'
 import cloude_icon from '../assets/cloud.png'
 import drizzle_icon from '../assets/drizzle.png'
  import rain_icon from '../assets/rain.png'
 import snow_icon from '../assets/snow.png'
 import wind_icon from '../assets/wind.png'

const Weather = () => {
    const inputRef = useRef();
      const[ weatherData, setweatherData] = useState(false);
      const allicons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloude_icon,
        "02n": cloude_icon,
        "03d": cloude_icon,
        "03n": cloude_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "11d": wind_icon,  // Thunderstorm
        "11n": wind_icon,  // Thunderstorm
        "13d": snow_icon,
        "13n": snow_icon,
        "50d": drizzle_icon,  // Mist
        "50n": drizzle_icon,  // Mist
      };
      
    // to call the API
    const search = async (city)=>{
        if(city===""){
            alert("Enter the city");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            console.log(url);
            const response = await fetch(url);
            //convert this response in Json method
            const data = await response.json();
            console.log (data);
            const icon = allicons[data.weather[0].icon] || clear_icon;
            console.log(data.weather[0].icon); // Check the icon code

            setweatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon,
            })
            } catch (error) {
                setweatherData(false)
                console.log("Error in featchihg data");
            }
    }
    useEffect( ()=>{
  search("mumbai")
    },[])
  return (
    <div className='weather'>
        <div className="search_bar">
<input ref={inputRef} type="text " placeholder='Search' />
<img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
        </div>
        <img src={weatherData.icon} alt=""  className='weather_icon'/>
        <p className='temp'>{weatherData.temperature}°C</p>
        <p className='city-name'>{weatherData.location || 'City'}</p>
        <div className='weather-data'>
        <div className='col'>
        <img src={humidity_icon} alt="" />
         <div >
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
          <div className='col'>
          <img src={wind_icon} alt="" />
          <div >
            <p>{weatherData.windspeed} Km/h</p>
            <span>Wind</span>
          </div>
          </div>
          </div>


        </div>


    </div>
  )
}

export default Weather