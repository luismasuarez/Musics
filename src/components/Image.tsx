import {
	ImageProps,
	ImageStyle,
	Image as RNImage,
	StyleSheet,
} from 'react-native'

interface IImage extends ImageProps {
	position?: ImageStyle['position']
	top?: ImageStyle['top']
	right?: ImageStyle['right']
	bottom?: ImageStyle['bottom']
	left?: ImageStyle['left']
	mt?: ImageStyle['marginTop']
	mh?: ImageStyle['marginHorizontal']
	shadow?: {
		color?: ImageStyle['shadowColor']
		offset?: ImageStyle['shadowOffset']
		opacity?: ImageStyle['shadowOpacity']
		radius?: ImageStyle['shadowRadius']
	}
	children?: React.ReactNode
}

const Image = ({
	children,
	source,
	width,
	height,
	position,
	top,
	right,
	bottom,
	left,
	mt,
	mh,
	shadow,
	...props
}: IImage) => {
	const blockStyle = StyleSheet.flatten([
		width !== undefined && { width },
		height !== undefined && { height },
		position !== undefined && { position },
		top !== undefined && { top },
		right !== undefined && { right },
		bottom !== undefined && { bottom },
		left !== undefined && { left },
		mt !== undefined && { marginTop: mt },
		mh !== undefined && { marginHorizontal: mh },
		shadow !== undefined && { ...shadow },
	]) as ImageStyle
	return <RNImage style={blockStyle} source={source} />
}

export default Image
