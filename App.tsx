import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import { ModalPortal } from 'react-native-modals'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import AppProviders from './src/AppProviders'
import HomeScreen from './src/screens/HomeScreen'
import SongPlayer from './src/screens/SongPlayer'
import MusicsProvider from './src/stores/provider'

const Stack = createNativeStackNavigator()

export default function App() {
	const [fontsLoaded] = useFonts({
		'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
		'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
		'Rubik-SemiBold': require('./assets/fonts/Rubik-SemiBold.ttf'),
	})

	if (!fontsLoaded) {
		return (
			<SafeAreaProvider>
				<Text>Loading fonts...</Text>
			</SafeAreaProvider>
		)
	}

	return (
		<MusicsProvider>
			<AppProviders>
				<Layout />
				<StatusBar style='auto' />
				<ModalPortal />
			</AppProviders>
		</MusicsProvider>
	)
}

export const Layout = () => {
	return (
		<Stack.Navigator initialRouteName='Home'>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Player'
				component={SongPlayer}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	)
}
