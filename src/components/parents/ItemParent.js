import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { row_parent_width } from '../../constants/const';
import RippleButton from '../common/RippleButton';

export default class ItemParent extends Component {
    render() {
        return (
            <RippleButton style={styles.rows}>
                <Icon name={'bar-chart'} color={'#333'} size={20} style={styles.icon} />
                <Text style={styles.title}>Thống Kê Học Tập</Text>
            </RippleButton>
        )
    }
}
const styles = StyleSheet.create({
    rows: {
        marginVertical: 5,
        paddingVertical: 25,
        paddingHorizontal: 10,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#cdcdcd',
        width: row_parent_width
    },
    title: {
        color: '#383838',
        fontSize: 13
    },
    icon: {
        position: 'absolute',
        right: 5,
        top: 5
    }
});