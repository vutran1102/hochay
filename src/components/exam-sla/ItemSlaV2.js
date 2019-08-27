import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';
import TranslateTextHolder from '../anim/TranslateTextHoler';
import SlideInBottom from '../anim/SlideInBottom';
const bgLoading = '#dadada';
const arraySource = [AppIcon.icon_board, AppIcon.icon_book, AppIcon.icon_pen, AppIcon.icon_penholder, AppIcon.icon_hat, AppIcon.icon_calc, AppIcon.icon_clock];
export default class ItemSlaV2 extends Component {
    onPress(item) {
        this.props.onPress(item);
    }

    render() {
        const { item, isLoading, index } = this.props;
        return (
            <SlideInBottom translateY={500} duration={index < 5 ? (index + 1) * 400 : 400}>
                <ImageBackground source={AppIcon.bg_item_step_practice} style={{ width: 150, height: 173, marginLeft: 10 }}>
                    <RippleButton onPress={() => isLoading ? null : this.props.onPress(this.props.item)} style={styles.cols} size={200} color={'#fff'}>
                        {isLoading ?
                            <View style={{ height: 70, marginRight: 10 }}>
                                <TranslateTextHolder />
                                <TranslateTextHolder />
                                <TranslateTextHolder />
                            </View>
                            :
                            <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.title}>
                                {item.title || ''}
                            </Text>
                        }
                        <Image source={arraySource[index % (arraySource.length)]} style={styles.icon2} resizeMode='contain' />
                    </RippleButton >
                </ImageBackground>
            </SlideInBottom>
        )
    }
}
const styles = StyleSheet.create({
    cols: {
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 5,
        width: 150,
        marginRight: 20,
        alignItems: 'center'
    },
    icon2: {
        top: - 40,
        width: 80,
        height: 100,
    },
    title: {
        height: 70,
        fontSize: 14,
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(251, 239, 0)',
        textShadowColor: 'rgb(0,77,166)',
        textShadowOffset: {width: 2, height:2},
        textShadowRadius: 0,
    },
    viewIcon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textScore: {
        marginHorizontal: 10,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        color: 'rgb(166, 168, 171)'
    },
    rowBottom: {
        width: 152,
        paddingTop: 3,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    iconApple: {
        width: 20,
        height: 25,
    },
    icon: {
        alignSelf: 'center',
        width: 16,
        height: 16,
        marginLeft: -15,
    },
    textDesc: {
        fontSize: 13,
        marginLeft: 5,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(166, 168, 171)'
    },
    textLoading: {
        backgroundColor: bgLoading,
        height: 15,
        marginTop: 3,
    },
    textLoadingBot: {
        flex: 1,
        backgroundColor: bgLoading,
        height: 16,
        marginTop: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }
});

