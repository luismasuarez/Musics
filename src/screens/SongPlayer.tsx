import React from 'react'

import { Block, Button, Image, Text } from '../components'
import usePlayMethods from '../hooks/usePlayMethods'
import useTheme from '../hooks/useTheme'
import BackIocSvg from '../svg/BackIocSvg'
import DownloadSvg from '../svg/DownloadSvg'
import HearSvg from '../svg/HearSvg'
import NextSongSvg from '../svg/NextSong'
import PauseButtonSvg from '../svg/PauseButtonSvg'
import PlayButtonSvg from '../svg/PlayButtonSvg'
import PlaySvg from '../svg/PlaySvg'
import PrevSongSvg from '../svg/PrevSongSvg'
import SettingSvg from '../svg/SettingSvg'
import VolMax from '../svg/VolMaxSvg'
import VolMinus from '../svg/VolMinusSvg'

const SongPlayer = ({ route }) => {
	const { colors, sizes } = useTheme()
	const { song } = route.params

	const { handlePlayPause, isPlaying } = usePlayMethods(song)

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
					<BackIocSvg />
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

			<Block row>
				<VolMinus />
				<Image source={require('../../assets/images/play_cover.png')} mt={50} />
				<VolMax />
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
						Song Title
					</Text>
					<Text color={colors.pl_label} size={sizes.p}>
						Artist
					</Text>
				</Block>
				<Block row gap={18} alignItems='center'>
					<HearSvg />
					<DownloadSvg />
				</Block>
			</Block>

			<Block width='100%' mt={110} bottom={70} justifyContent='space-between'>
				<Block row alignItems='center' justifyContent='center'>
					<Text color={colors.text} size={sizes.p}>
						01:25
					</Text>
					<Text color={colors.text}> / </Text>
					<Text color={colors.pl_label} size={sizes.p}>
						01:25
					</Text>
				</Block>

				<Block
					row
					width='100%'
					ph={70}
					mt={16}
					justifyContent='space-between'
					alignItems='center'>
					<Button
						justifyContent='center'
						alignItems='center'
						onPress={handlePlayPause}>
						<PrevSongSvg />
					</Button>
					<Button
						onPress={handlePlayPause}
						width={55}
						height={55}
						radius={50}
						color={colors.pl_primary}
						alignItems='center'
						justifyContent='center'>
						{isPlaying ? <PauseButtonSvg /> : <PlayButtonSvg />}
					</Button>
					<Button justifyContent='center' alignItems='center'>
						<NextSongSvg />
					</Button>
				</Block>
			</Block>
		</Block>
	)
}

export default SongPlayer
