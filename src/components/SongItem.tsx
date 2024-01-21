import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { Asset } from 'expo-media-library'
import { TouchableOpacity } from 'react-native'

import Block from './Block'
import Text from './Text'
import useTheme from '../hooks/useTheme'

type TSongItemProps = {
	song: Asset
	onPress: () => void
}

const SongItem = ({ song, onPress }: TSongItemProps) => {
	const { colors, sizes } = useTheme()

	return (
		<TouchableOpacity
			onPress={onPress}
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
				<Text weight='bold' size={sizes.p} color={colors.ligth}>
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
		</TouchableOpacity>
	)
}

export default SongItem
