import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RippleButton from '../common/RippleButton';
import Color from '../../constants/colors';

export const Button = ({ width, title, onPress }) => {
    return (
        <RippleButton onPress={onPress} style={[styles.wrapButton, { width: width || 120 }]}>
            <Text style={styles.label}>{title || ''}</Text>
        </RippleButton>
    )
}

export const ButtonInfo = ({ width, title, icon, onPress }) => {
    return (
        <RippleButton onPress={onPress} style={[styles.wrapButtonInfo, { width: width || 120 }]}>
            {icon &&
                <Icon name={icon} color={'white'} size={16} style={styles.icon} />
            }
            <Text style={styles.labelInfo}>{title || ''}</Text>
        </RippleButton>
    )
}

export const PreviewButton = ({ width, icon, onPress, color, disabled = false }) => {
    return (
        <RippleButton disabled={disabled} onPress={onPress} style={[styles.wrapPageButton, { width: width || 120 }]}>
            {icon &&
                <Icon name={'chevron-left'} color={disabled ? '#999' : '#00ADF8'} size={16} style={styles.icon} />
            }
            <Text style={[styles.labelPage, { color: disabled ? '#999' : '#00ADF8' }]}>{'Quay lại'}</Text>
        </RippleButton>
    )
}

export const NextButton = ({ width, icon, onPress, color, disabled = false }) => {
    return (
        <RippleButton disabled={disabled} onPress={onPress} style={[styles.wrapPageButton, { width: width || 120 }]}>
            <Text style={[styles.labelPage, { color: disabled ? '#999' : '#00ADF8' }]}>{'Câu kế tiếp'}</Text>
            {icon &&
                <Icon name={'chevron-right'} color={disabled ? '#999' : '#00ADF8'} size={16} style={styles.iconR} />
            }
        </RippleButton>
    )
}

export const ButtonCustome = ({ width, icon, title, color, bg }) => {
    return (
        <View style={[styles.wrapPageButtonDef, { width: width || 120, backgroundColor: bg ? bg : '#DDDDDD' }]}>
            {icon &&
                <Icon name={icon} color={color || '#333'} size={16} style={styles.icon} />
            }
            <Text style={[styles.labelCustome, { color: color || '#333' }]}>{title || ''}</Text>
        </View>
    )
}

export const TouchaButton = ({ width, icon, title, color, onPress, source }) => {
    return (
        <RippleButton onPress={onPress} style={[styles.wrapTouchButton, { width: width || 120 }]}>
            <Image source={source} style={{ width: 20, height: 20, marginRight: 10 }} />
            <View style={styles.seperation}/>
            <Text style={[styles.labelTouch, { color: color || '#094EA5' }]}>{title || ''}</Text>
        </RippleButton>
    )
}

export const ButtomCustome = ({ width, title, color, onPress, bgColor, height, borderRadius, fontSize }) => {
    return (
        <RippleButton onPress={onPress} style={[styles.customeBtn, { width: width || 120, backgroundColor: bgColor || '#dđ', height: height || 46, borderRadius: borderRadius || 30 }]}>
            <Text style={[styles.labelCustome, { color: color || '#fff', fontSize: fontSize || 13 }]}>{title || ''}</Text>
        </RippleButton>
    )
}

export const ButtomCustomeSmall = ({ width, title, color, onPress, bgColor, size, style }) => {
    return (
        <RippleButton size={size} onPress={onPress} style={[styles.customeBtn, { width: width || 120, height: 40, backgroundColor: bgColor || 'rgb(122, 199, 12)', ...style }]}>
            <Text style={[styles.labelCustomeSmall, { color: color || '#fff' }]}>{title || ''}</Text>
        </RippleButton >
    )
}

export const ButtomDisabled = ({ width, title, color, onPress, bgColor, size, style }) => {
    return (
        <View size={size} onPress={onPress} style={[styles.customeBtn, { width: width || 120, height: 40, backgroundColor: bgColor || '#95a7b0', ...style }]}>
            <Text style={[styles.labelCustomeSmall, { color: color || '#fff' }]}>{title || ''}</Text>
        </View >
    )
}


const styles = StyleSheet.create({
    wrapButton: {
        flexDirection: 'row',
        backgroundColor: '#FF9900',
        paddingVertical: 5,
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center'
    },
    label: {
        color: Color.textColorPrimary,
        fontSize: 14,
        fontWeight: '600'
    },
    wrapButtonInfo: {
        flexDirection: 'row',
        backgroundColor: '#2B78E4',
        paddingVertical: 5,
        justifyContent: 'center',
        borderColor: '#383838',
        borderWidth: 1,
        borderRadius: 4,
        alignItems: 'center'
    },
    labelInfo: {
        color: '#fff',
        fontSize: 13
    },
    labelTouch: {
        fontFamily: 'Roboto-Bold',
        color: '#BDBDBD',
        fontSize: 14,
        marginLeft: 10,
    },
    icon: {
        marginRight: 5
    },
    iconR: {
        marginLeft: 5
    },
    wrapPageButton: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapPageButtonDef: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#333'
    },
    labelPage: {
        fontWeight: 'bold',
        color: '#FFA03E',
        fontSize: 14
    },
    labelCustome: {
        color: '#FFA03E',
        fontSize: 13
    },
    wrapTouchButton: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#F7B200',
        margin: 4,
        backgroundColor: '#fff'
    },
    seperation: {
        width: 1,
        borderColor: '#F7B200',
        borderWidth: 0.5,
        height: '80%'
    },
    circleButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#3B3C3D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    customeBtn: {
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelCustome: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        lineHeight: 23
    },
    labelCustomeSmall: {
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
        lineHeight: 23
    }

});