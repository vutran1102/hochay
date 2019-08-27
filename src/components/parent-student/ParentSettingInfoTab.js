import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Keyboard, Image, Platform, TouchableHighlight, TextInput, StatusBar, ImageBackground } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import jwtDecode from 'jwt-decode';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FormDate from '../common/FormDate';
import authService from '../../services/authService';
import Helper from '../../utils/Helpers';
import AppIcon from '../../utils/AppIcon';
import LoadingScreen from '../common/LoadingScreen';
import RippleButton from '../common/RippleButton';
import Orientation from 'react-native-orientation';
import { Dropdown } from 'react-native-material-dropdown';
import InputKeyBoard from '../common/InputKeyboard';
import HeaderNavigation from '../common/HeaderNavigation';
import { NavigationActions } from 'react-navigation';
import { makeRequestProfileParentAction } from '../../actions/parentAction';
import { connect } from 'react-redux';
import BottomTabCustom from './BottomTabCustom';
import HeaderParent from '../parent-student/HeaderParent';
import ImagePickerCrop from 'react-native-image-crop-picker';
import { convertToBase64 } from '../../utils/Common';
import { updateAvatar } from '../../services/parentService';


const dataDropDown = [{
    value: 'NU',
    label: 'Mẹ'
}, {
    value: 'NAM',
    label: 'Ba'
}];

export default class ParentSettingTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            codePin: '',
            gender: 'NAM',
            birthday: '',
            isDateTimePickerVisible: false,
            isLoading: false,
            visibleKeyboard: false,
            phoneNumber: '',
            imageUri: '',
            imageBase64: '',
        }
        Orientation.lockToPortrait();
    }

    goBack() {
        this.props.navigation.dispatch(NavigationActions.back());
        Orientation.lockToLandscape();
    }
    cropPicker() {
        ImagePickerCrop.openPicker({
            width: 200,
            height: 200,
            cropping: true
        }).then(image => {
            // console.log('image.path: ', image.path);
            this.setState({ imageUri: image.path });
            convertToBase64(image.path, (base64Data) => {
                // this.postImageBase64(base64Data);
                // console.log('base64Data: ', base64Data);
                // Helper.getTokenParent().then(token => {
                //     const userId = '';
                //     const imageBase64String = base64Data;
                //     updateAvatar({token, userId, imageBase64String}).then(rp => {
                //         console.log('link: ', rp);
                //     })
                // })
                this.setState({
                    base64String: base64Data,
                });
            }, (error) => console.log(error));
            // RNFS.readFile(image.path, 'base64').then(b64data => {
            //   this.postImageBase64(b64data);
            // });
        }).catch(err => console.log(err));
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
        const birthday = d.getFullYear() + '-' + (month) + '-' + date;
        this.setState({ birthday });
        // this.setState({ birthday: d.getFullYear() + '-' + (month) + '-' + date });
        this.hideDateTimePicker();
    };

    componentDidMount() {
        StatusBar.setHidden(true);
        Helper.getParentAvatarUri().then(rp => {
            console.log("getParentAvatarUri: ", rp);
            this.setState({ imageUri: rp })
        })
        Helper.getTokenParent().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            console.log(token);
            const { Email, DisplayName, Birthday, Gender, PhoneNumber } = jwtDecode(token);
            // console.log(JSON.stringify(jwtDecode(token)));
            this.setState({
                email: Email,
                displayName: DisplayName,
                birthday: Birthday,
                gender: Gender,
                phoneNumber: PhoneNumber
            });
            // this.refs.formGender.update(Gender);
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
        const { indexInput } = this.state;
        switch (indexInput) {
            case 'displayname':
                this.setState({
                    displayName: text
                });
                break;
            case 'codepin':
                this.setState({
                    codePin: text
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
            case 'phoneNumber':
                this.setState({
                    phoneNumber: text
                });
                break;
            default:
                break;
        }

    }

    validate({ displayName, email, codePin, gender, birthday }) {
        if (displayName == '') {
            this.refs.toast.show('Tên hiển thị không được để trống !');
            return false;
        }
        if (displayName.length <= 2) {
            this.refs.toast.show('Tên hiển thị phải lớn hơn 2 kí tự !');
            return false;
        }
        if (email == '') {
            this.refs.toast.show('Email không được để trống !');
            return false;
        }
        if (birthday == '') {
            this.refs.toast.show('Ngày sinh không được để trống !');
            return false;
        }
        if (codePin == '') {
            this.refs.toast.show('Mã phụ huynh không được để trống !');
            return false;
        }
        if (gender == '') {
            this.refs.toast.show('Giới tính không được để trống !');
            return false;
        }
        if (codePin.length < 4 || codePin.length > 8) {
            this.refs.toast.show('Mã pin phải từ 4 đến 8 kí tự!');
            return false;
        }
        return true;
    }

    makeProfileUpdate({ displayName, email, gender, birthday }) {
        this.props.makeProfileUpdate({ displayName, email, gender, birthday });
    }

    updateInfo() {
        const { displayName, email, codePin, gender, birthday } = this.state;
        if (this.validate({ displayName, email, codePin, gender, birthday })) {
            this.setState({
                isLoading: true
            }, () => {
                Helper.getTokenParent().then(token => {
                    const imageBase64String = this.state.base64String;
                    const userId = '';
                    updateAvatar({ token, userId, imageBase64String }).then(rp => {
                        this.setState({ isLoading: false });
                        this.setState({ imageUri: rp.urlAvatar });
                        Helper.saveParentAvatarUri(rp.urlAvatar);
                        this.props.saveAvatarUriRedux({ uri: `http:${rp.urlAvatar}` });
                        authService.postUpdateParent({ displayName, email, codePin, gender, birthday, token }).then(res => {
                            if (res != "") {
                                const { status } = res;
                                if (status == 200) {
                                    Helper.saveTokenParent(res.access_token);
                                    this.refs.toast.show('Cập nhật thành công!');
                                    this.makeProfileUpdate({ displayName, email, gender, birthday });
                                } else {
                                    this.refs.toast.show('Cập nhật thất bại!');
                                }
                            } else {
                                this.refs.toast.show('Cập nhật thất bại!');
                            }
                        });
                    })
                });
            });
        }

    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onChangeText2(text) {
        const { indexInput } = this.state;
        switch (indexInput) {
            case 'displayname':
                this.setState({
                    displayName: text
                });
                break;
            case 'codepin':
                this.setState({
                    codePin: text
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
            case 'phoneNumber':
                this.setState({
                    phoneNumber: text
                })
            default:
                break;
        }
    }


    onChangeText(indexInput, text) {
        switch (indexInput) {
            case 'displayname':
                this.setState({
                    displayName: text
                });
                break;
            case 'codepin':
                this.setState({
                    codePin: text
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

    _keyboardDidHide() {
        this.setState({
            visibleKeyboard: false
        });
    }

    signOut() {
        Helper.saveToken('');
        Helper.saveTokenParent('');
        Helper.saveUserId('');
        Helper.saveUserPost('');
        this.props.navigator.navigate('Auth');
    }

    render() {

        const { displayName, email, codePin, phoneNumber, birthday } = this.state;
        // const { displayName, email, codePin, gender, birthday, phoneNumber } = { displayName: 1, email: 3, codePin: 3, gender: 3, birthday: 3, phoneNumber: 20 }
        return (
            <ImageBackground source={AppIcon.background_parent} style={{ flex: 1 }}>
                <HeaderParent displayName={'Thông tin phụ huynh'} />
                {/* <HeaderNavigation title={'Phụ Huynh'} onPress={() => this.goBack()} color={'blue'} icon={'sign-out'} onMenuPress={this.signOut.bind(this)} /> */}
                <View style={styles.wrapContent}>
                    <View style={styles.scrollViewContainer}>
                        {/* <ScrollView style={styles.scrollView}> */}
                        <View style={styles.container}>
                            <InputPlatform
                                label='Tên phụ huynh'
                                placeholder={''}
                                indexInput={'displayname'}
                                value={displayName}
                                onChangeText={text => this.onChangeText('displayname', text)}
                                // onChangeText={text => this.setState({ displayName: text })}
                                onPress={this.showInputKeyboard.bind(this)}
                                secureTextEntry={false}
                            />
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Ngày sinh</Text>
                                <View style={{ position: 'absolute', right: 0 }}>
                                    <FormDate
                                        icon={AppIcon.icon_calender}
                                        value={birthday}
                                        name={'birthday-cake'}
                                        width={240}
                                        onPress={() => {
                                            this.showDateTimePicker()
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={[styles.inputContainer, { paddingTop: 10 }]}>
                                <Text style={styles.label}>Bạn là</Text>
                                <View style={styles.wrapDropdown}>
                                    <Dropdown
                                        data={dataDropDown}
                                        renderBase={({ title }) => {
                                            return (
                                                <View style={{ flexDirection: 'row', width: 106, height: 37, alignItems: 'center' }}>
                                                    <Text style={{ left: 20, top: -3 }}>{title}</Text>
                                                    <Image source={AppIcon.icon_arrow_down_orange} style={{ width: 15, height: 10, position: 'absolute', top: 10, right: -40, tintColor: '#FF9B19' }} resizeMode='contain' />
                                                    {/* <Icon name='caret-down' size={20} color='#fff' style={{ position: 'absolute', top: 5, right: 10 }} /> */}
                                                </View>
                                            )
                                        }}
                                        containerStyle={{ width: 160, height: 30 }}
                                        rippleInsets={{ top: 0, bottom: 0 }}
                                        // rippleInsets={{top:0, bottom: 0}}
                                        // rippleCentered= {true}
                                        value={this.state.gender}
                                        onChangeText={(item) => { console.log('onChange Value dropdown,: ', item) }}
                                    />
                                </View>
                            </View>
                            <InputPlatform
                                label='Email'
                                placeholder={''}
                                value={email}
                                indexInput={'email'}
                                // onChangeText={text => this.setState({ email: text })}
                                onChangeText={text => this.onChangeText('email', text)}
                                onPress={this.showInputKeyboard.bind(this)}
                                secureTextEntry={false}
                            />
                            <InputPlatform
                                label='Số điện thoại'
                                placeholder={''}
                                keyboardType={'number-pad'}
                                value={phoneNumber}
                                indexInput={'phoneNumber'}
                                // onChangeText={text => this.setState({ email: text })}
                                onChangeText={text => this.onChangeText('phoneNumber', text)}
                                onPress={this.showInputKeyboard.bind(this)}
                                secureTextEntry={false}
                            />
                            <InputPlatform
                                label='Mã Phụ Huynh'
                                placeholder={''}
                                keyboardType={'number-pad'}
                                value={codePin}
                                indexInput={'codepin'}
                                onPress={this.showInputKeyboard.bind(this)}
                                // onChangeText={text => this.setState({ codePin: text })}
                                onChangeText={text => this.onChangeText('codepin', text)}
                                secureTextEntry={false}
                            />
                            <View style={styles.wrapAvatarEnd}>
                                <View style={{ width: 95, height: 95, borderRadius: 47.5 }}>
                                    <Image source={this.state.imageUri ? { uri: `${this.state.imageUri}` } : AppIcon.default_avatar} style={{ width: 95, height: 95, borderRadius: 47.5 }} resizeMode='contain' />
                                    <RippleButton style={styles.btnEdit} size={27} onPress={() => { this.cropPicker() }}>
                                        <Image source={AppIcon.btn_edit_avatar} resizeMode='contain' style={{ width: 27, height: 27 }} />
                                    </RippleButton>
                                </View>
                                <View style={styles.wrapTextEnd}>
                                    <Text style={{ color: 'rgb(255, 155, 26)', fontSize: 13.6, fontWeight: '800' }}>Ảnh đại diện</Text>
                                    <Text style={{ fontSize: 10.6, fontWeight: '200', marginTop: 6 }}>280px x 280px</Text>
                                    <Text style={{ width: 200, marginTop: 10, fontSize: 12, fontStyle: 'italic' }}>Hiện đang chưa có ảnh đại diện, hãy cập nhật lên nhé!</Text>
                                </View>
                            </View>
                            <View style={styles.wrapEnd}>
                                <RippleButton onPress={() => this.updateInfo()}
                                    style={styles.updateBtn}>
                                    <Text style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>Cập nhật</Text>
                                </RippleButton>
                            </View>
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                        />
                        {/* </ScrollView> */}
                    </View>
                    <LoadingScreen isLoading={this.state.isLoading} />

                    <Toast ref="toast" position='top' />
                    {
                        this.state.visibleKeyboard &&
                        <InputKeyBoard
                            secureTextEntry={this.state.secureTextEntry}
                            placeholder={this.state.placeholder}
                            textInput={this.state.textInput}
                            onChangeText={this.onChangeText2.bind(this)}
                            keyboardType={this.state.keyboardType}
                            onPress={this._keyboardDidHide.bind(this)}
                        />
                    }
                </View>
                <BottomTabCustom navigation={this.props.navigation} />
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        width: '100%',
        height: '80%',
        paddingBottom: 0,
        paddingTop: 50,
    },
    updateBtn: {
        width: '50%',
        height: 40,
        backgroundColor: '#F5A100',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnEdit: {
        width: 27,
        height: 27,
        position: 'absolute',
        right: 3,
        bottom: 3,
        alignSelf: 'center'
    },
    wrapAvatarEnd: {
        width: '100%',
        height: 146,
        backgroundColor: 'rgb(246, 249, 252)',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 60
    },
    wrapTextEnd: {
        marginLeft: 20,
    },
    cancelBtn: {
        width: '50%',
        height: 40,
        backgroundColor: '#008BDB',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        // paddingTop: 10,
        paddingBottom: 0,
        flex: 1,
    },
    wrapContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        paddingBottom: 70,
        // paddingTop: 20,
    },
    wrapDropdown: {
        position: 'absolute',
        right: 20,
        borderWidth: 1,
        borderColor: 'rgb(187, 206, 228)',
        borderRadius: 5,
        backgroundColor: '#fff'

    },
    container: {
        justifyContent: 'center',

    },
    rowHalf: {
        flex: 1,
        justifyContent: 'center',
    },
    wrapEnd: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    label: {
        fontSize: 12,
        paddingLeft: 20,
        marginBottom: 5,
        fontWeight: '100',
    },
    viewInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 10,
        height: 36,
        width: 240,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        borderWidth: 1,
        borderColor: 'rgb(187, 206, 228)'
    },
    formInput: {
        position: 'absolute',
        backgroundColor: '#FFF',
        fontSize: 12,
        borderRadius: 8,
        marginLeft: 150,
        height: 36,
        width: 240,
        paddingLeft: 20,
        marginBottom: 10,
        fontFamily: 'Roboto-MediumItalic',
        fontWeight: 'bold',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgb(187, 206, 228)'

    },
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        height: 36
    },
    textInput: {
        fontSize: 13.6,
        fontFamily: 'Roboto-Bold',

    },
});

const InputPlatform = ({ indexInput, onPress, placeholder = '', value, secureTextEntry = false, onChangeText, disabled = false, label, keyboardType = 'default' }) => {
    return (
        <View style={styles.inputContainer}>
            {label &&
                <Text style={styles.label}>{label || ''}</Text>
            }
            {Platform.OS == 'ios' ?
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => onPress(value, placeholder, indexInput, secureTextEntry, keyboardType)}
                    style={[styles.viewInput]}
                >
                    {/* <View style={styles.viewInput}> */}
                    <TextInput
                        keyboardType={keyboardType || 'default'}
                        pointerEvents="none"
                        secureTextEntry={value == '' ? false : secureTextEntry}
                        value={value != '' ? value : placeholder}
                        style={[styles.textInput, {
                            color: '#000'
                        }]} />

                    {/* </View> */}
                </TouchableHighlight>
                :
                <TextInput
                    editable={!disabled}
                    selectTextOnFocus={!disabled}
                    value={value}
                    keyboardType={keyboardType || 'default'}
                    secureTextEntry={secureTextEntry}
                    onChangeText={(text) => onChangeText(text)}
                    underlineColorAndroid={'transparent'}
                    placeholderTextColor={'#fff'}
                    placeholder={placeholder}
                    style={styles.formInput} />
            }
        </View>
    );
}