import * as MediaLibrary from 'expo-media-library'
import { useEffect } from 'react'

import useMuscisContext from '../stores/hook'

const useFetchMusic = () => {
	const { dispatch } = useMuscisContext()

	const fetchMusicFiles = async () => {
		await MediaLibrary.requestPermissionsAsync()

		const media = await MediaLibrary.getAssetsAsync({
			mediaType: MediaLibrary.MediaType.audio,
		})
		dispatch({ type: 'SET_MUSIC_ASSETS', payload: media.assets })
	}

	useEffect(() => {
		fetchMusicFiles()
	}, [])
}

export default useFetchMusic
