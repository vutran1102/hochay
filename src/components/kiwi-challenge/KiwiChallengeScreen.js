import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import HeaderNavigation from '../common/HeaderNavigation';
import Container from '../common/Container';
import AppIcon from '../../utils/AppIcon';
import Color from '../../constants/colors';
import { ButtomCustomeSmall } from '../common/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import PopUp from '../common/PopUp';
import { HeaderWithBg } from '../modals/Header';
import RippleButton from '../common/RippleButton';

let { width, height } = Dimensions.get('window');
let s = width;
if(width < height) {
    width = height;
    height = s;
}

export default class KiwiChallengeScreen extends Component {

    goBack() {
        this.props.navigation.goBack();
    }

    handleNavigate() {
        // alert('Nội dung đang được xây dựng !');
        const { practiceInfo } = this.props; //mokup demo
        const stepIdNow = practiceInfo.stepIdNow || '5c88decaf44e4400019aeabb';
        const problemCode = practiceInfo.problemId || '5bada4dcafe49f0001cd5497';
        const status = 0;
        this.props.navigation.navigate({
            routeName: 'KiwiExam', key: 'KiwiExamId',
            params: {
                stepIdNow, problemCode, status
            }
        });
    }

    renderPartition() {
        return (
            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>|</Text>
        )
    }

    renderIcon(iconName, size, color) {
        return (
            <Icon name={iconName} color={color || 'black'} size={size || 14} />
        )
    }

    render() {
        const { subjectName } = this.props.navigation.state.params;
        return (
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }}>
                <HeaderWithBg back={() => this.goBack()} />
                <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: width * 0.42, height: height * 0.2, alignItems: 'center', position: 'absolute', alignSelf: 'center', zIndex: 1 }}>
                    <Image source={AppIcon.title_thachdautoanhoc} style={{ width: '50%', position: 'absolute', bottom: -5 }} resizeMode='contain' />
                </ImageBackground>
                <Container>
                    {/* <HeaderNavigation
                        color='rgb(166, 168, 171)'
                        title={`Thách đấu ${subjectName && subjectName.toLowerCase()} cùng kiwi`}
                        onPress={() => this.goBack()} /> */}
                    <PopUp style={styles.wrapInfo} source={AppIcon.pop_up_1} resizeMode='contain' width={width * 0.83} height={height * 0.85}>
                        <View style={styles.wrapContain}>
                            <Text style={styles.textInfoHead}>Hướng Dẫn</Text>
                            <Text style={styles.textInfo}>{this.renderIcon('check-circle', 22, 'green')} {this.renderPartition()} Mỗi câu trả lời đúng được <Text style={[styles.scoresText, { color: 'green' }]}>10</Text> điểm</Text>
                            <Text style={styles.textInfo}>{this.renderIcon('times-circle', 22, 'red')} {this.renderPartition()} Mỗi câu trả lời sai được <Text style={styles.scoresText}>0</Text> điểm và bị mất 1 {this.renderIcon('heart', 15, 'red')}</Text>
                            <Text style={styles.textInfo}>{this.renderIcon('hourglass-start', 18, '#F38F19')}  {this.renderPartition()} Bạn có <Text style={[styles.scoresText, { color: 'green' }]}>60</Text> giây để trả lời mỗi câu hỏi, hết thời gian sẽ bị trừ 1 {this.renderIcon('heart', 15, 'red')}</Text>
                            <Text style={styles.textInfo}>{this.renderIcon('heartbeat', 18, 'red')} {this.renderPartition()} Bạn có 3 {this.renderIcon('heart', 15, 'red')}. Nếu mất hết {this.renderIcon('heart', 15, 'red')}, thách đấu sẽ kết thúc</Text>
                        </View>
                        {/* <View style={styles.wrapButton}>
                            <ButtomCustomeSmall
                                size={130}
                                width={160}
                                title={'Bắt đầu kiểm tra'}
                                onPress={() => this.handleNavigate()} />
                        </View> */}
                        <RippleButton style={styles.wrapButton} onPress={() => this.handleNavigate()}>
                            <Image source={AppIcon.btn_kiemtra} style={{ width: 145, height: 38 }} resizeMode='contain' />
                        </RippleButton>
                        <Image source={AppIcon.icn_mascot} style={{ position: 'absolute', height: height * 0.5, width: 200, right: - 100, bottom: - 10 }} resizeMode='contain' />
                        {/* <Image source={AppIcon.icn_eraser} style={{ position: 'absolute', height: 27, width: 27, top: -10, left: 20 }} resizeMode='contain' /> */}
                        <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 50, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                        <Image source={AppIcon.text_hi_box} style={{ position: 'absolute', height: 56, width: 56, left: - 60, bottom: 170 }} resizeMode='contain' />

                    </PopUp>
                </Container>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    gifView: {
        position: 'absolute',
        width: 300,
        right: 0,
        top: '10%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    viewTh: {
        marginVertical: 5,
        flexDirection: 'row'
    },
    icon: {
        marginRight: 5,
    },
    textInfo: {
        fontFamily: 'Roboto-Medium',
        color: 'rgb(166, 168, 171)',
        marginTop: 10
    },
    textTh: {
        color: 'rgb(166, 168, 171)',
        marginRight: 5
    },
    wrapContain: {
        width: '90%',
        height: '70%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgb(245, 228, 148)',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 30
    },
    wrapInfo: {
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        padding: 20,
        bottom: 10
    },
    textInfoHead: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold',
        color: 'rgb(246, 176, 0)',
    },
    wrapButton: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center',
        width: 145, height: 38
    },
    scoresText: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold'
    }
});