import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { main } from '../../themes/index';
import RippleButton from '../common/RippleButton';

export const Itemknowledge = ({ title, onPress }) => {
    return (
        <RippleButton onPress={onPress} style={[main.rowsDef, main.paddingV5]}>
            <Icon name={'school'} color={'#FF9902'} size={24} style={main.iconL} />
            <Text style={[main.textPrimary, styles.title]}>{title || ''}</Text>
        </RippleButton>
    );
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        marginLeft: 20
    }
});