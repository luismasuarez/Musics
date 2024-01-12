import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './hooks/useTheme'

const AppProviders = ({ children }) => {
	return (
		<AuthProvider>
			<NavigationContainer>
				<SafeAreaProvider>
					<ThemeProvider>{children}</ThemeProvider>
				</SafeAreaProvider>
			</NavigationContainer>
		</AuthProvider>
	)
}
export default AppProviders
