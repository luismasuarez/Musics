import { Dispatch, createContext } from 'react'

import { TAction } from './actions'
import initialState, { MusicsState } from './initialState'

interface IContextProps {
	state: MusicsState
	dispatch: Dispatch<TAction>
}

const MusicsContext = createContext<IContextProps>({
	state: initialState,
	dispatch: () => {},
})

export default MusicsContext
