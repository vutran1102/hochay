import * as Types from '../constants/type';
import { listTest } from '../utils/DataTest';

let initState = {
    listTest: listTest,
    isLoadingPage: true,
    testInfo: {},
    testDone: {},
    isLoadingInfo: true,
    isLoadingResult: true,
    gradeId: '',
    subjectId: '',
    testId: ''
}

export default function examReducer(state = initState, action) {
    switch (action.type) {
        case Types.FETCH_LIST_TEST_PAGE_START_ACTION:
            return {
                ...state,
                isLoadingPage: true,
            }
        case Types.FETCH_LIST_TEST_PAGE_SUCCESS_ACTION:
            return {
                ...state,
                gradeId: action.data.payload.GradeId,
                subjectId: action.data.payload.subjectId,
                isLoadingPage: false,
                listTest: action.data.data
            }
        case Types.FETCH_LIST_TEST_PAGE_FAILD_ACTION:
            return {
                ...state,
                isLoadingPage: false,
                listTest: []
            }
        case Types.FETCH_TEST_INFO_START_ACTION:
            const { testId } = action.payload;
            if (state.testId != testId) {
                return {
                    ...state,
                    isLoadingInfo: true
                }
            } else {
                return {
                    ...state,
                    isLoadingInfo: false
                }
            }
        case Types.FETCH_TEST_INFO_SUCCESS_ACTION:
            return {
                ...state,
                testInfo: action.data,
                isLoadingInfo: false,
                testId: action.data.testId,
            }
        case Types.FETCH_TEST_INFO_FAILD_ACTION:
            return {
                ...state,
                testInfo: {},
                isLoadingInfo: false,
            }
        case Types.FETCH_TEST_DONE_START_ACTION:
            return {
                ...state,
                testDone: {},
                isLoadingResult: true,
            }
        case Types.FETCH_TEST_DONE_SUCCESS_ACTION:
            return {
                ...state,
                testDone: action.data,
                isLoadingResult: false,
            }
        case Types.FETCH_TEST_DONE_FAILD_ACTION:
            return {
                ...state,
                testDone: {},
                isLoadingResult: false,
            }
        default:
            return state;
    }
}