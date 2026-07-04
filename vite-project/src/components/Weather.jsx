import React, {useEffect,useRef,useState} from 'react'
import "./Weather.css"
import search_icon from "../assets/search.png"
import cloudy_icon from "../assets/cloudy.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rainy_icon from "../assets/rainy.png"
import snow_icon from "../assets/snow.png"
import sun_icon from "../assets/sun.png"
import wind_icon from "../assets/wind.png"

const Weather = () => {
    const inputRef =useRef()
    const [WeatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": sun_icon,
        "01n": sun_icon,
        "02d": cloudy_icon,
        "02n": cloudy_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rainy_icon,
        "09n": rainy_icon,
        "10d": rainy_icon,
        "10n": rainy_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        
      
    };

    const search = async (city) => {
        if(city===""){
            alert("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok) {
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || sun_icon;
            setWeatherData({
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });


        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching weather data:", error);
            
        }
    }

    useEffect(() => {
        search("London");
    },[])

  return (
    <div className="weather">
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="search" />
            <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
          
        </div>

        {WeatherData?<>
        <img src={WeatherData.icon} alt="" className="weather-icon" />
      <p className="temperature">{WeatherData.temperature}°C</p>
        <p className="location">{WeatherData.location}</p>
        <div className="weather-data">
  <div className="col">
    <img src={humidity_icon} alt="" />
    <div>
      <p>{WeatherData.humidity} %</p>
      <span>Humidity</span>
    </div>
  </div>
  
  

  <div className="col">
    <img src={wind_icon} alt="" />
    <div>
      <p>{WeatherData.wind_speed} km/h</p>
      <span>Wind Speed</span>
    </div>
  </div>
  </div>
  
        </>:<></>}

  
</div>


    
  )
}

export default Weather
