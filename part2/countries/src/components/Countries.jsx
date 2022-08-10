import React from 'react'
import CountryView from './CountryView'

const Countries = ({ countries, selectedCountry, setSelectedCountry }) => {
	if (selectedCountry) {
		return <CountryView country={selectedCountry} />
	}
	if (countries.length === 1) {
		return <CountryView country={countries[0]} />
	}
	if (countries.length > 10) {
		return <div>Too many matches, specify another filter</div>
	}
	return (
		<div>
			{countries.map((country) => (
				<div key={country.name.common}>
					{country.name.common}
					 <button type="button" onClick={() => setSelectedCountry(country)}>
						show
					</button>
				</div>
			))}
		</div>
	)
}

export default Countries
