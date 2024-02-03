import {createStore, combineReducers} from 'redux';
import stockReducer from './stockReducer';

const reducers = combineReducers({
  stock: stockReducer
})

const store = createStore(reducers);

export default store