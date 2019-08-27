import React, { Component } from 'react';
import { View, StyleSheet, WebView, Platform, Keyboard, Text, Dimensions, FlatList, Vibration, StatusBar, Image, ImageBackground } from 'react-native';
import Orientation from 'react-native-orientation';
import Sound from 'react-native-sound';
import { Button, ButtonInfo, PreviewButton, NextButton, ButtomCustomeSmall, ButtomDisabled } from '../common/Button';
import Header from './Header';
import ConfirmSubmitModal from '../modals/ConfirmExamSubmit';
import ListQuestionModal from '../modals/ListQuestion';
import GuildExam from './GuilExam';
import Helper from '../../utils/Helpers';
import examService from '../../services/examService';
import MathJaxLibs from '../../utils/MathJaxUtilsV2';
import { BASE_URL_WEB } from '../../constants/const';
import { LoadingLearn } from '../common/LoadingScreen';
import styles from '../../themes/leanStyle';
import correct from '../../asserts/sound/applause.mp3';
import incorrect from '../../asserts/sound/incorrect.mp3';
import InitLoading from '../common/InitLoading';
import global from '../../utils/Globals';
import AppIcon from '../../utils/AppIcon';
import PopUp from '../../components/common/PopUp';
import { HeaderWithBg } from '../modals/Header';
import RippleButton from '../common/RippleButton';

const soundArr = [correct, incorrect];

export default class ExamLearnScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: '',
            dataResult: '',
            dataMaterial: '',
            testId: '',
            nextStepId: '',
            stepNextId: '', // stepDataresult
            textAnswer: '',
            endTimeByTest: '',
            answer: '',
            isMounted: false,
            isMaterial: false,
            isBookMark: false,
            visibleAnswer: true,
            isLoading: true,
            visibleButton: false,
            visibleSlide: true,
            visibleGuid: false,
            visibleQuestion: false,
            visibleConfirm: false,
            initLoading: true,
            isAnswer: 0, // 1 dung ,-1 sai
            timeCount: 750,
            percentComplete: 0,
            currentQuestion: 0,
            listQuestion: [],
            dataOptionId: [],
            dataTextAnswer: [],
            dataOptionText: [],
            listStack: [],
            typeAction: 0, // 0 bỏ qua , 1 trả lời, 2 //câu tiếp theo //-1 ket thuc
            widthProgress: 0,
            widthDevice: 0,
        }
        Orientation.unlockAllOrientations();
    }

    _keyboardDidShow() {
        // alert('SHOW');
        // Keyboard.dismiss();
        this.setState({ visibleButton: true });
    }

    _keyboardDidHide() {
        // alert('HIDE');
        this.setState({ visibleButton: false });
    }

    componentWillMount() {
        // Orientation.unlockAllOrientations();
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange.bind(this));
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));

        const { firstIdQuestion, testId, status } = this.props.navigation.state.params;

        this.myMounted = setTimeout(() => { this.setState({ isMounted: true }); }, 350);
        this.setState({
            testId
        }, () => {
            // console.log(testId);
            if (status == 0 || status == 2) {
                this.resetProblemById(testId, (stepId) => {
                    this.getTestDetail(stepId, testId, true);
                    this.getListQuestion(testId);
                });
            } else {
                this.getTestDetail(firstIdQuestion, testId, true);
                this.getListQuestion(testId);
            }

        });

        Orientation.getOrientation((err, orientation) => {
            // console.log(`Current Device Orientation: ${orientation}`);
            const { width, height } = Dimensions.get('window');
            // console.log(`width height ${width}x${height}`);
            if (orientation == 'PORTRAIT') {
                this.setState({
                    widthProgress: width > height ? height - 140 : width - 140,
                    widthDevice: width > height ? height : width
                });
            } else {
                this.setState({
                    widthProgress: width > height ? width - 140 : height - 140,
                    widthDevice: width > height ? width : height
                });
            }
        });

    }


    _orientationDidChange(orientation) {
        StatusBar.setHidden(true);
        const { width, height } = Dimensions.get('window');
        if (orientation == 'PORTRAIT') {
            this.setState({
                widthProgress: width > height ? height - 140 : width - 140,
                widthDevice: width > height ? height : width
            });
        } else {
            this.setState({
                widthProgress: width > height ? width - 140 : height - 140,
                widthDevice: width > height ? width : height
            });
        }
    }


    reset() {
        const { testId } = this.props.navigation.state.params;
        this.setState({ typeAction: 0, isAnswer: 0, isLoading: true });
        // const testId = '5c189c762d05f20001e67e3d';
        this.resetProblemById(testId, (stepId) => {
            this.getTestDetail(stepId, testId, true);
        });
        this.getListQuestion(testId);
    }

    getListQuestion(testId) {
        Helper.getToken().then(token => {
            examService.fetchTestQuesion({
                token, testId
            }).then(response => {
                // console.log(response);
                if (response != "") {
                    this.setState({
                        listQuestion: response
                    });
                }
            })
        });
    }

    resetProblemById(testId, done) {
        Helper.getToken().then(token => {
            examService.fetchTestStart({ token, testId })
                .then(response => {
                    // console.log(response);
                    if (response != '') {
                        const { status, firstIdQuestion } = response;
                        if (status === 1) {
                            this.setState({}, () => done(firstIdQuestion));
                        }
                    } else {
                        this.setState({ isLoading: false });
                    }
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    stepCurrentQuesion(stepId) {
        const { testId } = this.state;
        this.setState({
            typeAction: 0,
            visibleQuestion: false
        }, () => {
            this.getTestDetail(stepId, testId);
        });
    }

    getTestDetail(stepId, testId, init, back) {
        console.log("stepId: ", stepId);
        console.log("testId: ", testId);
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            examService.fetchTestQuestionData({ token, testId, stepId }).then(response => {
                if (response != '') {
                    console.log("response getTestDetail: ", JSON.stringify(response));
                    let typeData = response.typeData;
                    if (typeData != 1) {
                        const { dataStandard } = response;
                        if (dataStandard != null) {
                            this.setState({
                                dataResult: dataStandard,
                                dataMaterial: '',
                                isMaterial: false,
                                stepNextId: dataStandard.stepNextId,
                                stepIndex: dataStandard.stepIndex,
                                endTimeByTest: dataStandard.endTimeByTest,
                                // timeCount: init == true ? dataStandard.endTimeByTest - dataStandard.serverTime : this.state.timeCount
                            });
                            this.updateStackStepId(dataStandard.stepId, back);
                        }
                    }
                    else {
                        const { dataMaterial } = response;
                        if (dataMaterial != null) {
                            this.setState({
                                dataResult: dataMaterial.listStep[0],
                                dataMaterial: dataMaterial,
                                isMaterial: true,
                                stepIndex: dataMaterial.listStep[0].stepIndex,
                                stepNextId: dataMaterial.listStep[0].stepNextId,
                                endTimeByTest: dataMaterial.endTimeByTest,
                                // timeCount: init == true ? dataMaterial.endTimeByTest - dataMaterial.serverTime : this.state.timeCount
                            });
                            this.updateStackStepId(dataMaterial.listStep[0].stepId, back);
                        }
                    }
                    if (init) {
                        this.setState({
                            isLoading: false
                        });
                        this.startTimer();
                        this.refs.initloading.refs.zoomanim.startAnimation(callback => {
                            this.setState({
                                initLoading: false,
                                isLoading: false
                            });
                        });
                    } else {
                        this.initLoadingTimer = setTimeout(() => {
                            this.setState({ isLoading: false });
                        }, Platform.OS == 'ios' ? 300 : 500);
                    }
                } else {
                    this.setState({ isLoading: false });
                }
            })
        });
    }

    updateStackStepId(stepId, back) {
        const { listStack } = this.state;
        const len = Object.keys(listStack).length;
        if (stepId != '' && stepId != null && back) {
            let arrStack = listStack;
            if (len == 0) {
                arrStack.push(stepId);
                this.setState({
                    listStack: arrStack
                });
            } else if (listStack[len - 1] != stepId) {
                arrStack.push(stepId);
                if (len >= 8) {
                    arrStack.shift();
                }
                this.setState({
                    listStack: arrStack
                });
            }
        }
    }

    hashCheckEmpty(arr, numInput) {
        let b = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == undefined || arr[i] == "") {
                b = false;
                break;
            } else b = true;
        }
        if (arr.length != numInput) {
            b = false;
        }
        return b;
    }

    handleMessage(event) {
        let data = event.nativeEvent.data.split('###');
        let type_view = data[0];
        //Nhập nhiều input
        if (type_view === 'changeText') {
            this.handleNativeEvent1(data);
        }
        //Lựa chon 1 input
        if (type_view === 'selectOne') {
            this.handleNativeEvent2(data);
        }
        //Nhập 1 input
        if (type_view == 'changeOneText') {
            this.handleNativeEvent2(data);
        }
        if (type_view == 'selectMulti') {
            this.handleNativeEvent3(data);
        }
        // dragular
        if (type_view == 'dragular') {
            this.handleNativeEvent3(data);
        }
        if (type_view == 'canvasColor') {
            this.handleNativeEvent5(data);
        }
        if (type_view == 'dagularOrder') {
            this.handleNativeEvent4(data);
        }
        if (type_view == 'dataJsplumb') {
            this.handleNativeEvent5(data);
        }
        if (type_view == 'canvasPoint') {
            this.handleNativeEvent5(data);
        }
        if (type_view == 'showButtonAnswer') {
            this.showButtonAnswer(data);
        }
    }

    showButtonAnswer(data) {
        const isButton = data[1];
        this.setState({
            visibleAnswer: isButton == 1 ? true : false
        });
    }

    //type_answer = 5 && type_view = 0
    handleNativeEvent1(data) {
        let dataOptionText = JSON.parse(data[2]);
        var numInput = data[1];
        if (!this.hashCheckEmpty(dataOptionText, numInput)) {
            this.setState({ typeAction: 1 });
        } else {
            this.setState({ typeAction: 1, dataOptionText: dataOptionText });
        }
    }

    //type_answer = 4 && type_view = 0
    handleNativeEvent2(data) {
        try {
            let dataOptionText = JSON.parse(data[1]);
            if (dataOptionText.length <= 0 || dataOptionText.includes('')) {
                this.setState({ typeAction: 0 });
            } else {
                this.setState({ typeAction: 1, dataOptionText: dataOptionText });
            }
        } catch (error) {

        }
    }

    handleNativeEvent5(data) {
        try {
            let dataOptionText = JSON.parse(data[1]);
            this.setState({ typeAction: 1, dataOptionText: dataOptionText });
        } catch (error) {

        }
    }

    handleNativeEvent3(data) {
        try {
            let dataOptionText = JSON.parse(data[2]);
            var numInput = data[1];
            if (!this.hashCheckEmpty(dataOptionText, numInput)) {
                this.setState({ typeAction: 0 });
            } else {
                this.setState({ typeAction: 1, dataOptionText: dataOptionText });
            }
        } catch (error) {

        }
    }

    handleNativeEvent4(data) {
        try {
            let dataOptionText = JSON.parse(data[1]);
            if (dataOptionText.length <= 0 || dataOptionText.includes('')) {
                this.setState({ typeAction: 0 });
            } else {
                this.setState({ typeAction: 1, dataOptionText: dataOptionText });
            }
        } catch (error) {

        }
    }

    answerAction(isSkip) {
        const { dataOptionId, textAnswer } = this.state;
        let configId = this.state.dataResult.testId;
        let stepId = this.state.dataResult.stepId;
        let dataOptionText = this.state.dataOptionText;
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            const payload = { token, dataOptionId, textAnswer, configId, stepId, isSkip, dataOptionText };
            examService.getQuestionSendAnswer(payload).then(response => {
                const { stepid, status } = response;
                const nextStepId = stepid;
                if (nextStepId != "" && nextStepId != null) {
                    this.setState({ typeAction: 0, nextStepId, isLoading: false }, () => {
                        this.handleNextQuestion();
                    }); // tiep tuc
                } else {
                    this.setState({ isLoading: false, typeAction: -1 });
                }
            }).catch(err => {
                this.setState({ isLoading: false });
                console.log(err);
            });
        }).catch(err => console.log(err));
    }

    handleNextQuestion() {
        Keyboard.dismiss();
        const { testId } = this.state;
        this.setState({ typeAction: 0 }, () => {
            let stepId = this.state.stepNextId;
            if (stepId != '' && stepId != null) {
                this.getTestDetail(stepId, testId);
                this.getListQuestion(testId);
            } else {
                this.setState({
                    typeAction: -1, isLoading: false
                });
            }
        });
    }

    handleBackQuestion() {
        Keyboard.dismiss();
        const { testId, listQuestion, stepNextId } = this.state;

        const index = listQuestion.findIndex(item => {
            return item.stepId == stepNextId;
        });

        if (index > 1) {
            const stepId = listQuestion[index - 2].stepId;
            this.getTestDetail(stepId, testId, false, true);
            this.getListQuestion(testId);
        }
    }

    handlePreviewQuestion() {
        Keyboard.dismiss();
    }

    playSound(isAnswer, isSkip) {
        const callback = (error, sound) => {
            sound.play(() => {
                sound.release();
            });
        };
        if (!isSkip) {
            if (isAnswer) {
                const sound = new Sound(soundArr[0], error => callback(error, sound));
            } else {
                const sound = new Sound(soundArr[1], error => callback(error, sound));
            }
        }
    }

    finishPractice() {
        this.refs.confirmsubmitmodal.setModalVisible(true, 2);
    }

    handleanswerAction(typeAction) {
        Keyboard.dismiss();
        switch (typeAction) {
            case 0:
                this.setState({ isLoading: true });
                this.handleNextQuestion();
                break;
            case 1:
                this.setState({ isLoading: true });
                this.answerAction(false);
                break;
            case 2:
                this.setState({ isLoading: true });
                this.handleNextQuestion();
                break;
            case -1:
                this.submitConfirm();
                break;
        }
    }

    handleEndAction() {
        this.refs.confirmpracticemodal.setModalVisible(true);
    }

    showGuildPractice() {
        Keyboard.dismiss();
        this.refs.guildpracticemodal.setModalVisible(true, this.state.answer.explain);
    }

    gotoEnd() {
        this.refs.practicescoremodal.setModalVisible(true);
    }

    handleVideoAction = () => {
        this.props.navigation.navigate('Video');
    }

    handlePracticeInvoke = () => {
        this.props.navigation.navigate('PracticeInvoke');
    }

    comeBackAction() {
        this.props.navigation.goBack();
    }

    getVibration() {
        Helper.getVibration().then(vibrate => {
            if (vibrate == 'on') {
                Vibration.vibrate(10000);
            }
        });
    }

    startTimer() {
        this.myTimer = setInterval(() => {
            this.setState({ timeCount: this.state.timeCount - 1 });
            if (this.state.timeCount == 60) {
                this.getVibration();
            }
            if (this.state.timeCount <= 0) {
                this.clearTimeCount();
                this.submitConfirm();
            }
        }, 1000);
    }

    visibleGuildExam() {
        this.setState({
            visibleGuid: !this.state.visibleGuid
        });
    }

    getStyleQuestion(item) {
        const { status, index } = item;
        const { stepIndex } = this.state;
        if (stepIndex == index) {
            return '#FFA03E';
        }
        switch (status) {
            case 1:
                return '#383838';
            case 2:
                return '#383838';
            case 3:
                return '#383838'
            default:
                return '#383838'
        }
    }

    getBackgroundIndicator(item) {
        const { status, index } = item;
        const { stepIndex } = this.state;
        if (stepIndex == index) {
            return '#FFA03E';
        }
        return '#333';
    }

    clearTimeCount() {
        if (this.myTimer != null) {
            clearInterval(this.myTimer);
            this.myTimer = null;
        }
    }

    componentWillUnmount() {
        if (this.initLoadingTimer != null) {
            clearTimeout(this.initLoadingTimer);
            this.initLoadingTimer = null;
        }
        if (this.myMounted != null) {
            clearTimeout(this.myMounted);
            this.myMounted = null;
        }
        this.clearTimeCount();
        Orientation.removeOrientationListener(this._orientationDidChange.bind(this));
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    showQuestion(b) {
        this.setState({
            visibleQuestion: true
        });
    }

    hideQuestion() {
        this.setState({
            visibleQuestion: false
        });
    }

    submitConfirm() {
        const { testId } = this.props.navigation.state.params;
        this.setState({
            visibleConfirm: true
        }, () => {
            this.refs.confirmsubmitmodal.setModalVisible(true, testId);
        });
    }

    closeConfirm() {
        this.setState({
            visibleConfirm: false
        });
    }

    render() {
        const { width, height } = Dimensions.get('window');
        const maxScreen = width > height ? width : height;
        const { isMounted, dataResult, typeAction, answer, listQuestion } = this.state;
        const { testId } = this.props.navigation.state.params;
        return (
            // <View style={styles1.container}>
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }} resizeMode='stretch'>
                {/* <Header
                    visibleSlide={this.state.visibleSlide}
                    onToggleSlide={() => this.setState({ visibleSlide: !this.state.visibleSlide })}
                    timeCount={this.state.timeCount}
                    onPress={() => this.submitConfirm()}
                    onPressGuild={this.visibleGuildExam.bind(this)}
                    showQuestion={() => this.showQuestion(true)}
                /> */}
                <HeaderWithBg >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <RippleButton style={{ width: 30, height: 30, position: 'absolute', top: 15, left: - 20 }} rippleSize={50} onPress={() => { this.visibleGuildExam() }}>
                            <View>
                                <Image source={AppIcon.pause_icon} style={{ width: 30, height: 30 }} resizeMode='contain' />
                            </View>
                        </RippleButton>
                        <RippleButton style={{ width: 30, height: 30, position: 'absolute', top: 15, right: 80 }} rippleSize={50} onPress={() => { this.showQuestion(true) }}>
                            <View>
                                <Image source={AppIcon.icn_qs} style={{ width: 30, height: 30 }} resizeMode='contain' />
                            </View>
                        </RippleButton>
                    </View>
                </HeaderWithBg>
                <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: width * 0.42, height: height * 0.2, alignItems: 'center', position: 'absolute', alignSelf: 'center', zIndex: 1 }}>
                    <Image source={AppIcon.title_luyentap} style={{ width: '50%', position: 'absolute', bottom: 0 }} resizeMode='contain' />
                </ImageBackground>
                {/* <View style={{ marginBottom: 5 }}>
                    <FlatList
                        data={listQuestion}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state.stepIndex}
                        renderItem={({ item }) =>
                            <RippleButton onPress={() => this.stepCurrentQuesion(item.stepId)} style={{ width: 85, justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                                <Text style={[{ color: this.getStyleQuestion(item), fontWeight: 'bold' }]}>{1 + item.index}</Text>
                                <View style={{ width: 100, height: 1, backgroundColor: this.getBackgroundIndicator(item) }}></View>
                            </RippleButton>
                        }
                    />
                </View> */}
                <PopUp source={AppIcon.pop_up_6} width={0.95 * width} height={0.86 * height} style={{ paddingTop: 40, alignSelf: 'center', justifyContent: 'center', position: 'absolute', bottom: 8, alignSelf: 'center' }} resizeMode='stretch'>
                    <View style={styles.contents}>
                        {(isMounted && dataResult != '' && dataResult != undefined) &&
                            <WebView
                                ref={(webView) => this.webView = webView}
                                showsVerticalScrollIndicator={false}
                                scalesPageToFit={false}
                                scrollEnabled
                                onMessage={this.handleMessage.bind(this)}
                                style={styles.webviewStyle}
                                source={{
                                    html: MathJaxLibs.renderMathJaxPractice(
                                        this.state.dataResult,
                                    ),
                                    baseUrl: BASE_URL_WEB
                                }}
                            />
                        }
                    </View>
                    <Image source={AppIcon.icon_penholder} style={{ position: 'absolute', height: 98.4, width: 63.75, right: - 10, bottom: 5 }} resizeMode='contain' />
                    {/* <Image source={AppIcon.icn_eraser} style={{ position: 'absolute', height: 27, width: 27, top: -10, left: 20 }} resizeMode='contain' /> */}
                    <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 50, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                    <Image source={AppIcon.text_hi_box} style={{ position: 'absolute', height: 56, width: 56, left: - 60, bottom: 170 }} resizeMode='contain' />
                    {(this.state.visibleSlide && this.state.visibleAnswer) &&
                        <View style={styles1.wrapSlide}>
                            {/* <PreviewButton disabled={this.state.stepIndex <= 0 ? true : false} onPress={() => this.handleBackQuestion()} icon={true} />
                            {(this.state.stepNextId != "" && this.state.stepNextId != null) ?
                                <NextButton icon={true} onPress={() => this.handleNextQuestion()} /> :
                                <NextButton disabled={true} icon={true} color={'#999'} />
                            } */}
                            {this.state.stepIndex > 0 && <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }} onPress={() => this.handleBackQuestion()}>
                                <Image source={AppIcon.btn_quaylai} style={{ width: 175, height: 38 }} resizeMode='contain' />
                            </RippleButton>}
                            {typeAction == 0 ?
                                <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }}>
                                    <Image source={AppIcon.btn_traloi_disable} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                </RippleButton>
                                :
                                <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }} onPress={() => this.handleanswerAction(typeAction)}>
                                    <Image source={AppIcon.btn_traloi} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                </RippleButton>
                            }
                            {(this.state.stepNextId != "" && this.state.stepNextId != null) && <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }} onPress={() => this.handleanswerAction(typeAction)}>
                                <Image source={AppIcon.btn_cautieptheo} style={{ width: 175, height: 38 }} resizeMode='contain' />
                            </RippleButton>}
                        </View>
                    }
                </PopUp>
                <LoadingLearn isLoading={this.state.isLoading} color={'transparent'} />
                {this.state.initLoading &&
                    <InitLoading ref="initloading" maxScreen={maxScreen} />
                }
                {this.state.visibleQuestion &&
                    <ListQuestionModal
                        stepCurrentQuesion={this.stepCurrentQuesion.bind(this)}
                        listQuestion={this.state.listQuestion}
                        hideQuestion={() => this.hideQuestion()} />
                }
                {this.state.visibleGuid &&
                    <GuildExam onClose={this.visibleGuildExam.bind(this)}
                        callback={() => {this.visibleGuildExam(); this.submitConfirm()}}
                        onBack={() => {
                            // global.updateExamInfo();
                            Orientation.lockToLandscape();
                            this.props.navigation.goBack();
                        }} />
                }
                {this.state.visibleConfirm &&
                    <ConfirmSubmitModal
                        testId={testId}
                        closeConfirm={() => this.closeConfirm()}
                        ref={'confirmsubmitmodal'}
                        timeCount={this.state.timeCount}
                        navigation={this.props.navigation} />
                }
            </ImageBackground >
        )
    }
}

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        backgroundColor: 'red'
    },
    navBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    numberQuestion0: {
        color: 'red'
    },
    wrapButtonAction: {
        position: 'absolute', bottom: 0,
        height: 50, width: 160, alignSelf: 'center',
        justifyContent: 'center', alignItems: 'center'
    },
    wrapSlide: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 40,
        height: 50,
    },
    wrapCaretIcon: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 15,
        width: 40,
        left: 0
    }
});