import * as Types from '../constants/type';

let initState = {
    listPackage: [],
    packageInfo: [],
    listPackageUser: [],
    isLoading: false,
}

export default function packageReducer(state = initState, action) {
    switch (action.type) {
        case Types.FETCH_PACKAGE_LIST_START_ACTION:
            return {
                ...state
            }
        case Types.FETCH_PACKAGE_LIST_SUCCESS_ACTION:
            return {
                ...state,
                listPackage: action.data
            }
        case Types.FETCH_PACKAGE_LIST_FAILD_ACTION:
            return {
                ...state,
                listPackage: []
            }
        case Types.FETCH_PACKAGE_LIST_BYID_START_ACTION:
            return {
                ...state,
                isLoading: true,
            }
        case Types.FETCH_PACKAGE_LIST_BYID_SUCCESS_ACTION:
            return {
                ...state,
                listPackageUser: action.data,
                isLoading: false,
            }
        case Types.FETCH_PACKAGE_LIST_BYID_FAILD_ACTION:
            return {
                ...state,
                listPackageUser: [],
                isLoading: false,
            }
        case Types.FETCH_PACKAGE_INFO_START_ACTION:
            return {
                ...state,
                isLoading: true,
            }
        case Types.FETCH_PACKAGE_INFO_SUCCESS_ACTION:
            return {
                ...state,
                packageInfo: action.data,
                isLoading: false,
            }
        case Types.FETCH_PACKAGE_INFO_FAILD_ACTION:
            return {
                ...state,
                isLoading: false,
                packageInfo: [],
            }
        case Types.DEL_PACKAGE_LIST_BYID_SUCCESS_ACTION:
            const dataObj = action.data;
            let packageCode = dataObj.packageCode;
            if (dataObj.data) {
                let filtered = state.listPackageUser.filter(function (el) { return el.packageCode != packageCode; });
                return {
                    ...state,
                    listPackageUser: filtered
                }
            }
        case Types.ADD_PACKAGE_LIST_BYID_START_ACTION:
            return {
                ...state,
                isLoadingAddPackage: true,
            }
        case Types.ADD_PACKAGE_LIST_BYID_SUCCESS_ACTION:
            return {
                ...state,
                isLoadingAddPackage: false
            }
        case Types.ADD_PACKAGE_LIST_BYID_FAILD_ACTION:
            return {
                ...state,
                isLoadingAddPackage: false
            }
        default:
            return state;
    }
}