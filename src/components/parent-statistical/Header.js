import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import RippleButton from '../common/RippleButton';
import IconIon from 'react-native-vector-icons/Ionicons';
import AppIcon from '../../utils/AppIcon';
import PropsTypes from 'prop-types';
import Color from '../../constants/colors';
import { isIphoneX, isIphoneXsMax } from '../../constants/const';
import { playSoundButton } from '../../utils/AudioUtils';

export default class Header extends Component {
    render() {
        const { displayName, gradeId, type } = this.props;
        return (
            <View style={[styles.wrapHeader, { backgroundColor: this.props.bgColor || 'transparent' }]}>
                <RippleButton onPress={() => { this.props.onPress(); playSoundButton(); }} size={40} duration={250} style={styles.arround}>
                    <IconIon name={'md-arrow-back'} color={this.props.color ? this.props.color : Color.iconHeaderColor} size={24} style={styles.icon} />
                </RippleButton>
                <Text style={[styles.title, { color: this.props.color }]}>{this.props.title || ''}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {type == 'detail' &&
                        <View style={{ flexDirection: 'row', marginRight: 10 }}>
                            <Image source={AppIcon.icon_girl} style={styles.iconAvatar} />
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={styles.textUser}>{displayName || ''}</Text>
                                <Text style={styles.textClass}>Lớp {gradeId ? gradeId.substring(1) : ''}</Text>
                            </View>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapHeader: {
        paddingHorizontal: isIphoneX() || isIphoneXsMax() ? 30 : 0,
        flexDirection: 'row',
        alignItems: 'center',
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
    iconAvatar: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        borderRadius: 15,
        marginRight: 5
    },
    textUser: {
        fontSize: 12,
        fontFamily: 'SVN-Gumley',
        color: 'white'
    },
    textClass: {
        fontSize: 11,
        fontFamily: 'SVN-Gumley',
        color: 'white'
    }
});

Header.propsTypes = {
    title: PropsTypes.string,
    onPress: PropsTypes.func.isRequired
}
