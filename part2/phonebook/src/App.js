import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [query, setQuery] = useState('')

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((res) => {
			setPersons(res.data)
		})
	}, [])

	const personsToShow = persons.filter((person) => {
		return (
			person.name.toLowerCase().includes(query) || person.number.includes(query)
		)
	})

	console.log(personsToShow)

	const handleNameChange = (e) => {
		setNewName(e.target.value)
	}

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value)
	}

	const handleQueryChange = (e) => {
		setQuery(e.target.value.toLowerCase())
	}

	const addPerson = (e) => {
		e.preventDefault()

		if (persons.some((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
			return
		}

		if (persons.some((person) => person.number === newNumber)) {
			alert(`${newNumber} is already added to phonebook`)
			return
		}

		const id = persons.length + 1

		const newPerson = { name: newName, number: newNumber, id }
		setPersons(persons.concat(newPerson))
		setNewName('')
		setNewNumber('')
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter query={query} handleQueryChange={handleQueryChange} />

			<h3>add a new</h3>
			<PersonForm
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
				addPerson={addPerson}
			/>
			<h3>Numbers</h3>
			<Persons personsToShow={personsToShow} />
		</div>
	)
}

export default App
