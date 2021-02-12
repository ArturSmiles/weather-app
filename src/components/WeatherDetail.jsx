import React, { useEffect, useState } from 'react'
import { Card, Col,Image,Row } from 'antd';

function WeatherDetail(props) {
    const [detail,setDetail] = useState(props.data)


    useEffect(async ()=>{
        console.log(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${props.data.name}&cnt=7&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
        const wDetailRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.data.coord.lat}&lon=${props.data.coord.lon}&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
        const wDetailData = await wDetailRes.json()
        setDetail(wDetailData)
    },[detail])
    return (
        <>
            <h1 className="HomeText">{props.data.name}</h1>
        <Row>
            {detail.daily && detail.daily.map((data,index)=>
                <Col className="gutter-row" span={8}>
                <Image
                    width={200}
                    src={data.weather[0].main === "Clouds" ? "https://images.pexels.com/photos/3888585/pexels-photo-3888585.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260":
                    data.weather[0].main === "Clear" ? "https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260":
                    data.weather[0].main === "Haze" ? "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260":
                    data.weather[0].main === "Snow" ? "https://images.pexels.com/photos/773953/pexels-photo-773953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260":
                    "https://pyxis.nymag.com/v1/imgs/11f/cc2/28165a08cf31e2f49341c39aee26b6bd01-02-troll-face.2x.rsocial.w600.jpg"
                }
                    preview={false}
                    className="ImageCol"
                    width="200px"
                />
                <p className="cityName">Day {index + 1}</p>
                <p className="tempP">{data.temp.day}°C</p>
                <p className="weatherDesc">{data.weather[0].description}</p>
                <p className="tempMax">Max: {data.temp.max}°C</p>
                <p className="tempMin">Min: {data.temp.min}°C</p>
            </Col>
            )
            
            }
        </Row>
        </>
    )
}

export default WeatherDetail
