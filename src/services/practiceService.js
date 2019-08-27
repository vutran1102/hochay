import fetch from 'react-native-fetch-polyfill';
import { API_BASE, getHeaders } from '../constants/setting';
const API_PRACTICE = `${API_BASE}hochay/`;

const timeout = 15000;


const getListProblemHierachy = async (payload) => {
    console.log("payload: ", JSON.stringify(payload));
    const { token, packageId } = payload;
    let response = await fetch(`${API_PRACTICE}practice/hierachy/${packageId}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await response.json();
    return responseJson;
}


const getListProblemHierachyById = async (payload) => {
    const { token, problemHiearchyId } = payload;
    let respone = await fetch(`${API_PRACTICE}practice/data/${problemHiearchyId}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await respone.json();
    return responseJson;
}

const getPracticeInfo = async (payload) => {
    const { token, problemCode } = payload;
    let response = await fetch(`${API_PRACTICE}practice/info/${problemCode}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await response.json();
    return responseJson;
}

const resetProblemByID = async ({ token, problemCode }) => {
    let response = await fetch(`${API_PRACTICE}practice/start/${problemCode}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await response.json();
    return responseJson;
};

const getPracticeQuestion = async ({ token, problemCode, stepIdNow }) => {
    try {
        let response = await fetch(`${API_PRACTICE}practice/questions/detail/${problemCode}/${stepIdNow}`, {
            method: 'GET',
            headers: getHeaders(token),
            timeout: timeout
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return '';
    }
};

const getQuestionSendAnswer = async (payload) => {
    const { token, dataOptionId, stepId, configId, isSkip, textAnswer, dataOptionText, dataTextAnswer } = payload;
    let response = await fetch(`${API_PRACTICE}practice/questions/sendanswer`, {
        method: 'PUT',
        headers: getHeaders(token),
        timeout: timeout,
        body: JSON.stringify({ dataOptionId, textAnswer, configId, stepId, isSkip, dataOptionText, dataTextAnswer })
    });
    let responseJson = await response.json();
    return responseJson;
};

const getPracticeRecent = async (payload) => {
    const { token, problemHiearchyId } = payload;
    let response = await fetch(`${API_PRACTICE}practice/recent/${problemHiearchyId}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await response.json();
    return responseJson;
}

const getPracticeRelate = async (payload) => {
    const { token, problemId } = payload;
    let response = await fetch(`${API_PRACTICE}practice/relate/${problemId}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await response.json();
    return responseJson;
}

const getPracticeVideo = async (payload) => {
    const { token, problemId } = payload;
    let response = await fetch(`${API_PRACTICE}practice/video/${problemId}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await response.json();
    return responseJson;
}

const getChartDetail = async (payload) => {
    const { token, problemHierachyId } = payload;
    let response = await fetch(`${API_PRACTICE}practice/hierachy/chart/${problemHierachyId}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await response.json();
    return responseJson;
}

const getChartSubuser = async (payload) => {
    const { token, packageCode, userId } = payload;
    console.log(JSON.stringify({ token, packageCode, userId }));
    let response = await fetch(`${API_PRACTICE}chart/hierachy/package/${packageCode}/${userId}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await response.json();
    return responseJson;
}

const getChartSubuserDetail = async (payload) => {
    const { token, packageCode, userId } = payload;
    console.log('LINK: ', `${API_PRACTICE}chart/package/${packageCode}/${userId}`);
    let response = await fetch(`${API_PRACTICE}chart/package/${packageCode}/${userId}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await response.json();
    return responseJson;
}


const getChartParent = async (payload) => {
    const { token, GradeId, subjectId, timeStart, timeEnd } = payload;
    let response = await fetch(`${API_PRACTICE}practice/hierachy/chart/${GradeId}/${subjectId}/${timeStart}/${timeEnd}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await response.json();
    return responseJson;
}

const getKiwiSuggestList = async (payload) => {
    const { token, packageCode } = payload;
    console.log('getKiwiSuggestList: ', `${API_PRACTICE}learning/kiwi/${packageCode}`);
    let response = await fetch(`${API_PRACTICE}learning/kiwi/${packageCode}`, {
        method: 'GET',
        headers: getHeaders(token),
        timeout: timeout
    });
    let responseJson = await response.json();
    console.log("responseJson: ", JSON.stringify(responseJson));
    return responseJson;
}


module.exports = {
    getKiwiSuggestList,
    getListProblemHierachy,
    getListProblemHierachyById,
    getPracticeInfo,
    resetProblemByID,
    getPracticeQuestion,
    getQuestionSendAnswer,
    getPracticeRelate,
    getPracticeVideo,
    getPracticeRecent,
    getChartParent,
    getChartDetail,
    getChartSubuserDetail,
    getChartSubuser
}