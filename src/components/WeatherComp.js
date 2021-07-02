import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import publicIp from "public-ip";

const WeatherComp = () => {
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [city, setCity] = useState('')

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: '0ea8240e9467267702d423384b1e4033',
        lat: lat,
        lon: lon,
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });

    useEffect(() => {
        getLocation()
        getCity()
    }, [])

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            setLon(position.coords.longitude)
            setLat(position.coords.latitude)
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }

    const getCity = async () => {
        try {
            const ACCESS_KEY = '9fc369a1a3b3e44c5999fa2f15298c91';
            let IP = await publicIp.v4()
            const url = `http://api.ipstack.com/${IP}?access_key=${ACCESS_KEY}`;
            let res = await axios.get(url)
            console.log(res.data.city)
            setCity(res.data.city)
        } catch (error) {
            console.log("error", error)
        }
    }
    return (
        <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            locationLabel={city}
            unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
            showForecast
        />
    );
}

export default WeatherComp;