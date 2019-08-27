import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ImageBackground, WebView, Platform, Keyboard, Text, Dimensions, Vibration, StatusBar, Image, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation';
import { ScaleSlide } from 'react-native-animation-effects';
import Sound from 'react-native-sound';
import { ButtomCustomeSmall, ButtomDisabled } from '../common/Button';
import { Wrapper } from '../common/Container';
import HeaderPractice from './HeaderPractice';
import ConfirmPracticeModal from '../modals/ConfirmPractice';
import GuildPracticeModal from '../modals/GuildPractice';
import PracticeScoreModal from '../modals/PracticeScore';
import Helper from '../../utils/Helpers';
import practiceService from '../../services/practiceService';
import MathJaxLibs from '../../utils/MathJaxUtilsV2';
import { BASE_URL_WEB } from '../../constants/const';
import { LoadingLearn } from '../common/LoadingScreen';
import InitLoading from '../common/InitLoading';
import styles from '../../themes/leanStyle';
import TranslateTextAnim from '../anim/TranslateTextAnim';
import AppIcon from '../../utils/AppIcon';
import correct1 from '../../asserts/soundnew/yeah1.wav';
import correct2 from '../../asserts/soundnew/quiz_correct.wav';
import incorrect1 from '../../asserts/soundnew/fail1.mp3';
import incorrect2 from '../../asserts/soundnew/quiz_incorrect.wav';
import { playSoundButton } from '../../utils/AudioUtils';
import PopUp from '../common/PopUp';
import { HeaderWithBg } from '../modals/Header';
import RippleButton from '../common/RippleButton';
import KiwiSuggest from '../kiwi-helps/KiwiSuggest';
import { fetchKiwiSuggestStartAction } from '../../actions/practiceAction';
import global from '../../utils/Globals';

const width_horizontal = 230;

const soundCorect = [correct1, correct2];
const soundInCorect = [incorrect1, incorrect2];
let { width, height } = Dimensions.get('window');
let s = width;
if (width < height) {
    width = height;
    height = s;
}

class PracticeLearnScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            initLoading: true,
            isInitLoading: true,
            visibleAnswer: true,
            statusConfirm: 1,
            isAnswer: 0, // 1 dung ,-1 sai
            percentComplete: 0,
            currentQuestion: 0,
            dataOptionId: [],
            dataTextAnswer: [],
            dataOptionText: [],
            typeAction: 0, // 0 bỏ qua , 1 trả lời, 2 //câu tiếp theo //-1 ket thuc
            widthProgress: 0,
            widthDevice: 0,
            levelPractice: '',
            wrongCount: 0,
            hideKiwiHelper: true,
            isKiwiSuggest: false,
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
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        const { stepIdNow, problemCode, status, isKiwiSuggest} = this.props.navigation.state.params;
        if(!isKiwiSuggest) {
            Helper.getToken().then(token => {
                const { packageId} = this.props.navigation.state.params;
                const packageCode = packageId;
                this.props.fetchListKiwiSuggest({ token, packageCode });
            })
        }
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

        console.log("isKiwiSuggest: ", isKiwiSuggest);
        this.setState({isKiwiSuggest: isKiwiSuggest});
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
            console.log(`width height ${width}x${height}`);
            if (orientation == 'PORTRAIT') {
                this.setState({
                    widthProgress: width > height ? height - width_horizontal : width - width_horizontal,
                    widthDevice: width > height ? height : width
                });
            } else {
                this.setState({
                    widthProgress: width > height ? width - width_horizontal : height - width_horizontal,
                    widthDevice: width > height ? width : height
                });
            }
        });
    }

    _orientationDidChange(orientation) {
        StatusBar.setHidden(true);
        console.log(orientation);
        if (orientation == 'PORTRAIT') {
            this.setState({
                widthProgress: width > height ? height - width_horizontal : width - width_horizontal,
                widthDevice: width > height ? height : width
            });
        } else {
            this.setState({
                widthProgress: width > height ? width - width_horizontal : height - width_horizontal,
                widthDevice: width > height ? width : height
            });
        }
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
                                contentHtml: ''
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
                        this.setState({
                            isLoading: false
                        });
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

    showHideKiwiSuggest() {
        this.setState({hideKiwiHelper: !this.state.hideKiwiHelper});
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
            console.log("payload: ", JSON.stringify(payload));
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
                            this.webView.postMessage(`senAnswer###${JSON.stringify(response)}`);
                            console.log("false");
                            this.setState({ wrongCount: this.state.wrongCount + 1 })

                        } else {
                            console.log("true");
                            this.setState({ wrongCount: 0 })
                            this.refs.translatetextanim.start();
                            this.webView.postMessage(`senAnswer###${JSON.stringify(response)}`);
                        }
                        // this.refs.translatetextanim.start();
                    }); // tiep tuc

                } else {

                    this.setState({ isAnswer: isAnswer ? 1 : -1, isLoading: false, typeAction: -1, nextStepId, percentComplete, answer: response, disabled: false }, () => {
                        if (this.state.isAnswer == 1) {
                            this.refs.translatetextanim.start();
                        }
                        this.webView.postMessage(`senAnswer###${JSON.stringify(response)}`);
                        this.finishPractice(2);
                    }); // ket thuc
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

    actionNavigate() {
        global.updatePracticeInfo();
        global.updatePracticeProblem();
        this.comeBackAction();
    }
 
    clearMyLoading() {
        if (this.myLoadingScore != null) {
            clearTimeout(this.myLoadingScore);
            this.myLoadingScore = null;
        }
    }

    onBackPress = () => {
        this.finishPractice();
        return true;
    };

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange.bind(this));
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        this.clearMyLoading();
    }

    hideKiwiHelp() {
        this.setState({wrongCount: 0});
    }

    render() {
        const maxScreen = width > height ? width : height;
        const { isMounted, dataResult, typeAction, percentComplete, isAnswer, answer, visibleButton, widthDevice } = this.state;
        const rate = percentComplete / 100;
        return (
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }}>
                <HeaderWithBg >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <RippleButton style={{ width: 30, height: 30, position: 'absolute', top: 15, left: - 20 }} rippleSize={50} onPress={() => { this.handleEndAction() }}>
                            <View>
                                <Image source={AppIcon.pause_icon} style={{ width: 30, height: 30 }} resizeMode='contain' />
                            </View>
                        </RippleButton>
                    </View>
                </HeaderWithBg>
                <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: width * 0.42, height: height * 0.2, alignItems: 'center', position: 'absolute', alignSelf: 'center', zIndex: 1 }}>
                    <Image source={AppIcon.title_luyentap} style={{ width: '50%', position: 'absolute', bottom: 0 }} resizeMode='contain' />
                </ImageBackground>
                <StatusBar hidden={true} translucent={true} />
                {((typeAction == 2 || typeAction == -1) && isAnswer == 1) &&
                    <View style={styles.centerAbsolute}>
                        <TranslateTextAnim ref="translatetextanim"></TranslateTextAnim>
                    </View>
                }
                {/* <Wrapper>
                        <HeaderPractice
                            isLoading={this.state.isLoading}
                            index={dataResult.index}
                            width_device={widthDevice}
                            isAnswer={isAnswer}
                            widthProgress={this.state.widthProgress}
                            levelPractice={this.state.levelPractice}
                            percentComplete={percentComplete}
                            onPress={() => this.handleEndAction()}
                        />
                    </Wrapper> */}
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
                    <View style={{ width: 8, height: 210, borderWidth: 2, borderRadius: 5, borderColor: 'rgb(69, 184, 241)', alignItems: 'center', alignSelf: 'center', right: 50, position: 'absolute', zIndex: 1 }}>
                        <View style={{ position: 'absolute', width: 60, top: - 30 }}>
                            <Text >
                                <Text style={{ color: 'red', fontWeight: '900', fontSize: 15 }}>{percentComplete}/</Text>
                                <Text style={{ color: 'rgb(0, 77, 166)', fontWeight: '800', fontSize: 15 }}>100</Text>
                            </Text>
                        </View>
                        <View style={{ width: 4, height: 140, zIndex: 2, alignItems: 'center' }}>
                            <Image source={percentComplete == 100 ? AppIcon.apple_progress : AppIcon.apple_holder_progress} style={{ width: 22, height: 22, position: 'absolute', top: -10 }} />
                            <Image source={percentComplete > 66 ? AppIcon.apple_progress : AppIcon.apple_holder_progress} style={{ width: 22, height: 22, position: 'absolute', top: 60 }} />
                            <Image source={percentComplete > 33 ? AppIcon.apple_progress : AppIcon.apple_holder_progress} style={{ width: 22, height: 22, position: 'absolute', top: 130 }} />
                        </View>
                        <View style={{ width: 8, height: rate * 210, borderRadius: 5, backgroundColor: 'rgb(69, 184, 241)', position: 'absolute', bottom: 0 }}>

                        </View>
                    </View>
                    <Image source={AppIcon.penholder_popup} style={{ position: 'absolute', height: 98.4, width: 63.75, left: - 20, bottom: -3 }} resizeMode='contain' />
                    {/* <Image source={AppIcon.icn_eraser} style={{ position: 'absolute', height: 27, width: 27, top: -10, left: 20 }} resizeMode='contain' /> */}
                </PopUp>

                {(this.state.typeAction == 2 && isAnswer == 1) &&
                    <ScaleSlide ref="scaleT" style={{ position: 'absolute', top: 80, right: 40 }}>
                        <Image source={AppIcon.emoji_smile} style={{ width: 80, height: 80 }} />
                    </ScaleSlide>
                }
                {(this.state.typeAction == 2 && isAnswer == -1) &&
                    <ScaleSlide ref="scaleF" style={{ position: 'absolute', top: 80, right: 40 }}>
                        <Image source={AppIcon.emoji_bet} style={{ width: 80, height: 80 }} />
                    </ScaleSlide>
                }
                {!visibleButton &&
                    <View style={styles.navBottom}>
                        {this.state.visibleAnswer &&
                            <View style={styles.rowButton}>
                                {typeAction == 0 ?
                                    // <ButtomDisabled
                                    //     size={110}
                                    //     width={120} title={'Trả lời'} />
                                    <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }}>
                                        <Image source={AppIcon.btn_traloi_disable} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                    </RippleButton>
                                    :
                                    typeAction == 1 ?
                                        // <ButtomCustomeSmall
                                        //     bgColor={'rgb(122, 199, 12)'}
                                        //     size={110}
                                        //     width={120} title={'Trả lời'} onPress={() => this.handleanswerAction(typeAction)} />
                                        <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }} onPress={() => this.handleanswerAction(typeAction)}>
                                            <Image source={AppIcon.btn_traloi} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                        </RippleButton>
                                        :
                                        typeAction == 2 ?
                                            <View style={styles.viewButton}>
                                                {isAnswer == -1 &&
                                                    // <ButtomCustomeSmall
                                                    //     style={{ marginRight: 10 }}
                                                    //     bgColor={'rgb(122, 199, 12)'}
                                                    //     size={150}
                                                    //     width={160} title={'Xem hướng dẫn'} onPress={() => this.showGuildPractice()} />
                                                    <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }} onPress={() => this.showGuildPractice()}>
                                                        <Image source={AppIcon.btn_xemhuongdan} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                                    </RippleButton>
                                                }
                                                {/* <ButtomCustomeSmall
                                                    bgColor={'rgb(0, 173, 248)'}
                                                    width={160}
                                                    size={150}
                                                    title={'Câu tiếp theo'}
                                                    onPress={() => this.handleanswerAction(typeAction)} /> */}
                                                <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }} onPress={() => this.handleanswerAction(typeAction)}>
                                                    <Image source={AppIcon.btn_cautieptheo} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                                </RippleButton>
                                            </View>
                                            :
                                            // <ButtomCustomeSmall
                                            //     size={110}
                                            //     bgColor={'rgb(0, 173, 248)'}
                                            //     width={120} title={'Kết thúc'} onPress={() => this.handleanswerAction(typeAction)} />
                                            <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }} onPress={() => this.handleanswerAction(typeAction)}>
                                                <Image source={AppIcon.btn_ketthuc} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                            </RippleButton>
                                }
                                {/* <Button width={100} title={'Câu tiếp theo'} /> */}
                            </View>
                        }
                    </View>
                }
                <LoadingLearn isLoading={this.state.isLoading} color={'transparent'} />
                {this.state.initLoading &&
                    <InitLoading ref="initloading" maxScreen={maxScreen} />
                }
                {this.state.visibleConfirm &&
                    <ConfirmPracticeModal
                        problemId={dataResult.problemId}
                        statusConfirm={this.state.statusConfirm}
                        handlePracticeInvoke={this.handlePracticeInvoke.bind(this)}
                        navigation={this.props.navigation}
                        closeConfirm={() => this.closeConfirm()}
                        ref='confirmpracticemodal' gotoEnd={() => this.gotoEnd()}
                        reset={() => this.reset()}
                    />
                }
                {this.state.visibleScroreModal &&
                    <PracticeScoreModal
                        initScore={this.state.initScore}
                        percentComplete={this.state.percentComplete}
                        ref='practicescoremodal'
                        isLoadingScore={this.state.isLoadingScore}
                        closeScoreModal={() => this.setState({ visibleScroreModal: false, isLoadingScore: true })}
                        goBack={() => this.comeBackAction()}
                    />
                }
                {this.state.visibleGuild &&
                    <GuildPracticeModal
                        template={dataResult.template}
                        explain={answer.explain}
                        closeGuild={() => this.setState({ visibleGuild: false })}
                        ref='guildpracticemodal'
                        onPress={() => this.handleNextQuestion()} />
                }
                {(this.state.wrongCount == 3 && !this.state.isKiwiSuggest) && <View style={{ width: width, height: height, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 9, justifyContent: 'center', alignItems: 'center' }}>
                    <PopUp source={AppIcon.pop_up_8} width={0.65 * width} height={0.82 * height} style={{ alignSelf: 'center', alignItems: 'center', paddingBottom: 10, paddingTop: 20 }} close={() => { this.hideKiwiHelp() }} resizeMode='stretch'>
                        <Image source={AppIcon.title_hotrochobe} style={{ width: 176.5, height: 31.2 }} resizeMode='contain' />
                        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
                            <RippleButton style={{ width: '85%', height: 50, backgroundColor: '#979197', borderWidth: 1, borderColor: 'rgb(255, 160, 54)', paddingHorizontal: 15, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={AppIcon.icon_video} style={{ width: 35, height: 35 }} resizeMode='contain' />
                                <View style={{ width: 1, height: 30, backgroundColor: 'rgb(255, 160, 54)', marginHorizontal: 10 }} />
                                <Text style={{ color: 'rgb(0, 77, 166)', fontWeight: '900', fontSize: 12 }}>Câu hỏi khó quá, mình cần xem lại bài giảng.</Text>
                            </RippleButton>
                            <RippleButton style={{ width: '85%', height: 50, backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgb(255, 160, 54)', paddingHorizontal: 15, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }} onPress={()=> {this.showHideKiwiSuggest()}}>
                                <Image source={AppIcon.icon_message} style={{ width: 35, height: 35 }} resizeMode='contain' />
                                <View style={{ width: 1, height: 30, backgroundColor: 'rgb(255, 160, 54)', marginHorizontal: 10 }} />
                                <Text style={{ color: 'rgb(0, 77, 166)', fontWeight: '900', fontSize: 12 }}>Bài này mình chưa được học trên lớp</Text>
                            </RippleButton>
                            <RippleButton style={{ width: '85%', height: 50, backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgb(255, 160, 54)', paddingHorizontal: 15, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }} onPress={() => { this.hideKiwiHelp() }}>
                                <Image source={AppIcon.icon_kiwi} style={{ width: 35, height: 35 }} resizeMode='contain' />
                                <View style={{ width: 1, height: 30, backgroundColor: 'rgb(255, 160, 54)', marginHorizontal: 10 }} />
                                <Text style={{ color: 'rgb(0, 77, 166)', fontWeight: '900', fontSize: 12 }}>Cám ơn Kiwi, luyện tập tiếp nào.</Text>
                            </RippleButton>
                        </View>
                        <Image source={AppIcon.icn_mascot_5} style={{ position: 'absolute', height: height * 0.5, width: 200, right: - 130, bottom: - 10 }} resizeMode='contain' />
                        <Image source={AppIcon.textbox_kiwihotro} style={{ position: 'absolute', height: 120.5, width: 90, top: 0, right: - 100 }} resizeMode='contain' />
                        <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 60, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                        <Image source={AppIcon.text_hi_box} style={{ position: 'absolute', height: 56, width: 56, left: - 70, bottom: 170 }} resizeMode='contain' />
                    </PopUp>
                </View>}
                {(!this.state.hideKiwiHelper && this.props.listKiwiSuggest.length) && <KiwiSuggest navigation={this.props.navigation} subjectId={this.props.navigation.state.params.subjectId} listKiwiSuggest={this.props.listKiwiSuggest} goBack={() => { this.showHideKiwiSuggest() }} goBack={this.actionNavigate()}/>}
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => {
    return {
        listKiwiSuggest: state.practice.kiwiSuggest
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchListKiwiSuggest: (payload) => {
            dispatch(fetchKiwiSuggestStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticeLearnScreen);

