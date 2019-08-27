import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard, NetInfo, TouchableOpacity, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, ImageBackground, Dimensions, Image } from 'react-native';
import { Form, Field } from 'react-native-validate-form';
import { DotIndicator } from 'react-native-indicators';
import jwtDecode from 'jwt-decode';
import RippleButton from '../common/RippleButton';
import { InputPlatform } from '../common/FormInput';
import { main } from '../../themes/index';
import Common from '../../utils/Common';
import AppIcon from '../../utils/AppIcon';
import authService from '../../services/authService';
import Helper from '../../utils/Helpers';
import global from '../../utils/Globals';
import { required, validPhone } from '../../utils/Validation';
import InputKeyBoard from '../common/InputKeyboard';
import { HeaderWithBg } from '../modals/Header';

const ACCOUNTKIT = 'ACCOUNTKIT';

let { width, height } = Dimensions.get('window');
let s;
if(height > width) {
    width = height;
    height = s;
}
export default class LoginAllScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            passWord: '',
            errorsResult: '',
            textInput: '',
            indexInput: '',
            placeholder: '',
            errors: [],
            rememberMe: false,
            isLoging: false,
            visibleKeyboard: false,
            secureTextEntry: '',
        }
        global.updateRemember = this.update.bind(this);
        global.onSignIn = this.onSignIn.bind(this);
    }

    componentWillMount() {
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
        this.getRememberPhoneAndPass();
        width = Dimensions.get('window').width;
        height = Dimensions.get('window').height;
        if(width < height) {
            let s = width;
            width = height;
            height = s;
        }
    }

    onSignIn({ phoneNumber, password }) {
        this.setState({
            phoneNumber,
            passWord: password
        }, () => {
            this.loginAction();
        });
    }

    update() {
        this.getRememberPhoneAndPass();
    }

    getRememberPhoneAndPass() {
        Helper.getUserName().then(token => {
            this.setState({ phoneNumber: token, errorsResult: '' });
            if (token !== '' && token !== null) this.setState({ rememberMe: true });
        }).catch(err => console.log('LOI CHECK LOGIN', err));

        Helper.getUserPass().then(token => {
            this.setState({ passWord: token });
        }).catch(err => console.log('LOI CHECK LOGIN', err));
    }


    submitForm() {
        let submitResults = this.myForm.validate();

        let errors = [];

        submitResults.forEach(item => {
            if (item.error != '') {
                errors.push({ field: item.fieldName, error: item.error });
            }
        });

        this.setState({ errors: errors }, () => {
            console.log(this.state.errors);
        });
    }

    submitSuccess() {
        console.log("Submit Success!");
        this.setState({ errors: [] })
        this.loginAction();
    }

    submitFailed() {
        console.log("Submit Faield!");
    }


    _keyboardDidShow() {

    }

    _keyboardDidHide() {
        this.setState({
            visibleKeyboard: false
        });
    }

    loginHochay() {
        Keyboard.dismiss();
    }

    loginAction() {
        Keyboard.dismiss();
        const phone = this.state.phoneNumber;
        const password = this.state.passWord;
        const loginType = ACCOUNTKIT;
        const rememberMe = this.state.rememberMe;
        const socialId = "";
        const socialToken = "";
        const socialType = "ACCOUNTKIT";
        const phoneNumber = Common.convertPhoneOldToNew(phone);
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type !== 'none') {
                this.setState({ isLoging: true }, () => {
                    authService.postLoginPhone({ phoneNumber, loginType, password, rememberMe, socialId, socialToken, socialType }).
                        then(response => {
                            console.log(response);
                            if (response !== "") {
                                const { status } = response;
                                if (status == 200) {
                                    Helper.saveToken(response.access_token);
                                    Helper.saveTokenParent(response.access_token);
                                    if (response.avatar != null) {
                                        Helper.saveAvatar(response.avatar);
                                    }
                                    if (rememberMe) {
                                        Helper.saveUserName(phoneNumber);
                                        Helper.saveUserPass(password);
                                    } else {
                                        Helper.saveUserName('');
                                        Helper.saveUserPass('');
                                    }
                                    Helper.saveUserPost(JSON.stringify(
                                        { phoneNumber, password, loginType, rememberMe, socialType, socialId, socialToken }));
                                    this.setState({ isLoging: true, errorsResult: '' });
                                    this.onSuccess(response.access_token);
                                } else {
                                    this.myTimeErr = setTimeout(() => {
                                        this.setState({ isLoging: false, errorsResult: 'Tên tài khoản hoặc mật khẩu không đúng !' });
                                        this.clearTimeError();
                                    }, 2000);
                                }
                            } else {
                                this.myTimeErr = setTimeout(() => {
                                    this.setState({ isLoging: false, errorsResult: '' });
                                    // this.refs.toast.show('Đăng nhập thất bại !', 3000);
                                    this.clearTimeError();
                                }, 2000);
                            }
                        });
                });
            } else {
                this.setState({ isLoging: false, errorsResult: '' });
                // this.refs.toast.show('Không có kết nối internet', DURATION.LENGTH_LONG);
            }
        });
    }

    onSuccess(token) {
        this.props.navigation.navigate({ routeName: 'App', key: 'AppId' });
    }

    handleRemember() {
        this.setState({ rememberMe: !this.state.rememberMe })
    }


    goBack() {
        this.props.navigation.goBack();
    }


    clearTimeError() {
        if (this.myTimeErr) {
            clearTimeout(this.myTimeErr);
            this.myTimeErr = null;
        }
    }

    onChangeText(text) {
        const { indexInput } = this.state;
        console.log(indexInput);
        switch (indexInput) {
            case 0:
                this.setState({
                    phoneNumber: text
                });
                break;
            case 1:
                this.setState({
                    passWord: text
                });
                break;
            default:
                break;
        }

    }

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

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render() {
        let widtdScreen = width;
        let heightScreen = height;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.container}>
                <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%', alignItems: 'center' }} resizeMode='cover'>
                    <HeaderWithBg />
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', position:'absolute' }}>
                        <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: widtdScreen * 0.42, height: heightScreen * 0.2, alignItems:'center' }}>
                            <Image source={AppIcon.title_dangnhap} style={{width: '50%', position:'absolute', bottom: -5}} resizeMode='contain'/>
                        </ImageBackground>
                        <ImageBackground source={AppIcon.pop_up_1} style={{ width: widtdScreen * 0.6, height: heightScreen * 0.7, paddingTop: 10, marginTop: 20 }} resizeMode='stretch'>
                            {!!this.state.errorsResult && <Text style={main.authValidate}>{this.state.errorsResult}</Text>}
                            {Object.keys(this.state.errors).length > 0 &&
                                <Text style={main.authValidate}>{this.state.errors[0].field} {this.state.errors[0].error}</Text>
                            }
                            <Form
                                ref={(ref) => this.myForm = ref}
                                validate={true}
                                submit={this.submitSuccess.bind(this)}
                                failed={this.submitFailed.bind(this)}
                                errors={this.state.errors}
                            >
                                <Field
                                    required
                                    component={InputPlatform}
                                    validations={[required, validPhone]}
                                    onPress={this.showInputKeyboard.bind(this)}
                                    keyboardType={'phone-pad'}
                                    indexInput={0}
                                    name="Tên đăng nhập"
                                    placeholder={'Tên đăng nhập'}
                                    value={this.state.phoneNumber}
                                    onChangeText={(val) => this.setState({ phoneNumber: val })}
                                />
                                <Field
                                    required
                                    component={InputPlatform}
                                    validations={[required]}
                                    indexInput={1}
                                    name="Mật khẩu"
                                    placeholder={'Mật khẩu'}
                                    onPress={this.showInputKeyboard.bind(this)}
                                    value={this.state.passWord}
                                    secureTextEntry={true}
                                    onSubmitEditing={Keyboard.dismiss}
                                    onChangeText={(val) => this.setState({ passWord: val })}
                                />
                            </Form>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 80 }}>
                                <TouchableOpacity onPress={() => this.handleRemember()}>
                                    {this.state.rememberMe ?
                                        <View style={styles.viewIconCheck}>
                                            {/* <Image source={AppIcon.icon_checked} style={styles.iconCheck} /> */}
                                            <View style={styles.dot} />
                                        </View>
                                        : <View style={styles.viewIconCheck} />
                                    }
                                </TouchableOpacity>
                                <Text style={styles.textRemember}>Duy trì đăng nhập</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate({ routeName: 'Forgot', key: 'ForgotId' })}>
                                    <Text style={styles.textFogot}>Quên mật khẩu?</Text>
                                </TouchableOpacity>
                            </View>

                            {!this.state.isLoging ?
                                <RippleButton style={styles.buttonInfo} size={150} color={'white'} onPress={this.submitForm.bind(this)}>
                                    {/* <Text style={styles.textButton}>Đăng nhập</Text> */}
                                    <Image source={AppIcon.btn_dangnhap} style={{ width: 160, height: 30 }} resizeMode='contain' />
                                </RippleButton>
                                :
                                <View style={{ height: 40, marginTop: 8 }}>
                                    <DotIndicator color={'#8BC53F'} size={6} count={8} />
                                </View>
                            }
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                                <View style={{ width: 40, height: 1, borderWidth: 0.3, borderColor: 'black' }}></View>
                                <Text style={styles.textLoginBy}> Hoặc đăng nhập bằng </Text>
                                <View style={{ width: 40, height: 1, borderWidth: 0.3, borderColor: 'black' }}></View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                                <RippleButton style={styles.buttonLoginAnother} size={25} >
                                    <Image source={AppIcon.fb_icon} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </RippleButton>
                                <RippleButton style={styles.buttonLoginAnother} size={25}>
                                    <Image source={AppIcon.g_icon} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                </RippleButton>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                                <Text style={styles.textDontHaveAcc}>Bạn chưa có tài khoản?</Text>
                                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => {
                                    this.state.isLoging ? null : this.props.navigation.navigate({ routeName: 'SignUp', key: 'SignUpId' });
                                }}>
                                    <Text style={styles.textReg}>Đăng kí ngay!</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <Text style={styles.textOr}>Hoặc đăng nhập bằng</Text>
                        <View style={styles.viewIcon}>
                            <Image source={AppIcon.icon_facebook} style={styles.icon} />
                            <Image source={AppIcon.icon_google} style={styles.icon} />
                        </View> */}
                            <Image source={AppIcon.mascot_1} style={{position: 'absolute', height: height* 0.5, width: 200, right: - 100, bottom: - 10}} resizeMode='contain'/>
                            <Image source={AppIcon.icon_book} style={{position: 'absolute', height: 71, width: 65, left: -40, bottom: - 10}} resizeMode='contain'/>
                            <Image source={AppIcon.girl_child} style={{position: 'absolute', height: 140, width: 95, left: - 63, bottom: 25, zIndex: -1}} resizeMode='contain'/>
                        </ImageBackground>
                        {this.state.visibleKeyboard &&
                            <InputKeyBoard
                                secureTextEntry={this.state.secureTextEntry}
                                placeholder={this.state.placeholder}
                                textInput={this.state.textInput}
                                onChangeText={this.onChangeText.bind(this)}
                                ref='inputkeyboard'
                                keyboardType={this.state.keyboardType}
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
    },
    textDontHaveAcc: {
        fontSize: 8
    },
    contents: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewDotIndicator: {
        height: 30
    },
    viewRemmember: {
        paddingVertical: 10,
        flexDirection: 'row'
    },
    backAround: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 1
    },
    textLoginBy: {
        fontFamily: 'Roboto-Medium',
        fontSize: 8,
    },
    wrapButtonRemember: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#f8f8f8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        borderRadius: 5,
    },
    textLink: {
        color: '#fff'
    },
    textRemember: {
        fontSize: 8,
        flex: 1,
        fontFamily: 'Roboto-Medium',
        color: 'rgb(0, 77, 166)'
    },
    dot: {
        backgroundColor: 'rgb(0, 77, 166)',
        width: 3, height: 3,
        borderRadius: 1.5,
    },
    textFogot: {
        fontSize: 8,
        // fontStyle: 'italic',
        fontFamily: 'Roboto-Medium',
        color: 'rgb(0, 77, 166)'
    },
    buttonInfo: {
        marginTop: 10,
        width: 160,
        height: 35,
        // borderRadius: 30,
        // marginHorizontal: 80,
        // backgroundColor: '#rgb(139, 197, 63)',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    buttonLoginAnother: {
        width: 25, height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    textButton: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Roboto-Bold'
    },
    textReg: {
        marginTop: 5,
        fontSize: 8,
        fontFamily: 'Roboto-Bold',
        alignSelf: 'center',
        color: 'rgb(38, 135, 218)',
        top: - 2,
        marginLeft: 3
    },
    textOr: {
        fontSize: 13,
        fontWeight: 'bold',
        alignSelf: 'center',
        fontFamily: 'Roboto-Medium',
        color: 'rgb(166, 168, 171)'
    },
    viewIcon: {
        marginTop: 5,
        width: 100,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    viewIconCheck: {
        marginRight: 5,
        width: 10, height: 10,
        borderRadius: 5, backgroundColor: 'white',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'rgb(38, 135, 218)'
    },
    iconCheck: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    icon: {
        width: 40,
        height: 40
    }
});