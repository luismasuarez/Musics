import React from 'react'

import Block from './Block'
import Text from './Text'
import useTheme from '../hooks/useTheme'

type TPropgressProps = {
	currentProgress?: number
	totalDuration?: number
}

const SongProgress = ({ currentProgress, totalDuration }: TPropgressProps) => {
	const { colors, sizes } = useTheme()
	return (
		<Block row alignItems='center' justifyContent='center'>
			<Text color={colors.text} size={sizes.p}>
				{currentProgress}
			</Text>
			<Text color={colors.text}> / </Text>
			<Text color={colors.pl_label} size={sizes.p}>
				{totalDuration}
			</Text>
		</Block>
	)
}

export default SongProgress
