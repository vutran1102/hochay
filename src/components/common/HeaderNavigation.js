import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RippleButton from './RippleButton';
import IconIon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropsTypes from 'prop-types';
import Color from '../../constants/colors';
import { playSoundButton } from '../../utils/AudioUtils';

export const HeaderRightSelect = ({
    onPress,
    title,
    rightTitle,
    bgColor,
    color,
    onRightEvent
}) => {
    return (
        <View style={[styles.container, { backgroundColor: bgColor || 'transparent' }]}>
            <RippleButton onPress={() => { onPress(); playSoundButton(); }} size={40} duration={250} style={styles.arround}>
                <IconIon name={'md-arrow-back'} color={color ? color : Color.iconHeaderColor} size={24} style={styles.icon} />
            </RippleButton>
            <Text style={[styles.title, { color: color }]}>{title || ''}</Text>
            <RippleButton onPress={() => { onRightEvent(); playSoundButton(); }} size={40} duration={250} style={styles.arround}>
                <View style={styles.viewSelect}>
                    <Text style={styles.textChild}>{rightTitle}</Text>
                    <Icon name={'caret-down'} size={16} color={'#999'} style={styles.iconCaret} />
                </View>
            </RippleButton>
        </View>
    );
}
export const HeaderRightTitle = ({
    onPress,
    title,
    bgColor,
    color,
    onRightEvent
}) => {
    return (
        <View style={[styles.container, { backgroundColor: bgColor || 'transparent' }]}>
            <RippleButton onPress={() => { onPress(); playSoundButton(); }} size={40} duration={250} style={styles.arround}>
                <IconIon name={'md-arrow-back'} color={color ? color : Color.iconHeaderColor} size={24} style={styles.icon} />
            </RippleButton>
            <Text style={[styles.title, { color: color }]}>{title || ''}</Text>
            <RippleButton onPress={() => { onRightEvent(); playSoundButton(); }} size={40} duration={250} style={styles.arround}>
                <Text style={styles.textRight}>Quản lý gói</Text>
            </RippleButton>
        </View>
    );
}


export default HeaderNavigation = ({
    onMenuPress = () => null,
    onPress = () => null,
    title,
    bgColor,
    color,
    icon = false
}) => {
    return (
        <View style={[styles.container, { backgroundColor: bgColor || 'transparent' }]}>
            <RippleButton onPress={() => { onPress(); playSoundButton(); }} size={40} duration={250} style={styles.arround}>
                <IconIon name={'md-arrow-back'} color={color ? color : Color.iconHeaderColor} size={24} style={styles.icon} />
            </RippleButton>
            <Text style={[styles.title, { color: color }]}>{title || ''}</Text>
            {icon &&
                <RippleButton onPress={() => { onMenuPress(); playSoundButton(); }} size={40} duration={250} style={styles.arround}>
                    <Icon name={icon} color={color ? color : Color.iconHeaderColor} size={24} style={styles.icon} />
                </RippleButton>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.textHeaderColor
    },
    arround: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    icon: {
        alignSelf: 'center'
    },
    textRight: {
        marginRight: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        color: Color.textHeaderColor
    },
    viewSelect: {
        marginRight: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgb(181, 182, 185)',
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    textChild: {
        marginRight: 10,
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: 'rgb(181, 182, 185)',
        lineHeight: 24,
    },
    iconCaret: {
        alignSelf: 'center'
    }
});

HeaderNavigation.propsTypes = {
    title: PropsTypes.string,
    onPress: PropsTypes.func.isRequired
}
