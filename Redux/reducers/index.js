import { combineReducers } from 'redux';
import {addItemsReducer} from './ItemReducer';
import {deleteItemReducer} from './ItemReducer'

const appReducer = combineReducers({
    addItemsReducer,deleteItemReducer
})


const rootReducer = (state,action) => {
    return appReducer(state,action)
}

export default rootReducer;