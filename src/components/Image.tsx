import { Image as RNImage } from 'react-native'

const Image = asset => {
	return asset ? <RNImage source={asset} /> : null
}

export default Image
