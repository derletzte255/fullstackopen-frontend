import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [query, setQuery] = useState('')
	const [personsToShow, setPersonsToShow] = useState([])

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons)
		})
	}, [])

	useEffect(() => {
		setPersonsToShow(
			persons.filter((person) => {
				return (
					person.name.toLowerCase().includes(query) ||
					person.number.includes(query)
				)
			})
		)
	}, [query, persons])

	const handleNameChange = (e) => {
		setNewName(e.target.value)
	}

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value)
	}

	const handleQueryChange = (e) => {
		setQuery(e.target.value.toLowerCase())
	}

	const updateOrAddPerson = (e) => {
		e.preventDefault()

		if (persons.some((person) => person.number === newNumber)) {
			alert(`${newNumber} is already added to phonebook`)
			return
		}

		if (persons.some((person) => person.name === newName)) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				updatePerson()
			}
			return
		}

		addPerson()
	}

	const resetInputs = () => {
		setNewName('')
		setNewNumber('')
	}

	const updatePerson = () => {
		const person = persons.find((person) => person.name == newName)
		const personWithChangedNumber = { ...person, number: newNumber }
		const id = personWithChangedNumber.id

		personService
			.update(id, personWithChangedNumber)
			.then((returnedPerson) => {
				setPersons(
					persons.map((person) => (person.id !== id ? person : returnedPerson))
				)
				resetInputs()
			})
			.catch((err) => {
				alert(`the person '${person.name}' was already deleted from server`)
			})
	}

	const addPerson = () => {
		const id = persons.length + 1

		const newPerson = { name: newName, number: newNumber, id }

		personService.create(newPerson).then((returnedPerson) => {
			console.log(returnedPerson)
			setPersons(persons.concat(returnedPerson))
			resetInputs()
		})
	}

	const deletePerson = (id) => {
		personService.remove(id).then(() => {
			setPersons(persons.filter((person) => person.id !== id))
		})
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
				updateOrAddPerson={updateOrAddPerson}
			/>
			<h3>Numbers</h3>
			<Persons personsToShow={personsToShow} deletePerson={deletePerson} />
		</div>
	)
}

export default App
