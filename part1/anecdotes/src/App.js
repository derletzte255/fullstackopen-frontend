import { useState } from 'react'
import Button from './components/Button'
import random from './utils/random'
import Anecdote from './components/Anecdote'
import Title from './components/Title'

const App = () => {
	const [points, setPoints] = useState(Array(7).fill(0))
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
	]

	const selectRandomAnecdote = () => {
		const len = anecdotes.length
		const roll = random(len)
		setSelected(roll)
	}

	const updateVotes = () => {
		const copy = [...points]
		copy[selected] += 1
		setPoints(copy)
	}

	const getTopAnecdoteIndex = () => {
		const max = Math.max(...points)
		return points.indexOf(max)
	}

	const [selected, setSelected] = useState(0)

	return (
		<div>
			<Title text="Anecdote of the day" />
			<Anecdote text={anecdotes[selected]} votes={points[selected]} />
			<Button text="vote" handleClick={updateVotes} />
			<Button text="next anecdote" handleClick={selectRandomAnecdote} />
			<Title text="Anecdote of the day" />
			<Anecdote
				text={anecdotes[getTopAnecdoteIndex()]}
				votes={points[getTopAnecdoteIndex()]}
			/>
		</div>
	)
}

export default App
