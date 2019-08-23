import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Pie from 'react-native-pie';
import Container from '../common/Container';
import HeaderNavigation from '../common/HeaderNavigation';

export default class ExamNumeral extends Component {

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        const { statistic, totalQuestion, totalCorrects } = this.props.navigation.state.params;
        const acuracy = ((totalCorrects / totalQuestion) * 100).toFixed(0);
        return (
            <View style={styles.container}>
                <Container>
                    <HeaderNavigation title={'Chỉ số bài kiểm tra'} onPress={() => this.goBack()} color={'rgb(166, 168, 171)'} />
                    <View style={styles.body}>
                        <Text style={styles.textTitle}>Độ chính xác</Text>
                        <View style={styles.rows}>
                            <View>
                                <Pie
                                    radius={30}
                                    innerRadius={25}
                                    series={[Number(acuracy)]}
                                    colors={['rgb(122, 199, 12)']}
                                    backgroundColor='#ddd' />
                                <View style={styles.gauge}>
                                    <Text style={styles.gaugeText}>{acuracy}%</Text>
                                </View>
                            </View>
                            <View style={styles.rowRight}>
                                <Text style={styles.textDesc}>Tổng số câu hỏi : {totalQuestion || 0}</Text>
                                <Text style={styles.textDesc}>Số câu làm đúng : {totalCorrects || 0}</Text>
                            </View>
                        </View>
                        <Text style={styles.textTitle}>Hiệu quả làm bài trên độ khó câu hỏi</Text>
                        <View style={styles.rowDesc}>
                            {statistic.map((data, key) => {
                                const { totalCorrect, totalIncorrect, totalSkip, totalQuestion } = data;
                                return (
                                    <View key={key}>
                                        <View style={styles.cols}>
                                            <View style={[styles.cols1, { height: totalCorrect / totalQuestion * 100 }]} />
                                            <View style={[styles.cols2, { height: totalIncorrect / totalQuestion * 100 }]} />
                                            <View style={[styles.cols3, { height: totalSkip / totalQuestion * 100 }]} />
                                            <View style={[styles.cols4, { height: 100 }]} />
                                        </View>
                                        <Text style={styles.textLevel}>Cấp độ : {data.name}</Text>
                                    </View>
                                );
                            })}
                            <View style={styles.viewRight}>
                                <View style={styles.rowCircle}>
                                    <View style={[styles.circle, { backgroundColor: 'rgb(122, 199, 12)' }]} />
                                    <Text style={styles.textCircle}>Đúng</Text>
                                </View>
                                <View style={styles.rowCircle}>
                                    <View style={[styles.circle, { backgroundColor: 'rgb(255, 117, 117)' }]} />
                                    <Text style={styles.textCircle}>Sai</Text>
                                </View>
                                <View style={styles.rowCircle}>
                                    <View style={[styles.circle, { backgroundColor: 'rgb(188, 188, 255)' }]} />
                                    <Text style={styles.textCircle}>Bỏ qua</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Container>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    body: {
        marginHorizontal: 30,
    },
    textTitle: {
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        lineHeight: 40,
    },
    rows: {
        flexDirection: 'row'
    },
    rowRight: {
        marginLeft: 20,
        justifyContent: 'center'
    },
    textDesc: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: 'rgb(166, 168, 171)'
    },
    gauge: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: 'rgb(122, 199, 12)',
        fontSize: 18,
    },
    rowDesc: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cols: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    cols1: {
        width: 20,
        borderBottomWidth: 1,
        borderColor: 'rgb(122, 199, 12)',
        backgroundColor: 'rgb(122, 199, 12)'
    },
    cols2: {
        width: 20,
        marginHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: 'rgb(255, 117, 117)',
        backgroundColor: 'rgb(255, 117, 117)'
    },
    cols3: {
        width: 20,
        borderBottomWidth: 1,
        borderColor: 'rgb(188, 188, 255)',
        backgroundColor: 'rgb(188, 188, 255)'
    },
    cols4: {
        width: 1,
        backgroundColor: 'transparent'
    },
    textLevel: {
        lineHeight: 40,
        alignSelf: 'flex-end',
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-Bold',
        fontSize: 13,
    },
    rowCircle: {
        flexDirection: 'row',
        marginVertical: 2,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ddd'
    },
    textCircle: {
        color: 'rgb(166, 168, 171)',
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        marginLeft: 10,
    },
    viewRight: {
        justifyContent: 'center'
    }
});