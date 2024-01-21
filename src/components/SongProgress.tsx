import React from 'react'

import Block from './Block'
import Text from './Text'
import useTheme from '../hooks/useTheme'

type TPropgressProps = {
	progress: number
	currentProgress?: string
	totalDuration?: string
}

const circleSize = 12

const SongProgress = ({
	progress,
	currentProgress,
	totalDuration,
}: TPropgressProps) => {
	const { colors, sizes } = useTheme()
	return (
		<Block ph={sizes.padding} pv={sizes.base}>
			<Block row alignItems='center' justifyContent='center'>
				<Text color={colors.text} size={sizes.p}>
					{currentProgress}
				</Text>
				<Text color={colors.text}> / </Text>
				<Text color={colors.pl_label} size={sizes.p}>
					{totalDuration}
				</Text>
			</Block>

			<Block mt={10}>
				<Block
					width='100%'
					mt={sizes.base}
					height={3}
					color={colors.pl_label}
					radius={sizes.radius}>
					<Block
						height='100%'
						color='#fff'
						width={`${progress * 100}%`}
						radius={sizes.radius}
					/>
					<Block
						position='absolute'
						top={-5}
						width={circleSize}
						height={circleSize}
						radius={circleSize / 2}
						color={colors.text}
						left={`${progress * 100}%`}
						ml={-circleSize / 2}
					/>
				</Block>
			</Block>
		</Block>
	)
}

export default SongProgress
