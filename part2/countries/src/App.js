import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
	const [countries, setCountries] = useState([])
	const [query, setQuery] = useState('')
	const [selectedCountry, setSelectedCountry] = useState()

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all', {}).then((res) => {
			setCountries(res.data)
		})
	}, [])

	const handleQueryChange = (e) => {
		setQuery(e.target.value.toLowerCase())
		setSelectedCountry()
	}

	const filteredCountries = countries.filter(
		(country) =>
			country.name.common.toLowerCase().includes(query) ||
			country.name.official.toLowerCase().includes(query)
	)

	return (
		<>
			<Filter
				query={query}
				setQuery={setQuery}
				handleQueryChange={handleQueryChange}
			/>
			<Countries
				countries={filteredCountries}
				selectedCountry={selectedCountry}
				setSelectedCountry={setSelectedCountry}
			/>
		</>
	)
}

export default App
