import { ImageURISource } from 'react-native'

interface IconAsset extends ImageURISource {
	width: number
	height: number
}

export const ICON_PLAY_BUTTON: IconAsset = {
	uri: '../../assets/images/play_button@1x.png',
	width: 34,
	height: 51,
}

export const ICON_PAUSE_BUTTON: IconAsset = {
	uri: '../../assets/images/pause_button@1x.png',
	width: 34,
	height: 51,
}

export const ICON_STOP_BUTTON: IconAsset = {
	uri: '../../assets/images/stop_button@1x.png',
	width: 22,
	height: 22,
}

export const ICON_FORWARD_BUTTON: IconAsset = {
	uri: '../../assets/images/forward_button@1x.png',
	width: 33,
	height: 25,
}

export const ICON_BACK_BUTTON: IconAsset = {
	uri: '../../assets/images/back_button@1x.png',
	width: 33,
	height: 25,
}

export const ICON_LOOP_ALL_BUTTON: IconAsset = {
	uri: '../../assets/images/loop_all_button.png',
	width: 77,
	height: 35,
}

export const ICON_LOOP_ONE_BUTTON: IconAsset = {
	uri: '../../assets/images/loop_one_button.png',
	width: 77,
	height: 35,
}

export const ICON_MUTED_BUTTON: IconAsset = {
	uri: '../../assets/images/muted_button@1x.png',
	width: 67,
	height: 58,
}

export const ICON_UNMUTED_BUTTON: IconAsset = {
	uri: '../../assets/images/unmuted_button@1x.png',
	width: 67,
	height: 58,
}

export const ICON_TRACK_1: IconAsset = {
	uri: '../../assets/images/track_1@1x.png',
	width: 166,
	height: 5,
}

export const ICON_THUMB_1: IconAsset = {
	uri: '../../assets/images/thumb_1@1x.png',
	width: 18,
	height: 19,
}
export const ICON_THUMB_2: IconAsset = {
	uri: '../../assets/images/thumb_2@1x.png',
	width: 15,
	height: 19,
}
