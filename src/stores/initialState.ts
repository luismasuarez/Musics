import { Asset } from 'expo-media-library'

const defaultAsset: Asset = {
	mediaType: 'audio',
	modificationTime: 0,
	uri: '',
	filename: '',
	width: 0,
	id: '',
	creationTime: 0,
	albumId: '',
	height: 0,
	duration: 0,
}

export type MusicsState = {
	playing: number
	musicAssets: Asset[]
	currentTrack: Asset
}

const initialState: MusicsState = {
	playing: -1,
	musicAssets: [],
	currentTrack: defaultAsset,
}

export default initialState
