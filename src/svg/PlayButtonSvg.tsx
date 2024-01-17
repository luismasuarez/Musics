import React from 'react'
import Svg, { Path } from 'react-native-svg'

const PlayButtonSvg = () => {
	return (
		<Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
			<Path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M20 10.0002C20 8.96518 19.4421 7.93018 18.3253 7.35318L4.83895 0.38518C2.66737 -0.73582 0 0.72418 0 3.03318V10.0002H20Z'
				fill='white'
			/>
			<Path
				opacity='0.5'
				d='M4.83895 19.6142L18.3253 12.6472C18.8317 12.3927 19.2554 12.0117 19.5505 11.5452C19.8457 11.0787 20.0011 10.5445 20 10.0002H0V16.9672C0 19.2772 2.66737 20.7352 4.83895 19.6142Z'
				fill='white'
			/>
		</Svg>
	)
}

export default PlayButtonSvg
