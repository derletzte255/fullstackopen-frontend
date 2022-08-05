import React from 'react'
import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => {
	const totalExercises = parts.reduce((prev, curr) => prev + curr.exercises, 0)
	
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} name={part.name} exercises={part.exercises} />
			))}
			<Total total={totalExercises} />
		</div>
	)
}

export default Content
