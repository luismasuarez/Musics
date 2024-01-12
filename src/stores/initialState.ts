import { Asset } from 'expo-media-library'

export type MusicsState = {
	playing: number
	musicAssets: Asset[]
}

const initialState: MusicsState = {
	playing: -1,
	musicAssets: [],
}

export default initialState
