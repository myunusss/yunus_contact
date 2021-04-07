import { contactReducer } from '../Reducers/ContactReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"

const rootReducer = combineReducers(
  {
    contactReducer
  }
);

export default createStore(rootReducer, applyMiddleware(thunk));