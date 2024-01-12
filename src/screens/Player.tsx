import {
	AntDesign,
	Entypo,
	Ionicons,
	MaterialCommunityIcons,
} from '@expo/vector-icons'
import { useState } from 'react'
import { FlatList, Pressable, ScrollView, View } from 'react-native'

import { Block, Input, Text } from '../components'
import SongItem from '../components/SongItem'
import { COLORS, SIZES } from '../constants'
import useFetchMusic from '../hooks/useFetchMusic'
import useMuscisContext from '../stores/hook'

const Player = () => {
	useFetchMusic()
	const {
		state: { musicAssets },
	} = useMuscisContext()
	const [input, setInput] = useState('')
	console.log(JSON.stringify(musicAssets, null, 2))

	const playTrack = async () => {}

	return (
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
					<AntDesign name='arrowdown' size={20} color={COLORS.primary_accent} />
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
	)
}

export default Player
