/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Audio } from 'expo-av'
import { Asset } from 'expo-media-library'
import { useEffect, useState } from 'react'

import useMuscisContext from '../stores/hook'

const usePlayerMethods = (song: Asset) => {
	const {
		state: { currentSound },
		dispatch,
	} = useMuscisContext()
	const [isPlaying, setIsPlaying] = useState(false)

	const playSound = async () => {
		try {
			console.log('Loading Sound')
			// Load one song and return a sound with methods
			const { sound, status } = await Audio.Sound.createAsync(
				{
					uri: song?.uri,
				},
				// Initial state of the song
				{ shouldPlay: true, isLooping: false },
			)
			dispatch({ type: 'SET_CURRENT_SOUND', payload: sound })
		} catch (error) {
			console.log(error)
		}
	}

	const handlePlayPause = async () => {
		if (currentSound) {
			if (isPlaying) {
				await currentSound.pauseAsync()
			} else {
				await currentSound.playAsync()
			}
			setIsPlaying(!isPlaying)
		}
	}

	const handleUnloadSound = async () => {
		currentSound?.stopAsync()
		currentSound?.unloadAsync()
	}

	useEffect(() => {
		if (currentSound) {
			handleUnloadSound()
		}
		playSound()
		console.log('Playing Sound')
		setIsPlaying(true)
	}, [])

	return { handlePlayPause, isPlaying, handleUnloadSound }
}

export default usePlayerMethods
