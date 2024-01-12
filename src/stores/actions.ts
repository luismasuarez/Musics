import { Asset } from 'expo-media-library'

import * as types from './types'

export type ISetPlayingSong = {
	type: types.SET_PLAYING_SONG
	payload: number
}

export type ISetMusicAssets = {
	type: types.SET_MUSIC_ASSETS
	payload: Asset[]
}

export type TAction = ISetPlayingSong | ISetMusicAssets
