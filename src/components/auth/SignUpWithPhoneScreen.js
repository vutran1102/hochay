import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableOpacity, Dimensions, KeyboardAvoidingView, ImageBackground, TouchableWithoutFeedback, Image } from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DotIndicator } from 'react-native-indicators';
import jwtDecode from 'jwt-decode';
import RNAccountKit, { LoginButton } from 'react-native-facebook-account-kit';
import { InputPlatform } from '../common/FormInput';
import InputKeyBoard from '../common/InputKeyboard';
import FormMath from '../common/FormMath';
import AppIcon from '../../utils/AppIcon';
import { Button, ButtonInfo } from '../common/Button';
import HeaderNavigation from '../common/HeaderNavigation';
import { main } from '../../themes/index';
import Common from '../../utils/Common';
import authService from '../../services/authService';
import Helper from '../../utils/Helpers';
import RippleButton from '../common/RippleButton';
import PopUp from '../common/PopUp';
import { HeaderWithBg } from '../modals/Header';
const ACCOUNTKIT = 'ACCOUNTKIT';

let { width, height } = Dimensions.get('window');
let s = width;
if(width < height) {
    width = height;
    height = s;
}

export default class SignUpWithPhoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            phoneNumber: '',
            password: '',
            repassword: '',
            errors: '',
            visibleKeyboard: false
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide.bind(this),
        );
    }

    signUpAction() {
        const { displayName, email, password, rememberMe, repassword } = this.state;

        // this.props.navigation.navigate('SignUpAPI', { code:'', displayName:'', email, phoneNumber:'', password });

        const phone = this.state.phoneNumber;
        if (displayName == '') {
            this.setState({ errors: 'Họ tên không được để trống' });
            return;
        }
        if (email == '') {
            this.setState({ errors: 'Email không được để trống' });
            return;
        }
        if (!this.validateEmail(email)) {
            this.setState({ errors: 'Email không hợp lệ' });
            return;
        }

        if (password == '') {
            this.setState({ errors: 'Mật khẩu không được để trống' });
            return;
        }

        if (repassword == '') {
            this.setState({ errors: 'Xác nhận mật khẩu không được để trống' });
            return;
        }

        if (password !== repassword) {
            this.setState({ errors: 'Mật khẩu và mật khẩu nhập lại không khớp !' });
            return;
        }
        if (password.length < 6) {
            this.setState({ errors: 'Mật khẩu ít nhất phải có 6 kí tự !' });
            return;
        }

        let phoneNumber = Common.convertPhoneNumber(phone);
        if (!Common.validatePhoneNumberV2(phoneNumber)) {
            this.setState({ errors: 'Vui lòng nhập đúng số điện thoại !' });
            return;
        }
        const type = 1;
        const token = "";
        this.signUpWithPhone(phoneNumber);
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleSignUpAPI() {
        this.setState({
            errors: ''
        });
        const { code } = this.state;
        const csrf = "";
        const displayName = "";
        const userToken = "";
        this.setState({ isRegistered: true });
        authService.registerPhone({
            code, phoneNumber, password, csrf, displayName, userToken, rememberMe
        }).then(response => {
            console.log(response);
            const { status } = response;
            this.setState({
                isRegistered: false
            });
            if (status == 200) {
                Helper.saveToken(response.access_token);
                Helper.saveUserPass(password);
                Helper.saveUserName(phoneNumber);
                this.onSuccess();
            } else {
                this.setState({ errors: response.message });
            }
        }).catch(err => console.log(err));
    }


    onSuccess(text) {
        this.props.navigation.navigate('SignIn');
    }

    goBack() {
        this.props.navigation.goBack();
    }

    _keyboardDidShow() {

    }

    /** 
     * Not required
    */
    _keyboardDidHide() {
        this.setState({
            visibleKeyboard: false
        });
    }


    /**
     * Not required
     * @param {*} text 
     */
    onChangeText(text) {
        const { indexInput } = this.state;
        switch (indexInput) {
            case 'displayname':
                this.setState({
                    displayName: text
                });
                break;
            case 'phonenumber':
                this.setState({
                    phoneNumber: text
                });
                break;
            case 'password':
                this.setState({
                    password: text
                });
                break;
            case 'repassword':
                this.setState({
                    repassword: text
                });
                break;
            case 'email':
                this.setState({
                    email: text
                });
                break;

            default:
                break;
        }

    }

    /**
     * Not required
     * @param {*} value 
     * @param {*} placeholder 
     * @param {*} indexInput 
     * @param {*} secureTextEntry 
     */
    showInputKeyboard(value, placeholder, indexInput, secureTextEntry, keyboardType) {
        this.setState({
            visibleKeyboard: true,
            textInput: value,
            secureTextEntry: secureTextEntry,
            indexInput: indexInput,
            placeholder: placeholder,
            keyboardType: keyboardType
        });
    }


    signUpWithPhone(phoneNumber) {
        RNAccountKit.configure({
            responseType: 'code',
            initialAuthState: '',
            initialPhoneCountryPrefix: '+84',
            initialPhoneNumber: phoneNumber,
            receiveSMS: true,
            defaultCountry: 'VN',
        });

        RNAccountKit.loginWithPhone()
            .then((res) => {
                if (!res) {
                    console.log('Login cancelled')
                } else {
                    console.log(res);
                    const code = res.code;
                    this.setState({ code: res.code, isVerify: true });
                    const { displayName, email, phoneNumber, password } = this.state;
                    this.props.navigation.navigate('SignUpAPI', { code, displayName, email, phoneNumber, password });
                }
            });
    }


    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.container}>
                <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%', alignItems: 'center' }} resizeMode='cover'>
                    <HeaderWithBg  >
                    </HeaderWithBg>
                    {/* <RippleButton onPress={() => this.goBack()} style={styles.backAround} size={50} color={'white'}>
                        <IconIon name={'md-arrow-back'} color={'white'} size={24} style={styles.icon} />
                    </RippleButton> */}
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', position: 'absolute' }}>
                        <RippleButton style={styles.backBtn} radius={20} onPress={() => { this.goBack() }}>
                            <Image source={AppIcon.icon_back} style={{ width: 30, height: 30 }} resizeMode='contain' />
                        </RippleButton>
                        <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: width * 0.42, height: height * 0.2, alignItems: 'center', zIndex: 2 }}>
                            <Image source={AppIcon.title_dangky} style={{ width: '40%', position: 'absolute', bottom: 4 }} resizeMode='contain' />
                        </ImageBackground>
                        <PopUp source={AppIcon.pop_up_1} style={styles.viewBorder} width={width * 0.83} height={height * 0.85}>
                            {!!this.state.errors && <Text style={main.authValidate}>{this.state.errors}</Text>}
                            <KeyboardAwareScrollView>
                                <InputPlatform
                                    width={350}
                                    onChangeText={text => this.setState({ displayName: text })}
                                    name={'user'}
                                    value={this.state.displayName}
                                    placeholder={'Họ Tên'}
                                    indexInput={'displayname'}
                                    onPress={this.showInputKeyboard.bind(this)}
                                />
                                <InputPlatform
                                    width={350}
                                    onChangeText={text => this.setState({ email: text })}
                                    name={'envelope-o'}
                                    value={this.state.email}
                                    placeholder={'Email'}
                                    indexInput={'email'}
                                    onPress={this.showInputKeyboard.bind(this)}
                                />
                                <InputPlatform
                                    width={350}
                                    onChangeText={text => this.setState({ phoneNumber: text })}
                                    name={'phone'}
                                    value={this.state.phoneNumber}
                                    placeholder={'Điện thoại'}
                                    keyboardType={'phone-pad'}
                                    indexInput={'phonenumber'}
                                    onPress={this.showInputKeyboard.bind(this)}
                                />
                                <InputPlatform
                                    width={350}
                                    onChangeText={text => this.setState({ password: text })}
                                    name={'lock'}
                                    value={this.state.password}
                                    placeholder={'Mật khẩu'}
                                    secureTextEntry
                                    indexInput={'password'}
                                    onPress={this.showInputKeyboard.bind(this)}
                                />
                                <InputPlatform
                                    width={350}
                                    onChangeText={text => this.setState({ repassword: text })}
                                    name={'lock'}
                                    value={this.state.repassword}
                                    placeholder={'Nhập lại mật khẩu'}
                                    secureTextEntry
                                    indexInput={'repassword'}
                                    onPress={this.showInputKeyboard.bind(this)}
                                />
                                <RippleButton style={styles.buttonInfo} size={40} color={'white'} onPress={() => this.signUpAction()}>
                                    {/* <Text style={styles.textButton}>Đồng ý</Text> */}
                                    <Image source={AppIcon.btn_dangky} resizeMode='contain' style={{ width: 145, height: 38 }} />
                                </RippleButton>
                            </KeyboardAwareScrollView>
                            <Image source={AppIcon.mascot_2} style={{ position: 'absolute', height: height * 0.5, width: 200, right: - 80, bottom: - 10 }} resizeMode='contain' />
                            <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 50, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                        </PopUp>
                        {
                            this.state.visibleKeyboard &&
                            <InputKeyBoard
                                secureTextEntry={this.state.secureTextEntry}
                                placeholder={this.state.placeholder}
                                textInput={this.state.textInput}
                                keyboardType={this.state.keyboardType}
                                onChangeText={this.onChangeText.bind(this)}
                                ref='inputkeyboard'
                                onPress={this._keyboardDidHide.bind(this)}
                            />
                        }
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
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
    buttonInfo: {
        marginTop: 10,
        width: 140,
        height: 35,
        borderRadius: 30,
        // backgroundColor: '#007ACC',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    viewBorder: {
        // borderRadius: 20,
        // width: width * 0.83,
        // height: height * 0.83,
        // paddingTop: 20
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        paddingTop: 35,
        alignSelf: 'center'
    },
    textButton: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Roboto-Bold'
    },
    icon: {
        alignSelf: 'center'
    },
    backBtn: {
        width: 30, height: 30,
        left: 20, top: 20,
        position: 'absolute',
        zIndex: 9
    },
});