import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RippleButton from '../common/RippleButton';
import Color from '../../constants/colors';

export default class ItemSla extends Component {
    render() {
        return (
            <RippleButton style={styles.rowsItems} onPress={() => this.props.onPress(this.props.item)}>
                <Text style={styles.title}>{this.props.item.title || ''}</Text>
            </RippleButton>
        )
    }
}
const styles = StyleSheet.create({
    rowsItems: {
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderColor: '#cdcdcd',
        paddingVertical: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 13,
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-Bold',
    }

});