import React from 'react'

export default function Anecdote({ text, votes }) {
	return (
		<p>
			{text} <br />
			has {votes} votes.
		</p>
	)
}
