import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RippleButton from '../common/RippleButton';
import Color from '../../constants/colors';

export const PageButton = ({ width, icon, type }) => {
    return (
        <View style={[styles.wrapPageButton, { width: width || 120 }]}>
            {icon &&
                <Icon name={type == 'left' ? 'chevron-left' : 'chevron-right'} color={'#FFA03E'} size={16} style={styles.icon} />
            }
            <Text style={styles.labelPage}>{type == 'left' ? 'Quay lại' : 'Câu kế tiếp'}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapPageButton: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelPage: {
        color: '#FFA03E',
        fontSize: 13
    },
    icon: {
        marginRight: 5
    }

});