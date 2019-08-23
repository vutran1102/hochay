import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { isIphoneX, isIphoneXsMax } from '../../constants/const';

export default Container = ({ children }) => {
    return (
        <View style={{ flex: 1, marginHorizontal: isIphoneX() || isIphoneXsMax() ? 30 : 0 }}>
            {children}
        </View>
    );
}

export const ContainerVertical = ({ children }) => {
    return (
        <View style={{ flex: 1, marginTop: isIphoneX() || isIphoneXsMax() ? 30 : 0 }}>
            {children}
        </View>
    );
}

export const Wrapper = ({ children }) => {
    return (
        <View style={{  marginHorizontal: isIphoneX() || isIphoneXsMax() ? 30 : 0 }}>
            {children}
        </View>
    );
}