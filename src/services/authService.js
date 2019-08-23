import { Platform } from 'react-native'
// import DeviceInfo from 'react-native-device-info';
import { API_BASE_OAUTH, getHeaders } from '../constants/setting';

const API_BASE_OAUTH_HOCHAY = `${API_BASE_OAUTH}/hochay/`;


const refreshTokenV2 = async (token) => {
    const deviceType = Platform.OS;
    // const deviceId = DeviceInfo.getUniqueID();
    // const deviceVersion = DeviceInfo.getSystemVersion();
    // const appVersion = DeviceInfo.getVersion();
    const deviceId = '';
    const deviceVersion = '';
    const appVersion = '';
    const deviceToken = "";
    let response = await fetch(`${API_BASE_OAUTH}account/refresh`,
        {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify({ deviceType, deviceId, deviceVersion, appVersion, deviceToken })
        });
    let responseJson = await response.json();
    return responseJson;
};

const refreshToken = async (body) => {
    let response = await fetch(`${API_BASE_OAUTH}account/login/v2`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',

            },
            body
        });
    let responseJson = await response.json();
    return responseJson;
};


const postAccountInfo = async (payload) => {
    const { token } = payload;
    const response = await fetch(`${API_BASE_OAUTH}Account/info`, {
        method: 'POST',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}

const loginPhone = async (payload) => {
    try {
        const { loginType, password, phoneNumber, rememberMe, socialId, socialToken, socialType } = payload;
        console.log(`${API_BASE_OAUTH}account/login/v2`)
        const response = await fetch(`${API_BASE_OAUTH}account/login/v2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Referer': 'https://m.k12.onluyen.vn'
            },
            body: JSON.stringify({ loginType, password, phoneNumber, rememberMe, socialId, socialToken, socialType })
        });
        const responseJson = await response.json();
        return responseJson;
    } catch (e) {
        return "";
    }
}


const postLoginPhone = async (payload) => {
    try {
        const { password, phoneNumber, rememberMe, socialId, socialToken, socialType } = payload;
        const userName = phoneNumber;
        console.log(`${API_BASE_OAUTH_HOCHAY}account/login`);
        const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Referer': 'https://m.k12.onluyen.vn'
            },
            body: JSON.stringify({ userName, password, rememberMe, socialId, socialToken, socialType })
        });
        const responseJson = await response.json();
        return responseJson;
    } catch (e) {
        return "";
    }
}

const checkPhoneNumber = async (payload) => {
    try {
        const { type, phoneNumber, token } = payload;
        const response = await fetch(`${API_BASE_OAUTH}account/checkPhoneNumber`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': 'https://m.k12.onluyen.vn'
            },
            body: JSON.stringify({ type, phoneNumber, token })
        })
        const responseJson = await response.json();
        return responseJson;
    } catch (e) {
        return "";
    }
}

const forgotPassword = async (payload) => {
    const { password, phoneNumber, code, csrf } = payload;
    const response = await fetch(`${API_BASE_OAUTH}account/forgotPassword/v2`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ code, csrf, password, phoneNumber })
    })
    const responseJson = await response.json();
    return responseJson;
}

const changePasswordAccountkit = async (payload) => {
    const { passwordNew, phoneNumber, code } = payload;
    const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/change/password/accountkit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ passwordNew, phoneNumber, code })
    })
    let responseJson = await response.json();
    return responseJson;
}


const registerPhone = async ({ code, csrf, displayName, password, phoneNumber, rememberMe, userToken }) => {
    const response = await fetch(`${API_BASE_OAUTH}account/register/v2`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Referer': 'https://m.k12.onluyen.vn'
        },
        body: JSON.stringify({ displayName, phoneNumber, password, rememberMe, userToken, code, csrf })
    });
    let responseJson = await response.json();
    return responseJson;
}


const postRegisterAccountKit = async ({ displayName, phoneNumber, password, email, code, gender, birthday }) => {
    try {
        const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/register/accountkit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ displayName, phoneNumber, password, email, code, gender, birthday })
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "err postRegisterAccountKit";
    }
}

const addChildSubUser = async (payload) => {
    const { displayName, userName, gender, birthday, gradeId, token, codePin, password } = payload;
    const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/subuser/add`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify({ displayName, userName, gender, birthday, gradeId, codePin, password })
    });
    let responseJson = await response.json();
    return responseJson;
}

const postUpdateParent = async (payload) => {
    const { displayName, codePin, email, birthday, gender, token } = payload;
    try {
        const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/profile/update`, {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify({ displayName, codePin, email, birthday, gender })
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}

const fetchUpdateSubUser = async (payload) => {
    const { userId, gradeId, displayName, birthday, gender, codePin, password, token } = payload;
    const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/profile/update/subuser/${userId}`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify({ gradeId, displayName, birthday, gender, codePin, password })
    });
    let responseJson = await response.json();
    return responseJson;
}


const postRemoveSubUser = async (payload) => {
    const { userId, token } = payload;
    try {
        const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/subuser/delete`, {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify({ userId })
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}

const fetchRemoveSubUser = async (payload) => {
    const { userId, token } = payload;
    try {
        const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/subuser/delete`, {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify({ userId })
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}

const postTokenByUserid = async (payload) => {
    const { userId, userName, codePin, token } = payload;
    try {
        const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/subuser/token`, {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify({ userId, userName, codePin })
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}

const postTokenByParentId = async (payload) => {
    console.log(payload);
    const { userId, userName, codePin, token } = payload;
    try {
        const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/parent/token`, {
            method: 'POST',
            headers: getHeaders(token),
            body: JSON.stringify({ userId, userName, codePin })
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}

const getListSubUser = async (payload) => {
    const { token } = payload;
    try {
        const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/subuser`, {
            method: 'GET',
            headers: getHeaders(token)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return "";
    }
}

const fetchListChild = async (payload) => {
    const { token } = payload;
    const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/subuser`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    console.log("responseJson: ", JSON.stringify(responseJson));
    return responseJson;
}

const fetchDataUser = async (payload) => {
    const { token } = payload;
    const response = await fetch(`${API_BASE_OAUTH_HOCHAY}account/profile`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    let responseJson = await response.json();
    return responseJson;
}



module.exports = {
    postAccountInfo,
    refreshToken,
    fetchDataUser,
    refreshTokenV2,
    loginPhone,
    checkPhoneNumber,
    forgotPassword,
    changePasswordAccountkit,
    registerPhone,
    postLoginPhone,
    addChildSubUser, //redux
    getListSubUser,
    postRemoveSubUser,
    fetchRemoveSubUser,//redux
    postTokenByUserid,
    postTokenByParentId,
    fetchListChild, //redux
    postUpdateParent,
    fetchUpdateSubUser,//redux
    postRegisterAccountKit
}