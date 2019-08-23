import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Orientation from 'react-native-orientation';
import HeaderNavigation from '../common/HeaderNavigation';
import Container from '../common/Container';
import { ButtomCustomeSmall } from '../common/Button';
import LoadingScreen from '../common/LoadingScreen';
import AppIcon from '../../utils/AppIcon';
import Helper from '../../utils/Helpers';
import global from '../../utils/Globals';

export default class ExamInfoScreen extends Component {
    constructor(props) {
        super(props);
        Orientation.lockToLandscape();
        global.updateExamInfo = this.initData.bind(this);
    }

    componentDidMount() {
        this.initData();
    }

    initData() {
        const { testId } = this.props.navigation.state.params;
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            this.props.fetchTestInfo({ token, testId });
        });
    }

    goBack() {
        this.props.navigation.goBack();
    }

    handleNavigate() {
        const { testInfo } = this.props;
        const { status, testId, firstIdQuestion, nameTest } = testInfo;
        this.props.navigation.navigate({ routeName: 'ExamLearn', key: 'ExamLearnId', params: { status, testId, firstIdQuestion, nameTest } });
    }

    handleResultAction() {
        this.props.navigation.navigate({ routeName: 'ExamResult', key: 'ExamResultId', params: { type: 'Info' } });
    }

    render() {
        const { title } = this.props.navigation.state.params;
        const { testInfo, isLoadingInfo } = this.props;
        return (
            <ImageBackground source={AppIcon.bg_info} style={{ width: '100%', height: '100%' }}>
                <Container>
                    <HeaderNavigation title={title} color={'rgb(166, 168, 171)'} onPress={() => this.goBack()} />
                    <View style={styles.rowHead}>
                        <View style={styles.rows}>
                            <Icon name={'question'} size={16} color={'rgb(166, 168, 171)'} style={styles.icon} />
                            <Text style={styles.textInfo}>Số câu hỏi {testInfo.countQuestion}</Text>
                        </View>
                        <View style={styles.rows}>
                            <Icon name={'clock-o'} size={16} color={'rgb(166, 168, 171)'} style={styles.icon} />
                            <Text style={styles.textInfo}>Thời gian làm bài {testInfo.duration} phút</Text>
                        </View>
                    </View>
                    <Text style={styles.textHead}>HƯỚNG DẪN</Text>
                    <Text style={styles.textInfo}>Mỗi câu trả lời đúng được 10 điểm,sai được 0 điểm</Text>
                    <Text style={styles.textInfo}>Lựa chọn đáp án để trả lời câu hỏi</Text>
                    <Text style={styles.textInfo}>Ấn nút xem đáp án sau khi nộp bài để xem các hướng dẫn</Text>
                    {(testInfo.status == 0) &&
                        <View style={styles.wrapButton}>
                            <ButtomCustomeSmall width={160} title={'Bắt đầu kiểm tra'} onPress={() => this.handleNavigate()} />
                        </View>
                    }
                    {(testInfo.status == 1) &&
                        <View style={styles.wrapButton}>
                            <ButtomCustomeSmall width={160} title={'Tiếp tục kiểm tra'} onPress={() => this.handleNavigate()} />
                        </View>
                    }
                    {(testInfo.status == 2) &&
                        <View style={styles.wrapButton}>
                            <ButtomCustomeSmall
                                width={160} bgColor={'rgb(0, 173, 248)'}
                                onPress={() => this.handleResultAction()} title={'Xem tổng hợp'} icon={'bar-chart'} />
                            <View style={styles.divider}></View>
                            <ButtomCustomeSmall width={160} title={'Làm lại kiểm tra'} onPress={() => this.handleNavigate()} />
                        </View>
                    }
                    <LoadingScreen isLoading={isLoadingInfo} />
                </Container>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    rowHead: {
        flexDirection: 'row',
    },
    rows: {
        marginHorizontal: 30,
        flexDirection: 'row'
    },
    textHead: {
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-Bold',
        marginLeft: 10,
        marginVertical: 10
    },
    textInfo: {
        marginVertical: 5,
        marginLeft: 10,
        fontSize: 13,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(166, 168, 171)',
    },
    icon: {
        alignSelf: 'center'
    },
    wrapButton: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    divider: {
        width: 10
    }
});