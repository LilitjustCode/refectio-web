import { combineReducers } from 'redux'
import { Auth_reducer } from './auth_reducer'
import { Product_reducer } from './product_reducer'

export default combineReducers({
    Auth_reducer,
    Product_reducer
})
