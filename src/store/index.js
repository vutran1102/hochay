import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from '../reducers/rootReducer';
import navMiddleWare from '../middleware/navMiddleware';
import sagaMiddleware from '../middleware/sagaMiddleWare';

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8081 });

const store = createStore(rootReducer, undefined, applyMiddleware(navMiddleWare, sagaMiddleware));

if (__DEV__) store.subscribe(() => console.log(store.getState()));

export default store;