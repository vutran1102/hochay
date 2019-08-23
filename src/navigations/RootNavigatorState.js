import React, { Component } from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import {
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import RootNavigator from './RootNavigator';
import { alertExitApp } from '../utils/Alert';

//NOT REQUIRE KEY
import navMiddleware from '../middleware/navMiddleware';
const addListener = createReduxBoundAddListener("root");

class RootNavigatorState extends Component {

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index == 1) {
      if (nav.routes[1].index === 0) {
        alertExitApp(BackHandler);
        return true;
      }
    }
    if (nav.index == 2) {
      if (nav.routes[2].index === 0) {
        alertExitApp(BackHandler);
        return true;
      }
    }
    dispatch(NavigationActions.back());
    return true;
  };


  render() {
    return (
      <RootNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(RootNavigatorState);