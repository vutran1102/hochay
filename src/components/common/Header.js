import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import RippleButton from './RippleButton';

const HeaderBackImage = ({
    color,
    title,
    goBack
}) => {
    return (
        <View style={styles.container}>
            <RippleButton color={'transparent'} style={styles.bntImageBack} onPress={() => goBack()}>
                <Image source={require('../../asserts/icon/back.png')} style={styles.imageBack} />
            </RippleButton>
            <Text style={[styles.title, { color: color }]}>{title || ''}</Text>
        </View>
    );
}

const HeaderBackDarkImage = ({
    color,
    title,
    goBack,
    bgHeader
}) => {
    return (
        <View style={[styles.container, { backgroundColor: bgHeader }]}>
            <RippleButton color={'transparent'} style={styles.bntImageBack} onPress={() => goBack()}>
                <Image source={require('../../asserts/icon/back.png')} style={styles.imageBack} />
            </RippleButton>
            <Text style={[styles.title, { color: '#fff' }]}>{title || ''}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    bntImageBack: {
        padding: 5,
        paddingHorizontal: 10
    },
    imageBack: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    title: {
        flex: 1,
        marginHorizontal: 20,
    }
});

module.exports = {
    HeaderBackImage,
    HeaderBackDarkImage
}
