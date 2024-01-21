import { Sound } from 'expo-av/build/Audio'
import { Asset } from 'expo-media-library'

export type MusicsState = {
	playing: number
	musicAssets: Asset[]
	currentTrack: Asset | null
	currentSound: Sound | null
}

const initialState: MusicsState = {
	playing: -1,
	musicAssets: [],
	currentTrack: null,
	currentSound: null,
}

export default initialState
