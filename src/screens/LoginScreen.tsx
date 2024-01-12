import React from 'react'

import { Block, Button, Text } from '../components'
import { useAuth } from '../context/AuthContext'

const Login = () => {
	const { onLogin } = useAuth()

	const login = async () => {
		const results = await onLogin!()
		if (results && results.error) {
			alert(results.msg)
		}
	}

	return (
		<Block>
			<Text>Login screen</Text>
			<Button onPress={login} color='#f34' center>
				<Text>Login</Text>
			</Button>
		</Block>
	)
}

export default Login
