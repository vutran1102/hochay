import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import HeaderNavigation from '../../common/HeaderNavigation';
import * as FormforExerciseDetail from './FormForExerciseDetail';
import HeaderParent from '../HeaderParent';

const screenSize = Dimensions.get('window');
let { width, height } = screenSize;
let s = width;
if (width > height) {
    width = height;
    height = s;
}

export default class CompletedItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            achievements: 'Xuất sắc',
            timeStampCompleted: 1557367415901,
            message: 'Làm tốt nha con!',
            timeDeadLine: '',
            condition: 'Xuất sắc',
            lessonLb: '',
            timeCompleted: '',
            subject: 'Toán lớp 2'
        }
    }

    goback(isSave) {
        this.props.backCallback();
    }

    handleData() {
        const { title, timeStampDeadline } = this.props.data;
        this.setState({ lessonLb: title });
        let timeDeadLine;
        if (timeStampDeadline) {
            timeDeadLine = (new Date(timeStampDeadline)).toLocaleString();
        }
        this.setState({ timeDeadLine: timeDeadLine })
        const timeCompleted = (new Date(this.state.timeStampCompleted)).toLocaleString();
        this.setState({ timeCompleted: timeCompleted })
    }

    componentDidMount() {
        this.handleData();
    }

    render() {
        return (
            <View style={styles.rootView}>
                {/* <HeaderNavigation title='Giao bài cho con' bgColor='blue' color='#fff' onPress={() => { this.goback() }} /> */}
                <HeaderParent displayName={'Giao bài cho con'} leftCallback={() => this.goback()} />
                <View style={styles.container}>
                    <View style={styles.wrapRow}>
                        <Text>Môn</Text>
                        <Text style={styles.subjectLb}>{this.state.subject}</Text>
                    </View>
                    <View style={styles.wrapRow}>
                        <Text>Bài học</Text>
                        <Text style={styles.lessonLb}>{this.state.lessonLb}</Text>
                    </View>
                    <View style={styles.wrapRow}>
                        <Text>Thời hạn cần con hoàn thành</Text>
                        <Text style={styles.timeDeadLineLb}>{this.state.timeDeadLine || 'Không yêu cầu'}</Text>
                    </View>
                    <View style={styles.wrapRow}>
                        <Text>Điều kiện hoàn thành tối thiểu</Text>
                        <Text style={styles.conditionLb}>{this.state.condition}</Text>
                    </View>
                    <View>
                        <Text>Nội dung nhắn con</Text>
                        <Text style={styles.remindLb}>{this.state.message}</Text>
                    </View>
                    <FormforExerciseDetail.ListenRecordForm isHideDelete={true} />
                    <View style={styles.wrapResult}>
                        <View style={[styles.wrapRow, { alignItems: 'center', justifyContent: 'center', right: 20 }]}>
                            <Text style={styles.resultLb}>Kết quả</Text>
                        </View>
                        <View style={styles.wrapRow}>
                            <Text>Thời gian hoàn thành</Text>
                            <Text style={styles.timeCompleted}>{this.state.timeCompleted}</Text>
                        </View>
                        <View style={styles.wrapRow}>
                            <Text>Thành tích</Text>
                            <Text style={styles.achievementsLb}>{this.state.achievements}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    resultLb: {
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
        color:'rgb(255, 155, 26)'
    },
    wrapResult: {
        left: -20,
        width: width,
        height: 150,
        backgroundColor: 'rgb(197, 216, 237)',
        alignItems:'center',
        justifyContent: 'center',
        marginTop: 20
    },
    achievementsLb: {
        left: 20,
        fontSize: 13,
        fontFamily: 'Roboto-Bold'
    },
    timeCompleted: {
        left: 20,
        fontSize: 13,
        fontFamily: 'Roboto-Bold'
    },
    remindLb: {
        fontSize: 13,
        fontFamily: 'Roboto-Bold',
        marginTop: 10
    },
    conditionLb: {
        left: 20,
        fontSize: 13,
        fontFamily: 'Roboto-Bold'
    },
    subjectLb: {
        marginLeft: '30%',
        position: 'absolute',
        fontSize: 13,
        fontFamily: 'Roboto-Bold'
    },
    lessonLb: {
        marginLeft: '30%',
        position: 'absolute',
        fontSize: 13,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(255, 155, 26)'
    },
    rootView: {
        flex: 1,
    },
    timeDeadLineLb: {
        left: 20,
        fontSize: 13,
        fontFamily: 'Roboto-Bold'
    },

    container: {
        flex: 1,
        // alignItems:'center',
        paddingLeft: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        paddingTop: 20
    },
    wrapRow: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
})