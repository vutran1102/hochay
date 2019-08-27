import { put, takeEvery } from 'redux-saga/effects';
import * as Types from '../constants/type';
import authService from '../services/authService';
import apiFlashcard from '../services/apiFlashcard';
import notifiService from '../services/notifiService';
import * as authAction from '../actions/authAction';
import * as parentAction from '../actions/parentAction';

function* fetchListChild(action) {
    try {
        let response = yield authService.fetchListChild(action.payload);
        yield put(authAction.fetchListChildSuccessAction(response));
        action.payload.resolve && action.payload.resolve(response);
    } catch (error) {
        yield put(authAction.fetchListChildFaildAction(error));
        action.payload.reject && action.payload.reject(error);
    }
}


function* fetchAddChild(action) {
    try {
        let response = yield authService.addChildSubUser(action.payload);
        yield put(authAction.fetchAddChildSuccessAction(response));
        action.payload.resolve(response);
    } catch (error) {
        yield put(authAction.fetchAddChildFaildAction(error));
        action.payload.reject(error);
    }
}

function* fetchUpdateChild(action) {
    try {
        let response = yield authService.fetchUpdateSubUser(action.payload);
        yield put(authAction.fetchUpdateChildSuccessAction(response));
        action.payload.resolve(response);
    } catch (error) {
        yield put(authAction.fetchUpdateChildFaildAction(error));
        action.payload.reject(error);
    }
}

function* fetchRemoveChild(action) {
    try {
        let response = yield authService.fetchRemoveSubUser(action.payload);
        const obj = new Object();
        obj.userId = action.payload.userId;
        obj.response = response;
        yield put(authAction.fetchRemoveChildSuccessAction(obj));
        action.payload.resolve(response);
    } catch (error) {
        yield put(authAction.fetchRemoveChildFaildAction(error));
        action.payload.reject(error);
    }
}

function* fecthProfileUpdate(action) {
    try {
        let response = yield authService.postUpdateParent(action.payload);
        yield put(authAction.fetchProfileUpdateSuccessAction(response));
    } catch (error) {
        yield put(authAction.fetchProfileUpdateFaildAction(error));
    }
}

function* fetchFlashCardKnowleage(action) {
    try {
        let response = yield apiFlashcard.getFlashCardVideo(action.payload);
        yield put(parentAction.fetchFlashCardSuccessAction(response));
    } catch (error) {
        yield put(parentAction.fetchFlashCardFaildAction(error));
    }
}

function* fetchNotifyParent(action) {
    try {
        // to do waiting api
        let response = yield notifiService.getNotificationMessage(action.payload);
        yield put(parentAction.fetchParentNotifySuccessAction(response));
    } catch (error) {
        alert(JSON.stringify(error));
        yield put(parentAction.fetchParentNotifyFaildAction(error));
    }
}

export function* watchServiceAccount() {
    yield takeEvery(Types.FETCH_PROFILE_UPDATE_START_ACTION, fecthProfileUpdate);
    yield takeEvery(Types.FETCH_LIST_CHILD_START_ACTION, fetchListChild);
    yield takeEvery(Types.FETCH_ADD_CHILD_START_ACTION, fetchAddChild);
    yield takeEvery(Types.FETCH_UPDATE_CHILD_START_ACTION, fetchUpdateChild);
    yield takeEvery(Types.FETCH_REMOVE_CHILD_START_ACTION, fetchRemoveChild);
    yield takeEvery(Types.FETCH_FLASHCARD_KNOWLEAGE_START_ACTION, fetchFlashCardKnowleage);
    yield takeEvery(Types.FETCH_NOTIFY_PARENT_START_ACTION, fetchNotifyParent);
}