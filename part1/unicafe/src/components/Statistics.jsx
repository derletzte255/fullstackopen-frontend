import React from 'react'
import Title from './Title'
import StatisticsLine from './StatisticsLine'

export default function Statistics({ good, neutral, bad }) {
	const calculateAverageRating = () => {
		const totalFeedback = good + neutral + bad
		if (totalFeedback === 0) return 0
		const totalRating = good - bad
		return totalRating / totalFeedback
	}

	const calculatePositivePercent = () => {
		const totalFeedback = good + neutral + bad
		if (totalFeedback === 0) return 0
		return `${(good / totalFeedback) * 100}%`
	}

	if (good === 0 && neutral === 0 && bad === 0) {
		return <p>No feedback given</p>
	}

	return (
		<>
			<Title text="statistics" />
			<StatisticsLine text="good" value={good} />
			<StatisticsLine text="neutral" value={neutral} />
			<StatisticsLine text="bad" value={bad} />
			<StatisticsLine text="all" value={good + bad + neutral} />
			<StatisticsLine text="average" value={calculateAverageRating()} />
			<StatisticsLine text="positive" value={calculatePositivePercent()} />
		</>
	)
}
