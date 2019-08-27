import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RippleButton from '../common/RippleButton';
import Color from '../../constants/colors';
import AppIcon from '../../utils/AppIcon';
const { width, height } = Dimensions.get('window');

const w = width > height ? width : height;
const h = width < height ? width : height;

export default Header = ({ onPress, title, bgColor }) => {
    return (
        <View style={[styles.container, { backgroundColor: bgColor || 'rgb(230, 230, 230)' }]}>
            <View style={styles.wrTitle}>
                <Text style={styles.textTile}>{title || ''}</Text>
            </View>
            <View style={styles.row}>
                <RippleButton size={50} onPress={onPress} style={styles.wrapClose}>
                    <Icon name={'remove'} color={'rgb(228, 41, 0)'} size={16} style={styles.icon} />
                </RippleButton>
            </View>
        </View>
    )
}

export class HeaderWithBg extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <ImageBackground source={AppIcon.background_header_main} resizeMode={'stretch'} style={{ height: 90, left: -50, width: w + 100 , paddingLeft: 100}}>
                {this.props.back && <RippleButton style={[styles.backBtn,  this.props.left && {left: this.props.left}]} radius={20} onPress={()=> {this.props.back()}}>
                    <Image source={AppIcon.icon_back} style={[{width: 30, height: 30}]} resizeMode='contain'/>
                </RippleButton>}
                {this.props.children}
            </ImageBackground>
        )
    }
}

export const HeaderClose = ({ onPress, title, typeCodePin }) => {
    return (
        <View style={styles.container}>
            <View style={styles.rowClose}>
                <View style={styles.wrTitle}>
                    <Text style={styles.textTile}>{title || ''}</Text>
                </View>
                {typeCodePin != 'add' ?
                    <RippleButton size={50} onPress={onPress} style={styles.wrapClose} >
                        <Image source={AppIcon.icon_close} style={styles.icon} />
                    </RippleButton>
                    :
                    <RippleButton disabled size={50} style={styles.wrapClose} >
                        <View style={styles.icon} />
                    </RippleButton>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingLeft: 5,
        paddingVertical: 3,
        flexDirection: 'row',
        backgroundColor: 'rgb(230, 230, 230)',
        justifyContent: 'space-between'
    },
    backBtn: {
        width: 30, height:30
        , marginLeft: 80, marginTop: 20,
        position:'absolute',
        zIndex:99
    },
    row: {
        flexDirection: 'row',
    },
    rowClose: {
        flexDirection: 'row',
        flex: 1,
    },
    wrapClose: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    icon: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        marginRight: 5,
    },
    wrTitle: {
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTile: {
        alignSelf: 'center',
        color: 'rgb(166, 168, 171)',
        fontSize: 13,
        fontWeight: 'bold'
    }
});