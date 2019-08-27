import * as Types from '../constants/type';

let initState = {
    isCodePin: false,
    gradeId: '',
    displayName: '',
    birthday: '',
    email: '',
    phoneNumber: '',
    userId: '',
    userName: '',
    listChild: [],
    isLoadingGrade: true,
    isLoadingAddChild: false,
    gender: '',
    errorAddChild: '',
    listFlashCardVideo: [],
    isLoadingHelp: true,
    dataNotify: [],
    isLoadingMessage: true,
    pathway: [],
    isLoading: true,
    configId: '',
    proplemsId: [],
    exerciseDoneList: [],
    exercisesToAssign: [],
    listLessonFollowPackage: [],
    exerciseDetail: [],
    isLoadingExerciseDetail: true,
    exerciseNotDoneList: [],
    chartData: [],
    isLoadingchartData: false,
    listNoti: [],
    parentUri: '',
    isSuccess : false
}


export default function parentReducer(state = initState, action) {
    switch (action.type) {
        case Types.MAKE_REQUEST_PROFILE_PARENT_ACTION:
            return {
                ...state,
                gradeId: action.payload.gradeId,
                displayName: action.payload.displayName,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber ? action.payload.phoneNumber : state.phoneNumber,
                userName: action.payload.userName,
                userId: action.payload.userId,
                gender: action.payload.gender,
                birthday: action.payload.birthday,
                isCodePin: action.payload.isCodePin
            }
        case Types.FETCH_PROFILE_UPDATE_SUCCESS_ACTION:
            return {
                ...state
            }
        case Types.FETCH_PROFILE_UPDATE_FAILD_ACTION:
            return {
                ...state
            }
        case Types.FETCH_LIST_CHILD_SUCCESS_ACTION:
            return {
                ...state,
                listChild: action.data,
                isLoadingGrade: false,
            }
        case Types.FETCH_LIST_CHILD_FAILD_ACTION:
            return {
                ...state,
                listChild: [],
                isLoadingGrade: false,
            }
        case Types.FETCH_ADD_CHILD_START_ACTION:
            return {
                ...state,
                isLoadingAddChild: true,
            }
        case Types.FETCH_ADD_CHILD_SUCCESS_ACTION:
            const response = action.data;
            let { status } = response;
            if (status == 200) {
                const { data } = response;
                const dataUser = {
                    userId: data.userId,
                    userName: data.userName,
                    displayName: data.displayName,
                    gradeId: data.gradeId,
                    gender: data.gender,
                    birthday: data.birthday
                }
                return {
                    ...state,
                    listChild: [...state.listChild, dataUser],
                }
            }
            break;
        case Types.FETCH_UPDATE_CHILD_SUCCESS_ACTION:
            const resUpdate = action.data;
            const data = resUpdate.data;
            if (data != '') {
                let listChildOld = state.listChild;
                let listChildNew = listChildOld.map((item, key) => {
                    if (item.userId == data.userId) {
                        return {
                            userId: item.userId,
                            userName: data.userName,
                            displayName: data.displayName,
                            gradeId: data.gradeId,
                            gender: data.gender,
                            birthday: data.birthday
                        }
                    } else {
                        return {
                            userId: item.userId,
                            userName: item.userName,
                            displayName: item.displayName,
                            gradeId: item.gradeId,
                            gender: item.gender,
                            birthday: item.birthday
                        }
                    }
                });
                return {
                    ...state,
                    listChild: listChildNew,
                }
            }
            break;
        case Types.FETCH_REMOVE_CHILD_SUCCESS_ACTION:
            const dataObj = action.data;
            let idUser = dataObj.userId;
            let statusRemove = dataObj.response.status;
            if (statusRemove == 200) {
                let filtered = state.listChild.filter(function (el) { return el.userId != idUser; });
                return {
                    ...state,
                    listChild: filtered
                }
            }
            break;
        case Types.FETCH_FLASHCARD_KNOWLEAGE_START_ACTION:
            return {
                ...state,
                // isLoadingHelp: true,
            }
        case Types.FETCH_FLASHCARD_KNOWLEAGE_SUCCESS_ACTION:
            return {
                ...state,
                listFlashCardVideo: action.data,
                isLoadingHelp: false,
            }
        case Types.FETCH_FLASHCARD_KNOWLEAGE_FAILD_ACTION:
            return {
                ...state,
                listFlashCardVideo: [],
                isLoadingHelp: false,
            }
        case Types.FETCH_NOTIFY_PARENT_SUCCESS_ACTION:
            return {
                ...state,
                dataNotify: action.data,
                isLoadingMessage: false,
            }
        case Types.FETCH_NOTIFY_PARENT_FAILD_ACTION:
            return {
                ...state,
                isLoadingMessage: false,
            }
        case Types.FETCH_PATHWAY_ACTION:
            return {
                ...state,
                isLoading: true,
            }
        case Types.FETCH_PATHWAY_SUCCESS_ACTION:
            return {
                ...state,
                isLoading: false,
                pathway: action.payload.data,
                configId: action.payload.id
            }
        case Types.FETCH_PATHWAY_FAILED_ACTION:
            return {
                ...state,
                isLoading: false,
                pathway: [],
                configId: ''
            }
        case Types.SAVE_DATA_PROPLEMS_ID_UPDATE_PATHWAY_ACTION:
            return {
                ...state,
                proplemsId: action.payload.data
            }
        case Types.GET_EXERCISE_START_ACTION:
            return {
                ...state,
            }
        case Types.GET_EXERCISE_NOT_DONE_SUCCESS_ACTION:
            return {
                ...state,
                exerciseNotDoneList: action.data
            }
        case Types.GET_EXERCISE_NOT_DONE_FAILD_ACTION:
            return {
                ...state,
                exerciseNotDoneList: []
            }
        case Types.GET_EXERCISE_DONE_SUCCESS_ACTION:
            return {
                ...state,
                exerciseDoneList: action.data
            }
        case Types.GET_EXERCISE_DONE_FAILD_ACTION:
            return {
                ...state,
                exerciseDoneList: []
            }
        case Types.GET_EXERCISE_ASSIGN_START_ACTION:
            return {
                ...state,
                isLoading: true,
            }
        case Types.GET_EXERCISE_ASSIGN_SUCCESS_ACTION:
            return {
                ...state,
                exercisesToAssign: action.data,
                isLoading: false,
            }
        case Types.GET_EXERCISE_ASSIGN_FAILD_ACTION:
            return {
                ...state,
                exercisesToAssign: [],
                isLoading: false,
            }
        case Types.GET_LESSON_FOLLOW_BY_PACKAGE_START_ACTION:
            return {
                ...state,
                isLoading: true,
            }
        case Types.GET_LESSON_FOLLOW_BY_PACKAGE_SUCCESS_ACTION:
            return {
                ...state,
                listLessonFollowPackage: action.data,
                isLoading: false,
            }
        case Types.GET_LESSON_FOLLOW_BY_PACKAGE_FAILD_ACTION:
            return {
                ...state,
                listLessonFollowPackage: [],
                isLoading: false,
            }
        case Types.GET_EXERCISE_DETAIL_START_ACTION:
            return {
                ...state,
                isLoadingExerciseDetail: true,
            }
        case Types.GET_EXERCISE_DETAIL_SUCCESS_ACTION:
            return {
                ...state,
                exerciseDetail: action.data,
                isLoadingExerciseDetail: false,
            }
        case Types.GET_EXERCISE_DETAIL_FAILD_ACTION:
            return {
                ...state,
                exerciseDetail: [],
                isLoadingExerciseDetail: false,
            }
        case Types.GET_CHART_DETAIL_START_ACTION:
            return {
                ...state,
                isLoadingchartData: true,
            }
        case Types.GET_CHART_DETAIL_SUCCESS_ACTION:
            return {
                ...state,
                chartData: action.data,
                isLoadingchartData: false,
            }
        case Types.GET_CHART_DETAIL_FAILED_ACTION:
            return {
                ...state,
                chartData: [],
                isLoadingchartData: false,
            }
        case Types.GET_FETCH_NOTI_START_ACTION:
            return {
                ...state,
            }
        case Types.GET_FETCH_NOTI_SUCCESS_ACTION:
            return {
                ...state,
                listNoti: action.data,
            }
        case Types.GET_FETCH_NOTI_FAILED_ACTION:
            return {
                ...state,
                listNoti: [],
            }
        case Types.FETCH_SAVE_PARENT_AVATARSTART_ACTION:
            return {
                ...state,
                parentUri: action.payload.uri,
            }

        default:
            return state;
    }
}