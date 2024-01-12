import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons'
import { Asset } from 'expo-media-library'
import { ListRenderItemInfo, Pressable, View } from 'react-native'

import Text from './Text'
import { COLORS, SIZES } from '../constants'

type TSongItemProps = {
	track: ListRenderItemInfo<Asset>
}

//  {
//     "mediaType": "audio",
//     "modificationTime": 1704846341000,
//     "uri": "file:///storage/emulated/0/Music/OhMyBass/Feverkin - Sinking.mp3",
//     "filename": "Feverkin - Sinking.mp3",
//     "width": 0,
//     "id": "1000031618",
//     "creationTime": 0,
//     "albumId": "1622371752",
//     "height": 0,
//     "duration": 237.087
//   }

const SongItem = ({ track }: TSongItemProps) => {
	return (
		<Pressable
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				padding: SIZES.base,
			}}>
			<View
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: COLORS.secondary,
					width: 54,
					height: 54,
					borderRadius: SIZES.radius,
				}}>
				<Ionicons name='musical-note' size={SIZES.h3} color={COLORS.text} />
			</View>

			<View style={{ marginLeft: SIZES.base, flex: 1 }}>
				<Text
					style={{
						fontWeight: 'bold',
						fontSize: SIZES.p,
						color: COLORS.ligth,
					}}>
					{track.item.filename}
				</Text>

				<Text style={{ fontSize: SIZES.p, color: COLORS.accent, marginTop: 4 }}>
					{track.item.duration}
				</Text>
			</View>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 7,
					marginHorizontal: SIZES.base,
				}}>
				<AntDesign name='heart' size={SIZES.h4} color={COLORS.primary_accent} />
				<Entypo
					name='dots-three-vertical'
					size={SIZES.h4}
					color={COLORS.ligth}
				/>
			</View>
		</Pressable>
	)
}

export default SongItem
