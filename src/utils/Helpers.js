import { AsyncStorage } from 'react-native';
import { ToastAndroid, Platform } from 'react-native';
import jwtDecode from 'jwt-decode';
import authService from '../services/authService';


const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('@token', token);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const savePackageCode= async (packageCode) => {
    try {
        await AsyncStorage.setItem('@packageCode', packageCode);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getPackageCode = async () => {
    try {
        const value = await AsyncStorage.getItem('@packageCode');
        if (value !== null) {
            return value;
        }
    } catch (e) {
        return '';
    }
};


const saveTokenChild = async (token) => {
    try {
        await AsyncStorage.setItem('@tokenchild', token);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const saveTokenParent = async (token) => {
    try {
        await AsyncStorage.setItem('@tokenparent', token);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('@token');
        if (token !== null && token !== '') {
            const curTime = Math.floor(Date.now() / 1000);
            const { exp } = jwtDecode(token);
            if (exp - curTime <= 30 * 60 && exp - curTime > 0) {
                const response = await authService.refreshTokenV2(token);
                const status = response.status;
                // Platform.OS == 'android' && ToastAndroid.show(JSON.stringify(response), ToastAndroid.SHORT);
                return status == 200 ? response.access_token : token;
            } else if (exp - curTime <= 0) {
                Platform.OS == 'android' && ToastAndroid.show('Token expried', ToastAndroid.SHORT);
                return '';
            } else {
                // Platform.OS == 'android' && ToastAndroid.show('Token ok', ToastAndroid.SHORT);
                return token;
            }
        }
        return '';
    } catch (error) {
        return '';
    }
}

const getTokenChild = async () => {
    try {
        const token = await AsyncStorage.getItem('@tokenchild');
        if (token !== null && token !== '') {
            const curTime = Math.floor(Date.now() / 1000);
            const { exp } = jwtDecode(token);
            if (exp - curTime <= 60 * 60) {
                const response = await authService.refreshTokenV2(token);
                const status = response.status;
                return status == 200 ? response.access_token : token;
            }
            return token;
        }
        return '';
    } catch (error) {
        return '';
    }
}

const saveParentAvatarUri = async (data) => {
    try {
        await AsyncStorage.setItem('@parentAvtarUri', `http:${data}`);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getParentAvatarUri = async () => {
    try {
        const value = await AsyncStorage.getItem('@parentAvtarUri');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
};

const getTokenParent = async () => {
    try {
        const token = await AsyncStorage.getItem('@tokenparent');
        if (token !== null && token !== '') {
            const curTime = Math.floor(Date.now() / 1000);
            const { exp } = jwtDecode(token);
            if (exp - curTime <= 30 * 60 && exp - curTime > 0) {
                const response = await authService.refreshTokenV2(token);
                const status = response.status;
                return status == 200 ? response.access_token : token;
            } else if (exp - curTime <= 0) {
                return '';
            } else {
                return token;
            }
        }
        return '';
    } catch (error) {
        return '';
    }
}


const saveUserName = async (token) => {
    try {
        await AsyncStorage.setItem('@username', token);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const saveAuth = async (authName) => {
    try {
        await AsyncStorage.setItem('@auth', authName);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
}

const getAuth = async () => {
    try {
        const value = await AsyncStorage.getItem('@auth');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
};

const getUserName = async () => {
    try {
        const value = await AsyncStorage.getItem('@username');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
};

const saveUserPass = async (token) => {
    try {
        await AsyncStorage.setItem('@userpass', token);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getUserPass = async () => {
    try {
        const value = await AsyncStorage.getItem('@userpass');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
};


const saveUserId = async (token) => {
    try {
        await AsyncStorage.setItem('@userid', token);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getUserId = async () => {
    try {
        const value = await AsyncStorage.getItem('@userid');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
};

const saveUserPost = async (token) => {
    try {
        await AsyncStorage.setItem('@userpost', token);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getUserPost = async () => {
    try {
        const value = await AsyncStorage.getItem('@userpost');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
};

const saveAvatar = async (path) => {
    try {
        await AsyncStorage.setItem('@avatar', path);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getAvatar = async () => {
    try {
        const value = await AsyncStorage.getItem('@avatar');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
};

const saveSoundVolume = async (b) => {
    try {
        await AsyncStorage.setItem('@soundEffectVolume', b);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getSoundVolume = async () => {
    try {
        const value = await AsyncStorage.getItem('@soundEffectVolume');
        if (value !== null) {
            return JSON.parse(value);
        }
        return 0;
    } catch (error) {
        // Error retrieving data
        return 0;
    }
}

const saveVibration = async (b) => {
    try {
        await AsyncStorage.setItem('@vibrationsetting', b);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getVibration = async () => {
    try {
        const value = await AsyncStorage.getItem('@vibrationsetting');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
}

const saveLoginType = async (b) => {
    try {
        await AsyncStorage.setItem('@loginType', b);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getLoginType = async () => {
    try {
        const value = await AsyncStorage.getItem('@loginType');
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
}


const saveCacheJSON = async (key) => {
    try {
        await AsyncStorage.setItem(key, value);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

const getCacheJSON = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
};



module.exports = {
    saveToken,
    getToken,
    savePackageCode,
    getPackageCode,
    saveTokenChild,
    getTokenChild,
    saveTokenParent,
    getTokenParent,
    saveUserPost,
    saveUserId,
    getUserId,
    getUserPost,
    saveUserName,
    saveUserPass,
    getUserName,
    getUserPass,
    saveAvatar,
    getAvatar,
    saveAuth,
    saveSoundVolume,
    getSoundVolume,
    saveVibration,
    getVibration,
    saveLoginType,
    getLoginType,
    getAuth,
    saveCacheJSON,
    getCacheJSON,
    saveParentAvatarUri,
    getParentAvatarUri
};

