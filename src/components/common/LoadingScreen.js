import React from 'react';
import { View, StyleSheet, Platform, Image, Dimensions } from 'react-native';
import { UIActivityIndicator, } from 'react-native-indicators';
import Color from '../../constants/colors';
let { width, height } = Dimensions.get('window');
let s = width;
if (width > height) {
    width = height;
    height = s;
}

export const LoadingLearn = ({
    isLoading,
    bgColor,
    color
}) => {
    return (
        <View
            style={[isLoading ? styles.containerLearn : styles.none,
            { backgroundColor: bgColor || Color.bgLoadingColorDefault }
            ]}
        >
            {isLoading &&
                <UIActivityIndicator size={40} color={color || Color.loadingColorDefault} />
            }
        </View>
    );
}

export default LoadingScreen = ({
    isLoading,
    bgColor,
    color
}) => {
    return (
        <View
            style={[isLoading ? styles.container : styles.none,
            { backgroundColor: bgColor || Color.bgLoadingColorDefault }
            ]}
        >
            {isLoading &&
                <UIActivityIndicator size={40} color={color || Color.loadingColorDefault} />
            }
        </View>
    );
}

export const LoadingTransparent = ({
    isLoading,
    bgColor = 'rgba(0,0,0,0.3)',
    color
}) => {
    return (
        <View
            style={[isLoading ? styles.containerScreen : styles.none,
            { backgroundColor: bgColor || Color.bgLoadingColorDefault }
            ]}
        >
            {isLoading &&
                <UIActivityIndicator size={40} color={color || Color.loadingColorDefault} />
            }
        </View>
    );
}

export const LoadingView = ({
    isLoading,
    bgColor,
    color
}) => {
    return (
        <View
            style={[isLoading ? styles.containerView : styles.none,
            { backgroundColor: bgColor || Color.bgLoadingColorDefault }
            ]}
        >
            {isLoading &&
                <UIActivityIndicator size={40} color={color || Color.loadingColorDefault} />
            }
        </View>
    );
}


export const LoadingImage = ({
    isLoading,
    bgColor,
    color
}) => {
    return (
        <View
            style={[isLoading ? styles.containerView : styles.none,
            { backgroundColor: bgColor || Color.bgLoadingColorDefault }
            ]}
        >
            {isLoading &&
                <Image source={null} style={styles.imageKiwi} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        // top: Platform.OS == 'ios' ? 60 : 40,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10,
    },
    containerView: {
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: width,
        height: height,
    },
    containerScreen: {
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: width,
        height: height,
    },
    containerLearn: {
        position: 'absolute',
        justifyContent: 'center',
        top: Platform.OS == 'ios' ? 50 : 20,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10,
    },
    none: {
        display: 'none',
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -2,
    },
    imageKiwi: {
        width: 60,
        height: 60,
    }
});
