import * as Types from '../constants/type';

export const makeRequestProfileParentAction = (payload) => ({
    type: Types.MAKE_REQUEST_PROFILE_PARENT_ACTION, payload
});

export const fetchPathwayAction = (payload) => ({
    type: Types.FETCH_PATHWAY_ACTION, payload
});

export const fetchPathwaySuccessAction = (payload) => ({
    type: Types.FETCH_PATHWAY_SUCCESS_ACTION, payload
});

export const fetchPathwayFailedAction = (payload) => ({
    type: Types.FETCH_PATHWAY_FAILED_ACTION, payload
});

export const fetchFlashCardStartAction = (payload) => ({
    type: Types.FETCH_FLASHCARD_KNOWLEAGE_START_ACTION, payload
});

export const fetchFlashCardSuccessAction = (data) => ({
    type: Types.FETCH_FLASHCARD_KNOWLEAGE_SUCCESS_ACTION, data
});

export const fetchFlashCardFaildAction = (error) => ({
    type: Types.FETCH_FLASHCARD_KNOWLEAGE_FAILD_ACTION, error
});


export const fetchParentNotifyStartAction = (payload) => ({
    type: Types.FETCH_NOTIFY_PARENT_START_ACTION, payload
});

export const fetchParentNotifySuccessAction = (data) => ({
    type: Types.FETCH_NOTIFY_PARENT_SUCCESS_ACTION, data
});

export const fetchParentNotifyFaildAction = (error) => ({
    type: Types.FETCH_NOTIFY_PARENT_FAILD_ACTION, error
});


export const fetchPackageListStartAction = (payload) => ({
    type: Types.FETCH_PACKAGE_LIST_START_ACTION, payload
});

export const fetchPackageListSuccessAction = (data) => ({
    type: Types.FETCH_PACKAGE_LIST_SUCCESS_ACTION, data
});

export const fetchPackageListFaildAction = (error) => ({
    type: Types.FETCH_PACKAGE_LIST_FAILD_ACTION, error
});


export const fetchPackageByidStartAction = (payload) => ({
    type: Types.FETCH_PACKAGE_LIST_BYID_START_ACTION, payload
});

export const fetchPackageByidSuccessAction = (data) => ({
    type: Types.FETCH_PACKAGE_LIST_BYID_SUCCESS_ACTION, data
});

export const fetchPackageByidFaildAction = (error) => ({
    type: Types.FETCH_PACKAGE_LIST_BYID_FAILD_ACTION, error
});

export const fethPackageInfoStartAction = (payload) => ({
    type: Types.FETCH_PACKAGE_INFO_START_ACTION, payload
});

export const fethPackageInfoSuccessAction = (data) => ({
    type: Types.FETCH_PACKAGE_INFO_SUCCESS_ACTION, data
});

export const fethPackageInfoFaildAction = (error) => ({
    type: Types.FETCH_PACKAGE_INFO_FAILD_ACTION, error
});

export const addPackageByIDStartAction = (payload) => ({
    type: Types.ADD_PACKAGE_LIST_BYID_START_ACTION, payload
});

export const addPackageByIDSuccessAction = (data) => ({
    type: Types.ADD_PACKAGE_LIST_BYID_SUCCESS_ACTION, data
});

export const addPackageByIDFaildAction = (error) => ({
    type: Types.ADD_PACKAGE_LIST_BYID_FAILD_ACTION, error
});

export const delPackageByIDStartAction = (payload) => ({
    type: Types.DEL_PACKAGE_LIST_BYID_START_ACTION, payload
});

export const delPackageByIDSuccessAction = (data) => ({
    type: Types.DEL_PACKAGE_LIST_BYID_SUCCESS_ACTION, data
});

export const delPackageByIDFaildAction = (error) => ({
    type: Types.DEL_PACKAGE_LIST_BYID_FAILD_ACTION, error
});

export const saveDataProplemsIdToUpdatePathwayAction = (payload) => ({
    type: Types.SAVE_DATA_PROPLEMS_ID_UPDATE_PATHWAY_ACTION, payload
});

export const getExerciesStartAction = (payload) => ({
    type: Types.GET_EXERCISE_START_ACTION, payload
});

export const getExerciesNotDoneSuccessAction = (data) => ({
    type: Types.GET_EXERCISE_NOT_DONE_SUCCESS_ACTION, data
});

export const getExerciesNotDoneFaildAction = (error) => ({
    type: Types.GET_EXERCISE_NOT_DONE_FAILD_ACTION, error
});

export const getExerciesDoneSuccessAction = (data) => ({
    type: Types.GET_EXERCISE_DONE_SUCCESS_ACTION, data
});

export const getExerciesDoneFaildAction = (error) => ({
    type: Types.GET_EXERCISE_DONE_FAILD_ACTION, error
});

export const getExerciesToAssignStartAction = (payload) => ({
    type: Types.GET_EXERCISE_ASSIGN_START_ACTION, payload
});

export const getExerciesToAssignSuccessAction = (data) => ({
    type: Types.GET_EXERCISE_ASSIGN_SUCCESS_ACTION, data
});

export const getExerciesToAssignFaildAction = (error) => ({
    type: Types.GET_EXERCISE_ASSIGN_FAILD_ACTION, error
});

export const getListLessonFlowByPackageStartAction = (payload) => ({
    type: Types.GET_LESSON_FOLLOW_BY_PACKAGE_START_ACTION, payload
});

export const getListLessonFlowByPackageSuccessAction = (data) => ({
    type: Types.GET_LESSON_FOLLOW_BY_PACKAGE_SUCCESS_ACTION, data
});

export const getListLessonFlowByPackageFaildAction = (error) => ({
    type: Types.GET_LESSON_FOLLOW_BY_PACKAGE_FAILD_ACTION, error
});

export const getExerciseDetailStartAction = (payload) => ({
    type: Types.GET_EXERCISE_DETAIL_START_ACTION, payload
});

export const getExerciseDetailSuccessAction = (data) => ({
    type: Types.GET_EXERCISE_DETAIL_SUCCESS_ACTION, data
});

export const getExerciseDetailFaildAction = (error) => ({
    type: Types.GET_EXERCISE_DETAIL_FAILD_ACTION, error
});

export const getChartDetaillStartAction = (payload) => ({
    type: Types.GET_CHART_DETAIL_START_ACTION, payload
});

export const getChartDetaillSuccessAction = (data) => ({
    type: Types.GET_CHART_DETAIL_SUCCESS_ACTION, data
});

export const getChartDetaillFaildAction = (error) => ({
    type: Types.GET_CHART_DETAIL_FAILED_ACTION, error
});

export const getNotificationsStartAction = (payload) => ({
    type: Types.GET_FETCH_NOTI_START_ACTION, payload
});

export const getNotificationsSuccessAction = (data) => ({
    type: Types.GET_FETCH_NOTI_SUCCESS_ACTION, data
});

export const getNotificationsFailedAction = (error) => ({
    type: Types.GET_FETCH_NOTI_FAILED_ACTION, error
});

export const getSaveParentAvatarStartAction = (payload) => ({
    type: Types.FETCH_SAVE_PARENT_AVATARSTART_ACTION, payload
});

