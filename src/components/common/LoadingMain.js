import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { UIActivityIndicator, } from 'react-native-indicators';
import Color from '../../constants/colors';

export default LoadingScreen = ({ isLoading, bgColor, color }) => {
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

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        top: Platform.OS == 'ios' ? 80 : 60,
        right: 0,
        bottom: 0,
        left: 100,
        zIndex: 10,
    },
    none: {
        display: 'none',
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -2,
    }
});
