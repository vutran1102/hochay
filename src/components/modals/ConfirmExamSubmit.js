import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, ImageBackground, Image, Dimensions } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import Color from '../../constants/colors';
import Helper from '../../utils/Helpers';
import Common from '../../utils/Common';
import examService from '../../services/examService';
import { ButtonInfo, ButtomCustomeSmall } from '../common/Button';
import AppIcon from '../../utils/AppIcon';
import global from '../../utils/Globals';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';
import PopUp from '../common/PopUp';
import RippleButton from '../common/RippleButton';

let { width, height } = Dimensions.get('window');
let s = width;
if(width < height) {
    width = height;
    height = s;
}

export default class ConfirmExamSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            testPause: {},
            isWating: false,
        }
    }

    setModalVisible(visible, testId = '') {
        if (visible && testId != '') {
            Helper.getToken().then(token => {
                examService.fetchTestPause({ token, testId }).then(response => {
                    if (response != "") {
                        this.setState({
                            testPause: response
                        });
                    }
                });
            });
        }
    }

    gotoAction = async () => {
        const testId = this.props.testId;
        this.setState({ isWating: true }, () => {
            Helper.getToken().then(token => {
                examService.fetchTestDone({ token, testId }).then(response => {
                    const status = response.status;
                    if (status == 2) {
                        this.setState({ isWating: false });
                        this.props.navigation.navigate({
                            routeName: 'ExamResult',
                            key: 'ExamResultId',
                            params: {
                                type: 'done', onBack: () => {
                                    this.props.navigation.goBack();
                                }
                            }
                        });
                    }
                }).catch(err => {
                    this.setState({ isWating: false });
                });
            })
        });
    }


    componentWillUnmount() {
    }

    render() {
        const { testPause } = this.state;
        return (
            <View style={styles.viewAbsolute}>
                <ImageBackground source={AppIcon.bg_score} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ScaleSlideAnim>
                        <PopUp source={AppIcon.pop_up_3} style={styles.body} resizeMode='contain' width={ width * 0.535} height={height * 0.7}>
                            {/* <View style={styles.container}> */}
                            <View style={styles.body}>
                                <View style={styles.wrapInfo}>
                                    {/* <Text style={styles.textName}>Bài kiểm tra số 1</Text> */}
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemInfoTitle}>Tổng số câu </Text>
                                        <Text style={styles.itemNumTitle}>{testPause.totalQuestion} câu </Text>
                                    </View>
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemInfoTitle}>Số câu đã trả lời </Text>
                                        <Text style={styles.itemNumTitle}>{testPause.attempted} câu </Text>
                                    </View>
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemInfoTitle}>Số câu chưa xem </Text>
                                        <Text style={styles.itemNumTitle}>{testPause.unAttempted} câu </Text>
                                    </View>
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemInfoTitle}>Số lần làm lại bài kiểm tra </Text>
                                        <Text style={styles.itemNumTitle}>{testPause.totalAgain} lần </Text>
                                    </View>
                                </View>
                                <Text style={styles.textTimer}>{Common.convertSeconds(this.props.timeCount || 0)}</Text>
                                <Text style={styles.title}>Bạn có chắc muốn nộp bài ?</Text>
                                <View style={styles.wrButton}>
                                    <RippleButton style={styles.btnForm} radius={30} onPress={() => this.props.closeConfirm()}>
                                        <Image source={AppIcon.btn_lambaitiep} resizeMode='contain' style={styles.btnForm} />
                                    </RippleButton>
                                    <RippleButton style={styles.btnForm} radius={30} onPress={() => this.gotoAction()}>
                                        <Image source={AppIcon.btn_nopbai} resizeMode='contain' style={styles.btnForm} />
                                    </RippleButton>
                                    {/* {this.props.timeCount > 0 &&
                                            <ButtomCustomeSmall title={'Làm bài tiếp'} onPress={() => this.props.closeConfirm()} />
                                        }
                                        <ButtomCustomeSmall bgColor={'rgb(0, 173, 248)'} title={'Nộp bài'} onPress={() => this.gotoAction()} /> */}
                                </View>
                            </View>
                            {/* </View> */}
                        </PopUp>
                    </ScaleSlideAnim>
                </ImageBackground>
            </View>
        )
    }
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
        marginVertical: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#cdcdcd',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    body: {
        paddingVertical: 20,
    },
    icon: {
        alignSelf: 'center'
    },
    wrButton: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    itemInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    wrapInfo: {
        width: 300,
        alignSelf: 'center'
    },
    textTimer: {
        marginTop: 10,
        alignSelf: 'center',
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        color: 'rgb(0, 77, 166)',
        // color: 'rgb(181, 182, 185)',
    },
    textName: {
        alignSelf: 'center',
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: 'rgb(0, 77, 166)',
    },
    itemInfoTitle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: 'rgb(0, 77, 166)',
    },
    itemNumTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: 'rgb(181, 182, 185)',
    },
    title: {
        color: 'rgb(0, 77, 166)',
        fontFamily: 'Roboto-bold',
        fontSize: 15,
        alignSelf: 'center',
        marginVertical: 20
    },
    body: {
        width: width * 0.535,
        height: 0.7 * height,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: 'white',
        justifyContent: 'center'
    },
    btnForm: {
        width: 160,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center'
    }
});