import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderClose } from '../modals/Header';
import { ButtomCustomeSmall } from '../common/Button';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';
import SlideInBottom from '../anim/SlideInBottom';
import Helper from '../../utils/Helpers';
import PopUp from '../common/PopUp';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';

let { width, height } = Dimensions.get('window');
let s = width;
if(width < height) {
    width = height;
    height = s;
}

export default class ExamInfoDialog extends Component {
    componentDidMount() {
        this.initData();
    }

    initData() {
        const { testId } = this.props;
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            this.props.fetchTestInfo({ token, testId });
        });
    }

    render() {
        const { status } = this.props.testInfo;
        return (
            <View style={styles.viewAbsolute}>
                <PopUp style={styles.container} source={AppIcon.pop_up_2} width={width * 0.65} height={height * 0.57} close={() => { this.props.onclose(false) }}>
                    {/* <HeaderClose onPress={() => this.props.onclose(false)} /> */}
                    <View style={styles.body}>
                        <Image source={AppIcon.icn_title} style={{ width: '25%', height: 25, marginTop: 20 }} resizeMode='contain' />
                        <ScaleSlideAnim type={'timing'} duration={350}>
                            <Text style={[styles.textHead]}>{this.props.title}</Text>
                        </ScaleSlideAnim>
                        <View>
                            <ScaleSlideAnim>
                                <View style={styles.rows}>
                                    <Icon name={'question'} size={20} color={'rgb(166, 168, 171)'} style={styles.icon} />
                                    <Text style={styles.textInfo}>  Số câu hỏi {this.props.totalAgain || 0}</Text>
                                </View>
                                <View style={styles.rows}>
                                    <Icon name={'clock-o'} size={20} color={'rgb(166, 168, 171)'} style={styles.icon} />
                                    <Text style={styles.textInfo}>Thời gian làm bài {this.props.duration} phút</Text>
                                </View>
                            </ScaleSlideAnim>
                        </View>
                        <SlideInBottom>
                            {(status == 0) &&
                                <View style={styles.wrapBtnZone} >
                                    <View style={styles.wrapButton}>
                                        <RippleButton style={styles.btnInside} onPress={() => this.props.handleExamAction(this.props.testInfo)} >
                                            <Text style={styles.textInside}>Bắt Đầu Kiểm Tra</Text>
                                        </RippleButton>
                                        {/* <ButtomCustomeSmall width={160} title={'Bắt đầu kiểm tra'} onPress={() => this.props.handleExamAction(this.props.testInfo)} /> */}
                                    </View>
                                </View>
                            }
                            {(status == 1) &&
                                <View style={styles.wrapBtnZone} >
                                    <View style={styles.wrapButton}>
                                        <RippleButton style={styles.btnInside} onPress={() => this.props.handleExamAction(this.props.testInfo)} >
                                            <Text style={styles.textInside}>Tiếp Tục Kiểm Tra</Text>
                                        </RippleButton>
                                        {/* <ButtomCustomeSmall width={160} title={'Tiếp tục kiểm tra'} onPress={() => this.props.handleExamAction(this.props.testInfo)} /> */}
                                    </View>
                                </View>
                            }
                            {(status == 2) &&
                                <View style={styles.wrapBtnZone} >
                                    <View style={styles.wrapButton}>
                                        {/* <ButtomCustomeSmall
                                        width={160} bgColor={'rgb(0, 173, 248)'}
                                        onPress={() => this.props.handleResultAction()} title={'Xem tổng hợp'} icon={'bar-chart'} />
                                    <View style={styles.divider}></View>
                                    <ButtomCustomeSmall width={160} title={'Làm lại kiểm tra'} onPress={() => this.props.handleExamAction(this.props.testInfo)} /> */}
                                        <RippleButton style={styles.btnInside} onPress={() => this.props.handleResultAction(this.props.testInfo)} >
                                            <Text style={styles.textInside}>Xem Tổng Hợp</Text>
                                        </RippleButton>
                                    </View>
                                    <View style={styles.wrapButton}>
                                        <RippleButton style={styles.btnInside} onPress={() => this.props.handleExamAction(this.props.testInfo)} >
                                            <Text style={styles.textInside}>Làm Lại Kiểm Tra</Text>
                                        </RippleButton>
                                    </View>
                                </View>
                            }
                        </SlideInBottom>
                    </View>
                </PopUp>
            </View >
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
        width: width * 0.65,
        height: height * 0.57,
        // backgroundColor: '#fff',
        borderRadius: 12,
        alignSelf: 'center'

    },
    wrapBtnZone: {
        flexDirection: 'row', justifyContent: 'center', marginTop: 20
    },
    textInside: {
        color: 'rgb(255, 237, 54)',
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
    },
    btnInside: {
        width: 170,
        height: 33,
        backgroundColor: 'rgb(0, 88, 189)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
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
        flex: 1, paddingHorizontal: 20, alignItems: 'center'
    },
    textHead: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        marginTop: 20,
        marginBottom: 10
    },
    rows: {
        flexDirection: 'row'
    },
    iconApple: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginHorizontal: 5
    },
    wrapButton: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgb(0, 88, 189)',
        borderRadius: 10,
        backgroundColor: '#fff',
        width: 175,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center'
    },
    divider: {
        width: 10
    },
    icon: {
        alignSelf: 'center',
        marginRight: 20,
    },
    textInfo: {
        marginVertical: 5,
        marginLeft: 10,
        fontSize: 13,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(166, 168, 171)',
    }
});