import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, Dimensions } from 'react-native';
import Pie from 'react-native-pie';
import Orientation from 'react-native-orientation';
import HeaderNavigation from '../common/HeaderNavigation';
import Container from '../common/Container';
import ProgressBar from '../common/ProgressBar';
import examService from '../../services/examService';
import { ButtomCustomeSmall } from '../common/Button';
import { main } from '../../themes/index';
import Helper from '../../utils/Helpers';
import DateUtils from '../../utils/DateUtils';
import AppIcon from '../../utils/AppIcon';
import { Itemknowledge } from './Itemknowledge';
import { width_device } from '../../constants/const';
import global from '../../utils/Globals';
import { LoadingLearn } from '../common/LoadingScreen';
import { HeaderWithBg } from '../modals/Header';
import PopUp from '../common/PopUp';
import RippleButton from '../common/RippleButton';

let { width, height } = Dimensions.get('window');
let s = width;
if (width < height) {
    width = height;
    height = s;
}

const progressbarWidth = 300;

export default class ExamResultScreen extends Component {
    constructor(props) {
        super(props);
        Orientation.lockToLandscape();
        this.state = {
            testDone: {},
            testDetail: '',
            isLoading: true,
            questions: [],
        }
    }

    componentDidMount() {
        const { testId } = this.props;
        this.getDetail(testId);
    }

    getDetail(testId) {
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            examService.fetchTestDetail({ token, testId }).then(response => {
                if (response != '') {
                    this.setState({
                        testDetail: response,
                        isLoading: false,
                        questions: response.questions,
                    });
                    // global.updateExamInfo();
                } else {
                    this.setState({
                        isLoading: false,
                        questions: [],
                        testDetail: '',
                    });
                }
            })
        });
    }

    handleNavigate(type) {
        const { testId } = this.props;
        const { testDetail, questions } = this.state;
        const { statistic, totalQuestion, totalCorrects } = testDetail;
        if (type == 'answer') {
            this.props.navigation.navigate({
                routeName: 'ExamAnswer',
                key: 'ExamAnswerId',
                params: { testId, questions: questions }
            });
        } else {
            this.props.navigation.navigate({
                routeName: 'ExamNumeral',
                key: 'ExamNumeralId',
                params: { statistic, totalQuestion, totalCorrects }
            });
        }
    }

    gotoPracticeInfo(data) {
        const { problemId, name } = data;
        const problemCode = problemId;
        const title = name;
        this.props.navigation.navigate({ routeName: 'PracticeInfo', key: 'PracticeInfoId', params: { title, problemCode } });
    }

    goBack() {
        const { onBack } = this.props.navigation.state.params;
        if (onBack) {
            this.props.navigation.state.params.onBack();
        }
        this.props.navigation.goBack();
    }

    render() {
        const { testDone, testName, displayName } = this.props;
        const { testDetail } = this.state;
        const { needsPractice } = testDetail;
        const accuracy = Number(testDetail.accuracy);
        const { type } = this.props.navigation.state.params;
        return (
            <ImageBackground style={styles.container} source={AppIcon.background_main} resizeMode='stretch'>
                <HeaderWithBg back={() => { this.goBack() }} left={30} />
                <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: width * 0.42, height: height * 0.2, alignItems: 'center', position: 'absolute', alignSelf: 'center', zIndex: 1 }}>
                    <Image source={AppIcon.title_toanhoc} style={{ width: '50%', position: 'absolute', bottom: -5 }} resizeMode='contain' />
                </ImageBackground>
                <PopUp source={AppIcon.pop_up_1} style={styles.wrap} resizeMode='contain' width={width * 0.8} height={height * 0.9}>
                    <Container>
                        {/* <HeaderNavigation title={testName} onPress={this.goBack.bind(this)} color={'rgb(166, 168, 171)'} /> */}
                        <ScrollView style={styles.body}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={styles.contents}>
                                    <Text style={[main.textBoldPrimary, main.vertical5]}>{displayName || ''} ơi! Bạn được {testDetail.percentComplete || 0} điểm</Text>
                                    {testDetail.percentComplete >= 70 ?
                                        <Text style={main.textPrimary}>Chúc mừng bạn.Số điểm khá tốt</Text>
                                        :
                                        <Text style={[main.textPrimary, { textAlign: 'center' }]}>Số điểm này không tệ nhưng bạn nên xem lại hướng dẫn{"\n"}và học lại các kỹ năng chưa tốt để đạt kết quả cao nhất nhé</Text>
                                    }

                                    <Text style={[main.textBoldPrimary, main.vertical5]}>Thông tin bài làm</Text>
                                    <Text style={main.textPrimary}>Thời gian làm {DateUtils.formatDateHMYMD(testDetail.startTime || 0)}</Text>
                                </View>
                                {/* <View style={styles.center}>
                                    <ProgressBar color={'#009E0F'} width={width_device - 40} progress={(testDetail.percentComplete / 100) || 0} />
                                </View> */}
                                <View style={[main.rowBetween, main.vertical5]}>
                                    <View style={[main.rowAround, { marginHorizontal: 10 }]}>
                                        <Text style={[main.textDesc, { color: '#000', fontFamily: 'Roboto-Bold' }]}>Số câu đúng: </Text>
                                        <Text style={[main.textDesc, { color: 'red', fontFamily: 'Roboto-Bold', fontSize: 16, top: -1 }]}>{testDetail.totalCorrects}</Text>
                                    </View>
                                    <View style={[main.rowAround, { marginHorizontal: 10 }]}>
                                        <Text style={[main.textDesc, { color: '#000', fontFamily: 'Roboto-Bold' }]}>Số câu sai: </Text>
                                        <Text style={[main.textDesc, { color: 'red', fontFamily: 'Roboto-Bold', fontSize: 16, top: -1 }]}>{testDetail.totalIncorrects}</Text>
                                    </View>
                                    <View style={[main.rowAround, { marginHorizontal: 10 }]}>
                                        <Text style={[main.textDesc, { color: '#000', fontFamily: 'Roboto-Bold' }]}>Số câu không trả lời: </Text>
                                        <Text style={[main.textDesc, { color: 'red', fontFamily: 'Roboto-Bold', fontSize: 16, top: -1 }]}>{testDetail.totalSkip}</Text>
                                    </View>
                                </View>
                                {testDetail != '' &&
                                    <View style={[main.viewCenter]}>
                                        <RippleButton style={[styles.btnXemDapAn, { marginVertical: 20 }]} onPress={() => this.handleNavigate('answer')} size={100}>
                                            <Image source={AppIcon.btn_xemdapan} style={styles.btnXemDapAn} resizeMode='contain' />
                                        </RippleButton>
                                        {/* <ButtomCustomeSmall onPress={() => this.handleNavigate('answer')} title={'Xem đáp án'} size={120} /> */}
                                        {/* <ButtomCustomeSmall onPress={() => this.handleNavigate('')} title={'Xem chỉ số'} bgColor={'rgb(255, 186, 1)'} size={120} /> */}
                                        {/* <ButtomCustomeSmall onPress={() => { }} title={'Xem chỉ số'} bgColor={'rgb(255, 186, 1)'} size={120} /> */}
                                    </View>
                                }
                                <View style={[main.vertical10]}>
                                    <Text style={[main.textBoldPrimary, main.vertical5, { alignSelf: 'center', fontSize: 20 }]}>Chỉ số</Text>
                                    <View style={[main.rowBetween, styles.rowPie]}>
                                        <View>
                                            <View>
                                                {/* <Pie
                                                    radius={30}
                                                    innerRadius={25}
                                                    series={[accuracy || 0]}
                                                    colors={['rgb(122, 199, 12)']}
                                                    backgroundColor='#ddd' /> */}
                                                <ImageBackground source={AppIcon.progessbar_1} style={{ width: progressbarWidth, height: 20, flexDirection: 'row', paddingTop: 1 }} resizeMode='contain'>
                                                    <Image source={AppIcon.progessbar_2} style={{ width: (progressbarWidth - 2) * (accuracy / 100 || 0), height: 13 }} resizeMode='stretch' />
                                                </ImageBackground>
                                            </View>
                                            <Text style={main.textDesc}>Độ chính xác {accuracy || 0}%</Text>
                                        </View>
                                    </View>
                                    <View style={[main.rowBetween, styles.rowPie]}>
                                        <View>
                                            <ImageBackground source={AppIcon.progessbar_1} style={{ width: progressbarWidth, height: 20, flexDirection: 'row', paddingTop: 1 }} resizeMode='contain'>
                                                <Image source={AppIcon.progessbar_2} style={{ width: (progressbarWidth - 2) * (testDetail.speed / 100 || 0), height: 13 }} resizeMode='stretch' />
                                            </ImageBackground>
                                            <Text style={main.textDesc}>Tốc độ trung bình {testDetail.speed || 0} câu / phút</Text>
                                        </View>
                                    </View>
                                    {/* <ButtomCustomeSmall onPress={() => { }} title={'Xem chỉ số'} bgColor={'rgb(255, 186, 1)'} size={120} /> */}
                                    <RippleButton style={[styles.btnXemDapAn, { marginVertical: 20 }]} size={100}>
                                        <Image source={AppIcon.btn_xemchiso} style={styles.btnXemDapAn} resizeMode='contain' />
                                    </RippleButton>

                                    <Text style={[main.textBoldPrimary, main.vertical10, { alignSelf: 'center' }]}>Các đơn vị kiến thức cần luyện tập</Text>
                                    {needsPractice != null &&
                                        needsPractice.map((data, key) => {
                                            if (!data.isPass && data.problemId != "") {
                                                return (
                                                    <Itemknowledge onPress={() => this.gotoPracticeInfo(data)} key={key} title={data.name} />
                                                );
                                            }
                                        })
                                    }
                                </View>
                            </View>
                        </ScrollView>
                        <LoadingLearn isLoading={this.state.isLoading} />
                        {/* <View style={styles.viewWaiting}>
                        <BarIndicator size={50} color={'rgb(38, 135, 218)'} count={10} />
                        <Text style={styles.textStatus}>Đang chấm điểm ...</Text>
                    </View> */}
                    </Container>
                    <Image source={AppIcon.icn_mascot} style={{ position: 'absolute', height: height * 0.5, width: 200, right: - 100, bottom: - 10 }} resizeMode='contain' />
                    {/* <Image source={AppIcon.icn_eraser} style={{ position: 'absolute', height: 27, width: 27, top: -10, left: 20 }} resizeMode='contain' /> */}
                    <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 50, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                    <Image source={AppIcon.text_hi_box} style={{ position: 'absolute', height: 56, width: 56, left: - 60, bottom: 170 }} resizeMode='contain' />
                </PopUp>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        // backgroundColor: 'rgb(243, 243, 243)',
    },
    textHeadCenterSecond: {
        fontSize: 16,
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-Bold',
        alignSelf: 'center'
    },
    wrap: {
        width: width * 0.8,
        height: height * 0.9,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingBottom: 30,
        paddingTop: 40,
        marginBottom: 0,
        position: 'absolute',
        bottom: 5
        // borderWidth: 1.5,
        // borderColor: '#004DA5',
        // borderRadius: 10,
        // backgroundColor: '#FFF2AF'
    },
    viewWaiting: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        width: 260,
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    textStatus: {
        marginBottom: 20,
        color: 'rgb(38, 135, 218)',
        fontFamily: 'Roboto-Bold',
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    center: {
        alignItems: 'center'
    },
    textHead: {
        fontSize: 15,
        color: '#FF9902',
        alignSelf: 'center'
    },
    contents: {
        paddingVertical: 10,
        alignItems: 'center'
    },
    iconL: {
        width: 18,
        height: 20,
        marginRight: 10,
    },
    speedIcon: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    rowPie: {
        flexDirection: 'row',
        width: 300,
        alignSelf: 'center'
    },
    btnXemDapAn: {
        width: 145,
        height: 38,
        alignSelf: 'center',
    }
});