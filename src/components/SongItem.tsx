import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { Asset } from 'expo-media-library'
import { Pressable } from 'react-native'

import Block from './Block'
import Text from './Text'
import useTheme from '../hooks/useTheme'

type TSongItemProps = {
	song: Asset
}

const SongItem = ({ song }: TSongItemProps) => {
	const { colors, sizes } = useTheme()
	return (
		<Pressable
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				padding: sizes.padding,
				marginHorizontal: sizes.base,
				marginVertical: sizes.radius,
				backgroundColor: colors.pl_container,
				borderRadius: 13,
			}}>
			<Block
				justifyContent='center'
				alignItems='center'
				color={colors.pl_primary}
				width={40}
				height={40}
				radius={sizes.radius}>
				<Ionicons name='musical-note' size={sizes.h3} color={colors.text} />
			</Block>

			<Block ml={sizes.base} flex={1}>
				<Text
					style={{
						fontWeight: 'bold',
						fontSize: sizes.p,
						color: colors.ligth,
					}}>
					{song.filename}
				</Text>
			</Block>

			<Block
				row
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 7,
					marginHorizontal: sizes.base,
				}}>
				<AntDesign name='heart' size={20} color={colors.pl_label} />
				<Entypo name='dots-three-vertical' size={20} color={colors.ligth} />
			</Block>
		</Pressable>
	)
}

export default SongItem
