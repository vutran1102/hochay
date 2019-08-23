import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, ImageBackground, Image, Dimensions } from 'react-native';
import Orientation from 'react-native-orientation';
import Confetti from 'react-native-confetti';
import Color from '../../constants/colors';
import { ButtomCustome, ButtonInfo } from '../common/Button';
import global from '../../utils/Globals';
import BlinkAnim from '../anim/BlinkAnim';
import ScaleLoopAnim from '../anim/ScaleLoopAnim';
import NumberLoading from '../anim/NumberLoading';
import AppIcon from '../../utils/AppIcon';
import PopUp from '../common/PopUp';
import RippleButton from '../common/RippleButton';

let  { width, height } = Dimensions.get('window');
let s = width;
if(width < height) {
    width = height;
    height = s;
}
export default class PracticeScoreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            isLoading: true,
            score: ''
        }
    }

    componentDidMount() {
        const heightScore = this.props.percentComplete;
        const { initScore } = this.props;
        this.setState({
            score: initScore
        }, () => {
            if (heightScore >= initScore) {
                this.myTime = setInterval(() => {
                    if (this.state.score >= heightScore) {
                        if (this.myTime) {
                            clearInterval(this.myTime);
                            this.myTime = null;
                        }
                    } else {
                        this.setState({
                            score: this.state.score + 1
                        });
                    }
                }, 50);
            } else {
                this.myTime = setInterval(() => {
                    if (this.state.score < heightScore || this.state.score <= 0) {
                        if (this.myTime) {
                            clearInterval(this.myTime);
                            this.myTime = null;
                        }
                    } else {
                        this.setState({
                            score: this.state.score - 1
                        });
                    }
                }, 50);
            }
        })

    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible,
            isLoading: visible,
        }, () => {
            if (this._confettiView) {
                this._confettiView.startConfetti();
            }
        });
        this.myLoading = setTimeout(() => {
            this.setState({ isLoading: false });
        }, 2000);
    }

    goBack() {
        this.props.closeScoreModal();
        this.clearConfettiView();
        global.updatePracticeInfo();
        global.updatePracticeProblem();
        Orientation.lockToLandscape();
        this.props.goBack();
    }

    clearConfettiView() {
        if (this._confettiView) {
            this._confettiView.stopConfetti();
            this._confettiView = null;
        }
    }

    clearMyLoading() {
        if (this.myLoading != null) {
            clearTimeout(this.myLoading);
            this.myLoading = null;
        }
    }

    componentWillUnmount() {
        this.clearConfettiView();
        this.clearMyLoading();
    }

    render() {
        return (
            <View style={styles.viewAbsolute}>
                <View style={styles.container}>
                    <ImageBackground source={AppIcon.bg_score} style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                        <PopUp source={AppIcon.pop_up_3} style={styles.body} resizeMode='contain' close={() => this.goBack()} width={ width * 0.535} height={0.7 * height}>
                            <Image source={AppIcon.title_chucmung} style={{ height: 23.2, width: 178}} resizeMode='contain' />
                            {/* <View style={styles.wrapIcon}> */}
                                {/* <BlinkAnim>
                                    <Image source={AppIcon.bg_item_cup} style={{ width: 230, height: 95 }}>
                                    </Image>
                                </BlinkAnim>
                                <Confetti untilStopped={true} timeout={10} bsize={10} confettiCount={1500} duration={6000} ref={(node) => this._confettiView = node} /> */}
                                {/* <View style={styles.wrapImage}>
                                    <ScaleLoopAnim>
                                        <Image source={AppIcon.icon_cup} style={styles.icon} />
                                    </ScaleLoopAnim>
                                </View> */}
                            {/* </View> */}
                            <Text style={styles.textScrore}>{this.state.score || 0} điểm</Text>
                            {(this.state.score>80 )&& <Image source={AppIcon.text_congratulation} style={styles.textDesc} resizeMode='contain'/>}
                            <RippleButton style={styles.btnHome} radius={30} onPress={() => this.goBack()}>
                                <Image source={AppIcon.btn_home} resizeMode='contain' style={styles.btnHome} />
                            </RippleButton>
                            <Image source={AppIcon.mascot_3} style={{ position: 'absolute', height: height * 0.5, width: 200, right: - 120, bottom: - 30 }} resizeMode='contain' />
                            <Image source={AppIcon.icn_eraser} style={{ position: 'absolute', height: 27, width: 27, top: -10, left: 20 }} resizeMode='contain' />
                            <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 63, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                            <Image source={AppIcon.text_hi_box} style={{ position: 'absolute', height: 56, width: 56, left: - 80, bottom: 170 }} resizeMode='contain' />

                            <Image source={AppIcon.text_box_gioiqua} style={{ position: 'absolute', height: 112, width: 112, right: - 140, bottom: 170 }} resizeMode='contain' />
                            <Image source={AppIcon.particle} style={{ position: 'absolute', height: 280, width: 280, alignSelf:'center', zIndex:-1, top: - 55 }} resizeMode='contain' />

                            <Image source={AppIcon.icn_star1} style={{ position: 'absolute', height: 139, width: 68, left: 70, bottom: 100 }} resizeMode='contain' />
                            <Image source={AppIcon.icn_star2} style={{ position: 'absolute', height: 70, width: 70, right: 40, bottom: 160 }} resizeMode='contain' />
                            <Image source={AppIcon.icn_star3} style={{ position: 'absolute', height: 40, width: 54, right: 60, bottom: 80 }} resizeMode='contain' />
                            {/* <ButtomCustome onPress={() => this.goBack()} width={183} bgColor={'rgb(0, 173, 248)'} title='Bài tập khác' /> */}
                        </PopUp>
                    </ImageBackground>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    btnHome: {
        width: 55, height: 55,
    },
    viewAbsolute: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#fff',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
    container: {
        flex: 1,
        borderColor: '#383838',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        width: width * 0.535,
        height: 0.7 * height,
        borderRadius: 20,
        alignItems:'center',
        alignSelf: 'center',
        // backgroundColor: 'white',
        justifyContent: 'center'
    },
    wrapImage: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
    icon: {
        marginTop: 20,
        width: 86,
        height: 95,
        alignSelf: 'center'
    },
    wrapIcon: {
        marginBottom: 20,
        flexDirection: 'row'
    },
    icon1: {
        marginTop: 20
    },
    icon2: {
    },
    icon3: {
        marginTop: 20
    },
    wrButton: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        color: Color.textColorPrimary,
        fontWeight: 'bold',
        fontSize: 13,
        alignSelf: 'center',
        marginVertical: 20
    },
    wrapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 30,
    },
    textScrore: {
        marginTop: 10,
        color: 'rgb(0, 173, 248)',
        fontSize: 46,
        lineHeight: 56,
        fontFamily: 'Roboto-Bold'
    },
    textDesc: {
        marginTop: 10,
        marginBottom: 10,
        // color: 'rgb(166, 168, 171)',
        // fontSize: 16,
        // lineHeight: 19,
        // fontFamily: 'Roboto-Bold',
        width: 320,
        height:16
    }
});