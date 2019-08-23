import * as Types from '../constants/type';

export const fetchListTestStartAction = (payload) => ({
    type: Types.FETCH_LIST_TEST_PAGE_START_ACTION, payload
});

export const fetchListTestSuccessAction = (data) => ({
    type: Types.FETCH_LIST_TEST_PAGE_SUCCESS_ACTION, data
});

export const fetchListTestFaildAction = (error) => ({
    type: Types.FETCH_LIST_TEST_PAGE_FAILD_ACTION, error
});

export const fetchTestInfoStartAction = (payload) => ({
    type: Types.FETCH_TEST_INFO_START_ACTION, payload
});

export const fetchTestInfoSuccessAction = (data) => ({
    type: Types.FETCH_TEST_INFO_SUCCESS_ACTION, data
});

export const fetchTestInfoFaildAction = (error) => ({
    type: Types.FETCH_TEST_INFO_FAILD_ACTION, error
});

export const fetchTestDoneStartAction = (payload) => ({
    type: Types.FETCH_TEST_DONE_START_ACTION, payload
});

export const fetchTestDoneSuccessAction = (data) => ({
    type: Types.FETCH_TEST_DONE_SUCCESS_ACTION, data
});

export const fetchTestDoneFaildAction = (error) => ({
    type: Types.FETCH_TEST_DONE_FAILD_ACTION, error
});