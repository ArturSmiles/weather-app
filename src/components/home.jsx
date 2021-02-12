import "./styles/home.css"
import React,{useState,useEffect} from 'react'
import { Input, Space,Row, Col } from 'antd';
import WeatherCards from './WeatherCards';

const { Search } = Input;

function Home() {
    const [sCity,setSCity] = useState()
    const [wData,setWData] = useState([])

     useEffect(async ()=>{
         if(sCity){
             const weatherRes = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${sCity}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
             const weatherData = await weatherRes.json()
             if(weatherData.cod === "404"){
                 alert(weatherData.message)
             }else{
                 setWData([...wData,weatherData])
             }
         }
    },[sCity])

    function citySearch(event){
        setSCity(event)
    }

    return (
        <div className="home">
            <Search className="CitySearch" placeholder="Add a City" onSearch={citySearch}  enterButton />
            <Row>
                {sCity ? <WeatherCards wData={wData} gutter={16}/>:<h1 className="HomeText">Please add a City!</h1>}
            </Row>
        </div>
    )
}

export default Home
