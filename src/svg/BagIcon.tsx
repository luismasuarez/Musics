import * as React from 'react'
import Svg, { Defs, G, Path, SvgProps } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const BagIcon = (props: SvgProps) => (
	<Svg width={70} height={77} fill='none' {...props}>
		<G stroke='#F90' strokeWidth={6} filter='url(#a)'>
			<Path
				strokeLinecap='round'
				d='M25.676 15.433v-3.108a9.325 9.325 0 1 1 18.649 0v3.108m-6.217 31.081V27.865'
			/>
			<Path d='M31.892 52.73a6.216 6.216 0 1 0 0-12.432 6.216 6.216 0 0 0 0 12.432Z' />
			<Path
				strokeLinecap='round'
				d='M44.325 34.081a6.216 6.216 0 0 1-6.217-6.216'
			/>
			<Path
				strokeLinecap='round'
				d='M60.562 35.716c-1.822-9.7-2.73-14.552-6.186-17.418-3.447-2.865-8.382-2.865-18.257-2.865h-2.238c-9.871 0-14.807 0-18.26 2.865-3.45 2.866-4.36 7.718-6.182 17.418-2.558 13.642-3.836 20.461-.106 24.956 3.73 4.491 10.667 4.491 24.545 4.491h2.244c13.878 0 20.819 0 24.545-4.491 2.163-2.611 2.642-5.999 2.163-11.05'
			/>
		</G>
		<Defs />
	</Svg>
)
export default BagIcon
