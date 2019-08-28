import React, { Component } from 'react'
import { Provider } from 'react-redux';
import store from './store/index';
import sagaMiddleware from './middleware/sagaMiddleWare';
import rootSaga from './sagas/rootSaga';
import RootNavigatorState from './navigations/RootNavigatorState';
export default class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <RootNavigatorState />
            </Provider>
        );
    }
}

sagaMiddleware.run(rootSaga);