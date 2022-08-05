import React from 'react'

import Content from './Content'

export default function Course({ name, parts }) {
	return (
		<div>
			<h2>{name}</h2>
			<Content parts={parts} />
		</div>
	)
}
