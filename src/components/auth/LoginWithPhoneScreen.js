import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard, NetInfo, TouchableOpacity, StatusBar, TouchableWithoutFeedback, KeyboardAvoidingView, ImageBackground, TextInput, Image } from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation';
import { DotIndicator } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/FontAwesome';
import jwtDecode from 'jwt-decode';
import RippleButton from '../common/RippleButton';
import HeaderNavigation from '../common/HeaderNavigation';
import FormInput from '../common/FormInput';
import FormMath from '../common/FormMath';
import { Button } from '../common/Button';
import { main } from '../../themes/index';
import Common from '../../utils/Common';
import AppIcon from '../../utils/AppIcon';
import authService from '../../services/authService';
import Helper from '../../utils/Helpers';
import global from '../../utils/Globals';
const ACCOUNTKIT = 'ACCOUNTKIT';

export default class LoginWithPhoneScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            passWord: '',
            errors: '',
            rememberMe: false,
            isLoging: false,
        }
        global.updateRemember = this.update.bind(this);
        global.onSignIn = this.onSignIn.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getRememberPhoneAndPass();
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
            this.setState({ phoneNumber: token, errors: '' });
            if (token !== '' && token !== null) this.setState({ rememberMe: true });
        }).catch(err => console.log('LOI CHECK LOGIN', err));

        Helper.getUserPass().then(token => {
            this.setState({ passWord: token });
        }).catch(err => console.log('LOI CHECK LOGIN', err));
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
        // if (!Common.validatePhoneNumberOld(phone)) {
        //     this.setState({ errors: 'Vui lòng nhập đúng số điện thoại !' });
        //     return;
        // }
        if (password.trim().length <= 0) {
            this.setState({ errors: 'Mật khẩu không được để trống !' });
            return;
        }
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
                                    this.setState({ isLoging: true, errors: '' });
                                    this.onSuccess(response.access_token);
                                } else {
                                    this.myTimeErr = setTimeout(() => {
                                        this.setState({ isLoging: false, errors: 'Tên tài khoản hoặc mật khẩu không đúng !' });
                                        this.clearTimeError();
                                    }, 2000);
                                }
                            } else {
                                this.myTimeErr = setTimeout(() => {
                                    this.setState({ isLoging: false, errors: '' });
                                    // this.refs.toast.show('Đăng nhập thất bại !', 3000);
                                    this.clearTimeError();
                                }, 2000);
                            }
                        });
                });
            } else {
                this.setState({ isLoging: false, errors: '' });
                // this.refs.toast.show('Không có kết nối internet', DURATION.LENGTH_LONG);
            }
        });
    }

    onSuccess(token) {
        const { Role } = jwtDecode(token);
        if (Role == 'PARENT') {
            authService.getListSubUser({ token }).then(response => {
                if (response !== "") {
                    const len = Object.keys(response).length;
                    if (len > 0) {
                        const userId = response[0].userId;
                        const userName = response[0].userName;
                        this.props.navigation.navigate({ routeName: 'App', key: 'AppId', params: { userId, userName } });
                        // this.props.navigation.navigate({ routeName: 'CreateKids', key: 'CreateKidsId' });
                    } else {
                        this.props.navigation.navigate({ routeName: 'CreateKids', key: 'CreateKidsId' });
                    }
                }
            });
        } else {
            this.props.navigation.navigate({ routeName: 'App', key: 'AppId' });
        }
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

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.container}>
                <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <RippleButton onPress={() => this.goBack()} style={styles.backAround} size={150} color={'white'}>
                        <IconIon name={'md-arrow-back'} color={'white'} size={24} style={styles.icon} />
                    </RippleButton> */}
                    <ImageBackground source={AppIcon.background_border} style={{ width: 300, height: 300, paddingTop: 20 }}>
                        <Text style={main.authValidate}>{this.state.errors}</Text>
                            <FormMath
                                placeholder={'Điện thoại'}
                                value={this.state.phoneNumber}
                                onChangeText={text => this.setState({ phoneNumber: text })}
                                secureTextEntry={false}
                            />
                            <FormMath
                                placeholder={'Mật khẩu'}
                                value={this.state.passWord}
                                onChangeText={text => this.setState({ passWord: text })}
                                onSubmitEditing={Keyboard.dismiss}
                                secureTextEntry={true}
                            />
                        <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                            <TouchableOpacity onPress={() => this.handleRemember()}>
                                {this.state.rememberMe ?
                                    <View style={styles.viewIconCheck}>
                                        <Image source={AppIcon.icon_checked} style={styles.iconCheck} />
                                    </View>
                                    : <View style={styles.viewIconCheck} />
                                }
                            </TouchableOpacity>
                            <Text style={styles.textRemember}>Ghi nhớ đăng nhập</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate({ routeName: 'Forgot', key: 'ForgotId' })}>
                                <Text style={styles.textFogot}>Quên mật khẩu</Text>
                            </TouchableOpacity>
                        </View>

                        {!this.state.isLoging ?
                            <RippleButton style={styles.buttonInfo} size={150} color={'white'} onPress={() => this.loginAction()}>
                                <Text style={styles.textButton}>Đăng nhập</Text>
                            </RippleButton>
                            :
                            <View style={{ height: 40, marginTop: 8 }}>
                                <DotIndicator color={'#8BC53F'} size={6} count={8} />
                            </View>
                        }

                        <TouchableOpacity onPress={() => this.props.navigation.navigate({ routeName: 'SignUp', key: 'SignUpId' })}>
                            <Text style={styles.textReg}>Đăng kí</Text>
                        </TouchableOpacity>
                        <Text style={styles.textOr}>Hoặc đăng nhập bằng</Text>
                        <View style={styles.viewIcon}>
                            <Image source={AppIcon.icon_facebook} style={styles.icon} />
                            <Image source={AppIcon.icon_google} style={styles.icon} />
                        </View>
                    </ImageBackground>
                </ImageBackground>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 13,
        flex: 1,
        fontFamily: 'Roboto-Medium',
        color: 'rgb(166, 168, 171)'
    },
    textFogot: {
        fontSize: 13,
        fontStyle: 'italic',
        fontFamily: 'Roboto-MediumItalic',
        color: 'rgb(166, 168, 171)'
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
    textReg: {
        marginTop: 5,
        fontSize: 13,
        fontFamily: 'Roboto-Bold',
        alignSelf: 'center',
        color: 'rgb(38, 135, 218)'
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
        width: 20, height: 20,
        borderRadius: 10, backgroundColor: 'rgb(166, 168, 171)',
        justifyContent: 'center', alignItems: 'center'
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