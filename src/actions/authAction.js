import * as Types from '../constants/type';

export const fetchProfileUpdateStartAction = (payload) => ({
    type: Types.FETCH_PROFILE_UPDATE_START_ACTION, payload
});

export const fetchProfileUpdateSuccessAction = (data) => ({
    type: Types.FETCH_PROFILE_UPDATE_SUCCESS_ACTION, data
});

export const fetchProfileUpdateFaildAction = (error) => ({
    type: Types.FETCH_PROFILE_UPDATE_FAILD_ACTION, error
});

export const fetchListChildStartAction = (payload) => ({
    type: Types.FETCH_LIST_CHILD_START_ACTION, payload
});

export const fetchListChildSuccessAction = (data) => ({
    type: Types.FETCH_LIST_CHILD_SUCCESS_ACTION, data
});

export const fetchListChildFaildAction = (error) => ({
    type: Types.FETCH_LIST_CHILD_FAILD_ACTION, error
});

export const fetchAddChildStartAction = (payload) => ({
    type: Types.FETCH_ADD_CHILD_START_ACTION, payload
});

export const fetchAddChildSuccessAction = (data) => ({
    type: Types.FETCH_ADD_CHILD_SUCCESS_ACTION, data
});

export const fetchAddChildFaildAction = (error) => ({
    type: Types.FETCH_ADD_CHILD_FAILD_ACTION, error
});

export const fetchUpdateChildStartAction = (payload) => ({
    type: Types.FETCH_UPDATE_CHILD_START_ACTION, payload
});

export const fetchUpdateChildSuccessAction = (data) => ({
    type: Types.FETCH_UPDATE_CHILD_SUCCESS_ACTION, data
});

export const fetchUpdateChildFaildAction = (error) => ({
    type: Types.FETCH_UPDATE_CHILD_FAILD_ACTION, error
});

export const fetchRemoveChildStartAction = (payload) => ({
    type: Types.FETCH_REMOVE_CHILD_START_ACTION, payload
});

export const fetchRemoveChildSuccessAction = (data) => ({
    type: Types.FETCH_REMOVE_CHILD_SUCCESS_ACTION, data
});

export const fetchRemoveChildFaildAction = (error) => ({
    type: Types.FETCH_REMOVE_CHILD_FAILD_ACTION, error
});