import { API_BASE, getHeaders } from '../constants/setting';

const API_BASE_HOCHAY = `${API_BASE}/hochay/`;

const getFlashCardVideo = async (payload) => {
    const { token, subjectId, gradeId, indexPage } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}flashcard/video/${subjectId}/${gradeId}/${indexPage}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

module.exports = {
    getFlashCardVideo
}