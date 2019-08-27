import { put, takeEvery } from 'redux-saga/effects';
import * as Types from '../constants/type';
import practiceService from '../services/practiceService';
import * as practiceAction from '../actions/practiceAction';

function* fetchListProblemHierachy(action) {
    try {
        let response = yield practiceService.getListProblemHierachy(action.payload);
        const object = {};
        object.data = response;
        object.payload = action.payload;
        yield put(practiceAction.fetchListProbelmHierachySuccessAction(object));
    } catch (error) {
        yield put(practiceAction.fetchListProbelmHierachyFaildAction(error));
    }
}

function* fetchListProblemHieById(action) {
    try {
        let response = yield practiceService.getListProblemHierachyById(action.payload);
        const object = {};
        object.data = response;
        object.payload = action.payload;
        yield put(practiceAction.fetchListProbelmHieByIdSuccessAction(object));
    } catch (error) {
        yield put(practiceAction.fetchListProbelmHieByIdFaildAction(error));
    }
}

function* fetchPracticeRecent(action) {
    try {
        let response = yield practiceService.getPracticeRecent(action.payload);
        yield put(practiceAction.fetchPraticeRecentSuccessAction(response));
    } catch (error) {
        yield put(practiceAction.fetchPraticeRecentFaildAction(error));
    }
}

function* fetchPracticeInfo(action) {
    try {
        let response = yield practiceService.getPracticeInfo(action.payload);
        yield put(practiceAction.fetchPraticeInfoSuccessAction(response));
    } catch (error) {
        yield put(practiceAction.fetchPraticeInfoFaildAction(error));
    }
}

function* fetchListRelate(action) {
    try {
        let response = yield practiceService.getPracticeRelate(action.payload);
        yield put(practiceAction.fetchPraticeRelateSuccessAction(response));
    } catch (error) {
        yield put(practiceAction.fetchPraticeRelateFaildAction(error));
    }
}

function* fetchListVideo(action) {
    try {
        let response = yield practiceService.getPracticeVideo(action.payload);
        yield put(practiceAction.fetchPraticeVideoSuccessAction(response));
    } catch (error) {
        yield put(practiceAction.fetchPraticeVideoFaildAction(error));
    }
}

function* fetchKiwiSuggestList(action) {
    try {
        let response = yield practiceService.getKiwiSuggestList(action.payload);
        yield put(practiceAction.fetchKiwiSuggestSuccessAction(response));
    } catch (error) {
        yield put(practiceAction.fetchKiwiSuggestFaildAction(error));
    }
}

export function* watchServicePractice() {
    yield takeEvery(Types.FETCH_LIST_PROBLEM_HIERACHY_START_ACTION, fetchListProblemHierachy);
    yield takeEvery(Types.FETCH_LIST_KIWI_SUGGEST_START_ACTION, fetchKiwiSuggestList);
    yield takeEvery(Types.FETCH_LIST_PROBLEM_HIER_BY_ID_START_ACTION, fetchListProblemHieById);
    yield takeEvery(Types.FETCH_PRACTICE_RECENT_START_ACTION, fetchPracticeRecent);
    yield takeEvery(Types.FETCH_PRACTICE_INFO_START_ACTION, fetchPracticeInfo);
    yield takeEvery(Types.FETCH_LIST_PRACTICE_RELATE_START_ACTION, fetchListRelate);
    yield takeEvery(Types.FETCH_LIST_PRACTICE_VIDEO_START_ACTION, fetchListVideo);
}