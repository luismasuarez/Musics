import React from 'react'

import Block from './Block'
import Button from './Button'
import useTheme from '../hooks/useTheme'
import NextSongSvg from '../svg/NextSong'
import PauseButtonSvg from '../svg/PauseButtonSvg'
import PlayButtonSvg from '../svg/PlayButtonSvg'
import PrevSongSvg from '../svg/PrevSongSvg'

type TControlProps = {
	handlePlayPause?: () => Promise<void>
	stop?: () => Promise<void>
	next?: () => Promise<void>
	prev?: () => Promise<void>
	isPlaying?: boolean
}

const PlayerControls = ({
	isPlaying,
	handlePlayPause,
	next,
	prev,
}: TControlProps) => {
	const { colors } = useTheme()

	return (
		<Block
			row
			width='100%'
			ph={70}
			mt={16}
			justifyContent='space-between'
			alignItems='center'>
			<Button justifyContent='center' alignItems='center' onPress={prev}>
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
			<Button justifyContent='center' alignItems='center' onPress={next}>
				<NextSongSvg />
			</Button>
		</Block>
	)
}

export default PlayerControls
