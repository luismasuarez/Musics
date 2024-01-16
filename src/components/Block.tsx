import React from 'react'
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	ViewProps,
	ViewStyle,
} from 'react-native'
interface IBlock extends ViewProps {
	flex?: ViewStyle['flex']
	row?: boolean
	justify?: ViewStyle['justifyContent']
	justifyContent?: ViewStyle['justifyContent']
	align?: ViewStyle['alignItems']
	alignItems?: ViewStyle['alignItems']
	content?: ViewStyle['alignContent']
	alignContent?: ViewStyle['alignContent']
	wrap?: ViewStyle['flexWrap']
	width?: ViewStyle['width']
	height?: ViewStyle['height']
	p?: ViewStyle['padding']
	ph?: ViewStyle['paddingHorizontal']
	pv?: ViewStyle['paddingVertical']
	position?: ViewStyle['position']
	top?: ViewStyle['top']
	right?: ViewStyle['right']
	bottom?: ViewStyle['bottom']
	left?: ViewStyle['left']
	mt?: ViewStyle['marginTop']
	mh?: ViewStyle['marginHorizontal']
	ml?: ViewStyle['marginLeft']
	color?: ViewStyle['backgroundColor']
	outlined?: boolean
	card?: boolean
	radius?: ViewStyle['borderRadius']
	overflow?: ViewStyle['overflow']
	safe?: boolean
	scroll?: boolean
	shadow?: {
		color?: ViewStyle['shadowColor']
		offset?: ViewStyle['shadowOffset']
		opacity?: ViewStyle['shadowOpacity']
		radius?: ViewStyle['shadowRadius']
	}
	children?: React.ReactNode
}

const Block = ({
	children,
	style,
	flex,
	row,
	justify,
	justifyContent,
	align,
	alignItems,
	content,
	alignContent,
	wrap,
	width,
	height,
	p,
	ph,
	pv,
	position,
	top,
	right,
	bottom,
	left,
	mt,
	mh,
	ml,
	color,
	outlined,
	card,
	radius,
	overflow,
	safe,
	scroll,
	shadow,
	...props
}: IBlock) => {
	const blockStyle = StyleSheet.flatten([
		flex !== undefined && { flex },
		row && { flexDirection: 'row' },
		justify !== undefined && { justifyContent: justify },
		justifyContent !== undefined && { justifyContent },
		align !== undefined && { alignItems: align },
		alignItems !== undefined && { alignItems },
		content !== undefined && { alignContent: content },
		alignContent !== undefined && { alignContent },
		wrap !== undefined && { flexWrap: wrap },
		width !== undefined && { width },
		height !== undefined && { height },
		p !== undefined && { padding: p },
		ph !== undefined && { paddingHorizontal: ph },
		pv !== undefined && { paddingVertical: pv },
		position !== undefined && { position },
		top !== undefined && { top },
		right !== undefined && { right },
		bottom !== undefined && { bottom },
		left !== undefined && { left },
		mt !== undefined && { marginTop: mt },
		mh !== undefined && { marginHorizontal: mh },
		ml !== undefined && { marginLeft: ml },
		color !== undefined && { backgroundColor: color },
		outlined && {
			borderWidth: 1,
			borderColor: color,
			backgroundColor: 'transparent',
		},
		card && {
			backgroundColor: 'white',
			borderRadius: 16,
			padding: 10,
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 7,
			},
			shadowOpacity: 0.07,
			shadowRadius: 4,
			elevation: 2,
		},
		radius !== undefined && { borderRadius: radius },
		overflow !== undefined && { overflow },
		shadow !== undefined && { ...shadow },
		style,
	]) as ViewStyle

	if (safe) {
		return (
			<SafeAreaView style={blockStyle} {...props}>
				{children}
			</SafeAreaView>
		)
	}

	if (scroll) {
		return (
			<ScrollView style={blockStyle} {...props}>
				{children}
			</ScrollView>
		)
	}

	return (
		<View style={blockStyle} {...props}>
			{children}
		</View>
	)
}

export default Block
