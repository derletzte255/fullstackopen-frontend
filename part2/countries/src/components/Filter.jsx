import React from 'react'

const Filter = ({ query, handleQueryChange }) => {
	return (
		<div>
			find countries{' '}
			<input type="text" value={query} onChange={handleQueryChange} />
		</div>
	)
}

export default Filter
