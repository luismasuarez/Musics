import { Sound } from 'expo-av/build/Audio'
import { Asset } from 'expo-media-library'

import * as types from './types'

export type ISetPlayingSong = {
	type: types.SET_PLAYING_SONG
	payload: number
}

export type ISetMusicAssets = {
	type: types.SET_MUSIC_ASSETS
	payload: Asset[] | []
}

export type ISetCurrentTrack = {
	type: types.SET_CURRENT_TRACK
	payload: Asset | null
}

export type ISetCurrentSound = {
	type: types.SET_CURRENT_SOUND
	payload: Sound | null
}

export type TAction =
	| ISetPlayingSong
	| ISetMusicAssets
	| ISetCurrentTrack
	| ISetCurrentSound
