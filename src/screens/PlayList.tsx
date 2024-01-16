import {
	AntDesign,
	FontAwesome,
	FontAwesome5,
	MaterialIcons,
	Octicons,
} from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { useEffect, useState } from 'react'
import {
	Dimensions,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native'

import {
	ICON_LOOP_ALL_BUTTON,
	ICON_LOOP_ONE_BUTTON,
	ICON_MUTED_BUTTON,
	ICON_PLAY_BUTTON,
	ICON_THUMB_1,
} from '../constants'
import useFetchMusic from '../hooks/useFetchMusic'
import useMuscisContext from '../stores/hook'
import { isLoading } from 'expo-font'

const LOOPING_TYPE_ALL = 0
const LOOPING_TYPE_ONE = 1
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON }

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')
const BACKGROUND_COLOR = '#FFF8ED'
const DISABLED_OPACITY = 0.5
const FONT_SIZE = 14
const LOADING_STRING = '... loading ...'
const BUFFERING_STRING = '...buffering...'
const RATE_SCALE = 3.0
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2

const defaultState = {
	showVideo: false,
	playbackInstanceName: LOADING_STRING,
	loopingType: LOOPING_TYPE_ALL,
	muted: false,
	playbackInstancePosition: 0,
	playbackInstanceDuration: 0,
	shouldPlay: false,
	isPlaying: false,
	isBuffering: false,
	isLoading: true,
	fontLoaded: true,
	shouldCorrectPitch: true,
	volume: 1.0,
	rate: 1.0,
	videoWidth: DEVICE_WIDTH,
	videoHeight: VIDEO_CONTAINER_HEIGHT,
	poster: false,
	useNativeControls: false,
	fullscreen: false,
	throughEarpiece: false,
}

const PlayList = () => {
	useFetchMusic()
	const {
		state: { musicAssets, currentTrack },
		dispatch,
	} = useMuscisContext()

	const [state, setState] = useState(defaultState)
	const [index, setIndex] = useState(0)
	const [isSeeking, setIsSeeking] = useState(false)
	const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false)
	const [playbackInstance, setPlaybackInstance] = useState<Audio.Sound | null>(
		null,
	)

	const _onPlaybackStatusUpdate = status => {
		if (status.isLoaded) {
			setState({
				...state,
				playbackInstancePosition: status.positionMillis,
				playbackInstanceDuration: status.durationMillis,
				shouldPlay: status.shouldPlay,
				isPlaying: status.isPlaying,
				isBuffering: status.isBuffering,
				rate: status.rate,
				muted: status.isMuted,
				volume: status.volume,
				loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
				shouldCorrectPitch: status.shouldCorrectPitch,
			})
			if (status.didJustFinish && !status.isLooping) {
				_advanceIndex(true)
				_updatePlaybackInstanceForIndex(true)
			}
		} else {
			if (status.error) {
				console.log(`FATAL PLAYER ERROR: ${status.error}`)
			}
		}
	}

	const _loadNewPlaybackInstance = async playing => {
		if (playbackInstance != null) {
			await playbackInstance.unloadAsync()
			// playbackInstance.setOnPlaybackStatusUpdate(null);
			setPlaybackInstance(null)
		}

		const source = { uri: musicAssets[index].uri }
		const initialStatus = {
			shouldPlay: playing,
			rate: state.rate,
			shouldCorrectPitch: state.shouldCorrectPitch,
			volume: state.volume,
			isMuted: state.muted,
			isLooping: state.loopingType === LOOPING_TYPE_ONE,
			// // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
			// androidImplementation: 'MediaPlayer',
		}

		const { sound } = await Audio.Sound.createAsync(
			source,
			initialStatus,
			_onPlaybackStatusUpdate,
		)
		setPlaybackInstance(sound)

		setUpdateScreenForLoading(false)
	}

	const setUpdateScreenForLoading = isLoading => {
		if (isLoading) {
			setState({
				...state,
				showVideo: false,
				isPlaying: false,
				playbackInstanceName: LOADING_STRING,
				playbackInstanceDuration: 0,
				playbackInstancePosition: 0,
				isLoading: true,
			})
		} else {
			setState({
				...state,
				playbackInstanceName: musicAssets[index].filename,
				isLoading: false,
			})
		}
	}

	const _advanceIndex = forward => {
		setIndex(
			(index + (forward ? 1 : musicAssets.length - 1)) % musicAssets.length,
		)
	}

	const _updatePlaybackInstanceForIndex = async playing => {
		setUpdateScreenForLoading(true)

		setState({
			...state,
			videoWidth: DEVICE_WIDTH,
			videoHeight: VIDEO_CONTAINER_HEIGHT,
		})

		_loadNewPlaybackInstance(playing)
	}

	const _onPlayPausePressed = () => {
		if (playbackInstance != null) {
			if (state.isPlaying) {
				playbackInstance.pauseAsync()
			} else {
				playbackInstance.playAsync()
			}
		}
	}

	const _onStopPressed = () => {
		if (playbackInstance != null) {
			playbackInstance.stopAsync()
		}
	}

	const _onForwardPressed = () => {
		if (playbackInstance != null) {
			_advanceIndex(true)
			_updatePlaybackInstanceForIndex(state.shouldPlay)
		}
	}

	const _onBackPressed = () => {
		if (playbackInstance != null) {
			_advanceIndex(false)
			_updatePlaybackInstanceForIndex(state.shouldPlay)
		}
	}

	const _onMutePressed = () => {
		if (playbackInstance != null) {
			playbackInstance.setIsMutedAsync(!state.muted)
		}
	}

	const _onLoopPressed = () => {
		if (playbackInstance != null) {
			playbackInstance.setIsLoopingAsync(state.loopingType !== LOOPING_TYPE_ONE)
		}
	}

	const _onVolumeSliderValueChange = value => {
		if (playbackInstance != null) {
			playbackInstance.setVolumeAsync(value)
		}
	}

	const _trySetRate = async (rate, shouldCorrectPitch) => {
		if (playbackInstance != null) {
			try {
				await playbackInstance.setRateAsync(rate, shouldCorrectPitch)
			} catch (error) {
				console.log(error)
				// Rate changing could not be performed, possibly because the client's Android API is too old.
			}
		}
	}

	const _onRateSliderSlidingComplete = async value => {
		_trySetRate(value * RATE_SCALE, state.shouldCorrectPitch)
	}

	const _onPitchCorrectionPressed = async value => {
		_trySetRate(state.rate, !state.shouldCorrectPitch)
	}

	const _onSeekSliderValueChange = value => {
		if (playbackInstance != null && !isSeeking) {
			setIsSeeking(true)
			setShouldPlayAtEndOfSeek(state.shouldPlay)
			playbackInstance.pauseAsync()
		}
	}

	const _onSeekSliderSlidingComplete = async value => {
		if (playbackInstance != null) {
			setIsSeeking(false)
			const seekPosition = value * state.playbackInstanceDuration
			if (shouldPlayAtEndOfSeek) {
				playbackInstance.playFromPositionAsync(seekPosition)
			} else {
				playbackInstance.setPositionAsync(seekPosition)
			}
		}
	}

	const _getSeekSliderPosition = () => {
		if (
			playbackInstance != null &&
			state.playbackInstancePosition != null &&
			state.playbackInstanceDuration != null
		) {
			return state.playbackInstancePosition / state.playbackInstanceDuration
		}
		return 0
	}

	const _getMMSSFromMillis = millis => {
		const totalSeconds = millis / 1000
		const seconds = Math.floor(totalSeconds % 60)
		const minutes = Math.floor(totalSeconds / 60)

		const padWithZero = number => {
			const string = number.toString()
			if (number < 10) {
				return '0' + string
			}
			return string
		}
		return padWithZero(minutes) + ':' + padWithZero(seconds)
	}

	const _getTimestamp = () => {
		if (
			playbackInstance != null &&
			state.playbackInstancePosition != null &&
			state.playbackInstanceDuration != null
		) {
			return `${_getMMSSFromMillis(
				state.playbackInstancePosition,
			)} / ${_getMMSSFromMillis(state.playbackInstanceDuration)}`
		}
		return ''
	}

	const _onSpeakerPressed = () => {
		setState({ ...state, throughEarpiece: !state.throughEarpiece })
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: InterruptionModeIOS.DoNotMix,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
			playThroughEarpieceAndroid: state.throughEarpiece,
		})
	}

	return (
		<View style={styles.container}>
			<View />
			<View style={styles.nameContainer}>
				<Text style={[styles.text]}>{state.playbackInstanceName}</Text>
			</View>
			<View style={styles.space} />
			<View
				style={[
					styles.playbackContainer,
					{
						opacity: state.isLoading ? DISABLED_OPACITY : 1.0,
					},
				]}>
				<Slider
					style={styles.playbackSlider}
					trackImage={{ uri: '../../assets/images/thumb_1@1x.png' }}
					thumbImage={{ uri: '../../assets/images/thumb_2@1x.png' }}
					value={_getSeekSliderPosition()}
					onValueChange={_onSeekSliderValueChange}
					onSlidingComplete={_onSeekSliderSlidingComplete}
					disabled={state.isLoading}
				/>
				<View style={styles.timestampRow}>
					<Text style={[styles.text, styles.buffering]}>
						{state.isBuffering ? BUFFERING_STRING : ''}
					</Text>
					<Text style={[styles.text, styles.timestamp]}>{_getTimestamp()}</Text>
				</View>
			</View>
			<View
				style={[
					styles.buttonsContainerBase,
					styles.buttonsContainerTopRow,
					{
						opacity: state.isLoading ? DISABLED_OPACITY : 1.0,
					},
				]}>
				<Pressable
					style={styles.wrapper}
					onPress={_onBackPressed}
					disabled={state.isLoading}>
					<AntDesign name='stepbackward' size={24} color='black' />
				</Pressable>
				<Pressable
					style={styles.wrapper}
					onPress={_onPlayPausePressed}
					disabled={state.isLoading}>
					{state.isPlaying ? (
						<FontAwesome name='pause' size={24} color='black' />
					) : (
						<FontAwesome name='play' size={24} color='black' />
					)}
				</Pressable>
				<TouchableHighlight
					underlayColor={BACKGROUND_COLOR}
					style={styles.wrapper}
					onPress={_onStopPressed}
					disabled={state.isLoading}>
					<FontAwesome name='stop' size={24} color='black' />
				</TouchableHighlight>
				<TouchableHighlight
					underlayColor={BACKGROUND_COLOR}
					style={styles.wrapper}
					onPress={_onForwardPressed}
					disabled={state.isLoading}>
					<FontAwesome name='forward' size={24} color='black' />
				</TouchableHighlight>
			</View>
			<View
				style={[styles.buttonsContainerBase, styles.buttonsContainerMiddleRow]}>
				<View style={styles.volumeContainer}>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={_onMutePressed}>
						{state.muted ? (
							<FontAwesome5 name='volume-mute' size={24} color='black' />
						) : (
							<Octicons name='unmute' size={24} color='black' />
						)}
					</TouchableHighlight>
					<Slider
						style={styles.volumeSlider}
						trackImage={{ uri: '../../assets/images/track_1@1x.png' }}
						thumbImage={{ uri: '../../assets/images/thumb_2@1x.png' }}
						value={1}
						onValueChange={_onVolumeSliderValueChange}
					/>
				</View>
				<TouchableHighlight
					underlayColor={BACKGROUND_COLOR}
					style={styles.wrapper}
					onPress={_onLoopPressed}>
					<Image
						style={styles.button}
						source={LOOPING_TYPE_ICONS[state.loopingType].module}
					/>
				</TouchableHighlight>
			</View>
			<View
				style={[styles.buttonsContainerBase, styles.buttonsContainerBottomRow]}>
				<TouchableHighlight
					underlayColor={BACKGROUND_COLOR}
					style={styles.wrapper}
					onPress={() => _trySetRate(1.0, state.shouldCorrectPitch)}>
					<View style={styles.button}>
						<Text style={[styles.text]}>Rate:</Text>
					</View>
				</TouchableHighlight>
				<Slider
					style={styles.rateSlider}
					trackImage={{ uri: '../../assets/images/track_1@1x.png' }}
					thumbImage={{ uri: '../../assets/images/thumb_2@1x.png' }}
					value={state.rate / RATE_SCALE}
					onSlidingComplete={_onRateSliderSlidingComplete}
				/>
				<TouchableHighlight
					underlayColor={BACKGROUND_COLOR}
					style={styles.wrapper}
					onPress={_onPitchCorrectionPressed}>
					<View style={styles.button}>
						<Text style={[styles.text]}>
							PC: {state.shouldCorrectPitch ? 'yes' : 'no'}
						</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={_onSpeakerPressed}
					underlayColor={BACKGROUND_COLOR}>
					{state.throughEarpiece ? (
						<MaterialIcons name='speaker-phone' size={24} color='black' />
					) : (
						<MaterialIcons name='speaker' size={24} color='black' />
					)}
				</TouchableHighlight>
			</View>
			<View />
		</View>
	)
}

export default PlayList

const styles = StyleSheet.create({
	emptyContainer: {
		alignSelf: 'stretch',
		backgroundColor: BACKGROUND_COLOR,
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: BACKGROUND_COLOR,
	},
	wrapper: {},
	nameContainer: {
		height: FONT_SIZE,
	},
	space: {
		height: FONT_SIZE,
	},
	videoContainer: {
		height: VIDEO_CONTAINER_HEIGHT,
	},
	video: {
		maxWidth: DEVICE_WIDTH,
	},
	playbackContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
		minHeight: ICON_THUMB_1.height * 2.0,
		maxHeight: ICON_THUMB_1.height * 2.0,
	},
	playbackSlider: {
		alignSelf: 'stretch',
	},
	timestampRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		alignSelf: 'stretch',
		minHeight: FONT_SIZE,
	},
	text: {
		fontSize: FONT_SIZE,
		minHeight: FONT_SIZE,
	},
	buffering: {
		textAlign: 'left',
		paddingLeft: 20,
	},
	timestamp: {
		textAlign: 'right',
		paddingRight: 20,
	},
	button: {
		backgroundColor: BACKGROUND_COLOR,
	},
	buttonsContainerBase: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	buttonsContainerTopRow: {
		maxHeight: ICON_PLAY_BUTTON.height,
		minWidth: DEVICE_WIDTH / 2.0,
		maxWidth: DEVICE_WIDTH / 2.0,
	},
	buttonsContainerMiddleRow: {
		maxHeight: ICON_MUTED_BUTTON.height,
		alignSelf: 'stretch',
		paddingRight: 20,
	},
	volumeContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		minWidth: DEVICE_WIDTH / 2.0,
		maxWidth: DEVICE_WIDTH / 2.0,
	},
	volumeSlider: {
		width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
	},
	buttonsContainerBottomRow: {
		maxHeight: ICON_THUMB_1.height,
		alignSelf: 'stretch',
		paddingRight: 20,
		paddingLeft: 20,
	},
	rateSlider: {
		width: DEVICE_WIDTH / 2.0,
	},
	buttonsContainerTextRow: {
		maxHeight: FONT_SIZE,
		alignItems: 'center',
		paddingRight: 20,
		paddingLeft: 20,
		minWidth: DEVICE_WIDTH,
		maxWidth: DEVICE_WIDTH,
	},
})
