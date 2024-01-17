import * as MediaLibrary from 'expo-media-library'
import { useEffect } from 'react'

import useMuscisContext from '../stores/hook'

const useFetchMusic = (pageSize?: number) => {
	const { dispatch } = useMuscisContext()

	/**
	 * Fetches music files from local storage and saves them in state.
	 */
	const fetchMusicFiles = async () => {
		// Request permissions to access media library
		await MediaLibrary.requestPermissionsAsync()

		// Get all audio assets from media library
		const media = await MediaLibrary.getAssetsAsync({
			mediaType: MediaLibrary.MediaType.audio,
			first: pageSize,
		})

		// Dispatch action to set music assets in state
		dispatch({ type: 'SET_MUSIC_ASSETS', payload: media.assets })
	}

	useEffect(() => {
		fetchMusicFiles()
	}, [])
}

export default useFetchMusic
