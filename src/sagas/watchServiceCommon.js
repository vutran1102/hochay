import { put, takeEvery } from 'redux-saga/effects';
import * as Types from '../constants/type';
import commonService from '../services/commonService';
import parentService from '../services/parentService';
import * as commonAction from '../actions/commonAction';
import * as parentAction from '../actions/parentAction';
import * as practiceService from '../services/practiceService';

function* fetchListGrade(action) {
    try {
        let response = yield commonService.fetchListGrades(action.payload);
        yield put(commonAction.fetListGradeSuccessAction(response));
        return action.payload.resolve(response);
    } catch (error) {
        yield put(commonAction.fetListGradeFaildAction(error));
        return action.payload.reject(error);
    }
}

function* fetchExcerciseMisson(action) {
    try {
        let response = yield commonService.fetchListExerciseAssigned(action.payload);
        yield put(commonAction.fetchMissonByPackageCodeStudentSuccessAction(response));
        return action.payload.resolve(response);
    } catch (err) {
        yield put(commonAction.fetchMissonByPackageCodeStudentFailedAction(err));
        return action.payload.reject(err);
    }
}


function* fetchListSubject(action) {
    try {
        let response = yield commonService.fetchListSubject(action.payload);
        yield put(commonAction.fetchListSubjectSuccessAction(response));
    } catch (error) {
        yield put(commonAction.fetchListSubjectFaildAction(error));
    }
}

function* fetchPathwayBuyId(action) {
    try {
        let response = yield parentService.getPathwayByUserId(action.payload);
        // console.log('response fetchPathwayBuyId : ', JSON.stringify(response));
        yield put(parentAction.fetchPathwaySuccessAction(response))
    } catch(error) {
        yield put(parentAction.fetchPathwayFailedAction(error))
    }
}

function* fetchExercise(action) {
    try {
        let response = yield parentService.fetchExercise(action.payload);
        if(!action.payload.type) {
            yield put(parentAction.getExerciesNotDoneSuccessAction(response));
        } else {
            yield put(parentAction.getExerciesDoneSuccessAction(response))
        }
        if(action.payload.resolve) return action.payload.resolve(response);
    } catch(error) {
        if(!action.payload.type) {
            yield put(parentAction.getExerciesNotDoneFaildAction(error));
        } else {
            yield put(parentAction.getExerciesDoneFaildAction(error))
        }
        if (action.payload.resolve) return action.payload.resolve(error);
    }
}

function* fetchExerciseToAssign(action) {
    try {
        let response = yield parentService.fetchExercisesToAssign(action.payload);
        yield put(parentAction.getExerciesToAssignSuccessAction(response))
    } catch(error) {
        yield put(parentAction.getExerciesToAssignFaildAction(error))
    }
}

function* fetchLessonFollowPackage(action) {
    try {
        let response = yield parentService.getListLessonFollowPackageById(action.payload);
        yield put(parentAction.getListLessonFlowByPackageSuccessAction(response))
    } catch(error) {
        yield put(parentAction.getListLessonFlowByPackageFaildAction(error))
    }
}

function* fetchExerciseDetail(action) {
    console.log('fetchExerciseDetail');
    try {
        let response = yield parentService.getDetailExercise(action.payload);
        yield put(parentAction.getExerciseDetailSuccessAction(response));
        action.payload.resolve(response);
    } catch(error) {
        yield put(parentAction.getExerciseDetailFaildAction(error));
        action.payload.reject(error);
    }
}

function* fetchChartDetail(action) {
    try {
        let response = yield practiceService.getChartSubuserDetail(action.payload);
        yield put(parentAction.getChartDetaillSuccessAction(response));
    } catch(error) {
        yield put(parentAction.getChartDetaillFaildAction(error));
    }
}

function* fetchListNotification(action) {
    try {
        let response = yield parentService.fetchNotifications(action.payload);
        yield put(parentAction.getNotificationsSuccessAction(response));
    } catch(error) {
        yield put(parentAction.getNotificationsFailedAction(error));
    }
}

export function* watchServiceCommon() {
    yield takeEvery(Types.FETCH_LIST_GRADE_START_ACTION, fetchListGrade);
    yield takeEvery(Types.FETCH_PATHWAY_ACTION, fetchPathwayBuyId);
    yield takeEvery(Types.FETCH_LIST_SUBJECT_START_ACTION, fetchListSubject);
    yield takeEvery(Types.GET_EXERCISE_START_ACTION, fetchExercise);
    yield takeEvery(Types.GET_EXERCISE_ASSIGN_START_ACTION,fetchExerciseToAssign);
    yield takeEvery(Types.GET_LESSON_FOLLOW_BY_PACKAGE_START_ACTION,fetchLessonFollowPackage);
    yield takeEvery(Types.GET_EXERCISE_DETAIL_START_ACTION,fetchExerciseDetail);
    yield takeEvery(Types.GET_CHART_DETAIL_START_ACTION,fetchChartDetail);
    yield takeEvery(Types.GET_FETCH_NOTI_START_ACTION,fetchListNotification);
    yield takeEvery(Types.FETCH_MISSON_FROM_CHILD_START_ACTION , fetchExcerciseMisson);
}