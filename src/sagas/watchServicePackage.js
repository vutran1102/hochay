import { put, takeEvery } from 'redux-saga/effects';
import * as Types from '../constants/type';
import parentService from '../services/parentService';
import * as parentAction from '../actions/parentAction';

function* fetchPakageList(action) {
    try {
        let response = yield parentService.getPackageListAll(action.payload);
        yield put(parentAction.fetchPackageListSuccessAction(response));
    } catch (error) {
        yield put(parentAction.fetchPackageListFaildAction(error));
    }
}

function* fetchPakageByid(action) {
    try {
        let response = yield parentService.getPackageListByUserid(action.payload);
        yield put(parentAction.fetchPackageByidSuccessAction(response));
    } catch (error) {
        yield put(parentAction.fetchPackageByidFaildAction(error));
    }
}

function* fetchPakageInfo(action) {
    try {
        let response = yield parentService.getPackageInfo(action.payload);
        yield put(parentAction.fethPackageInfoSuccessAction(response));
    } catch (error) {
        yield put(parentAction.fethPackageInfoFaildAction(error));
    }
}

function* addPackageById(action) {
    try {
        let response = yield parentService.addPackageUserid(action.payload);
        yield put(parentAction.addPackageByIDSuccessAction(response));
        action.payload.resolve(response);
    } catch (error) {
        yield put(parentAction.addPackageByIDFaildAction(error));
        action.payload.reject(error);
    }
}

function* delPackageById(action) {
    try {
        let response = yield parentService.deletePackageUserid(action.payload);
        let dataObj = {};
        dataObj.data = response;
        dataObj.packageCode = action.payload.packageCode;
        yield put(parentAction.delPackageByIDSuccessAction(dataObj));
    } catch (error) {
        yield put(parentAction.delPackageByIDFaildAction(error));
    }
}

export function* watchServicePackage() {
    yield takeEvery(Types.FETCH_PACKAGE_LIST_START_ACTION, fetchPakageList);
    yield takeEvery(Types.FETCH_PACKAGE_LIST_BYID_START_ACTION, fetchPakageByid);
    yield takeEvery(Types.FETCH_PACKAGE_INFO_START_ACTION, fetchPakageInfo);
    yield takeEvery(Types.ADD_PACKAGE_LIST_BYID_START_ACTION, addPackageById);
    yield takeEvery(Types.DEL_PACKAGE_LIST_BYID_START_ACTION, delPackageById);
}