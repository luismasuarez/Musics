import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import useTheme from '../hooks/useTheme'

const Input = ({ secureTextEntry, ...props }: TextInputProps) => {
	const { sizes } = useTheme()

	const inputStyle = StyleSheet.flatten([
		{
			height: sizes.inputHeight,
			borderRadius: sizes.inputRadius,
			borderWith: sizes.inputBorder,
			paddingHorizontal: sizes.base,
		},
	]) as TextInputProps
	return <TextInput style={inputStyle} {...props} />
}

export default Input
