import { API_BASE, getHeaders } from '../constants/setting';

const API_BASE_HOCHAY = `${API_BASE}/hochay/`;

const getNotificationMessage = async (payload) => {
    const { token } = payload;
    const response = await fetch(`${API_BASE_HOCHAY}notification/message/log`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

module.exports = {
    getNotificationMessage
}