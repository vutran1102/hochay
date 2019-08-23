import * as Types from '../constants/type';
import { datalistProblemHierachy, datalistProblemHierachyExerice } from '../utils/DataTest';

let initState = {
    recent: {},
    practiceInfo: {},
    listProblemHierachy: datalistProblemHierachy,
    subjectId: '',
    gradeId: '',
    problemHiearchyId: '',
    problemHieryExerice: datalistProblemHierachyExerice,
    dataProblemHieryExerice: [],
    listRelate: [],
    videoPractice: {},
    isLoadingProblemHiarachy: true,
    isLoadingProblemExerice: true,
    problemexericeLength:0,
    kiwiSuggest: [],
}

export default function practiceReducer(state = initState, action) {
    switch (action.type) {
        case Types.FETCH_LIST_PROBLEM_HIERACHY_START_ACTION:
            const { GradeId, subjectId } = action.payload;
            return {
                ...state,
                isLoadingProblemHiarachy: true
            }
        case Types.FETCH_LIST_PROBLEM_HIERACHY_SUCCESS_ACTION:
            return {
                ...state,
                gradeId: action.data.payload.GradeId,
                subjectId: action.data.payload.subjectId,
                listProblemHierachy: action.data.data,
                isLoadingProblemHiarachy: false
            }
        case Types.FETCH_LIST_PROBLEM_HIERACHY_FAILD_ACTION:
            return {
                ...state,
                listProblemHierachy: [],
                isLoadingProblemHiarachy: false
            }
        case Types.FETCH_LIST_PROBLEM_HIER_BY_ID_START_ACTION:
            const { problemHiearchyId } = action.payload;
            if (state.problemHiearchyId == problemHiearchyId) {
                return {
                    ...state,
                    isLoadingProblemExerice: false,
                    problemexericeLength:0
                }
            } else {
                const dataProblemHieryExericeStart = state.dataProblemHieryExerice;
                if (Object.keys(dataProblemHieryExericeStart).length > 0) {
                    let problemExericeFilterStart = dataProblemHieryExericeStart.filter((item, key) => {
                        return item.problemHiearchyId == problemHiearchyId
                    });
                    return {
                        ...state,
                        isLoadingProblemExerice: Object.keys(problemExericeFilterStart).length > 0 ? false : true,
                        problemHieryExerice: Object.keys(problemExericeFilterStart).length > 0 ? problemExericeFilterStart[0].data : state.problemHieryExerice,
                        problemexericeLength:0,
                    }
                }
                return {
                    ...state,
                    isLoadingProblemExerice: true,
                    problemexericeLength:0,
                }
            }
        case Types.FETCH_LIST_PROBLEM_HIER_BY_ID_SUCCESS_ACTION:
            let dataProblemHieryExerice = state.dataProblemHieryExerice;
            const exits = checkExitByProblemHiearchyId(dataProblemHieryExerice, action.data.payload.problemHiearchyId);
            if (!exits) { 
                dataProblemHieryExerice.push({
                    problemHiearchyId: action.data.payload.problemHiearchyId,
                    data: action.data.data
                });
            }
            return {
                ...state,
                dataProblemHieryExerice: dataProblemHieryExerice,
                problemHieryExerice: action.data.data,
                isLoadingProblemExerice: false,
                problemHiearchyId: action.data.payload.problemHiearchyId,
                problemexericeLength: action.data.data.length
            }
        case Types.FETCH_LIST_PROBLEM_HIER_BY_ID_FAILD_ACTION:
            return {
                ...state,
                problemHieryExerice: {},
                isLoadingProblemExerice: false
            }
        case Types.FETCH_PRACTICE_RECENT_SUCCESS_ACTION:
            return {
                ...state,
                recent: action.data
            }
        case Types.FETCH_PRACTICE_RECENT_FAILD_ACTION:
            return {
                ...state,
                recent: {}
            }
        case Types.FETCH_PRACTICE_INFO_START_ACTION:
            return {
                ...state,
            }
        case Types.FETCH_PRACTICE_INFO_SUCCESS_ACTION:
            return {
                ...state,
                practiceInfo: action.data
            }
        case Types.FETCH_PRACTICE_INFO_FAILD_ACTION:
            return {
                ...state,
                practiceInfo: {}
            }
        case Types.FETCH_LIST_PRACTICE_RELATE_SUCCESS_ACTION:
            return {
                ...state,
                listRelate: action.data
            }
        case Types.FETCH_LIST_PRACTICE_RELATE_FAILD_ACTION:
            return {
                ...state,
                listRelate: []
            }
        case Types.FETCH_LIST_PRACTICE_VIDEO_SUCCESS_ACTION:
            return {
                ...state,
                videoPractice: action.data
            }
        case Types.FETCH_LIST_PRACTICE_VIDEO_FAILD_ACTION:
            return {
                ...state,
                videoPractice: {}
            }
        case Types.FETCH_LIST_KIWI_SUGGEST_START_ACTION:
            return {
                ...state,
            }
        case Types.FETCH_LIST_KIWI_SUGGEST_SUCCESS_ACTION:
            return {
                ...state,
                kiwiSuggest: action.data
            }
        case Types.FETCH_LIST_KIWI_SUGGEST_FAILD_ACTION:
            return {
                ...state,
                kiwiSuggest: []
            }
        default:
            return state;
    }
}

const checkExitByProblemHiearchyId = (data, problemHiearchyId) => {
    let found = false;
    for (var i = 0; i < data.length; i++) {
        if (data[i].problemHiearchyId == problemHiearchyId) {
            found = true;
            break;
        }
    }
    return found;
}
