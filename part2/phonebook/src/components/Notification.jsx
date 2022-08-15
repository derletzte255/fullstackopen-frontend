import React from 'react'

const Notification = ({ notification }) => {
	if (!notification) {
		return null
	}

	const style = {
		margin: '20px 0',
		backgroundColor: '#cffbff',
		padding: '10px 30px',
		fontSize: 20,
		borderRadius: 20,
		borderStyle: 'dashed',
		borderWidth: 1,
		borderColor: notification.type === 'alert' ? '#9f1717' : '#137272',
		color: notification.type === 'alert' ? '#9f1717' : '#137272',
	}

	return <div style={style}>{notification.message}</div>
}

export default Notification
