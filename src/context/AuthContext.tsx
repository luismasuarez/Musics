import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

interface IProviderProps {
	children: ReactNode
}

interface AuthProps {
	authState?: { token: string | null; authenticated: boolean | null }
	// onRegister?: (email: string, password: string) => Promise<any>
	onLogin?: () => Promise<any>
	onLogout?: () => Promise<any>
}

const TOKEN_KEY = 'my-jwt'
export const API_URL = 'https://r01.transnet.cu'

const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }: IProviderProps) => {
	const [authState, setAuthState] = useState<{
		token: string | null
		authenticated: boolean | null
	}>({ token: null, authenticated: null })

	useEffect(() => {
		const loadToken = async () => {
			const token = await SecureStore.getItemAsync(TOKEN_KEY)
			if (token) {
				setAuthState({
					token,
					authenticated: true,
				})
			}
		}
		loadToken()
	}, [])

	const login = async () => {
		try {
			const results = await axios.post(
				`${API_URL}/is/oauth2/token?grant_type=password&username=juliocancioalmaguer.gmail.com&scope=openid&password=JulioCancio%401980`,
				null,
				{
					headers: {
						Authorization:
							'Basic NkdBRWZFWmVBb21ORVNrUk1YYm9sMVN3TmtNYTpUejcwYUc0Yk1USzFqdUZuaHdXVGdJQ19rNHNh',
						Accept: 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded',
						'User-Agent': 'okhttp/3.12.0',
					},
				},
			)
			console.log(results.data.id_token)

			setAuthState({
				token: results.data.id_token,
				authenticated: true,
			})

			await SecureStore.setItemAsync(TOKEN_KEY, results.data.id_token)

			return results
		} catch (e) {
			return { error: true, msg: (e as any).response.data.msg }
		}
	}

	const logout = async () => {
		await SecureStore.deleteItemAsync(TOKEN_KEY)

		setAuthState({ token: null, authenticated: null })
	}

	const value = {
		onLogin: login,
		onLogout: logout,
		authState,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
