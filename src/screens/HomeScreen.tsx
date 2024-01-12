import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Block, Button, Text } from '../components'
import { useAuth } from '../context/AuthContext'
import useTheme, { ThemeProvider } from '../hooks/useTheme'

export default function HomeScreen({ navigation }) {
	// Use insets for padding adjust your content in safe area
	const insets = useSafeAreaInsets()
	const { colors, sizes } = useTheme()

	// Call to logout function to navgate to Login Screen
	const { onLogout } = useAuth()

	return (
		<ThemeProvider>
			<Block
				style={{ flex: 1, paddingTop: insets.top }}
				alignItems='center'
				card>
				<Button
					color={colors.primary}
					center
					ph={sizes.base}
					onPress={onLogout}>
					<Text color={colors.invertedText}>Go to Login</Text>
				</Button>
			</Block>
		</ThemeProvider>
	)
}
