/* eslint-disable indent */
import { TAction } from './actions'
import { MusicsState } from './initialState'
import * as types from './types'
export const reducer = (state: MusicsState, action: TAction) => {
	const { type } = action

	switch (type) {
		case types.SET_PLAYING_SONG:
			return {
				...state,
				playing: action.payload,
			}

		case types.SET_MUSIC_ASSETS:
			return {
				...state,
				musicAssets: action.payload,
			}
		case types.SET_CURRENT_TRACK:
			return {
				...state,
				currentTrack: action.payload,
			}

		default:
			return state
	}
}
