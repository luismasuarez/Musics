/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { AVPlaybackStatus, Audio } from 'expo-av'
import { Asset } from 'expo-media-library'
import { useEffect, useState } from 'react'

const usePlayMethods = (song: Asset) => {
	const [currentSound, setCurrentSound] = useState<Audio.Sound | undefined>()
	const [soundStatus, setSoundStatus] = useState<AVPlaybackStatus>()
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
			setCurrentSound(sound)
			setSoundStatus(status)
			console.log('Playing Sound')
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

	useEffect(() => {
		playSound()
		setIsPlaying(true)
	}, [])

	return { handlePlayPause, isPlaying }
}

export default usePlayMethods
