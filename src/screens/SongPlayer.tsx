import { Asset } from 'expo-media-library'
import React from 'react'

import { Block, Button, Image, Text } from '../components'
import PlayerControls from '../components/PlayerControls'
import SongProgress from '../components/SongProgress'
import usePlayerMethods from '../hooks/usePlayerMethods'
import useTheme from '../hooks/useTheme'
import {
	BackIocSvg,
	DownloadSvg,
	HearSvg,
	PlaySvg,
	SettingSvg,
	VolMaxSvg,
	VolMinusSvg,
} from '../svg'

const SongPlayer = ({ route, navigation }) => {
	const { colors, sizes } = useTheme()
	const { song } = route.params
	const sound: Asset = song

	const { handleUnloadSound, handlePlayPause, isPlaying } =
		usePlayerMethods(song)
	const handleBack = () => {
		handleUnloadSound()
		navigation.goBack()
	}

	return (
		<Block
			color={colors.pl_background}
			flex={1}
			justifyContent='center'
			alignItems='center'>
			<Block
				row
				width='100%'
				justifyContent='space-between'
				ph={30}
				mt={40}
				alignItems='center'>
				<Block
					width={32}
					height={32}
					color={colors.pl_container}
					justifyContent='center'
					alignItems='center'
					radius={8}>
					<Button
						alignItems='center'
						justifyContent='center'
						onPress={handleBack}>
						<BackIocSvg />
					</Button>
				</Block>
				<Block
					width={32}
					height={32}
					color={colors.pl_container}
					justifyContent='center'
					alignItems='center'
					radius={8}>
					<SettingSvg />
				</Block>
			</Block>

			<Block row alignItems='center'>
				<Button justifyContent='center' alignItems='center'>
					<VolMinusSvg />
				</Button>
				<Image source={require('../../assets/images/play_cover.png')} mt={50} />
				<Button justifyContent='center' alignItems='center'>
					<VolMaxSvg />
				</Button>
			</Block>

			<Block row alignItems='center' width='100%' ph={30} mt={100}>
				<PlaySvg />
				<Text color={colors.pl_label} ml={7}>
					100 Plays
				</Text>
			</Block>

			<Block
				row
				width='100%'
				justifyContent='space-between'
				ph={30}
				mt={5}
				alignItems='flex-start'>
				<Block>
					<Text color={colors.text} size={sizes.h5}>
						{sound.filename}
					</Text>
					<Text color={colors.pl_label} size={sizes.p}>
						{sound.albumId}
					</Text>
				</Block>
				<Block row gap={18} alignItems='center'>
					<HearSvg />
					<DownloadSvg />
				</Block>
			</Block>

			<Block width='100%' mt={110} bottom={70} justifyContent='space-between'>
				<SongProgress
					currentProgress={song.duration}
					totalDuration={song.duration}
				/>

				<PlayerControls
					handlePlayPause={handlePlayPause}
					isPlaying={isPlaying}
				/>
			</Block>
		</Block>
	)
}

export default SongPlayer
