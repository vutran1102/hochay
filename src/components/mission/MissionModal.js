import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
import { Button } from '../common/Button';
import RippleButton from '../common/RippleButton';
import AppIcon from '../../utils/AppIcon';
import { MATH_KIT } from '../../constants/const';
import MissionBlankData from './MissonBlankData';

const arraySource = [AppIcon.icon_board, AppIcon.icon_book, AppIcon.icon_pen, AppIcon.icon_penholder, AppIcon.icon_hat, AppIcon.icon_calc, AppIcon.icon_clock];


let { width, height } = Dimensions.get('window');
let s = width;
if (width < height) {
    width = height;
    height = s;
}
const dataMockup = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }];
// const dataMockup = [];
export default class MissionModal extends Component {
    handleData() {
        let data = [];
        for(var i = 0; i < this.props.dataMission.length; i ++) {
            if(!this.props.dataMission[i].isPass) {
                data.push(this.props.dataMission[i]);
            }
        }
        return data;
    }

    renderViewWithData() {
        console.log('this.props.dataMission: ', JSON.stringify(this.props.dataMission));
        return (
            <View>
                {/* <Text style={styles.textInfo}>Hoàn thành bài tập bố mẹ giao để được nhận thưởng nhé</Text> */}
                <Image source={AppIcon.title_nhiemvu} resizeMode='contain' style={{ width: 201, height: 29.2, alignSelf: 'center' }} />
                <View style={{ paddingHorizontal: 20, width: '90%', height: '90%', marginLeft: '5%' }}>
                    <FlatList
                        horizontal={true}
                        data={this.handleData()}
                        keyExtractor={(item, index) => index.toString()}
                        // numColumns={2}

                        renderItem={({ item, index }) =>
                            <ImageBackground source={AppIcon.btn_box_nhiemvu} resizeMode='contain' style={{ width: 140, height: 223.6, marginRight: 15, marginTop: 10 }}>
                                <View style={styles.wrapItem}>
                                    <Image source={arraySource[index % (arraySource.length)]} style={styles.icon} resizeMode='contain' />
                                    <Text style={styles.textTitle} ellipsizeMode='tail' numberOfLines={2} >{item.title}</Text>
                                    <View style={styles.lineHorizontal} />
                                    <Text style={styles.textPt}>Phần thưởng</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={AppIcon.icon_apple} resizeMode='contain' style={{ width: 16.8, height: 18.8 }} />
                                        <Text style={{ color: 'rgb(249, 0, 0)', fontSize: 16, fontFamily: 'SVN-Gumley', top: 4 }}>30</Text>
                                    </View>
                                    {/* <Image source={require('../../asserts/icon/mission_icon.png')} style={styles.icon} /> */}
                                    <Text style={styles.textScore}>20</Text>
                                    {/* <Button width={100} title='Làm ngay'
                                        onPress={() => {
                                            const { practiceInfo } = this.props; //mokup demo
                                            const stepIdNow = practiceInfo.stepIdNow || '5c88decaf44e4400019aeabb';
                                            const problemCode = practiceInfo.problemId || '5bada4dcafe49f0001cd5497';
                                            const status = 0;
                                            const subjectId = MATH_KIT;
                                            this.props.navigation.navigate({ routeName: 'PracticeLearn', key: 'PracticeLearnId', params: { problemCode, stepIdNow, subjectId, status } });
                                        }}
                                    /> */}
                                    <RippleButton style={styles.btnLamNgay} onPress={() => {
                                        console.log("item:  ", JSON.stringify(item));
                                        // const { practiceInfo } = this.props; //mokup demo
                                        const stepIdNow = item.stepIdNow;
                                        const problemCode = item.problemId || '5bada4dcafe49f0001cd5497';
                                        const status = item.status;
                                        const subjectId = MATH_KIT;
                                        this.props.navigation.navigate({ routeName: 'PracticeLearn', key: 'PracticeLearnId', params: { problemCode, stepIdNow, subjectId, status } });
                                    }}>
                                        <Image source={AppIcon.btn_lamngay} resizeMode='contain' style={{ width: 90, height: 30, top: -10 }} />
                                    </RippleButton>
                                </View>
                            </ImageBackground>
                        }
                    />
                </View>
            </View>
        )
    }
    render() {
        return (

            <View style={styles.container}>
                <ImageBackground source={AppIcon.pop_up_5} resizeMode='contain' style={{ width: 572, height: 302.4, justifyContent: 'center', flexDirection: 'row' }}>
                    <Image source={AppIcon.icon_preview} style={styles.iconPreview} resizeMode='contain' />
                    <View style={{ width: 460 }}>
                        <View style={styles.viewHead}>
                            <View style={{ width: 100, backgroundColor: 'transparent' }} />
                        </View>
                        <View style={styles.body}>
                            <RippleButton onPress={() => this.props.handleMission(false)} style={styles.closeButton}>
                                <Image source={AppIcon.icon_close} style={{ width: 30, height: 30 }} />
                            </RippleButton>
                            {this.handleData() ? this.renderViewWithData() : <MissionBlankData />}
                        </View>
                    </View>
                    <Image source={AppIcon.icon_next} style={styles.iconNext} resizeMode='contain' />
                    <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 50, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                                <Image source={AppIcon.text_hi_box} style={{ position: 'absolute', height: 56, width: 56, left: - 60, bottom: 170 }} resizeMode='contain' />
                                <Image source={AppIcon.mascot_4} style={{ position: 'absolute', height: 200, width: 120, right: -40, bottom: -30 }} resizeMode='contain' />
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99
    },
    viewHead: {
        width: 600,
        flexDirection: 'row'
    },
    btnLamNgay: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    lineHorizontal: {
        top: -7,
        width: 44,
        height: 2,
        borderWidth: 1,
        borderColor: 'rgb(0, 77, 166)'
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 15,
        padding: 10,
        zIndex: 1
    },
    textTitle: {
        width: 80,
        textAlign: 'center',
        color: 'rgb(251, 239, 0)',
        fontSize: 14,
        fontFamily: 'Roboto-bold',
        top: -10,
        textShadowColor: 'rgb(5, 97, 203)',
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 1,
        shadowOpacity: 150
    },
    topHead: {
        width: 300,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    body: {
        alignSelf: 'center',
        // backgroundColor: '#fff',
        width: 600,
        height: 300,
        padding: 20,
        borderRadius: 20,
    },
    rowItem: {
        flex: 1,
        padding: 5,
        marginTop: 20,
        marginRight: 20,
        borderWidth: 1,
        paddingRight: 10,
        borderColor: '#333'
    },
    rowTop: {
        flexDirection: 'row'
    },
    wrapItem: {
        alignItems: 'center',
        paddingTop: 35
    },
    textDesc: {
        color: '#383838',
        fontSize: 15,
        flex: 1,
        fontFamily: 'Roboto-Bold',
        marginHorizontal: 10,
    },
    textHead: {
        color: '#383838',
        fontSize: 20,
        fontFamily: 'SVN-Gumley',
    },
    textInfo: {
        fontFamily: 'SVN-Gumley',
        color: '#383838',
        fontSize: 20,
        marginHorizontal: 10,
    },
    textScore: {
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginTop: 10
    },
    textPt: {
        fontFamily: 'Roboto-Bold',
        color: 'rgb(0, 77, 166)',
        fontSize: 10,
        fontWeight: '900'
    },
    image: {
        width: 60,
        height: 60,
    },
    icon: {
        width: 77.2,
        height: 66,
        marginTop: 7
    },
    iconPreview: {
        marginLeft: 20,
        width: 30,
        height: 30,
        alignSelf: 'center',
        top: -5,
        // position: 'absolute',
        // left: 0,
        // bottom: 0,
        // top: 0
    },
    iconNext: {
        marginRight: 20,
        width: 30,
        height: 30,
        top: -5,
        alignSelf: 'center',
    }
});
