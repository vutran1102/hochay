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
    errorAddChild: ''
}


export default function userReducer(state = initState, action) {
    switch (action.type) {
        case Types.MAKE_REQUEST_PROFILE_ACTION:
            return {
                ...state,
                GradeId: action.payload.gradeId,
                displayName: action.payload.displayName,
                email: action.payload.Email,
                phoneNumber: action.payload.phoneNumber,
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
        default:
            return state;
    }
}