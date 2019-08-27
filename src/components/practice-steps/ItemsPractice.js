import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';
import TranslateTextHolder from '../anim/TranslateTextHoler';
import SlideInBottom from '../anim/SlideInBottom';
const bgLoading = '#dadada';

export default class ItemsPractice extends Component {
    onPress(item) {
        this.props.onPress(item);
    }

    render() {
        const { item, isLoading, index } = this.props;
        // console.log("")
        return (
            <SlideInBottom translateY={500} duration={index < 5 ? (index + 1) * 400 : 400}>
                <ImageBackground source={AppIcon.bg_item_step_practice} style={{ width: 150, height: 173, marginLeft: 10 }} resizeMode='contain'>
                    <RippleButton onPress={() => isLoading ? null : this.onPress(item)} style={styles.cols} size={200} color={'#fff'}>
                        <View style={styles.viewIcon}>
                            <Image source={AppIcon.icon_apple} style={styles.iconApple} resizeMode='contain'/>
                            {isLoading ?
                                <Text style={[styles.textScore, { backgroundColor: bgLoading, width: 60 }]}>{' '}</Text>
                                :
                                <Text style={styles.textScore}>0/{item.totalProblem || '0'}</Text>
                            }
                        </View>
                        {isLoading ?
                            <View style={{ height: 80, marginRight: 10 }}>
                                <TranslateTextHolder />
                                <TranslateTextHolder />
                                <TranslateTextHolder />
                            </View>
                            :
                            <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.title}>
                                {item.name || ''}
                            </Text>
                        }
                    </RippleButton >
                    {/* {isLoading ?
                        <View style={styles.rowBottom}>
                            <View style={styles.textLoadingBot}>
                            </View>
                        </View>
                        :
                        <RippleButton
                            onPress={() => this.props.visibleKnowledge(true, item)}
                            size={150} style={styles.rowBottom}>
                            <Image source={AppIcon.icon_star} style={styles.icon} />
                            <Text style={styles.textDesc}>Độ thông hiểu</Text>
                        </RippleButton>
                    } */}
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
        marginRight: 20
    },
    title: {
        marginTop: 20,
        height: 80,
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
        width: 40,
        height: 50,
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