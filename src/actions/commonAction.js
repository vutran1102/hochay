import * as Types from '../constants/type';

export const fetListGradeStartAction = (payload) => ({
    type: Types.FETCH_LIST_GRADE_START_ACTION, payload
});

export const createFirstChildAction = (payload) => ({
    type: Types.CREATE_FIRST_CHILD_ACTION, payload
});

export const fetListGradeSuccessAction = (data) => ({
    type: Types.FETCH_LIST_GRADE_SUCCESS_ACTION, data
});

export const fetListGradeFaildAction = (error) => ({
    type: Types.FETCH_LIST_GRADE_FAILD_ACTION, error
});

export const fetchListSubjectStartAction = (payload) => ({
    type: Types.FETCH_LIST_SUBJECT_START_ACTION, payload
});

export const fetchListSubjectSuccessAction = (data) => ({
    type: Types.FETCH_LIST_SUBJECT_SUCCESS_ACTION, data
});

export const fetchListSubjectFaildAction = (error) => ({
    type: Types.FETCH_LIST_SUBJECT_FAILD_ACTION, error
});

export const saveStackNavigatorAction = (navigator) => ({
    type: Types.SAVE_NAVIGATOR_ACTION, navigator 
})

export const fetchMissonDataStartAction = (payload) => ({
    type: Types.FETCH_CHILD_MISSONS_START_ACTION, payload
})

export const fetchMissonDataSuccessAction = (payload) => ({
    type: Types.FETCH_CHILD_MISSONS_SUCCESS_ACTION, payload
})

export const fetchMissonDataFailedAction = (payload) => ({
    type: Types.FETCH_CHILD_MISSONS_FAILED_ACTION, payload
})

export const fetchMissonByPackageCodeStudentStartAction = (payload) => ({
    type: Types.FETCH_MISSON_FROM_CHILD_START_ACTION, payload
})

export const fetchMissonByPackageCodeStudentSuccessAction = (payload) => ({
    type: Types.FETCH_MISSON_FROM_CHILD_SUCCESS_ACTION, payload
})

export const fetchMissonByPackageCodeStudentFailedAction = (payload) => ({
    type: Types.FETCH_MISSON_FROM_CHILD_FAILED_ACTION, payload
})



