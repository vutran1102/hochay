import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import IconIon from 'react-native-vector-icons/Ionicons';
import jwtDecode from 'jwt-decode';
import RNAccountKit, { LoginButton } from 'react-native-facebook-account-kit';
import FormInput from '../common/FormInput';
import FormMath from '../common/FormMath';
import { Button } from '../common/Button';
import { main } from '../../themes/index';
import Common from '../../utils/Common';
import authService from '../../services/authService';
import AppIcon from '../../utils/AppIcon';
import Helper from '../../utils/Helpers';
import global from '../../utils/Globals';
import RippleButton from '../common/RippleButton';
import {HeaderWithBg} from '../modals/Header';
import PopUp from '../common/PopUp';

const ACCOUNTKIT = 'ACCOUNTKIT';

export default class SignUpWithPhoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            password: '',
            repassword: '',
            errors: '',
            code: ''
        }
    }

    verifyPhone() {
        const phone = this.state.phoneNumber;
        const phoneNumber = Common.convertPhoneNumber(phone);
        if (!Common.validatePhoneNumberOld(phoneNumber)) {
            this.setState({ errors: 'Bạn cần nhập đúng số điện thoại !' });
        }
        else {
            this.checkPhoneNumber(phoneNumber);
        }
    }

    checkPhoneNumber(phone) {
        let phoneNumber = Common.convertPhoneNumber(phone);
        const type = 1;
        const token = '';
        authService.checkPhoneNumber({ type, phoneNumber, token }).then(response => {
            if (response != '') {
                const { status } = response;
                if (status == 302) {
                    this.setState({ errors: '' });
                    this.loginWithPhone(phoneNumber);
                } else {
                    this.setState({ errors: 'Số điện thoại này chưa được đăng kí !' });
                    return;
                }
            }
        });
    }

    configureAccountKit(phoneNumber) {
        RNAccountKit.configure({
            responseType: 'code',
            initialAuthState: '',
            initialPhoneCountryPrefix: '+84',
            initialPhoneNumber: phoneNumber,
            readPhoneStateEnabled: true,
            receiveSMS: true,
            defaultCountry: 'VN',
        });
    }

    loginWithPhone(phoneNumber) {
        this.configureAccountKit(phoneNumber);
        RNAccountKit.loginWithPhone()
            .then((res) => {
                if (!res) {
                    console.log('Login cancelled')
                } else {
                    this.setState({
                        code: res.code,
                        isVerify: true
                    });
                }
            });
    }

    forgotAction() {
        const { password, repassword, code } = this.state;
        const phone = this.state.phoneNumber;
        const phoneNumber = Common.convertPhoneNumber(phone);
        if (password.trim().length <= 0) {
            this.setState({ errors: 'Mật khẩu không được để trống !' });
            return;
        }
        if (password.trim().length < 6) {
            this.setState({ errors: 'Mật khẩu phải chứa ít nhất 6 kí tự !' });
            return;
        }
        if (repassword.trim().length <= 0) {
            this.setState({ errors: 'Xác nhận mật khẩu không được để trống !' });
            return;
        }
        if (password != repassword) {
            this.setState({ errors: 'Nhập lại mật khẩu không khớp !' });
            return;
        }
        const passwordNew = password;
        this.setState({ errors: '', isLoading: true }, () => {
            authService.changePasswordAccountkit({ passwordNew, phoneNumber, code }).then(response => {
                const { status } = response;
                if (status == 200) {
                    this.setState({ isLoading: false });
                    Helper.saveUserName(phoneNumber);
                    Helper.saveUserPass(password);
                    global.updateRemember();
                    this.props.navigation.goBack();
                } else {
                    this.setState({ errors: response.message, isLoading: false });
                }
            }).catch(err => {
                this.setState({ isLoading: false });
            });
        });
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                    <HeaderWithBg back={()=> this.goBack()}/>
                    {/* <RippleButton onPress={() => this.goBack()} style={styles.backAround} size={50} color={'white'}>
                        <IconIon name={'md-arrow-back'} color={'white'} size={24} style={styles.icon} />
                    </RippleButton> */}
                    {!this.state.isVerify ?
                        <PopUp source={AppIcon.pop_up_2} style={{ width: 400, height: 250, paddingTop: 40, alignSelf: 'center', justifyContent:'center' }} resizeMode='contain'>
                            <Text style={main.authValidate}>{this.state.errors}</Text>
                            <FormMath
                                onChangeText={text => this.setState({ phoneNumber: text })}
                                name={'phone'}
                                value={this.state.phoneNumber}
                                placeholder={'Điện thoại'}
                                keyboardType={'phone-pad'}
                            />
                            <RippleButton style={styles.buttonInfo} size={150} color={'white'} onPress={() => this.verifyPhone()}>
                                <Text style={styles.textButton}>Quên mật khẩu</Text>
                            </RippleButton>
                        </PopUp>
                        :
                        <PopUp source={AppIcon.pop_up_2} style={{ width: 300, height: 300, paddingTop: 20, alignSelf: 'center' }} resizeMode='contain'>
                            <Text style={main.authValidate}>{this.state.errors}</Text>
                            <FormMath
                                secureTextEntry
                                onChangeText={text => this.setState({ password: text })}
                                name={'lock'}
                                value={this.state.password}
                                placeholder={'Mật khẩu'}
                            />

                            <FormMath
                                secureTextEntry
                                onChangeText={text => this.setState({ repassword: text })}
                                name={'lock'}
                                value={this.state.repassword}
                                placeholder={'Nhập lại mật khẩu'}
                            />
                            {!this.state.isLoading ?
                                <RippleButton style={styles.buttonInfo} size={150} color={'white'} onPress={() => this.forgotAction()}>
                                    <Text style={styles.textButton}>Tạo lại mật khẩu</Text>
                                </RippleButton>
                                :
                                <View style={styles.viewDotIndicator}>
                                    <DotIndicator color={'rgb(122, 199, 12)'} size={6} count={8} />
                                </View>
                            }
                        </PopUp>
                    }
                </ImageBackground>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 100,
        justifyContent: 'center',
        backgroundColor: '#293E5A'
    },
    viewDotIndicator: {
        height: 30
    },
    backAround: {
        width: 50,
        height: 50,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 10,
        top: 10,
        zIndex: 1
    },
    contents: {
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonInfo: {
        marginTop: 10,
        width: 250,
        height: 35,
        borderRadius: 30,
        backgroundColor: '#rgb(139, 197, 63)',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Roboto-Bold'
    },
});