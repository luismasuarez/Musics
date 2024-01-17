import Svg, { Defs, G, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const BagIcon = () => (
	<Svg width='70' height='77' viewBox='0 0 70 77' fill='none'>
		<G filter='url(#filter0_d_3_164)'>
			<Path
				d='M25.6758 15.4326V12.3245C25.6758 9.85145 26.6582 7.47974 28.4068 5.73107C30.1555 3.9824 32.5272 3 35.0002 3C37.4732 3 39.8449 3.9824 41.5936 5.73107C43.3423 7.47974 44.3247 9.85145 44.3247 12.3245V15.4326M38.1084 46.5141V27.8652'
				stroke='#FF9900'
				stroke-width='6'
				stroke-linecap='round'
			/>
			<Path
				d='M31.8921 52.7304C35.3253 52.7304 38.1084 49.9473 38.1084 46.5141C38.1084 43.0809 35.3253 40.2978 31.8921 40.2978C28.4589 40.2978 25.6758 43.0809 25.6758 46.5141C25.6758 49.9473 28.4589 52.7304 31.8921 52.7304Z'
				stroke='#FF9900'
				stroke-width='6'
			/>
			<Path
				d='M44.3247 34.0815C42.676 34.0815 41.0949 33.4266 39.9291 32.2608C38.7633 31.095 38.1084 29.5139 38.1084 27.8652'
				stroke='#FF9900'
				stroke-width='6'
				stroke-linecap='round'
			/>
			<Path
				d='M60.5616 35.7164C58.7402 26.0159 57.8326 21.164 54.3763 18.2983C50.9294 15.4326 45.9936 15.4326 36.1191 15.4326H33.8812C24.0097 15.4326 19.074 15.4326 15.6208 18.2983C12.1708 21.164 11.2601 26.0159 9.43869 35.7164C6.88068 49.3581 5.60323 56.1774 9.33301 60.6717C13.0628 65.163 20.0002 65.163 33.8781 65.163H36.1222C50.0001 65.163 56.9406 65.163 60.6672 60.6717C62.8305 58.0609 63.3092 54.673 62.8305 49.6223'
				stroke='#FF9900'
				stroke-width='6'
				stroke-linecap='round'
			/>
		</G>
		<Defs>
			<filter
				id='filter0_d_3_164'
				x='0'
				y='0'
				width='70.0002'
				height='76.163'
				filterUnits='userSpaceOnUse'
				colorInterpolationFilters='sRGB'>
				<feFlood floodOpacity='0' result='BackgroundImageFix' />
				<feColorMatrix
					in='SourceAlpha'
					type='matrix'
					values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
					result='hardAlpha'
				/>
				<feOffset dy='4' />
				<feGaussianBlur stdDeviation='2' />
				<feComposite in2='hardAlpha' operator='out' />
				<feColorMatrix
					type='matrix'
					values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
				/>
				<feBlend
					mode='normal'
					in2='BackgroundImageFix'
					result='effect1_dropShadow_3_164'
				/>
				<feBlend
					mode='normal'
					in='SourceGraphic'
					in2='effect1_dropShadow_3_164'
					result='shape'
				/>
			</filter>
		</Defs>
	</Svg>
)
export default BagIcon
