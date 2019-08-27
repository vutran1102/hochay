import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import RippleButton from '../common/RippleButton';
import LevelPractice from '../common/LevelPractice';
import TranslateTextHoler from '../anim/TranslateTextHoler';
import SlideInBottom from '../anim/SlideInBottom';
import AppIcon from '../../utils/AppIcon';

const arraySource = [AppIcon.icon_board, AppIcon.icon_book, AppIcon.icon_pen, AppIcon.icon_penholder, AppIcon.icon_hat, AppIcon.icon_calc, AppIcon.icon_clock];
const { width, height } = Dimensions.get('window');
const rowWidth = width > height ? width / 4 : height / 4;

export default class ListProblem extends Component {
    render() {
        const { item, isLoading, index } = this.props;
        const { levelPractice } = item;
        return (
            <SlideInBottom duration={index < 5 ? (index + 1) * 200 : 200}>
                <ImageBackground source={AppIcon.frame_dvkt} style={{ width: 120, height: 120, margin: 6 , justifyContent:'center', alignItems:'center'}}>
                    <RippleButton color={'transparent'} style={styles.listItem} onPress={() => this.props.onPress(item)}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                            <View style={{ width: 130, justifyContent: 'center', alignItems: 'center', borderRadius: 8, paddingTop: 10, marginTop: 5 }}>
                                <LevelPractice levelPractice={levelPractice} />
                            </View>
                            <View style={{ padding: 10, borderWidth: 0, borderRadius: 15, marginTop: 5, borderColor: '#CFCFCF', justifyContent: 'center', alignItems: 'center', alignSelf:'center', paddingLeft: 20}}>
                                <Image source={arraySource[index%7]} style={{ width: 60, height: 60 }} resizeMode='contain'/>
                            </View>
                            {isLoading ?
                                <View>
                                    <TranslateTextHoler width={100} />
                                    <TranslateTextHoler width={100} />
                                </View>
                                :
                                <Text numberOfLines={2} style={styles.title} ellipsizeMode='tail' >{item.title || ' '}</Text>
                            }
                        </View>
                    </RippleButton>
                </ImageBackground>
            </SlideInBottom>
        )
    }
}
const styles = StyleSheet.create({
    listItem: {
        width: 191,
        marginRight: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: '#383838',
        alignItems:'center'
    },
    title: {
        height: 60,
        width: 100,
        color: '#FBEF00',
        marginRight: 15,
        fontSize: 13,
        marginHorizontal: 40,
        alignSelf:'center',
        fontFamily: 'Roboto-Bold',
        top: -30,
        shadowColor: '#004DA5',
        shadowOffset: {width: 2, height:2},
    },
    iconApple: {
        width: 16,
        height: 20,
        marginRight: 5,
    },
    rows: {
        flexDirection: 'row'
    }
});
