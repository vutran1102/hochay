import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Color from '../../constants/colors';
import RippleButton from '../common/RippleButton';
import { tab_main_width } from '../../constants/const';
const { width, height } = Dimensions.get('window');
const w = width > height ? width : height;
const row_subject_width = (w - tab_main_width - 2 * 20);

export default ItemSubject = ({ item, onPress }) => {
    return (
        <RippleButton style={styles.rowItems}>
            <Text style={styles.textTitle}>{item.title}</Text>
        </RippleButton>
    )
}

const styles = StyleSheet.create({
    rowItems: {
        width: row_subject_width,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginVertical: 10,
        paddingVertical: 20,
        borderRadius: 8,
        borderColor: '#ececec',
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    textTitle: {
        fontFamily: 'SVN-Gumley',
        fontSize: 18,
        color: 'white',
        textShadowColor: 'rgb(5, 97, 203)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1
    }
});