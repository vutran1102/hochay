import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

let baseUrl = 'file:///android_asset/';
if (Platform.OS === 'ios') {
    baseUrl = 'web/';
}

export const tab_main_width = isIphoneX() ? 130 : isIphoneXsMax() ? 150 : 80;
export const margin_row = isIphoneX() ? 50 : isIphoneXsMax() ? 50 : 20;
export const width_device = width;
export const height_device = height;
export const row_practice_width = ((width - 100) / 2) - 10;
export const row_parent_width = ((width - 100) / 2) - 10;
export const type_practice = 'type_practice';
export const type_exam = 'type_exam';
export const type_kiwi = 'type_kiwi';
export const type_trophy = 'type_trophy';
export const BASE_URL_WEB = baseUrl;

export const MATH_KIT = 'MATHPLAY';


export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812))
    );
}

export function isIphoneXsMax() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 896 || dimen.width === 896))
    );
}

export const EnumLevelPractice =Object.freeze({
    /// <summary>
    /// The level 0 (0-39 - chưa đạt)
    /// </summary>
    LEVEL0: {
        title: 'Chưa đạt',
        levelNumber: 1
    },
    /// <summary>
    /// The level 1 (40-79 - dat)
    /// </summary>
    LEVEL1: {
        title: 'Đạt',
        levelNumber: 2
    },
    /// <summary>
    /// The level 2 (80-99 - Khá)
    /// </summary>
    LEVEL2: {
        title: 'Tốt',
        levelNumber: 3
    },
    /// <summary>
    /// The level 3 (100 - Tốt)
    /// </summary>
    LEVEL3: {
        title: 'Xuất sắc',
        levelNumber: 4
    },
})