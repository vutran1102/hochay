import { Platform, ToastAndroid } from 'react-native';
import {
    API_BASE_EDMICRO, API_BASE_OAUTH_EDMICRO, API_BASE_ONLUYEN, API_BASE_OAUTH_ONLUYEN, API_PROVIDER,
    API_BETA_ONLUYEN, API_BASE_OAUTH_BETA_ONLUYEN
} from './http';

const API_RELEASE = 'API_RELEASE';
const API_BETA = 'API_BETA';
const API_DEV = 'API_DEV';

const TEST = API_BETA; //change

// const RELEASE = false;
// const BETA = false;

const getHeaders = (token) => (
    {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
);

// Platform.OS == 'android' && ToastAndroid.show('App API BETA !', ToastAndroid.SHORT);
// module.exports = {
//     API_BASE: API_BETA_ONLUYEN,
//     API_BASE_OAUTH: API_BASE_OAUTH_BETA_ONLUYEN,
//     API_PROVIDER: API_PROVIDER,
//     getHeaders
// };

Platform.OS == 'android' && ToastAndroid.show('App API RELEASE !', ToastAndroid.SHORT);
module.exports = {
    API_BASE: API_BASE_ONLUYEN,
    API_BASE_OAUTH: API_BASE_OAUTH_ONLUYEN,
    API_PROVIDER: API_PROVIDER,
    getHeaders
};

// Platform.OS == 'android' && ToastAndroid.show('App API developer !', ToastAndroid.SHORT);
// module.exports = {
//     API_BASE: API_BASE_EDMICRO,
//     API_BASE_OAUTH: API_BASE_OAUTH_EDMICRO,
//     API_PROVIDER: API_PROVIDER,
//     getHeaders
// };

// if (!__DEV__) {
//     module.exports = {
//         API_BASE: API_BASE_ONLUYEN,
//         API_BASE_OAUTH: API_BASE_OAUTH_ONLUYEN,
//         API_PROVIDER: API_PROVIDER,
//         getHeaders
//     };
// } else {
//     if (TEST == API_BETA) {
//         Platform.OS == 'android' && ToastAndroid.show('App API BETA !', ToastAndroid.SHORT);
//         module.exports = {
//             API_BASE: API_BETA_ONLUYEN,
//             API_BASE_OAUTH: API_BASE_OAUTH_BETA_ONLUYEN,
//             API_PROVIDER: API_PROVIDER,
//             getHeaders
//         };
//     }
//     else if (TEST == API_RELEASE) {
//         Platform.OS == 'android' && ToastAndroid.show('App API RELEASE !', ToastAndroid.SHORT);
//         module.exports = {
//             API_BASE: API_BASE_ONLUYEN,
//             API_BASE_OAUTH: API_BASE_OAUTH_ONLUYEN,
//             API_PROVIDER: API_PROVIDER,
//             getHeaders
//         };
//     } else {
//         Platform.OS == 'android' && ToastAndroid.show('App API developer !', ToastAndroid.SHORT);
//         module.exports = {
//             API_BASE: API_BASE_EDMICRO,
//             API_BASE_OAUTH: API_BASE_OAUTH_EDMICRO,
//             API_PROVIDER: API_PROVIDER,
//             getHeaders
//         };
//     }
// }

