import * as Types from '../constants/type';

let initState = {
    listGrade: [],
    listSubject: [],
    isLoadingSubject: true,
    navigator: null,
    missonData: [],
    excerciseMission:[],
}

export default function commonReducer(state = initState, action) {
    switch (action.type) {
        case Types.FETCH_LIST_GRADE_START_ACTION:
            return {
                ...state
            }
        case Types.FETCH_LIST_GRADE_SUCCESS_ACTION:
            return {
                ...state,
                listGrade: action.data.grades
            }
        case Types.FETCH_LIST_GRADE_FAILD_ACTION:
            return {
                ...state,
                listGrade: []
            }
        case Types.FETCH_LIST_SUBJECT_SUCCESS_ACTION:
            return {
                ...state,
                listSubject: action.data,
                isLoadingSubject: false,
            }
        case Types.FETCH_LIST_SUBJECT_FAILD_ACTION:
            return {
                ...state,
                listSubject: [],
                isLoadingSubject: false,
            }
        case Types.SAVE_NAVIGATOR_ACTION:
            return {
                ...state,
                navigator: action.navigator
            }
        case Types.CREATE_FIRST_CHILD_ACTION:
            return {
                ...state,
                isCreateChild: action.payload.isCreate
            }
        case Types.FETCH_CHILD_MISSONS_START_ACTION:
            return {
                ...state,
            }
        case Types.FETCH_CHILD_MISSONS_SUCCESS_ACTION: 
            return {
                ...state,
                missonData: action.payload
            }
        case Types.FETCH_CHILD_MISSONS_FAILED_ACTION:
            return {
                ...state,
                missonData: []
            }
        case Types.FETCH_MISSON_FROM_CHILD_START_ACTION:
            return {
                ...state,
                excerciseMission: []
            }
        case Types.FETCH_MISSON_FROM_CHILD_SUCCESS_ACTION: 
            return {
                ...state,
                excerciseMission: action.payload.dataPractice
            }
        case Types.FETCH_MISSON_FROM_CHILD_FAILED_ACTION:
            return {
                ...state,
                excerciseMission: []
            }
        default:
            return state;
    }
}