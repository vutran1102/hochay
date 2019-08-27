import { put, takeEvery } from 'redux-saga/effects';
import * as Types from '../constants/type';
import examService from '../services/examService';
import * as examAction from '../actions/examAction';

function* fetchListTestByPage(action) {
    try {
        let response = yield examService.fetchListTestByPage(action.payload);
        const object = {};
        object.data = response;
        object.payload = action.payload;
        yield put(examAction.fetchListTestSuccessAction(object));
    } catch (error) {
        yield put(examAction.fetchListTestFaildAction(error));
    }
}


function* fetchTestInfo(action) {
    try {
        let response = yield examService.fetchTestInfo(action.payload);
        yield put(examAction.fetchTestInfoSuccessAction(response));
    } catch (error) {
        yield put(examAction.fetchTestInfoFaildAction(error));
    }
}

function* fetchTestDone(action) {
    try {
        let response = yield examService.fetchTestDone(action.payload);
        yield put(examAction.fetchTestDoneSuccessAction(response));
        action.payload.resolve(response);
    } catch (error) {
        yield put(examAction.fetchTestDoneFaildAction(error));
        action.payload.reject();
    }
}

export function* watchServiceExam() {
    yield takeEvery(Types.FETCH_LIST_TEST_PAGE_START_ACTION, fetchListTestByPage);
    yield takeEvery(Types.FETCH_TEST_INFO_START_ACTION, fetchTestInfo);
    yield takeEvery(Types.FETCH_TEST_DONE_START_ACTION, fetchTestDone);
}