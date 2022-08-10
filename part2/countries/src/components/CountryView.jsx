import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryView = ({ country }) => {
	const [weather, setWeather] = useState({})
	const [loading, setLoading] = useState(true)

	const API_KEY = process.env.REACT_APP_API_KEY
	const LATITUDE = country.capitalInfo.latlng[0]
	const LONGITUDE = country.capitalInfo.latlng[1]

	useEffect(() => {
		const requestQuery = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric
		`

		axios.get(requestQuery).then((res) => {
			console.log(res.data)
			setWeather(res.data)
			setLoading(false)
		})
	}, [])

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>capital {country.capital}</div>
			<div>area {country.area}</div>
			<h3>languages:</h3>
			<ul>
				{Object.values(country.languages).map((lang) => (
					<li key={lang}>{lang}</li>
				))}
			</ul>
			<img src={country.flags.png} alt="flag" />
			<h2>Weather in {country.capital}</h2>
			{loading ? (
				<></>
			) : (
				<>
					<div>temperature {weather.main.temp} Celcius</div>
					<img
						src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt="weather icon"
					/>
					<div>wind {weather.wind.speed} m/s</div>
				</>
			)}
		</div>
	)
}

export default CountryView
