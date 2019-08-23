import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import Helper from '../../utils/Helpers';
import HeaderNavigation from '../common/HeaderNavigation';
import Container from '../common/Container';
import { ButtomCustomeSmall } from '../common/Button';
import { playSoundButton } from '../../utils/AudioUtils';
import DateUtils from '../../utils/DateUtils';
import LevelPractice from '../common/LevelPractice';
import AppIcon from '../../utils/AppIcon';
import global from '../../utils/Globals';

export default class PracticeInfoScreen extends Component {
    constructor(props) {
        super(props);
        // Orientation.lockToLandscape();
        global.updatePracticeInfo = this.getInitData.bind(this);
    }

    componentDidMount() {
        this.getInitData();
    }

    getInitData() {
        const { problemCode } = this.props.navigation.state.params;
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            this.props.fetchPracticeInfo({ token, problemCode });
        }).catch(err => console.log(err));
    }

    goBack() {
        this.props.navigation.goBack();
    }

    handleNavigate() {
        const { practiceInfo } = this.props;
        const { problemCode } = this.props.navigation.state.params;
        const { stepIdNow, subjectId, status } = practiceInfo;
        // Orientation.lockToPortrait();
        playSoundButton();
        this.props.navigation.navigate({ routeName: 'PracticeLearn', key: 'PracticeLearnId', params: { problemCode, stepIdNow, subjectId, status } });
    }

    render() {
        const { title } = this.props.navigation.state.params;
        const { practiceInfo } = this.props;
        const { levelPractice } = practiceInfo;
        return (
            <ImageBackground source={AppIcon.bg_info} style={{ width: '100%', height: '100%' }}>
                <Container>
                    <HeaderNavigation title={title || ''} onPress={() => this.goBack()} color={'rgb(166, 168, 171)'} />
                    <View style={styles.wrapInfo}>
                        <Text style={styles.textInfoHead}>Thông tin luyện tập</Text>
                        <Text style={styles.textInfo}>Tổng số câu đã luyện {practiceInfo.totalQuestion} câu</Text>
                        <Text style={styles.textInfo}>Lần luyện gần nhất {DateUtils.formatDateHMYMD(practiceInfo.lastTime || 0)}</Text>
                        <Text style={styles.textInfo}>Số điểm hiện có {practiceInfo.totalScore} điểm</Text>
                        <View style={styles.viewTh}>
                            <Text style={styles.textTh}>Mức độ thông hiểu</Text>
                            <LevelPractice levelPractice={levelPractice} />
                        </View>
                        <View style={styles.wrapButton}>
                            <ButtomCustomeSmall
                                width={200}
                                title={practiceInfo.status === 2 ? 'Làm lại' : practiceInfo.status === 1 ? 'Tiếp tục' : 'Bắt đầu luyện tập'}
                                onPress={() => this.handleNavigate()} />
                        </View>
                    </View>
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
    viewTh: {
        marginVertical: 5,
        flexDirection: 'row'
    },
    icon: {
        width: 16,
        height: 20,
        marginRight: 5,
    },
    iconApple: {
        width: 16,
        height: 20,
        marginRight: 5,
    },
    rows: {
        flexDirection: 'row'
    },
    textInfo: {
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-Medium'
    },
    textTh: {
        color: 'rgb(166, 168, 171)',
        marginRight: 5
    },
    wrapInfo: {
        marginHorizontal: 10,
        flex: 1
    },
    textInfoHead: {
        fontSize: 14,
        marginVertical: 20,
        fontWeight: 'bold',
        color: 'rgb(166, 168, 171)',
    },
    wrapButton: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    rows: {
        flexDirection: 'row'
    }
});