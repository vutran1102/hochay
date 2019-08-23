import React, { Component } from 'react';
import { View, StyleSheet, WebView, Platform, Keyboard, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fond from 'react-native-vector-icons/Foundation';
import Orientation from 'react-native-orientation';
import Sound from 'react-native-sound';
import RippleButton from '../common/RippleButton';
import { Button, ButtonInfo } from '../common/Button';
import HeaderPractice from './HeaderPractice';
import ConfirmPracticeModal from '../modals/ConfirmPractice';
import GuildPracticeModal from '../modals/GuildPractice';
import PracticeScoreModal from '../modals/PracticeScore';
import Helper from '../../utils/Helpers';
import practiceService from '../../services/practiceService';
import MathJaxLibs from '../../utils/MathJaxUtils';
import { BASE_URL_WEB, MATH_KIT } from '../../constants/const';
import { LoadingLearn } from '../common/LoadingScreen';
// const { width, height } = Dimensions.get('window');

import correct from '../../asserts/sound/applause.mp3';
import incorrect from '../../asserts/sound/incorrect.mp3';

const soundArr = [correct, incorrect];

export default class PracticeLearnScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataResult: '',
            dataMaterial: '',
            problemCode: '',
            nextStepId: '',
            textAnswer: '',
            answer: '',
            isMounted: false,
            isMaterial: false,
            isBookMark: false,
            isLoading: true,
            visibleButton: false,
            isAnswer: 0, // 1 dung ,-1 sai
            percentComplete: 0,
            currentQuestion: 0,
            dataOptionId: [],
            dataTextAnswer: [],
            dataOptionText: [],
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

        // const initial = Orientation.getInitialOrientation();
        // console.log('Initiali :'+initial);
        // if (initial == 'PORTRAIT') {
        //     this.setState({
        //         initial: 'PORTRAIT',
        //     });
        // } else {
        //     this.setState({
        //         initial: 'LANDSCAPE',
        //     });
        // }
    }

    _orientationDidChange(orientation) {
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
        const { problemCode } = this.props.navigation.state.params;
        this.setState({ typeAction: 0, isAnswer: 0, isLoading: true });
        // const problemCode = '5c189c762d05f20001e67e3d';
        this.resetProblemById(problemCode, (stepId) => {
            this.getPractice(stepId, problemCode);
        });
    }

    resetProblemById(problemCode, done) {
        Helper.getToken().then(token => {
            practiceService.resetProblemByID({ token, problemCode })
                .then(response => {
                    const { status, stepIdNow } = response;
                    if (status === 1) {
                        this.setState({}, () => done(stepIdNow));
                    }
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    getPractice(stepIdNow, problemCode, init) {
        Helper.getToken().then(token => {
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
                                currentQuestion: dataStandard.index,
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
                                contentHtml: dataMaterial.contentHtml,
                            });
                        }
                    }
                    this.initLoadingTimer = setTimeout(() => {
                        this.setState({ isLoading: false });
                    }, Platform.OS == 'ios' ? 600 : 1200);
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
    }

    //type_answer = 5 && type_view = 0
    handleNativeEvent1(data) {
        console.log(data);
        let dataOptionText = JSON.parse(data[2]);
        var numInput = data[1];
        if (!this.hashCheckEmpty(dataOptionText, numInput)) {
            this.setState({ typeAction: 0 });
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
        let { problemId } = this.state.dataResult;
        let stepId = this.state.dataResult.id;
        let dataOptionText = this.state.dataOptionText;
        let dataTextAnswer = this.state.dataTextAnswer;
        Helper.getToken().then(token => {
            const payload = { token, dataOptionId, textAnswer, problemId, stepId, isSkip, dataOptionText, dataTextAnswer };
            practiceService.getQuestionSendAnswer(payload).then(response => {
                console.log(response);
                let { stepId, status, nextStepId, percentComplete, isAnswer } = response;
                this.playSound(isAnswer, isSkip);
                this.setState({ isAnswer: isAnswer ? 1 : -1, isLoading: false });
                if (status != 2) {
                    this.setState({ typeAction: 2, nextStepId, percentComplete, answer: response, disabled: false }, () => {
                        if (isSkip) {
                            this.handleNextQuestion();
                        } else {
                            this.webView.postMessage(`senAnswer###${JSON.stringify(response)}`);
                        }
                    }); // tiep tuc

                } else {
                    this.setState({ isAnswer: isAnswer ? 1 : -1, isLoading: false });
                    this.setState({ typeAction: -1, nextStepId, percentComplete, answer: response, disabled: false }, () => {
                        if (!isSkip) {
                            this.webView.postMessage(`senAnswer###${JSON.stringify(response)}`);
                        }
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
            if (isAnswer) {
                const sound = new Sound(soundArr[0], error => callback(error, sound));
            } else {
                const sound = new Sound(soundArr[1], error => callback(error, sound));
            }
        }
    }

    finishPractice() {
        this.refs.confirmpracticemodal.setModalVisible(true, 2);
    }

    handleanswerAction(typeAction) {
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
                this.finishPractice();
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

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange.bind(this));
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render() {
        // const { subjectId } = this.props.navigation.state.params;
        const subjectId = MATH_KIT;
        const { isMounted, dataResult, typeAction, percentComplete, isAnswer, answer, visibleButton, widthDevice } = this.state;
        return (
            <View style={styles.container}>
                <HeaderPractice
                    index={dataResult.index}
                    width_device={widthDevice}
                    isAnswer={isAnswer}
                    widthProgress={this.state.widthProgress}
                    percentComplete={percentComplete}
                    onPress={() => this.handleEndAction()}
                />
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
                <Text>{dataResult.questionNumber}</Text>
                {!visibleButton &&
                    <View style={styles.navBottom}>
                        <View >
                            <Icon name={'video-camera'} color={'transparent'} size={25} style={styles.icon} />
                        </View>
                        <View style={styles.rowButton}>
                            {typeAction == 0 ?
                                <Button width={90} title={'Bỏ qua'} onPress={() => this.handleanswerAction(typeAction)} />
                                :
                                typeAction == 1 ?
                                    <Button width={90} title={'Trả lời'} onPress={() => this.handleanswerAction(typeAction)} />
                                    :
                                    typeAction == 2 ?
                                        <View style={styles.viewButton}>
                                            <ButtonInfo width={120} title={'Xem hướng dẫn'} onPress={() => this.showGuildPractice()} />
                                            <View style={styles.marg} />
                                            <Button width={120} title={'Câu tiếp theo'} onPress={() => this.handleanswerAction(typeAction)} />
                                        </View>
                                        :
                                        <Button width={90} title={'Kết thúc'} onPress={() => this.handleanswerAction(typeAction)} />
                            }
                            {/* <Button width={100} title={'Câu tiếp theo'} /> */}
                        </View>
                        <View>
                            <Fond name={'clipboard-notes'} color={'transparent'} size={25} style={styles.icon} />
                        </View>
                    </View>
                }

                <LoadingLearn isLoading={this.state.isLoading} color={'#ddd'} />
                <ConfirmPracticeModal
                    ref='confirmpracticemodal' gotoEnd={() => this.gotoEnd()}
                    reset={() => this.reset()}
                />
                <PracticeScoreModal
                    ref='practicescoremodal'
                    goBack={() => this.comeBackAction()}
                />
                <GuildPracticeModal
                    template={dataResult.template}
                    explain={answer.explain}
                    ref='guildpracticemodal'
                    onPress={() => this.handleNextQuestion()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    navBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    rowButton: {
        flexDirection: 'row'
    },
    icon: {
        marginHorizontal: 10
    },
    contents: {
        flex: 1,
        position: 'relative'
    },
    webviewStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
    viewButton: {
        flexDirection: 'row'
    },
    marg: {
        marginHorizontal: 5
    }
});