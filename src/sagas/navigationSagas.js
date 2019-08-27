import { put, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

function* navigationActions(action) {
  switch (action.type) {
    default:
      yield put(NavigationActions.back());
  }
}

export function* watchNavigationRoute() {
  
}
