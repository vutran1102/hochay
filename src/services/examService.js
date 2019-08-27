import { API_BASE, getHeaders } from '../constants/setting';
const API_TEST = `${API_BASE}hochay/`;

const fetchListTestByPage = async (payload) => {
    const { token, packageId, indexPage } = payload;
    let response = await fetch(`${API_TEST}test/data/${packageId}/${indexPage}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

const fetchTestStart = async (payload) => {
    try {
        const { token, testId } = payload;
        let response = await fetch(`${API_TEST}test/start/${testId}`, {
            method: 'GET',
            headers: getHeaders(token)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}

const fetchTestReStart = async (payload) => {
    try {
        const { token, testId } = payload;
        let response = await fetch(`${API_TEST}test/restart/${testId}`, {
            method: 'POST',
            headers: getHeaders(token)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}

const fetchTestInfo = async (payload) => {
    const { token, testId } = payload;
    let response = await fetch(`${API_TEST}test/info/${testId}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

const fetchTestDone = async (payload) => {
    const { token, testId } = payload;
    let response = await fetch(`${API_TEST}test/done/${testId}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

const fetchTestPause = async (payload) => {
    try {
        const { token, testId } = payload;
        let response = await fetch(`${API_TEST}test/pause/${testId}`, {
            method: 'GET',
            headers: getHeaders(token)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}

const fetchTestQuestionData = async (payload) => {
    try {
        const { token, testId, stepId } = payload;
        let response = await fetch(`${API_TEST}test/questions/${testId}/${stepId}`, {
            method: 'GET',
            headers: getHeaders(token)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}

const fetchTestQuesion = async (payload) => {
    try {
        const { token, testId } = payload;
        let response = await fetch(`${API_TEST}test/questions/${testId}`, {
            method: 'GET',
            headers: getHeaders(token)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}

const fetchTestDetail = async (payload) => {
    try {
        const { token, testId } = payload;
        let response = await fetch(`${API_TEST}test/detail/${testId}`, {
            method: 'GET',
            headers: getHeaders(token)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}


const getQuestionSendAnswer = async (payload) => {
    const { token, dataOptionId, stepId, configId, isSkip, textAnswer, dataOptionText } = payload;
    let response = await fetch(`${API_TEST}test/questions/sendanswer`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify({ dataOptionId, textAnswer, configId, stepId, isSkip, dataOptionText })
    });
    let responseJson = await response.json();
    return responseJson;
};



module.exports = {
    fetchListTestByPage,
    fetchTestInfo,
    fetchTestDone,
    fetchTestPause,
    fetchTestQuestionData,
    getQuestionSendAnswer,
    fetchTestQuesion,
    fetchTestDetail,
    fetchTestStart
}