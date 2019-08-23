import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView, FlatList, Dimensions, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation';
import HeaderNavigation from '../common/HeaderNavigation';
import SlideBottom from './SlideBottom';
import DataTest from '../../utils/DataTest';
import Helper from '../../utils/Helpers';
import examService from '../../services/examService';
import MathJaxLibs from '../../utils/MathJaxUtils';
import { BASE_URL_WEB } from '../../constants/const';
import RippleButton from '../common/RippleButton';
import { LoadingLearn } from '../common/LoadingScreen';
import { NextButton, PreviewButton, ButtomCustomeSmall } from '../common/Button';
import GuildExamModal from '../modals/GuildExam';
import PopUp from '../common/PopUp';
import { HeaderWithBg } from '../modals/Header';
import AppIcon from '../../utils/AppIcon';

const { width, height } = Dimensions.get('window');

export default class ExamAnswerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 1,
            dataResult: '',
            listQuestion: [],
            listQuestionAll: [],
            visibleSlide: false,
            visibleGuild: false,
            isLoading: true,
            index: 0,
            title: 'Tất cả các câu hỏi'
        }
        Orientation.unlockAllOrientations();
    }

    componentDidMount() {
        this.getInitData();
    }

    getInitData() {
        const { testId } = this.props.navigation.state.params;
        console.log("TEST_ID: = " + testId);
        // Helper.getToken().then(token => {
        //     examService.fetchTestDetail({ token, testId }).then(response => {
        //         if (response != '') {
        //             console.log(response);
        const { questions } = this.props.navigation.state.params;
        const len = Object.keys(questions).length;
        if (len > 0) {
            let typeData = questions[0].typeData;
            if (typeData != 1) {
                const { dataStandard } = questions[0];
                if (dataStandard != null) {
                    this.setState({
                        dataResult: dataStandard,
                        listQuestionAll: questions,
                        listQuestion: questions,
                        isLoading: false,
                    });
                }
            }
        } else {
            this.setState({
                isLoading: false
            });
        }
        // else{
        //                 this.setState({
        //                     isLoading: false
        //                 });
        //             }
        //         } else {
        //             this.setState({
        //                 isLoading: false
        //             });
        //         }
        //     })
        // });
    }

    goBack() {
        if (this.state.visibleSlide) {
            this.onMenuPress();
        } else {
            this.props.navigation.goBack();
            Orientation.lockToLandscape();
        }
    }

    onFilter(filter) {
        this.setState({
            visibleSlide: !this.state.visibleSlide
        });
        const { listQuestionAll } = this.state;
        switch (filter) {
            case 'TRUE':
                let listQuestionTrue = listQuestionAll.filter(item => {
                    return item.dataStandard.rightAnswer == true
                });
                let lenTrue = Object.keys(listQuestionTrue).length;
                this.setState({
                    listQuestion: listQuestionTrue,
                    dataResult: lenTrue > 0 ? listQuestionTrue[0].dataStandard : '',
                    stepIndex: lenTrue > 0 ? listQuestionTrue[0].dataStandard.stepIndex + 1 : '1',
                    index: 0,
                    title: 'Tất cả những câu trả lời đúng'
                });
                break;
            case 'FALSE':
                let listQuestionFalse = listQuestionAll.filter(item => {
                    return item.dataStandard.rightAnswer == false
                });
                let lenFalse = Object.keys(listQuestionFalse).length;
                this.setState({
                    listQuestion: listQuestionFalse,
                    dataResult: lenFalse > 0 ? listQuestionFalse[0].dataStandard : '',
                    stepIndex: lenFalse > 0 ? listQuestionFalse[0].dataStandard.stepIndex + 1 : 1,
                    index: 0,
                    title: 'Tất cả những câu trả lời sai'
                });
                console.log(listQuestionFalse);
                break;
            default:
                let len = Object.keys(listQuestionAll).length;
                this.setState({
                    listQuestion: listQuestionAll,
                    dataResult: len > 0 ? listQuestionAll[0].dataStandard : '',
                    stepIndex: len > 0 ? listQuestionAll[0].dataStandard.stepIndex + 1 : 1,
                    index: 0,
                    title: 'Tất cả các câu hỏi'
                });
                break;
        }
    }

    gotoStepId(stepId) {
        const { listQuestionAll, listQuestion } = this.state;
        let result = listQuestionAll.find(item => {
            return item.dataStandard.stepId === stepId;
        });
        let index = listQuestion.findIndex(item => {
            return item.dataStandard.stepId === stepId;
        });
        this.setState({
            dataResult: result ? result.dataStandard : '',
            stepIndex: result ? result.dataStandard.stepIndex + 1 : 1,
            index: index,
        });
    }

    handleNextQuestion() {
        const { listQuestion, index } = this.state;
        const maxLength = Object.keys(listQuestion).length;
        if (index < maxLength - 1) {
            const result = listQuestion[this.state.index + 1];
            this.setState({
                dataResult: result ? result.dataStandard : '',
                stepIndex: result ? result.dataStandard.stepIndex + 1 : 1,
                index: this.state.index + 1
            });
        }
    }

    handlePreviewQuestion() {
        const { listQuestion, index } = this.state;
        if (index > 0) {
            const result = listQuestion[index - 1];
            this.setState({
                dataResult: result ? result.dataStandard : '',
                stepIndex: result ? result.dataStandard.stepIndex + 1 : 1,
                index: index - 1
            });
        }
    }

    showGuildExam(b) {
        this.setState({
            visibleGuild: b
        });
    }

    onMenuPress() {
        this.setState({
            visibleSlide: !this.state.visibleSlide
        });
    }

    render() {
        const { dataResult, listQuestion, visibleSlide, index, isLoading } = this.state;
        const maxLength = Object.keys(listQuestion).length;
        return (
            <View style={styles.container}>
                <ImageBackground source={AppIcon.background_main} resizeMode='cover' style={{ width: '100%', height: '100%' }}>
                    <HeaderWithBg back={() => this.goBack()} />
                    {/* <HeaderNavigation
                    bgColor={'rgb(28, 176, 246)'}
                    title={this.state.title}
                    onPress={() => this.goBack()}
                    icon={'filter'}
                    color={'white'}
                    onMenuPress={() => this.onMenuPress()} /> */}
                    <View style={styles.header}>
                        <FlatList
                            data={listQuestion}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            extraData={this.state.stepIndex}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <RippleButton onPress={() => this.gotoStepId(item.dataStandard.stepId)} size={70}
                                    style={[styles.wrapItem,
                                    { borderColor: this.state.stepIndex === (1 + item.dataStandard.stepIndex) ? '#FF9900' : '#fff' }]}>
                                    <Text style={[styles.textActive, {
                                        color: this.state.stepIndex === (1 + item.dataStandard.stepIndex) ? '#FF9900' : '#fff'
                                    }]}>
                                        {1 + item.dataStandard.stepIndex}
                                    </Text>
                                </RippleButton>
                            }
                        />
                    </View>
                    <ImageBackground source={AppIcon.pop_up_1} style={{ width: width * 0.83, height: height * 0.85, alignItems: 'center', alignSelf: 'center', position: 'absolute', bottom: 20}} resizeMode='contain'>
                        <View style={styles.webViewWrap}>
                            {/* { */}
                            {/* (dataResult != '' && dataResult != undefined && dataResult !== null) && */}
                            <WebView
                                ref={(webView) => this.webView = webView}
                                showsVerticalScrollIndicator={false}
                                scalesPageToFit={false}
                                scrollEnabled
                                style={styles.webviewStyle}
                                source={{
                                    html: MathJaxLibs.renderMathJaxPractice(
                                        this.state.dataResult, true
                                    ),
                                    baseUrl: BASE_URL_WEB
                                }}
                            />
                            {/* } */}
                        </View>
                        <View style={{ position: 'absolute', top: 100, left: 0, right: 0, bottom: 50, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                            {(dataResult.rightAnswer == true && !isLoading) &&
                                <Icon name="check-circle" color={'rgba(0, 122, 204, 0.5)'} size={60} />
                            }
                            {(dataResult.rightAnswer == false && !isLoading) &&
                                <Icon name="times-circle" color={'rgba(255, 0, 0, 0.5)'} size={60} />
                            }
                        </View>
                        {!isLoading &&
                            <View style={styles.viewNavibottom}>
                                <PreviewButton disabled={(index <= 0 || isLoading) ? true : false} icon={true} onPress={() => this.handlePreviewQuestion()} />
                                <RippleButton style={styles.btnXemHuongDan} onPress={() => this.showGuildExam(true)}>
                                    <Image source={AppIcon.btn_huongdan} resizeMode='contain' style={styles.btnXemHuongDan} />
                                </RippleButton>
                                {/* <ButtomCustomeSmall
                                onPress={() => this.showGuildExam(true)}
                                width={160}
                                title='Xem hướng dẫn' /> */}
                                <NextButton disabled={index >= maxLength - 1 ? true : false} icon={true} onPress={() => this.handleNextQuestion()} />
                            </View>
                        }
                        {
                            visibleSlide &&
                            <SlideBottom onClose={this.onMenuPress.bind(this)} onPress={this.onFilter.bind(this)} />
                        }
                        <Image source={AppIcon.icon_penholder} style={{ position: 'absolute', height: 96, width: 61, right: -20, bottom: - 5 }} resizeMode='contain' />
                        {/* <Image source={AppIcon.icn_eraser} style={{ position: 'absolute', height: 27, width: 27, top: -10, left: 20 }} resizeMode='contain' /> */}
                        <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 50, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                        <Image source={AppIcon.text_hi_box} style={{ position: 'absolute', height: 56, width: 56, left: - 60, bottom: 170 }} resizeMode='contain' />
                    </ImageBackground>
                    {this.state.visibleGuild &&
                        <GuildExamModal ref='guildexammodal' explain={dataResult.explainQuestion} closeGuild={this.showGuildExam.bind(this)} />
                    }
                    <LoadingLearn isLoading={isLoading} color={'#999'} />
                </ImageBackground>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    webViewWrap: {
        marginTop: 10,
        width: width * 0.75,
        height: height * 0.65,
        backgroundColor: '#fff'
    },
    btnXemHuongDan: {
        width: 145,
        height: 38,
        alignSelf: 'center',
    },
    webviewStyle: {
        // flex: 1,
        width: width * 0.75,
        padding: 20,
        backgroundColor: 'black'
    },
    header: {
        // backgroundColor: 'rgb(28, 176, 246)',
        paddingBottom: 5,
    },
    textActive: {
        marginBottom: 5,
        color: 'white',
        fontFamily: 'Roboto-Bold',
    },
    wrapItem: {
        marginHorizontal: 5,
        width: 70,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#fff'
    },
    viewNavibottom: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 20,
        left: 0,
        right: 0,
    }
});