import React from 'react'

import { Block, Button, Input, Text } from '../components'

const Register = () => {
	return (
		<Block>
			<Text>Register screen</Text>
			<Text>Full Name</Text>
			<Input placeholder='React UI Kit' />
			<Text>E-mail address</Text>
			<Input placeholder='your@email.com' />
			<Text>Password</Text>
			<Input secureTextEntry placeholder='Your password' />
			<Button>
				<Text>Register</Text>
			</Button>
		</Block>
	)
}

export default Register
