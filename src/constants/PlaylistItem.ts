type PlaylistItem = {
	name: string
	uri: string
	isVideo: boolean
}

export const PLAYLIST: PlaylistItem[] = [
	{
		name: 'Comfort Fit - “Sorry”',
		uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
		isVideo: false,
	},
	{
		name: 'Big Buck Bunny',
		uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
		isVideo: true,
	},
	{
		name: 'Mildred Bailey – “All Of Me”',
		uri: 'https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3',
		isVideo: false,
	},
	{
		name: 'Popeye - I dont scare',
		uri: 'https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4',
		isVideo: true,
	},
	{
		name: 'Podington Bear - “Rubber Robot”',
		uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3',
		isVideo: false,
	},
]
