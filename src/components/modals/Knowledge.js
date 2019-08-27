import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScaleSlide } from 'react-native-animation-effects';
import Pie from 'react-native-pie';
import { HeaderClose } from './Header';

export default class Knowledge extends Component {
    render() {
        const { knowledge } = this.props;
        const { totalProblemLevel0, totalProblemLevel1, totalProblemLevel2, totalProblemLevel3, name, totatotalProblem } = knowledge;
        const total = totalProblemLevel0 + totalProblemLevel1 + totalProblemLevel2 + totalProblemLevel3;
        return (
            <View style={styles.viewAbsolute}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ScaleSlide>
                        <View style={styles.container}>
                            <HeaderClose onPress={() => this.props.visibleKnowledge(false)} />
                            <View style={{ paddingHorizontal: 20 }}>
                                <Text style={styles.headerTitle}>{name ? name : ''}</Text>
                                <View style={styles.body}>
                                    <Pie
                                        radius={50}
                                        series={[totalProblemLevel0 * 100 / total, totalProblemLevel1 * 100 / total, totalProblemLevel2 * 100 / total, totalProblemLevel3 * 100 / total]}
                                        colors={['rgb(71, 150, 255)', 'rgb(2, 51, 106)', 'rgb(8, 95, 186)', 'rgb(0, 210, 220)']} />

                                    <View>
                                        <Text style={styles.texTotalQuestion}>Tổng số bài học {totatotalProblem ? totatotalProblem : '0'}</Text>
                                        <View style={styles.row}>
                                            <View style={styles.circle3}></View><Text style={styles.textDesc}>Tinh thông  {totalProblemLevel3 ? totalProblemLevel3 : '0'}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.circle2}></View><Text style={styles.textDesc}>Thành thạo  {totalProblemLevel2 ? totalProblemLevel2 : '0'}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.circle1}></View><Text style={styles.textDesc}>Đạt {totalProblemLevel1 ? totalProblemLevel1 : '0'}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.circle0}></View><Text style={styles.textDesc}>Chưa đạt  {totalProblemLevel0 ? totalProblemLevel0 : '0'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScaleSlide>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    viewAbsolute: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        alignItems: 'center',
        width: 400,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignSelf: 'center'

    },
    headerTitle: {
        marginTop: 5,
        marginHorizontal: 5,
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        alignSelf: 'center'
    },
    body: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row'
    },
    textDesc: {
        fontFamily: 'Roboto-Medium',
        color: 'rgb(166, 168, 171)',
        fontSize: 15,
        marginLeft: 5,
    },
    circle0: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'rgb(71, 150, 255)',
        alignSelf: 'center'
    },
    circle1: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'rgb(2, 51, 106)',
        alignSelf: 'center'
    },
    circle2: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'rgb(8, 95, 186)',
        alignSelf: 'center'
    },
    circle3: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'rgb(0, 210, 220)',
        alignSelf: 'center'
    },
    texTotalQuestion: {
        fontFamily: 'Roboto-Bold',
        color: 'rgb(166, 168, 171)',
        fontSize: 14,
        lineHeight: 25
    }
});