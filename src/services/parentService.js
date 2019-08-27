import { API_BASE, getHeaders,API_BASE_OAUTH } from '../constants/setting';

const API_BASE_OAUTH_HOCHAY = `${API_BASE_OAUTH}/hochay/`;

const API_BASE_HOCHAY = `${API_BASE}hochay/`;

const getPackageListAll = async (payload) => {
    const { token, indexPage } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}package/list/${indexPage}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

const getPackageListChild = async (payload) => {
    const { token, indexPage } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}package/list/child/${indexPage}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

const getPackageListByUserid = async (payload) => {
    const { token, userId, indexPage } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}package/list/${userId}/${indexPage}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

const getPackageInfo = async (payload) => {
    const { token, packageCode } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}package/info/${packageCode}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

const addPackageUserid = async (payload) => {
    const { token, userId, packageCode } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}package/add`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify({ userId, packageCode })
    });
    let responseJson = await response.json();
    return responseJson;
}

const deletePackageUserid = async (payload) => {
    const { token, userId, packageCode } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}package/delete/${packageCode}/${userId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

const getPathwayByUserId = async (payload) => {
    const { token, userId, packageCode } = payload;
    console.log('LINK: ', `${API_BASE_HOCHAY}learning/${packageCode}/${userId}`);
    const response = await fetch(`${API_BASE_HOCHAY}learning/${packageCode}/${userId}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    let responseJson = await response.json();
    return responseJson;
}

const getListLessonFollowPackageById = async (payload) => {
    const { token, userId, packageCode } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}learning/hierachy/${packageCode}/${userId}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    let responseJson = await response.json();
    return responseJson;
}

const getListLessonFollowPathwayById = async (payload) => {
    const { token, userId, configId, idItem } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}learning/detail/${configId}/${idItem}/${userId}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    let responseJson = await response.json();
    return responseJson;
}

const updatePathway = async (payload) => {
    const { token, configId, idItem, userId, data } = payload;
    try {
        const response = await fetch(`${API_BASE_HOCHAY}learning/log/update`, {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify({ configId, idItem, userId, data })
        })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return error;
    }
}

const fetchExercise = async (payload) => {
    const { token, userId, type } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}/learning/exercise/${userId}/${type}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    let responseJson = await response.json();
    return responseJson;
}

const fetchExercisesToAssign = async (payload) => {
    const { token, userId, packageCode } = payload;
    console.log('link ', `${API_BASE_HOCHAY}learning/detail/${packageCode}/${userId}`);
    const response = await fetch(`${API_BASE_HOCHAY}learning/detail/${packageCode}/${userId}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    let responseJson = await response.json();
    console.log("responseJson: ", JSON.stringify(responseJson));
    return responseJson;
}

const createExercise = async (payload) => {
    const { token, configId, problemId, message, userId, packageCode, endTime, levelCondition, exerciseId } = payload;
    try {
        const response = await fetch(`${API_BASE_HOCHAY}/learning/exercise/update`, {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify({ configId, problemId, exerciseId, message, userId, packageCode, endTime, levelCondition })
        })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return error;
    }
}

const deleteExercise = async (payload) => {
    const { token, exerciseId } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}/learning/exercise/delete/${exerciseId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    })
    let responseJson = await response.json();
    return responseJson;
}

const getDetailExercise = async (payload) => {
    const { token, exerciseId } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}/learning/exercise/edit/${exerciseId}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    let responseJson = await response.json();
    return responseJson;
}

const fetchNotifications = async (payload) => {
    const { token, indexPage } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}notification/message/${indexPage}`, {
        method: 'GET',
        headers: getHeaders(token)
    })
    let responseJson = await response.json();
    return responseJson;
}

const updateAvatar = async (payload) => {
    const { token, userId, imageBase64String } = payload;
    const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/profile/avatar`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify({ imageBase64: `data:image/jpeg;base64,${imageBase64String}`, userId:userId })
    })
    console.log('reponse: ', JSON.stringify(response));
    let responseJson = await response.json();
    return responseJson;
}

module.exports = {
    getPackageListAll,
    getPackageListChild,
    getPackageListByUserid,
    getPackageInfo,
    addPackageUserid,
    deletePackageUserid,
    getPathwayByUserId,
    getListLessonFollowPackageById,
    getListLessonFollowPathwayById,
    updatePathway,
    fetchExercise,
    fetchExercisesToAssign,
    createExercise,
    deleteExercise,
    getDetailExercise,
    fetchNotifications,
    updateAvatar
}