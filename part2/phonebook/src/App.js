import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [query, setQuery] = useState('')

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
