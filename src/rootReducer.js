import { combineReducers } from 'redux'

import albums from './redux/albums/reducer'

const rootReducer = combineReducers({ albums })

export default rootReducer
