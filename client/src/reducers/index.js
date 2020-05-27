import { combineReducers } from 'redux';
import { crudReducers } from './app'
// import employee from './employee'

 const rootReducer = combineReducers({
    crudReducers
})

export default rootReducer;
