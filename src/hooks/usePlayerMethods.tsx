import { Audio } from 'expo-av'
import { Asset } from 'expo-media-library'
import { useEffect, useRef, useState } from 'react'

import useMuscisContext from '../stores/hook'

const usePlayerMethods = (track: Asset) => {
	const {
		state: { currentSound, musicAssets },
		dispatch,
	} = useMuscisContext()

	const [isPlaying, setIsPlaying] = useState(false)
	const [progress, setProgress] = useState<number>(0)
	const [currentTime, setCurrentTime] = useState<number>()
	const [totalDuration, setTotalDuration] = useState<number>()

	const indexOfTrack = musicAssets.indexOf(track)
	const value = useRef(indexOfTrack)

	// Load current sound and play it
	const playTrack = async (track: Asset) => {
		try {
			await Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
				staysActiveInBackground: false,
				shouldDuckAndroid: false,
			})

			const { sound, status } = await Audio.Sound.createAsync(
				{
					uri: track?.uri,
				},
				{ shouldPlay: true, isLooping: false },
				onPlaybackStatusUpdate,
			)
			onPlaybackStatusUpdate(status)
			dispatch({ type: 'SET_CURRENT_SOUND', payload: sound })
			await sound.playAsync()
		} catch (error: unknown) {
			console.log(error)
		}
	}

	const onPlaybackStatusUpdate = async status => {
		if (status.isLoaded && status.isPlaying) {
			const progress = status.positionMillis / status.durationMillis
			setProgress(progress)
			setCurrentTime(status.positionMillis)
			setTotalDuration(status.durationMillis)
		}

		if (status.didJustFinish === true) {
			dispatch({ type: 'SET_CURRENT_SOUND', payload: null })
			playNextTrack()
		}
	}

	const playNextTrack = async () => {
		if (currentSound) {
			await currentSound.stopAsync()
			dispatch({ type: 'SET_CURRENT_SOUND', payload: null })
		}

		value.current += 1
		if (value.current < musicAssets.length) {
			const nextTrack = musicAssets[value.current]
			dispatch({ type: 'SET_CURRENT_TRACK', payload: nextTrack })
			await playTrack(nextTrack)
		} else {
			console.log('End of playlist')
		}
	}

	const playPreviousTrack = async () => {
		if (currentSound) {
			await currentSound.stopAsync()
			dispatch({ type: 'SET_CURRENT_SOUND', payload: null })
		}

		value.current -= 1
		if (value.current !== 0) {
			const nextTrack = musicAssets[value.current]
			dispatch({ type: 'SET_CURRENT_TRACK', payload: nextTrack })
			await playTrack(nextTrack)
		} else {
			console.log('Start of playlist')
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

	const stopTrack = async () => {
		currentSound?.stopAsync()
		currentSound?.unloadAsync()
	}

	useEffect(() => {
		if (currentSound) {
			currentSound.unloadAsync()
		}

		playTrack(track)
		setIsPlaying(true)
	}, [track])

	return {
		isPlaying,
		playTrack,
		handlePlayPause,
		stopTrack,
		playNextTrack,
		playPreviousTrack,
		progress,
		currentTime,
		totalDuration,
	}
}

export default usePlayerMethods
