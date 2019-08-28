import React, { Component } from 'react';
import { View, StyleSheet, WebView, Platform, Keyboard, Text, Dimensions, Vibration, StatusBar, Image, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fond from 'react-native-vector-icons/Foundation';
import Orientation from 'react-native-orientation';
import ScaleSlide from '../anim/ScaleSlideAnim';
import Sound from 'react-native-sound';
import { Button, ButtonInfo, ButtomCustomeSmall, ButtomDisabled } from '../common/Button';
import { Wrapper } from '../common/Container';
import ConfirmPracticeModal from '../modals/ConfirmPractice';
import GuildPracticeModal from '../modals/GuildPractice';
import PracticeScoreModal from '../modals/PracticeScore';
import KiwiGameOver from '../modals/KiwiGameOver';
import Header from './Header';
import Helper from '../../utils/Helpers';
import practiceService from '../../services/practiceService';
import MathJaxLibs from '../../utils/MathJaxUtilsV2';
import { BASE_URL_WEB } from '../../constants/const';
import { LoadingLearn } from '../common/LoadingScreen';
import styles from '../../themes/leanStyle';
import TranslateTextAnim from '../anim/TranslateTextAnim';
import AppIcon from '../../utils/AppIcon';
import correct1 from '../../asserts/soundnew/yeah1.wav';
import correct2 from '../../asserts/soundnew/quiz_correct.wav';
import incorrect1 from '../../asserts/soundnew/fail1.mp3';
import incorrect2 from '../../asserts/soundnew/quiz_incorrect.wav';
import { playSoundButton } from '../../utils/AudioUtils';
import RippleButton from '../common/RippleButton';
import { HeaderWithBg } from '../modals/Header';
import PopUp from '../common/PopUp';
import Common from '../../utils/Common';

const soundCorect = [correct1, correct2];
const soundInCorect = [incorrect1, incorrect2];

let { width, height } = Dimensions.get('window');
let s = width;
if (width < height) {
    width = height;
    height = s;
}

export default class PracticeLearnScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionIndex: 0,
            numWrong: 0,
            dataResult: '',
            dataMaterial: '',
            problemCode: '',
            nextStepId: '',
            textAnswer: '',
            answer: '',
            status: '',
            initScore: '',
            isMounted: false,
            isMaterial: false,
            isBookMark: false,
            isLoading: true,
            visibleButton: false,
            visibleConfirm: false,
            visibleGuild: false,
            isLoadingScore: true,
            visibleAnswer: true,
            statusConfirm: 1,
            isAnswer: 0, // 1 dung ,-1 sai
            percentComplete: 0,
            currentQuestion: 0,
            scoreKiwi: 0,
            dataOptionId: [],
            dataTextAnswer: [],
            dataOptionText: [],
            typeAction: 0, // 0 bỏ qua , 1 trả lời, 2 //câu tiếp theo //-1 ket thuc
            widthProgress: 0,
            widthDevice: 0,
            levelPractice: '',
            timeCount: 10,
            showGameOver: false
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

        // 5bada4dcafe49f0001cd5497/5c18c36006fbe800016f8710 // type_answer = 4 type_view = 0;
        // 5baf2e07afe49f0001cd841d/5c19b1056c29200001aaa87e // type_answer = 4 type_view = 0;
        // 5bd4282e5288a40001b9054b/5c19aaac6c29200001aaa85c // type_answer = 4 type_view = 0;
        // 5baf2e6bafe49f0001cd8458/5c18bb0b06fbe800016f847d 
        // 5baf3215afe49f0001cd863c/5c19ec444f95c20001cc306a 
        // 5c189c762d05f20001e67e3d/5c1a00fa307fd800012fd1b9 // type_answer = 5 type_view = 4
        // 5c189c762d05f20001e67e3d/5c1b085792d98100011a61d1 //sap xep
        // 5c189c762d05f20001e67e3d/5c1b163a92d98100011a690e //
        // 5c189c762d05f20001e67e3d/5c1b3b2392d98100011a7050
        // 5baf2dc5afe49f0001cd8400/5c1c941916aa670001ebb55b
        // 5c189c762d05f20001e67e3d/5c1da8a116aa670001ec1317
        // 5c189c762d05f20001e67e3d/5c1defa216aa670001ec2880

        // 5c189c762d05f20001e67e3d/5c232f20af1f0a0001b10eda
        // 5c189c762d05f20001e67e3d/5c20640020cd1a000193f36f

        const { stepIdNow, problemCode, status } = this.props.navigation.state.params;

        // const status = 1;
        // const problemCode = '5c189c762d05f20001e67e3d';
        // const stepIdNow = '5c232f20af1f0a0001b10eda';
        setTimeout(() => { this.setState({ isMounted: true }); }, 350);
        this.setState({
            problemCode
        }, () => {
            if (status == 0 || status == 2) {
                this.resetProblemById(problemCode, (stepId) => {
                    this.getPractice(stepId, problemCode, true);
                });
            } else {
                this.getPractice(stepIdNow, problemCode, true);
            }
        });

        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
            const { width, height } = Dimensions.get('window');
            console.log(`width height ${width}x${height}`);
            if (orientation == 'PORTRAIT') {
                this.setState({
                    widthProgress: width > height ? height - 200 : width - 200,
                    widthDevice: width > height ? height : width
                });
            } else {
                this.setState({
                    widthProgress: width > height ? width - 200 : height - 200,
                    widthDevice: width > height ? width : height
                });
            }
        });
    }

    _orientationDidChange(orientation) {
        StatusBar.setHidden(true);
        const { width, height } = Dimensions.get('window');
        console.log(orientation);
        if (orientation == 'PORTRAIT') {
            this.setState({
                widthProgress: width > height ? height - 200 : width - 200,
                widthDevice: width > height ? height : width
            });
        } else {
            this.setState({
                widthProgress: width > height ? width - 200 : height - 200,
                widthDevice: width > height ? width : height
            });
        }
    }

    goBack() {
        this.props.navigation.goBack();
    }

    reset() {
        const { problemCode } = this.props.navigation.state.params;
        this.setState({ typeAction: 0, isAnswer: 0, isLoading: true });
        // const problemCode = '5c189c762d05f20001e67e3d';
        this.resetProblemById(problemCode, (stepId) => {
            this.getPractice(stepId, problemCode, true);
        });
    }

    resetProblemById(problemCode, done) {
        Helper.getToken().then(token => {
            practiceService.resetProblemByID({ token, problemCode })
                .then(response => {
                    console.log(response);
                    const { status, stepIdNow } = response;
                    if (status === 1) {
                        this.setState({}, () => done(stepIdNow));
                    }
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    getPractice(stepIdNow, problemCode, init = false) {
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            practiceService.getPracticeQuestion({ token, problemCode, stepIdNow }).then(response => {
                if (response != '') {
                    console.log(response);
                    let typeData = response.typeData;
                    if (typeData != 1) {
                        const { dataStandard } = response;
                        if (dataStandard != null) {
                            this.setState({
                                dataResult: dataStandard,
                                dataMaterial: '',
                                isMaterial: false,
                                percentComplete: dataStandard.percentComplete,
                                initScore: init ? dataStandard.percentComplete : this.state.initScore,
                                currentQuestion: dataStandard.index,
                                levelPractice: dataStandard.levelPractice,
                                contentHtml: '',
                                questionIndex: this.state.questionIndex + 1
                            });
                        }
                    }
                    else {
                        const { dataMaterial } = response;
                        if (dataMaterial != null) {
                            this.setState({
                                dataResult: dataMaterial.listStep[0],
                                dataMaterial: dataMaterial,
                                isMaterial: true,
                                currentQuestion: dataMaterial.listStep[0].index,
                                percentComplete: dataMaterial.listStep[0].percentComplete,
                                initScore: init ? dataMaterial.listStep[0].percentComplete : this.state.initScore,
                                levelPractice: dataStandard.levelPractice,
                                contentHtml: dataMaterial.contentHtml,
                            });
                        }
                    }
                    if (init) {
                        this.initLoadingTimer = setTimeout(() => {
                            this.setState({ isLoading: false });
                        }, Platform.OS == 'ios' ? 500 : 800);

                        this.startTimer();
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
        console.log('====================================');
        console.log('onMessage');
        console.log('====================================');
        let data = event.nativeEvent.data.split('###');
        let type_view = data[0];
        //Nhập nhiều input
        if (type_view === 'changeText') {
            this.handleNativeEvent1(data);
        }
        //Lựa chon 1 input
        if (type_view === 'selectOne') {
            playSoundButton();
            this.handleNativeEvent2(data);
        }
        //Nhập 1 input
        if (type_view == 'changeOneText') {
            this.handleNativeEvent2(data);
        }
        if (type_view == 'selectMulti') {
            playSoundButton();
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
        console.log(data);
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
                this.setState({ typeAction: 1 });
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
            console.log(dataOptionText);
            var numInput = data[1];
            if (!this.hashCheckEmpty(dataOptionText, numInput)) {
                this.setState({ typeAction: 1 });
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
                this.setState({ typeAction: 1 });
            } else {
                this.setState({ typeAction: 1, dataOptionText: dataOptionText });
            }
        } catch (error) {

        }
    }

    answerAction(isSkip) {
        const { dataOptionId, textAnswer } = this.state;
        let configId = this.state.dataResult.problemId;
        let stepId = this.state.dataResult.id;
        let dataOptionText = this.state.dataOptionText;
        let dataTextAnswer = this.state.dataTextAnswer;
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            const payload = { token, dataOptionId, textAnswer, configId, stepId, isSkip, dataOptionText, dataTextAnswer };
            practiceService.getQuestionSendAnswer(payload).then(response => {
                console.log(response);
                let { stepId, status, nextStepId, percentComplete, isAnswer, levelPractice } = response;
                this.playSound(isAnswer, isSkip);
                this.setState({ isAnswer: isAnswer ? 1 : -1, isLoading: false, dataOptionText: [], levelPractice, status });
                if (status != 2) {
                    this.setState({ typeAction: 2, nextStepId, percentComplete, answer: response, disabled: false }, () => {
                        if (!isAnswer) {
                            Helper.getVibration().then(vibrate => {
                                if (vibrate == 'on') {
                                    Vibration.vibrate(1000);
                                }
                            });
                            // this.showGuildPractice();
                            this.setState({
                                numWrong: this.state.numWrong + 1,
                            });
                            this.webView.postMessage(`senAnswer###${JSON.stringify(response)}`);
                        } else {
                            this.setState({
                                scoreKiwi: this.state.scoreKiwi + 10
                            });
                            this.webView.postMessage(`senAnswer###${JSON.stringify(response)}`);
                        }
                        // this.refs.translatetextanim.start();
                    }); // tiep tuc

                } else {
                    // mokup reset
                    if (!isAnswer) {
                        this.setState({
                            numWrong: this.state.numWrong + 1,
                        });
                    } else {
                        this.setState({
                            scoreKiwi: this.state.scoreKiwi + 10
                        });
                    }
                    const { problemCode } = this.props.navigation.state.params;
                    this.resetProblemById(problemCode, (stepId) => {
                        this.getPractice(stepId, problemCode, true);
                    });
                    // this.setState({
                    //     numWrong: 100
                    // });

                    // this.setState({ isAnswer: isAnswer ? 1 : -1, isLoading: false, typeAction: -1, nextStepId, percentComplete, answer: response, disabled: false }, () => {
                    //     this.webView.postMessage(`senAnswer###${JSON.stringify(response)}`);
                    //     this.finishPractice(2);
                    // }); 
                    // ket thuc
                }
            }).catch(err => {
                this.setState({ isLoading: false });
                console.log(err);
            });
        }).catch(err => console.log(err));
    }

    handleNextQuestion() {
        Keyboard.dismiss();
        const { problemCode } = this.state;
        this.setState({ typeAction: 0, isAnswer: 0 }, () => {
            let nextStepId = this.state.nextStepId;
            this.getPractice(nextStepId, problemCode);
        });
    }

    playSound(isAnswer, isSkip) {
        const callback = (error, sound) => {
            sound.play(() => {
                console.log('volume: ' + sound.getVolume());
                sound.release();
            });
        };
        if (!isSkip) {
            let indexSound = Math.floor(Math.random() * 2);
            let sound = '';
            if (isAnswer) {
                sound = new Sound(soundCorect[indexSound], error => callback(error, sound));
            } else {
                sound = new Sound(soundInCorect[indexSound], error => callback(error, sound));
            }
        }
    }

    finishPractice(type) {
        this.setState({
            visibleConfirm: true,
            statusConfirm: type,
        });
    }

    handleanswerAction(typeAction) {
        playSoundButton();
        Keyboard.dismiss();
        switch (typeAction) {
            case 0:
                this.setState({ isLoading: true });
                this.answerAction(true);
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
                this.finishPractice(2);
                break;
        }
    }

    handleEndAction() {
        const { status } = this.state;
        this.finishPractice(status);
    }

    showGuildPractice() {
        Keyboard.dismiss();
        playSoundButton();
        this.setState({
            visibleGuild: true,
        });
        // this.refs.guildpracticemodal.setModalVisible(true, this.state.answer.explain);
    }

    gotoEnd() {
        this.setState({
            visibleScroreModal: true
        });
        this.myLoadingScore = setTimeout(() => {
            this.setState({ isLoadingScore: false });
        }, 2000);
    }

    closeConfirm() {
        this.setState({
            visibleConfirm: false
        });
    }

    handleVideoAction = () => {
        this.props.navigation.navigate('Video');
    }

    handlePracticeInvoke = () => {
        const { problemCode } = this.props.navigation.state.params;
        const problemId = problemCode;
        this.props.navigation.navigate({ routeName: 'PracticeInvoke', key: 'PracticeInvokeId', params: { problemId } });
    }

    comeBackAction() {
        this.props.navigation.goBack();
    }

    clearMyLoading() {
        if (this.myLoadingScore != null) {
            clearTimeout(this.myLoadingScore);
            this.myLoadingScore = null;
        }
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

    getVibration() {
        Helper.getVibration().then(vibrate => {
            if (vibrate == 'on') {
                Vibration.vibrate(10000);
            }
        });
    }

    clearTimeCount() {
        if (this.myTimer != null) {
            clearInterval(this.myTimer);
            this.myTimer = null;
        }
    }

    submitConfirm() {
        // const { testId } = this.props.navigation.state.params;
        // this.setState({
        //     visibleConfirm: true
        // }, () => {
        //     this.refs.confirmsubmitmodal.setModalVisible(true, testId);
        // });
        this.setState({ showGameOver: true });
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange.bind(this));
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        this.clearMyLoading();
        this.clearTimeCount();
        this.setState({ showGameOver: false });

    }

    render() {
        // const { subjectId } = this.props.navigation.state.params;
        const { isMounted, dataResult, typeAction, percentComplete, isAnswer, answer, visibleButton, widthDevice } = this.state;
        return (
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }} resizeMode='stretch'>
                <HeaderWithBg >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                    </View>
                </HeaderWithBg>
                <RippleButton style={{ width: 30, height: 30, position: 'absolute', top: 15, left: 10, zIndex: 10 }} rippleSize={30} onPress={() => { this.goBack() }}>
                    <View>
                        <Image source={AppIcon.icon_back} style={{ width: 30, height: 30 }} resizeMode='contain' />
                    </View>
                </RippleButton>
                <View style={styles.wrapTop}>
                    <ImageBackground source={AppIcon.box_info} style={{ width: 148.4, height: 65, alignItems: 'center', paddingTop: 20 }} resizeMode='contain'>
                        <Image source={AppIcon.text_cauhoi} style={{ width: '40%', height: '30.5%' }} resizeMode='contain' />
                        <Text style={{ color: '#FF0000', fontWeight: '900', fontSize: 17, marginTop: 5 }}>{this.state.questionIndex}</Text>
                    </ImageBackground>
                    <ImageBackground source={AppIcon.box_info} style={{ width: 148.4, height: 65, alignItems: 'center', paddingTop: 20 }} resizeMode='contain'>
                        <Image source={AppIcon.text_thoigian} style={{ width: '50%', height: '30.5%' }} resizeMode='contain' />
                        <View style={{ marginTop: 3, flexDirection: 'row', width: 150, paddingHorizontal: 30 }}>
                            <Image source={AppIcon.icn_dongho} style={{ width: 20, height: 20, marginLeft: 2, alignSelf: 'center' }} resizeMode='contain' />
                            <Text style={{ color: '#FF0000', fontWeight: '900', fontSize: 17, marginLeft: 10 }}>{Common.convertSeconds(this.state.timeCount)}</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground source={AppIcon.box_info} style={{ width: 148.4, height: 65, alignItems: 'center', paddingTop: 18 }} resizeMode='contain'>
                        <Image source={AppIcon.text_tongdiem} style={{ width: '80%', height: '38.5%' }} resizeMode='contain' />
                        <Text style={{ color: '#FF0000', fontWeight: '900', fontSize: 17, marginTop: 5 }}>{this.state.scoreKiwi}</Text>
                    </ImageBackground>
                    <ImageBackground source={AppIcon.box_info} style={{ width: 148.4, height: 65, alignItems: 'center', paddingTop: 10 }} resizeMode='contain'>
                        <View style={styles.wrapRowHeart}>
                            <Image source={this.state.numWrong >= 3 ? AppIcon.heartblank : AppIcon.heartfilled} style={{ width: 27.2, height: 23.6 }} resizeMode='contain' />
                            <Image source={this.state.numWrong >= 2 ? AppIcon.heartblank : AppIcon.heartfilled} style={{ width: 27.2, height: 23.6 }} resizeMode='contain' />
                            <Image source={this.state.numWrong >= 1 ? AppIcon.heartblank : AppIcon.heartfilled} style={{ width: 27.2, height: 23.6 }} resizeMode='contain' />
                        </View>
                    </ImageBackground>
                </View>
                <Container style={styles.container}>
                    <PopUp source={AppIcon.pop_up_6} width={0.95 * width} height={0.86 * height} style={{ paddingTop: 40, alignSelf: 'center', justifyContent: 'center',bottom: 8, alignSelf: 'center' }} resizeMode='stretch'>
                        <View style={[styles.contents]}>
                            {(isMounted && dataResult != '' && dataResult != undefined) &&
                                <WebView
                                    ref={(webView) => this.webView = webView}
                                    showsVerticalScrollIndicator={false}
                                    scalesPageToFit={false}
                                    scrollEnabled
                                    onMessage={this.handleMessage.bind(this)}
                                    style={[styles.webviewStyle]}
                                    source={{
                                        html: MathJaxLibs.renderMathJaxPractice(
                                            this.state.dataResult,
                                        ),
                                        baseUrl: BASE_URL_WEB
                                    }}
                                />
                            }
                        </View>
                    </PopUp>
                    {!visibleButton &&
                        <View style={styles.navBottom}>
                            <View >
                                <Icon name={'video-camera'} color={'transparent'} size={25} style={styles.icon} />
                            </View>
                            {this.state.visibleAnswer &&
                                <View style={styles.rowButton}>
                                    {typeAction == 0 ?
                                        <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }}>
                                            <Image source={AppIcon.btn_traloi_disable} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                        </RippleButton>
                                        :
                                        typeAction == 1 ?
                                            <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }} onPress={() => this.handleanswerAction(typeAction)}>
                                                <Image source={AppIcon.btn_traloi} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                            </RippleButton>
                                            :
                                            typeAction == 2 ?
                                                <View style={styles.viewButton}>
                                                    <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }} onPress={() => this.handleanswerAction(typeAction)}>
                                                        <Image source={AppIcon.btn_cautieptheo} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                                    </RippleButton>}
                                                </View>
                                                :
                                                <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }} onPress={() => this.handleanswerAction(typeAction)}>
                                                    <Image source={AppIcon.btn_ketthuc} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                                </RippleButton>
                                    }
                                    {/* <Button width={100} title={'Câu tiếp theo'} /> */}
                                </View>
                            }
                        </View>
                    }
                    <LoadingLearn isLoading={this.state.isLoading} color={'#ddd'} />
                    {
                        (this.state.typeAction == 2 && isAnswer == 1) &&
                        <ScaleSlide ref="scaleT" style={{ position: 'absolute', top: 80, right: 40 }}>
                            <Image source={AppIcon.emoji_smile} style={{ width: 80, height: 80 }} />
                        </ScaleSlide>
                    }
                    {
                        (this.state.typeAction == 2 && isAnswer == -1) &&
                        <ScaleSlide ref="scaleF" style={{ position: 'absolute', top: 80, right: 40 }}>
                            <Image source={AppIcon.emoji_bet} style={{ width: 80, height: 80 }} />
                        </ScaleSlide>
                    }
                </Container >
                {
                    (this.state.numWrong >= 3 || this.state.showGameOver) &&
                    <KiwiGameOver
                        numWrong={this.state.numWrong}
                        navigation={this.props.navigation}
                        score={this.state.scoreKiwi} />
                }
            </ImageBackground >
        )
    }
}






