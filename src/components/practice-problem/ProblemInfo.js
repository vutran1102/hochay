import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { HeaderClose } from '../modals/Header';
import LevelPractice from '../common/LevelPractice';
import { ButtomCustomeSmall } from '../common/Button';
import AppIcon from '../../utils/AppIcon';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';
import SlideInBottom from '../anim/SlideInBottom';
import LevelPracticeBig from '../common/LevelPracticeBig';
import PopUp from '../common/PopUp';
import RippleButton from '../common/RippleButton';

let { width, height } = Dimensions.get('window');
let s = width;
if(width < height) {
    width = height;
    height = s;
}

export default ProblemInfo = ({
    onclose = () => null,
    title = '',
    levelPractice = 0,
    status = 0,
    isLarge = false,
    handleNavigate = () => null
}) => {
    return (
        <View style={styles.viewAbsolute}>
            {/* <View style={styles.container}>
                <HeaderClose onPress={() => onclose(false)} />
                <View style={styles.body}>
                    <ScaleSlideAnim type={'timing'} duration={800} delay={0}>
                        <Text style={[styles.textHead]}>{title}</Text>
                    </ScaleSlideAnim>
                    <LevelPracticeBig levelPractice={levelPractice} isLarge={true} />
                    <SlideInBottom duration={1000}>
                        <ButtomCustomeSmall
                            width={200}
                            title={status === 2 ? 'Làm lại' : status === 1 ? 'Tiếp tục' : 'Bắt đầu luyện tập'}
                            onPress={() => handleNavigate()} />
                    </SlideInBottom>
                </View>
            </View> */}
            <PopUp source={AppIcon.pop_up_2} width={width * 0.65} height={height * 0.57} style={{ alignSelf: 'center' }} close={() => onclose(false)}>
                <Image source={AppIcon.icn_mascot} style={{width: width * 0.2, position:'absolute', height: height* 0.5, right: - width*0.12, bottom: - 15}} resizeMode='contain'/>
                <Image source={AppIcon.icn_text_box} style={{width: width * 0.15, position:'absolute', height: height* 0.25, right: - width*0.15, top: - height*0.2}} resizeMode='contain'/>
                <View style={styles.body}>
                    <Image source={AppIcon.icn_title} style={{width: '25%'}} resizeMode='contain'/>
                    <ScaleSlideAnim type={'timing'} duration={800} delay={0}>
                        <Text style={[styles.textHead]}>{title}</Text>
                    </ScaleSlideAnim>
                    <LevelPracticeBig levelPractice={levelPractice} isLarge={true} />
                    <SlideInBottom duration={1000}>
                        <RippleButton style={{width: 0.23 * width, height: 0.1 * height, bottom: 10}} rippleContainerBorderRadius={10} onPress={() => handleNavigate()}>
                            <Image source={AppIcon.btn_luyen_ngay} style={{width: 0.23 * width, height: 0.1 * height}} resizeMode='contain'/>
                        </RippleButton>
                        {/* <ButtomCustomeSmall
                            width={200}
                            title={status === 2 ? 'Làm lại' : status === 1 ? 'Tiếp tục' : 'Bắt đầu luyện tập'}
                            onPress={() => handleNavigate()} /> */}
                    </SlideInBottom>
                </View>
            </PopUp>
        </View >
    )
}

const styles = StyleSheet.create({
    viewAbsolute: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: 400,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignSelf: 'center'

    },
    headerTitle: {
        marginTop: 5,
        marginHorizontal: 5,
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        alignSelf: 'center'
    },
    body: {
        flex: 1, paddingHorizontal: 20, justifyContent: 'space-around', alignItems: 'center'
    },
    textHead: {
        color: 'black',
        fontSize: 13,
        fontFamily: 'Roboto-Bold'
    },
    rows: {
        flexDirection: 'row'
    },
    iconApple: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginHorizontal: 5
    }
});