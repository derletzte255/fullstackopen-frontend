import { useState, useEffect } from 'react'
import personService from './services/persons'

import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [query, setQuery] = useState('')
	const [personsToShow, setPersonsToShow] = useState([])
	const [notification, setNotification] = useState(null)

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

	const notify = (message, type = 'info') => {
		setNotification({ message, type })
		setTimeout(() => {
			setNotification(null)
		}, 5000)
	}

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
		const person = persons.find((person) => person.name === newName)
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
				notify(err.response.data.error, 'alert')
			})
	}

	const addPerson = () => {
		const newPerson = { name: newName, number: newNumber }

		personService
			.create(newPerson)
			.then((returnedPerson) => {
				console.log(returnedPerson)
				setPersons(persons.concat(returnedPerson))
				resetInputs()

				notify(`Added ${returnedPerson.name}`)
			})
			.catch((err) => {
				notify(err.response.data.error, 'alert')
			})
	}

	const deletePerson = (id) => {
		personService
			.remove(id)
			.then(() => {
				setPersons(persons.filter((person) => person.id !== id))
			})
			.catch((err) => {
				alert('the person was already deleted from server')
			})
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter query={query} handleQueryChange={handleQueryChange} />
			<Notification notification={notification} />

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
