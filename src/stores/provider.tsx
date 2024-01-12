import { useReducer } from 'react'

import MusicsContext from './context'
import initialState from './initialState'
import { reducer } from './reducer'

interface Props {
	children: React.ReactNode
}

const MusicsProvider: React.FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<MusicsContext.Provider value={{ state, dispatch }}>
			{children}
		</MusicsContext.Provider>
	)
}

export default MusicsProvider
