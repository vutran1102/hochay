import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextPulsating from './TextPulsating';

export default class TestChonse extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TextPulsating style={styles.text} title={'Hello world'} />
            </View >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Roboto-Bold',
        color: '#3636bf',
        fontSize: 18,
    }
});