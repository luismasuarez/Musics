import { Sound } from 'expo-av/build/Audio'
import { Asset } from 'expo-media-library'

export type MusicsState = {
	playing: number
	musicAssets: Asset[]
	currentTrack: Asset | undefined
	currentSound: Sound | undefined
}

const initialState: MusicsState = {
	playing: -1,
	musicAssets: [],
	currentTrack: undefined,
	currentSound: undefined,
}

export default initialState
