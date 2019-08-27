import * as Types from '../constants/type';

export const fetchListProbelmHierachyStartAction = (payload) => ({
    type: Types.FETCH_LIST_PROBLEM_HIERACHY_START_ACTION, payload
});

export const fetchListProbelmHierachySuccessAction = (data) => ({
    type: Types.FETCH_LIST_PROBLEM_HIERACHY_SUCCESS_ACTION, data
});

export const fetchListProbelmHierachyFaildAction = (error) => ({
    type: Types.FETCH_LIST_PROBLEM_HIERACHY_FAILD_ACTION, error
});

export const fetchListProbelmHieByIdStartAction = (payload) => ({
    type: Types.FETCH_LIST_PROBLEM_HIER_BY_ID_START_ACTION, payload
});

export const fetchListProbelmHieByIdSuccessAction = (data) => ({
    type: Types.FETCH_LIST_PROBLEM_HIER_BY_ID_SUCCESS_ACTION, data
});

export const fetchListProbelmHieByIdFaildAction = (error) => ({
    type: Types.FETCH_LIST_PROBLEM_HIER_BY_ID_FAILD_ACTION, error
});

export const fetchPraticeRecentStartAction = (payload) => ({
    type: Types.FETCH_PRACTICE_RECENT_START_ACTION, payload
});

export const fetchPraticeRecentSuccessAction = (data) => ({
    type: Types.FETCH_PRACTICE_RECENT_SUCCESS_ACTION, data
});

export const fetchPraticeRecentFaildAction = (error) => ({
    type: Types.FETCH_PRACTICE_RECENT_FAILD_ACTION, error
});

export const fetchPraticeInfoStartAction = (payload) => ({
    type: Types.FETCH_PRACTICE_INFO_START_ACTION, payload
});

export const fetchPraticeInfoSuccessAction = (data) => ({
    type: Types.FETCH_PRACTICE_INFO_SUCCESS_ACTION, data
});

export const fetchPraticeInfoFaildAction = (error) => ({
    type: Types.FETCH_PRACTICE_INFO_FAILD_ACTION, error
});

export const fetchPraticeRelateStartAction = (payload) => ({
    type: Types.FETCH_LIST_PRACTICE_RELATE_START_ACTION, payload
});

export const fetchPraticeRelateSuccessAction = (data) => ({
    type: Types.FETCH_LIST_PRACTICE_RELATE_SUCCESS_ACTION, data
});

export const fetchPraticeRelateFaildAction = (error) => ({
    type: Types.FETCH_LIST_PRACTICE_RELATE_FAILD_ACTION, error
});

export const fetchPraticeVideoStartAction = (payload) => ({
    type: Types.FETCH_LIST_PRACTICE_VIDEO_START_ACTION, payload
});

export const fetchPraticeVideoSuccessAction = (data) => ({
    type: Types.FETCH_LIST_PRACTICE_VIDEO_SUCCESS_ACTION, data
});

export const fetchPraticeVideoFaildAction = (error) => ({
    type: Types.FETCH_LIST_PRACTICE_VIDEO_FAILD_ACTION, error
});

export const fetchKiwiSuggestStartAction = (payload) => ({
    type: Types.FETCH_LIST_KIWI_SUGGEST_START_ACTION, payload
});

export const fetchKiwiSuggestSuccessAction = (data) => ({
    type: Types.FETCH_LIST_KIWI_SUGGEST_SUCCESS_ACTION, data
});

export const fetchKiwiSuggestFaildAction = (error) => ({
    type: Types.FETCH_LIST_KIWI_SUGGEST_FAILD_ACTION, error
});