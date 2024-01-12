import { Text as RNText, StyleSheet, TextProps, TextStyle } from 'react-native'

import { FONTS, SIZES } from '../constants/theme'
import useTheme from '../hooks/useTheme'

interface IText extends TextProps {
	children?: React.ReactNode
	h1?: boolean
	h2?: boolean
	h3?: boolean
	h4?: boolean
	h5?: boolean
	p?: boolean
	size?: TextStyle['fontSize']
	fontSize?: TextStyle['fontSize']
	bold?: boolean
	semibold?: boolean
	weight?: TextStyle['fontWeight']
	fontWeight?: TextStyle['fontWeight']
	center?: boolean
	color?: TextStyle['color']
	opacity?: TextStyle['opacity']
	font?: TextStyle['fontFamily']
	fontFamily?: TextStyle['fontFamily']
	align?: TextStyle['textAlign']
	textAlign?: TextStyle['textAlign']
	transform?: TextStyle['textTransform']
	textTransform?: TextStyle['textTransform']
	lineHeight?: TextStyle['lineHeight']
	position?: TextStyle['position']
	top?: TextStyle['top']
	right?: TextStyle['right']
	bottom?: TextStyle['bottom']
	left?: TextStyle['left']
	mt?: TextStyle['marginTop']
}

const Text = ({
	children,
	h1,
	h2,
	h3,
	h4,
	h5,
	p,
	size,
	fontSize,
	bold,
	semibold,
	weight,
	fontWeight,
	center,
	color,
	opacity,
	font,
	fontFamily,
	align,
	textAlign,
	transform,
	textTransform,
	lineHeight,
	position,
	top,
	right,
	bottom,
	left,
	mt,
	style,
	...props
}: IText) => {
	const { sizes } = useTheme()

	const textStyle = StyleSheet.flatten([
		{ fontSize: sizes.text },
		h1 && {
			fontSize: SIZES.h1,
			fontFamily: FONTS.bold,
		},
		h2 && {
			fontSize: SIZES.h2,
			fontFamily: FONTS.bold,
		},
		h3 && {
			fontSize: SIZES.h3,
			fontFamily: FONTS.bold,
		},
		h4 && {
			fontSize: SIZES.h4,
			fontFamily: FONTS.medium,
		},
		h5 && {
			fontSize: SIZES.h5,
			fontFamily: FONTS.medium,
		},
		p && {
			fontSize: SIZES.p,
			fontFamily: FONTS.regular,
		},
		center && { textAlign: 'center' },
		(align || textAlign) && { textAlign: textAlign || align },
		bold && { fontWeight: '800' },
		semibold && { fontWeight: '600' },
		(weight || fontWeight) && { fontWeight: fontWeight || weight },
		(transform || textTransform) && {
			textTransform: textTransform || transform,
		},
		(font || fontFamily) && { fontFamily: fontFamily || font },
		(size || fontSize) && { fontSize: fontSize || size },
		color && { color },
		opacity && { opacity },
		lineHeight && { lineHeight },
		position && { position },
		right !== undefined && { right },
		top !== undefined && { top },
		bottom !== undefined && { bottom },
		left !== undefined && { left },
		mt !== undefined && { mt },
		style,
	]) as TextStyle

	return (
		<RNText
			style={textStyle}
			allowFontScaling
			adjustsFontSizeToFit={false}
			maxFontSizeMultiplier={1.2}
			{...props}>
			{children}
		</RNText>
	)
}

export default Text
