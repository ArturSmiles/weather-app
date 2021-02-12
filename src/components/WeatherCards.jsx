import "./styles/weatherCards.css"
import React, { useState } from 'react'
import { Card, Col,Image } from 'antd';
import WeatherDetail from "./WeatherDetail";

const { Meta } = Card;

function WeatherCards(props) {

    const [detail,setDetail]=useState()
    const [show,setShow]=useState(false)

    function detailLoad(data){
        setDetail(data)
        setShow(true)
    }
    return (
        <> {show ? <WeatherDetail data={detail}/>: props.wData ? props.wData.map((data) => <>
            <Col className="gutter-row" span={8}>
                <Image
                    width={200}
                    src={data.weather[0].main === "Clouds" ? "https://images.pexels.com/photos/3888585/pexels-photo-3888585.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260":
                    data.weather[0].main === "Clear" ? "https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260":
                    data.weather[0].main === "Haze" ? "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260":
                    "https://pyxis.nymag.com/v1/imgs/11f/cc2/28165a08cf31e2f49341c39aee26b6bd01-02-troll-face.2x.rsocial.w600.jpg"
                }
                    preview={false}
                    className="ImageCol"
                    onClick={()=>{detailLoad(data)}}
                    width="200px"
                />
                <p className="cityName">{data.name}</p>
                <p className="tempP">{data.main.temp}°C</p>
                <p className="weatherDesc">{data.weather[0].description}</p>
                <p className="tempMax">Max: {data.main.temp_max}°C</p>
                <p className="tempMin">Min: {data.main.temp_min}°C</p>
            </Col>
            
        </>
        ): <h1>Please add a City</h1>}
            
        </>
    )
}

export default WeatherCards
