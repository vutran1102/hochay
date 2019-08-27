import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Color from '../../constants/colors';
import { HeaderClose } from './Header';
import { main } from '../../themes/index';
import { ButtonInfo, ButtonCustome } from '../common/Button';
import AppIcon from '../../utils/AppIcon';
import { playSoundButton } from '../../utils/AudioUtils';
import RippleButton from '../common/RippleButton';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';
import PopUp from '../common/PopUp';
let { width, height } = Dimensions.get('window');
if (height > width) {
    let s = width;
    width = height;
    height = s;
}
export default class ConfirmSecurity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            textSecutity: ''
        }
    }

    hanleClick(num) {
        const text = this.state.textSecutity + num + "";
        if (text.trim().length <= 6) {
            this.setState({
                textSecutity: text
            });
        }
    }

    handleTextSecutity() {
        const text = this.state.textSecutity.substring(0, this.state.textSecutity.length - 1);
        this.setState({
            textSecutity: text
        });
    }

    setModalVisible(visible) {
        this.setState({
            textSecutity: '',
            modalVisible: visible
        });
        playSoundButton();
    }

    submit() {
        const codePin = this.state.textSecutity;
        const { userId, userName } = this.props;
        this.props.updateSubuser({ userId, userName, codePin });
    }

    render() {
        const { typeCodePin } = this.props;
        return (
            <View style={styles.viewAbsolute}>
                <ScaleSlideAnim>
                    <PopUp source={AppIcon.pop_up_3} width={width * 0.53} height={height * 0.7} style={{ alignItems: 'center', paddingTop: 20 }} close={() => this.props.closeCodePin(false)}>
                        <Image source={AppIcon.title_baomattaikhoan} resizeMode='contain' style={{ width: width * 0.3, height: 30 }} />
                        {/* <HeaderClose typeCodePin={typeCodePin} onPress={() => this.props.closeCodePin(false)} /> */}
                        {!this.props.errors ? <Text style={styles.textTitle}>Vui lòng nhập mã bảo mật của Phụ huynh</Text>
                            : <Text style={styles.errors}>{this.props.errors}</Text>}
                        <View style={styles.wrap}>
                            <View style={styles.wrapTextSecu}>
                                <Text
                                    style={[styles.textSecutity]}
                                    numberOfLines={1}
                                >
                                    {this.state.textSecutity}
                                </Text>
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            let temp = this.state.textSecutity.split('');
                                            temp.splice(temp.length - 1,1);
                                            console.log('====================================');
                                            console.log(temp);
                                            console.log('====================================');
                                            this.setState({
                                                textSecutity: temp.join('')
                                            })
                                        }
                                    }
                                >

                                    <Icon name={'delete'} size={20} style={{ alignSelf: 'center', marginRight: 10, }}></Icon>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.wrapNumbers}>
                                <View style={styles.row}>
                                    <RippleButton onPress={() => this.hanleClick(1)} size={40} style={styles.cols}><Text style={styles.textNumber}>1</Text></RippleButton>
                                    <RippleButton onPress={() => this.hanleClick(2)} size={40} style={styles.cols}><Text style={styles.textNumber}>2</Text></RippleButton>
                                    <RippleButton onPress={() => this.hanleClick(3)} size={40} style={styles.cols}><Text style={styles.textNumber}>3</Text></RippleButton>
                                    <RippleButton onPress={() => this.hanleClick(4)} size={40} style={styles.cols}><Text style={styles.textNumber}>4</Text></RippleButton>
                                    <RippleButton onPress={() => this.hanleClick(5)} size={40} style={styles.cols}><Text style={styles.textNumber}>5</Text></RippleButton>
                                </View>
                                <View style={[styles.row, { marginTop: 10 }]}>
                                    <RippleButton onPress={() => this.hanleClick(6)} size={40} style={styles.cols}><Text style={styles.textNumber}>6</Text></RippleButton>
                                    <RippleButton onPress={() => this.hanleClick(7)} size={40} style={styles.cols}><Text style={styles.textNumber}>7</Text></RippleButton>
                                    <RippleButton onPress={() => this.hanleClick(8)} size={40} style={styles.cols}><Text style={styles.textNumber}>8</Text></RippleButton>
                                    <RippleButton onPress={() => this.hanleClick(9)} size={40} style={styles.cols}><Text style={styles.textNumber}>9</Text></RippleButton>
                                    <RippleButton onPress={() => this.hanleClick(0)} size={40} style={styles.cols}><Text style={styles.textNumber}>0</Text></RippleButton>
                                </View>
                            </View>
                            <View style={styles.row}>
                                {/* <View style={styles.colB}>
                                    <View style={{ marginLeft: 25 }}></View>
                                </View> */}
                                <View style={{ marginLeft: 25 }}></View>
                                {/* <RippleButton onPress={() => this.handleTextSecutity(this.state.textSecutity)} size={40} style={styles.buttonX}>
                                    <Icon name='remove' size={16} color={'rgb(0 ,172, 248)'} />
                                </RippleButton> */}
                            </View>
                            {(this.state.textSecutity != '' && this.state.textSecutity.length > 2 && typeCodePin == 'confirm') &&
                                <RippleButton onPress={() => this.submit()} size={40} style={{ width: width * 0.18, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', height: 30, marginTop: 20 }}>
                                    <Image source={AppIcon.btn_dongy} resizeMode='contain' style={{ width: width * 0.18 }} />
                                </RippleButton>
                            }
                            {(this.state.textSecutity != '' && typeCodePin == 'add') &&
                                <RippleButton onPress={() => this.props.updateParent(this.state.textSecutity)} size={40} style={styles.buttonOk}>
                                    <Text style={styles.textOk}>Tạo mới</Text>
                                </RippleButton>
                            }
                        </View>
                    </PopUp>
                </ScaleSlideAnim>
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
        zIndex: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapNumbers: {
        borderRadius: 5,
        borderColor: 'rgb(245, 228, 148)',
        borderWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        marginTop: 10,

    },
    errors: {
        color: 'red',
        alignSelf: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        fontSize: 13,
        marginVertical: 5
    },
    container: {
        width: 400,
        height: 270,
        alignSelf: 'center',
        marginVertical: 50,
        borderRadius: 15,
        backgroundColor: 'rgb(0,172, 248)',
    },
    textTitle: {
        color: 'black',
        fontFamily: 'Roboto-Bold',
        fontSize: 11,
        alignSelf: 'center',
        marginTop: 5,
    },
    wrapTextSecu: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: '#fff',
        height: 25,
        width: 210,
        borderRadius: 8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgb(255, 160, 54)'
    },
    textSecutity: {
        position: 'absolute',
        right: 90,
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: 'black',
    },
    wrap: {
        top: 0,
        width: 210,
        height: 210,
        alignSelf: 'center',
    },
    row: {
        // marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cols: {
        width: 35,
        height: 35,
        borderWidth: 2,
        backgroundColor: '#FFA233',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderRadius: 3,
    },
    textNumber: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Roboto-Bold'
    },
    colB: {
        flexDirection: 'row'
    },
    buttonX: {
        backgroundColor: '#fff',
        borderRadius: 8,
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonOk: {
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textOk: {
        fontFamily: 'Roboto-Bold',
        color: 'rgb(0, 173, 248)'
    }
});