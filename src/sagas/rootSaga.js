import { fork, all } from 'redux-saga/effects';
import { watchNavigationRoute } from './navigationSagas';
import { watchServiceCommon } from './watchServiceCommon';
import { watchServicePractice } from './watchServicePractice';
import { watchServiceExam } from './watchServiceExam';
import { watchServiceAccount } from './watchServiceAccount';
import { watchServicePackage } from './watchServicePackage';

export default function* rootSaga() {
  yield all([
    fork(watchNavigationRoute),
    fork(watchServiceCommon),
    fork(watchServicePractice),
    fork(watchServiceExam),
    fork(watchServiceAccount),
    fork(watchServicePackage),
  ])
}