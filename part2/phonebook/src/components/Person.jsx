import React from 'react'

const Person = ({ person, deletePerson }) => {
	return (
		<div>
			{person.name} {person.number}{' '}
			<button
				onClick={() => {
					if (window.confirm(`Delete ${person.name}?`)) {
						deletePerson(person.id)
					}
				}}
			>
				delete
			</button>
		</div>
	)
}

export default Person
