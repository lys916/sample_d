import { combineReducers } from 'redux';
import {
    payReducer,
} from './venue';

const rootReducer = combineReducers({
    pay: payReducer,
});

export default rootReducer;
