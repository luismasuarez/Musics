import {
	AntDesign,
	Entypo,
	Feather,
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons,
} from '@expo/vector-icons'
import { AVPlaybackStatus, Audio } from 'expo-av'
import { Asset } from 'expo-media-library'
import { useState } from 'react'
import { FlatList, Pressable, ScrollView, View, StyleSheet } from 'react-native'
import { BottomModal, ModalContent } from 'react-native-modals'

import { Block, Input, Text } from '../components'
import SongItem from '../components/SongItem'
import { COLORS, SIZES } from '../constants'
import useFetchMusic from '../hooks/useFetchMusic'
import useMuscisContext from '../stores/hook'

const Player = () => {
	useFetchMusic()
	const {
		state: { musicAssets, currentTrack },
		dispatch,
	} = useMuscisContext()
	const [input, setInput] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [progress, setProgress] = useState<number>(0)
	const [currentTime, setCurrentTime] = useState(0)
	const [totalDuration, setTotalDuration] = useState<number | undefined>(0)
	const [currentSong, setCurrentSong] = useState<Audio.Sound | null>()
	const [currentSound, setCurrentSound] = useState(null)
	const [isPlaying, setIsPlaying] = useState(false)

	const circleSize = 12
	const formatTime = time => {
		const minutes = Math.floor(time / 60000)
		const seconds = Math.floor((time % 60000) / 1000)
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	}

	const playPreviousTrack = async () => {
		if (currentSound) {
			await currentSound.stopAsync()
			setCurrentSound(null)
		}
		value.current -= 1
		if (value.current < savedTracks.length) {
			const nextTrack = savedTracks[value.current]
			setCurrentTrack(nextTrack)

			await play(nextTrack)
		} else {
			console.log('end of playlist')
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

	const playNextTrack = async () => {
		if (currentSound) {
			await currentSound.stopAsync()
			setCurrentSound(null)
		}
		value.current += 1
		if (value.current < savedTracks.length) {
			const nextTrack = savedTracks[value.current]
			setCurrentTrack(nextTrack)
			extractColors()
			await play(nextTrack)
		} else {
			console.log('end of playlist')
		}
	}

	const playTrack = async () => {
		if (musicAssets.length > 0) {
			dispatch({ type: 'SET_CURRENT_TRACK', payload: musicAssets[0] })
		}
		await play(musicAssets[0])
	}

	const play = async (nextTrack: Asset) => {
		console.log(nextTrack)
		const preview_url = nextTrack.uri

		try {
			await Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
				staysActiveInBackground: false,
				shouldDuckAndroid: false,
			})

			const { sound, status } = await Audio.Sound.createAsync(
				{
					uri: preview_url,
				},
				{ shouldPlay: true, isLooping: false },
				onPlaybackStatusUpdate,
			)
			console.log('Sound', status)
			onPlaybackStatusUpdate(status)
			setCurrentSong(sound)
			await sound.playAsync()
		} catch (err: unknown) {
			console.log(err)
		}
	}

	const onPlaybackStatusUpdate = async status => {
		console.log(status)
		if (status.isLoaded && status.isPlaying) {
			const progress = status.positionMillis / status.durationMillis
			console.log('progresss', progress)
			setProgress(progress)
			setCurrentTime(status.positionMillis)
			setTotalDuration(status.durationMillis)
		}

		if (status.didJustFinish === true) {
			setCurrentSound(null)
			playNextTrack()
		}
	}

	return (
		<>
			<ScrollView
				style={{
					flex: 1,
					marginTop: 40,
					backgroundColor: COLORS.dark,
				}}>
				<Pressable>
					<Ionicons name='arrow-back' size={24} color={COLORS.text} />
				</Pressable>

				<Block
					style={{ marginHorizontal: SIZES.base }}
					row
					alignItems='center'
					justifyContent='center'
					mt={SIZES.base}>
					<Pressable
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: SIZES.base,
							backgroundColor: COLORS.primary,
							padding: SIZES.base,
							flex: 1,
							borderRadius: SIZES.radius,
							height: SIZES.buttonHeight,
							width: '90%',
							alignSelf: 'center',
						}}>
						<AntDesign name='search1' size={SIZES.h5} color={COLORS.text} />
						<Input
							value={input}
							onChangeText={setInput}
							placeholder='Find song'
							placeholderTextColor={COLORS.accent}
						/>
					</Pressable>

					<Pressable
						style={{
							marginHorizontal: SIZES.base,
							backgroundColor: COLORS.primary,
							padding: SIZES.base,
							borderRadius: SIZES.radius,
							height: SIZES.h2,
						}}>
						<Text color={COLORS.text}>Sort</Text>
					</Pressable>
				</Block>
				<View style={{ height: 50 }} />
				<View style={{ marginHorizontal: 10 }}>
					<Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
						Liked Songs
					</Text>
					<Text style={{ color: 'white', fontSize: 13, marginTop: 5 }}>
						430 songs
					</Text>
				</View>

				<Pressable
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginHorizontal: 10,
					}}>
					<Pressable
						style={{
							width: 30,
							height: 30,
							borderRadius: 15,
							backgroundColor: COLORS.primary,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<AntDesign
							name='arrowdown'
							size={20}
							color={COLORS.primary_accent}
						/>
					</Pressable>

					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
						<MaterialCommunityIcons
							name='cross-bolnisi'
							size={24}
							color={COLORS.primary}
						/>

						<Pressable
							onPress={playTrack}
							style={{
								width: 60,
								height: 60,
								borderRadius: 30,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: COLORS.primary,
							}}>
							<Entypo
								name='controller-play'
								size={24}
								color={COLORS.primary_accent}
							/>
						</Pressable>
					</View>
				</Pressable>

				<FlatList
					showsVerticalScrollIndicator={false}
					data={musicAssets}
					renderItem={track => <SongItem track={track} />}
				/>
			</ScrollView>

			{currentTrack && (
				<Pressable
					onPress={() => setShowModal(!showModal)}
					style={{
						backgroundColor: COLORS.primary,
						width: '90%',
						padding: SIZES.h5,
						marginLeft: 'auto',
						marginRight: 'auto',
						marginBottom: SIZES.base,
						position: 'absolute',
						borderRadius: SIZES.radius,
						left: 20,
						bottom: SIZES.base,
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center',
						gap: SIZES.base,
					}}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: SIZES.base,
						}}>
						<Ionicons name='musical-notes' size={24} />
						<Text
							numberOfLines={1}
							style={{ fontSize: SIZES.p, width: 220, color: COLORS.text }}>
							{currentTrack.filename}
						</Text>
					</View>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: SIZES.base,
						}}>
						<AntDesign name='heart' size={24} color={COLORS.primary_accent} />
						<Pressable>
							<AntDesign name='pausecircle' size={24} color={COLORS.ligth} />
						</Pressable>
					</View>
				</Pressable>
			)}

			<BottomModal
				visible={showModal}
				swipeDirection={['up', 'down']}
				onHardwareBackPress={() => {
					setShowModal(false)
					return showModal
				}}
				swipeThreshold={200}>
				<ModalContent
					style={{
						height: '100%',
						width: '100%',
						backgroundColor: COLORS.primary_accent,
					}}>
					<View style={{ height: '100%', width: '100%', marginTop: SIZES.h4 }}>
						<Pressable
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}>
							<AntDesign
								name='down'
								size={24}
								color={COLORS.text}
								onPress={() => setShowModal(false)}
							/>
							<Text
								style={{
									fontSize: SIZES.p,
									fontWeight: 'bold',
									color: COLORS.text,
								}}>
								{currentTrack.filename}
							</Text>
							<Entypo
								name='dots-three-vertical'
								size={24}
								color={COLORS.text}
							/>
						</Pressable>
						<View style={{ height: 70 }} />

						<View
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: COLORS.secondary_accent,
								width: '100%',
								height: 300,
								borderRadius: SIZES.radius,
								alignSelf: 'center',
							}}>
							<MaterialCommunityIcons
								name='music'
								size={200}
								color={COLORS.text}
							/>
						</View>

						<View style={{ padding: 10 }}>
							<View
								style={{
									marginTop: 20,
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}>
								<View>
									<Text
										style={{
											fontSize: 18,
											fontWeight: 'bold',
											color: 'white',
										}}>
										{currentTrack?.filename}
									</Text>
									<Text style={{ color: '#D3D3D3', marginTop: 4 }}>
										{currentTrack?.duration}
									</Text>
								</View>

								<AntDesign name='heart' size={24} color='#1DB954' />
							</View>

							<View style={{ marginTop: 10 }}>
								<View
									style={{
										width: '100%',
										marginTop: 10,
										height: 3,
										backgroundColor: 'gray',
										borderRadius: 5,
									}}>
									<View
										style={[
											styles.progressbar,
											{ width: `${progress * 100}%` },
										]}
									/>
									<View
										style={[
											{
												position: 'absolute',
												top: -5,
												width: circleSize,
												height: circleSize,
												borderRadius: circleSize / 2,
												backgroundColor: 'white',
											},
											{
												left: `${progress * 100}%`,
												marginLeft: -circleSize / 2,
											},
										]}
									/>
								</View>
								<View
									style={{
										marginTop: 12,
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}>
									<Text style={{ color: 'white', fontSize: 15 }}>
										{formatTime(currentTime)}
									</Text>

									<Text style={{ color: 'white', fontSize: 15 }}>
										{formatTime(totalDuration)}
									</Text>
								</View>
							</View>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									marginTop: 17,
								}}>
								<Pressable>
									<FontAwesome name='arrows' size={30} color='#03C03C' />
								</Pressable>
								<Pressable onPress={playPreviousTrack}>
									<Ionicons name='play-skip-back' size={30} color='white' />
								</Pressable>
								<Pressable onPress={handlePlayPause}>
									{isPlaying ? (
										<AntDesign name='pausecircle' size={60} color='white' />
									) : (
										<Pressable
											onPress={handlePlayPause}
											style={{
												width: 60,
												height: 60,
												borderRadius: 30,
												backgroundColor: 'white',
												justifyContent: 'center',
												alignItems: 'center',
											}}>
											<Entypo name='controller-play' size={26} color='black' />
										</Pressable>
									)}
								</Pressable>
								<Pressable onPress={playNextTrack}>
									<Ionicons name='play-skip-forward' size={30} color='white' />
								</Pressable>
								<Pressable>
									<Feather name='repeat' size={30} color='#03C03C' />
								</Pressable>
							</View>
						</View>
					</View>
				</ModalContent>
			</BottomModal>
		</>
	)
}

export default Player

const styles = StyleSheet.create({
	progressbar: {
		height: '100%',
		backgroundColor: 'white',
	},
})
