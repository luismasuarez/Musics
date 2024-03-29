import { View, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const VolMinus = () => {
	return (
		<View style={styles.container}>
			<Svg width='21' height='19' viewBox='0 0 21 19' fill='none'>
				<Path
					d='M18.5 4.64282C18.5 4.64282 20 6.14282 20 8.64282C20 11.1428 18.5 12.6428 18.5 12.6428'
					stroke='#A5A5A5'
					stroke-width='1.5'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<Path
					d='M1 10.9998V7.28584C1 6.7554 1.21071 6.24669 1.58579 5.87162C1.96086 5.49655 2.46957 5.28584 3 5.28584H5.9C6.09552 5.28579 6.28674 5.22842 6.45 5.12084L12.45 1.16484C12.6008 1.06556 12.7756 1.00893 12.9559 1.00097C13.1362 0.993013 13.3154 1.03401 13.4743 1.11962C13.6332 1.20523 13.766 1.33226 13.8585 1.48723C13.9511 1.64219 14 1.81933 14 1.99984V16.2858C14 16.4663 13.9511 16.6435 13.8585 16.7984C13.766 16.9534 13.6332 17.0804 13.4743 17.166C13.3154 17.2517 13.1362 17.2927 12.9559 17.2847C12.7756 17.2767 12.6008 17.2201 12.45 17.1208L6.45 13.1648C6.28674 13.0572 6.09552 12.9999 5.9 12.9998H3C2.46957 12.9998 1.96086 12.7891 1.58579 12.414C1.21071 12.039 1 11.5303 1 10.9998Z'
					stroke='#A5A5A5'
					stroke-width='1.5'
				/>
			</Svg>
		</View>
	)
}

export default VolMinus

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
