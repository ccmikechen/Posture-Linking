import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import appReducer from '../reducers';
import ReduxThunk from 'redux-thunk';
import Immutable from 'immutable';

const initialState = Immutable.Map();

export default createStore(
    appReducer,
    initialState,
    applyMiddleware(
        ReduxThunk,
        createLogger({ stateTransformer: state => state.toJS() })
    )
);
