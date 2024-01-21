import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { Dimensions } from 'react-native'

import { Block, Image, Text } from '../components'
import SongItem from '../components/SongItem'
import useFetchMusic from '../hooks/useFetchMusic'
import useTheme from '../hooks/useTheme'
import useMuscisContext from '../stores/hook'

const HomeScreen = ({ navigation }) => {
	const { navigate } = navigation
	useFetchMusic(100)
	const { colors } = useTheme()
	const {
		state: { musicAssets },
		dispatch,
	} = useMuscisContext()

	return (
		<Block color={colors.pl_background} align='center' flex={1}>
			<Block row alignItems='center' mt={45}>
				<Image
					source={require('../../assets/icons/bag.png')}
					width={22.52}
					height={25}
					mh={15}
				/>
				<Text color={colors.pl_label} size={25} weight='600'>
					MUSIC BAG
				</Text>
			</Block>

			<Block mt={40} justifyContent='center' alignItems='center'>
				<Image source={require('../../assets/images/cover.png')} />
				<Block bottom={28} alignItems='center' position='absolute'>
					<Text color={colors.text} size={20}>
						SONG TITLE
					</Text>
					<Text color={colors.pl_label} size={12}>
						ARTIST
					</Text>
				</Block>
			</Block>

			<Block
				row
				alignItems='center'
				width='100%'
				mt={50}
				ph={40}
				justify='space-between'>
				<Text color={colors.pl_primary}>Cloud Song</Text>
				<Text color={colors.pl_label}>Device Song</Text>
			</Block>

			<Block height='100%' width={Dimensions.get('screen').width}>
				<FlashList
					data={musicAssets}
					keyExtractor={song => song.id}
					estimatedItemSize={200}
					renderItem={({ item }) => (
						<SongItem
							song={item}
							onPress={() => {
								dispatch({ type: 'SET_CURRENT_TRACK', payload: item })
								navigate('Player', { track: item })
							}}
						/>
					)}
				/>
			</Block>
		</Block>
	)
}

export default HomeScreen
