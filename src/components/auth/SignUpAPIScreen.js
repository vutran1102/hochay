import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Keyboard, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Dimensions } from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ChonseSelect } from 'react-native-chonse-select';
import { DotIndicator } from 'react-native-indicators';
import jwtDecode from 'jwt-decode';
import RNAccountKit, { LoginButton } from 'react-native-facebook-account-kit';
import FormInput from '../common/FormInput';
import { InputPlatform } from '../common/FormInput';
import InputKeyBoard from '../common/InputKeyboard';
import FormDate from '../common/FormDate';
import AppIcon from '../../utils/AppIcon';
import { Button, ButtonInfo } from '../common/Button';
import { main } from '../../themes/index';
import Common from '../../utils/Common';
import authService from '../../services/authService';
import Helper from '../../utils/Helpers';
import { dataParent } from '../../utils/DataTest';
import RippleButton from '../common/RippleButton';
import PopUp from '../common/PopUp';
import { HeaderWithBg } from '../modals/Header';
import FormDropdown from '../common/FormDropdown';

const ACCOUNTKIT = 'ACCOUNTKIT';
const { width, height } = Dimensions.get('window');

var radio_props = [
    { label: 'Mẹ', value: 0 },
    { label: 'Cha', value: 1 }
];

export default class SignUpAPISceen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            gender: 'NU',
            phoneNumber: '',
            code: '',
            birthday: 'Ngày sinh',
            password: '',
            isDateTimePickerVisible: false,
            visibleKeyboard: false
        }
    }

    componentDidMount() {
        const { displayName, phoneNumber, code, email, password } = this.props.navigation.state.params;
        // const displayName = 'dsadsa';
        // const phoneNumber = '0367851356';
        // const code = '477cx77d7s';
        // const email = 'bienson2@gmail.com';
        // const password = '123123';
        this.setState({
            displayName: displayName,
            phoneNumber: phoneNumber,
            code: code,
            email: email,
            password: password
        });

        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide.bind(this),
        );
    }

    setGender(gender) {
        this.setState({ gender });
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleSignUpAPI() {
        const { code, phoneNumber, password, displayName, email } = this.props.navigation.state.params;
        const { gender, birthday } = this.state;
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
        if (birthday == '') {
            this.setState({ errors: 'Ngày sinh không được để trống' });
            return;
        }

        this.setState({
            errors: ''
        });
        console.log("gender: ", gender);
        this.setState({ isRegistered: true }, () => {
            authService.postRegisterAccountKit({
                displayName, phoneNumber, password, email, code, gender: gender, birthday
            }).then(response => {
                console.log(response);
                const { status } = response;
                this.setState({
                    isRegistered: false
                });
                if (status == 200) {
                    Helper.saveToken(response.access_token);
                    Helper.saveTokenParent(response.access_token);
                    Helper.saveUserPass(password);
                    Helper.saveUserName(phoneNumber);
                    // this.onSuccess(phoneNumber, password);
                    this.props.navigation.navigate({ routeName: 'App', key: 'AppId' });
                } else if (status == 302) {
                    this.setState({ errors: response.message });
                    // this.props.navigation.navigate('CreateKids', { phoneNumber, password });
                } else {
                    this.setState({ errors: response.message });
                }
            }).catch(err => {
                console.log(err);
            });
        });

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
     * override
         * Not required
         * @param {*} text 
         */
    onChangeText(text) {
        console.log("text input: ", text);
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

    // onSuccess(phoneNumber, password) {
    //     this.props.navigation.navigate({ routeName: 'CreateKids', key: 'CreateKidsId', params: { phoneNumber, password } });
    // }

    goBack() {
        this.props.navigation.goBack();
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = (d) => {
        console.log('A date has been picked: ', d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear());
        let month = d.getMonth() + 1;
        let date = d.getDate();
        if (month < 10) {
            month = `0${month}`;
        }
        if (date < 10) {
            date = `0${date}`;
        }
        this.setState({ birthday: d.getFullYear() + '-' + (month) + '-' + date });
        this.hideDateTimePicker();
    };

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onValueChange(value) {
        console.log("value: ", value);
        this.setState({ gender: value });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.container}>
                <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }}>
                    <HeaderWithBg />
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', position: 'absolute' }}>
                        <RippleButton style={styles.backBtn} radius={20} onPress={() => { this.goBack() }}>
                            <Image source={AppIcon.icon_back} style={{ width: 30, height: 30 }} resizeMode='contain' />
                        </RippleButton>
                        {/* <RippleButton onPress={() => this.goBack()} style={styles.backAround} size={150} color={'white'}>
                            <IconIon name={'md-arrow-back'} color={'white'} size={24} style={styles.icon} />
                        </RippleButton> */}
                        <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: width * 0.42, height: height * 0.2, alignItems: 'center', zIndex: 2 }}>
                            <Image source={AppIcon.title_phuhuynh} style={{ width: '40%', position: 'absolute', bottom: 0 }} resizeMode='contain' />
                        </ImageBackground>
                        <PopUp source={AppIcon.pop_up_1} style={styles.viewBorder} width={width * 0.83} height={height * 0.85}>
                            <Text style={main.authValidate}>{this.state.errors}</Text>
                            <KeyboardAwareScrollView>
                                <InputPlatform
                                    width={370}
                                    onChangeText={text => this.setState({ displayName: text })}
                                    name={'user'}
                                    onPress={this.showInputKeyboard.bind(this)}
                                    indexInput={'displayname'}
                                    value={this.state.displayName}
                                    placeholder={'Họ Tên'}
                                />
                                <FormDropdown
                                    // height={35}
                                    // style={{ marginLeft: 20, marginBottom: 10 }}
                                    data={dataParent}
                                    value={this.state.gender}
                                    // textStyle={{ fontFamily: 'Roboto-MediumItalic', fontSize: 12 }}
                                    onChangeText={(item) => this.onValueChange(item)}
                                />

                                <View style={{ marginLeft: 10 }}>
                                    <FormDate
                                        width={370}
                                        icon={AppIcon.icon_calender}
                                        value={this.state.birthday}
                                        name={'birthday-cake'}
                                        onPress={() => {
                                            this.showDateTimePicker()
                                        }}
                                    />
                                </View>
                                <InputPlatform
                                    width={370}
                                    onChangeText={text => this.setState({ email: text })}
                                    name={'envelope-o'}
                                    value={this.state.email}
                                    onPress={this.showInputKeyboard.bind(this)}
                                    indexInput={'email'}
                                    placeholder={'Email'}
                                />
                                <InputPlatform
                                    width={370}
                                    disabled={true}
                                    onChangeText={text => this.setState({ phoneNumber: text })}
                                    name={'phone'}
                                    onPress={this.showInputKeyboard.bind(this)}
                                    indexInput={'phonenumber'}
                                    value={this.state.phoneNumber}
                                    placeholder={'Điện thoại'}
                                    keyboardType={'phone-pad'}
                                />
                                {!this.state.isRegistered ?
                                    <RippleButton style={styles.buttonInfo} size={150} color={'white'} onPress={() => this.handleSignUpAPI()}>
                                        <Text style={styles.textButton}>Đồng ý</Text>
                                    </RippleButton>
                                    :
                                    <View style={{ height: 40, marginTop: 8 }}>
                                        <DotIndicator color={'#8BC53F'} size={6} count={8} />
                                    </View>
                                }
                            </KeyboardAwareScrollView>
                            <Image source={AppIcon.mascot_2} style={{ position: 'absolute', height: height * 0.5, width: 200, right: - 80, bottom: - 10 }} resizeMode='contain' />
                            <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 50, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                        </PopUp>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                        />
                        {
                            this.state.visibleKeyboard &&
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
    viewDotIndicator: {
        height: 30
    },
    backAround: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 1
    },
    buttonInfo: {
        marginTop: 10,
        width: 250,
        height: 35,
        borderRadius: 30,
        backgroundColor: '#007ACC',
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
    wrapGroupRadio: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    group: {
        marginLeft: 20,
        flexDirection: 'row'
    },
    circleRadioActive: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgb(230, 230, 230)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    heartActive: {
        width: 18,
        height: 18,
        borderRadius: 10,
        backgroundColor: '#007ACC',
        alignSelf: 'center'
    },
    textGender: {
        marginLeft: 10,
        fontFamily: 'Roboto-MediumItalic',
        fontSize: 13,
        alignSelf: 'center'
    },
    backBtn: {
        width: 30, height: 30,
        left: 20, top: 20,
        position: 'absolute',
        zIndex: 9
    },
});