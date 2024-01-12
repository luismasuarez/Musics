import { useCallback } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps,
	Vibration,
	ViewStyle,
} from 'react-native'

import useTheme from '../hooks/useTheme'

interface IButton extends TouchableOpacityProps {
	children?: React.ReactNode
	color?: ViewStyle['backgroundColor']
	outlined?: boolean
	radius?: ViewStyle['borderRadius']
	flex?: ViewStyle['flex']
	row?: boolean
	center?: boolean
	justify?: ViewStyle['justifyContent']
	justifyContent?: ViewStyle['justifyContent']
	align?: ViewStyle['alignItems']
	alignItems?: ViewStyle['alignItems']
	shadow?: {
		color?: ViewStyle['shadowColor']
		offset?: ViewStyle['shadowOffset']
		opacity?: ViewStyle['shadowOpacity']
		radius?: ViewStyle['shadowRadius']
	}
	width?: ViewStyle['width']
	height?: ViewStyle['height']
	position?: ViewStyle['position']
	top?: ViewStyle['top']
	right?: ViewStyle['right']
	bottom?: ViewStyle['bottom']
	left?: ViewStyle['left']
	p?: ViewStyle['padding']
	ph?: ViewStyle['paddingHorizontal']
	pv?: ViewStyle['paddingVertical']
	disabled?: boolean
	vibrate?: number | number[]
	onPress?: (event: any) => void
}

const Button = ({
	children,
	color,
	outlined,
	radius,
	flex,
	row,
	center,
	justify,
	justifyContent,
	align,
	alignItems,
	shadow,
	height,
	width,
	position,
	top,
	right,
	bottom,
	left,
	p,
	ph,
	pv,
	disabled,
	vibrate,
	style,
	activeOpacity = 0.8,
	onPress,
	...props
}: IButton) => {
	const { sizes } = useTheme()

	const buttonStyle = StyleSheet.flatten([
		{
			height: sizes.buttonHeight,
			borderRadius: sizes.buttonRadius,
			borderWith: sizes.buttonBorder,
		},
		color !== undefined && { backgroundColor: color },
		outlined && {
			borderWidth: 1,
			borderColor: color,
			backgroundColor: 'transparent',
		},
		radius !== undefined && { borderRadius: radius },
		flex !== undefined && { flex },
		row && { flexDirection: 'row' },
		center && {
			justifyContent: 'center',
			alignItems: 'center',
		},
		justify !== undefined && { justifyContent: justify },
		justifyContent !== undefined && { justifyContent },
		align !== undefined && { alignItems: align },
		alignItems !== undefined && { alignItems },
		shadow !== undefined && { ...shadow },
		{ minHeight: height || 48 },
		{ minWidth: width || 48 },
		position !== undefined && { position },
		top !== undefined && { top },
		right !== undefined && { right },
		bottom !== undefined && { bottom },
		left !== undefined && { left },
		p && { padding: p },
		ph && { paddingHorizontal: ph },
		pv && { paddingVertical: pv },
		left !== undefined && { left },
		left !== undefined && { left },
		disabled && { opacity: 0.5 },
	]) as ViewStyle

	const handlePress = useCallback(
		(event: any) => {
			onPress?.(event)
			/* vibrate support onPress */
			if (vibrate !== undefined) {
				Vibration.vibrate(vibrate)
			}
		},
		[vibrate, onPress],
	)

	return (
		<TouchableOpacity
			style={buttonStyle}
			disabled={disabled}
			activeOpacity={activeOpacity}
			onPress={handlePress}
			{...props}>
			{children}
		</TouchableOpacity>
	)
}

export default Button
