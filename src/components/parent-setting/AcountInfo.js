import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Keyboard, Image } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import { ChonseSelect } from 'react-native-chonse-select';
import jwtDecode from 'jwt-decode';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { InputPlatform } from '../common/FormInput';
import InputKeyBoard from '../common/InputKeyboard';
import FormDate from '../common/FormDate';
import { ButtomCustomeSmall, ButtomCustome } from '../common/Button';
import { dataGender } from '../../utils/DataTest';
import authService from '../../services/authService';
import Helper from '../../utils/Helpers';
import AppIcon from '../../utils/AppIcon';
import PickerForm from '../common/PickerForm';
import LoadingScreen from '../common/LoadingScreen';
import ImagePicker from 'react-native-image-crop-picker';
import RippleButton from '../common/RippleButton';

export default class AccountInfo extends Component {
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
            avatarImage: AppIcon.mother_avatar
        }
    }

    showImagePicker() {
        ImagePicker.showImagePicker((response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

            }
            this.refs.toast.show('Tính năng Mockup')
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
        this.props.onchageDatePiker(birthday);
        // this.setState({ birthday: d.getFullYear() + '-' + (month) + '-' + date });
        this.hideDateTimePicker();
    };

    componentDidMount() {
        // Helper.getToken().then(token => {
        //     if (token == '') this.props.navigation.navigate('Auth');
        //     const { Email, DisplayName, Birthday, Gender } = jwtDecode(token);
        //     this.setState({
        //         email: Email,
        //         displayName: DisplayName,
        //         birthday: Birthday,
        //         gender: Gender
        //     });
        //     // this.refs.formGender.update(Gender);
        // });
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
                Helper.getToken().then(token => {
                    authService.postUpdateParent({ displayName, email, codePin, gender, birthday, token }).then(res => {
                        console.log(res);
                        if (res != "") {
                            const { status } = res;
                            if (status == 200) {
                                Helper.saveToken(res.access_token);
                                this.refs.toast.show('Cập nhật thành công!');
                                this.refs.accountinfo.makeProfileUpdate({ displayName, email, gender, birthday });
                            } else {
                                this.refs.toast.show('Cập nhật thất bại!');
                            }
                            this.setState({ isLoading: false });
                        } else {
                            this.refs.toast.show('Cập nhật thất bại!');
                            this.setState({
                                isLoading: false
                            });
                        }
                    });
                });
            });
        }

    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render() {
        const { displayName, email, codePin, gender, birthday } = this.props.propsObj;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.scrollViewContainer}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.container}>
                            <View style={styles.avatartContainer}>
                                <Image
                                    source={this.state.avatarImage}
                                    resizeMode={'contain'}
                                    style={{ width: 110, height: 110 }}
                                    resizeMethod={'scale'}
                                />
                                <ButtomCustome onPress={() => this.showImagePicker()} borderRadius={10} title={'Đổi ảnh'} bgColor={'transparent'} color={'#3A7FFF'} width={100} height={30} />
                            </View>
                            <View style={styles.rowHalf}>
                                <InputPlatform
                                    label='Tên phụ huynh'
                                    placeholder={''}
                                    indexInput={'displayname'}
                                    value={displayName}
                                    onChangeText={text => this.props.onChangeText('displayname', text)}
                                    // onChangeText={text => this.setState({ displayName: text })}
                                    onPress={this.props.showInputKeyboard.bind(this)}
                                    secureTextEntry={false}
                                />
                                <InputPlatform
                                    label='Email'
                                    placeholder={''}
                                    value={email}
                                    indexInput={'email'}
                                    // onChangeText={text => this.setState({ email: text })}
                                    onChangeText={text => this.props.onChangeText('email', text)}
                                    onPress={this.props.showInputKeyboard.bind(this)}
                                    secureTextEntry={false}
                                />
                                <InputPlatform
                                    label='Mã Phụ Huynh'
                                    placeholder={''}
                                    keyboardType={'number-pad'}
                                    value={codePin}
                                    indexInput={'codepin'}
                                    onPress={this.props.showInputKeyboard.bind(this)}
                                    // onChangeText={text => this.setState({ codePin: text })}
                                    onChangeText={text => this.props.onChangeText('codepin', text)}
                                    secureTextEntry={false}
                                />
                            </View>
                            <View style={styles.rowHalf}>
                                <ChonseSelect
                                    height={35}
                                    marginLeft={20}
                                    style={{ marginBottom: 10 }}
                                    labelStyle={{ fontFamily: 'Roboto-Medium', fontSize: 12 }}
                                    data={dataGender}
                                    label='Giới tính'
                                    initValue={gender}
                                    textStyle={{ fontFamily: 'Roboto-MediumItalic', fontSize: 12 }}
                                    onPress={(item) => this.props.onchangeGrade(item)}
                                // onPress={(item) => this.setState({ gender: item.value })}
                                />
                                <FormDate
                                    label={'Ngày sinh'}
                                    icon={AppIcon.icon_birth}
                                    value={birthday}
                                    name={'birthday-cake'}
                                    onPress={() => {
                                        this.showDateTimePicker()
                                    }}
                                />
                            </View>
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                        />
                        <LoadingScreen isLoading={this.state.isLoading} />
                    </ScrollView>
                </View>
                <View style={styles.wrapEnd}>
                    <RippleButton onPress={() => this.props.goBack()}
                        style={styles.cancelBtn}>
                        <Text style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>Hủy</Text>
                    </RippleButton>
                    <RippleButton onPress={() => this.updateInfo()}
                        style={styles.updateBtn}>
                        <Text style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>Cập nhật</Text>
                    </RippleButton>
                </View>
                <Toast ref="toast" position='top' />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    scrollViewContainer: {
        width: '100%',
        height: 250
    },  
    updateBtn: {
        width: '50%',
        height: 40,
        backgroundColor: '#F5A100',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelBtn: {
        width: '50%',
        height: 40,
        backgroundColor: '#008BDB',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatartContainer: {
        width: 130,
        height: 200,
        paddingLeft: 10,
        alignItems: 'center'
    },
    scrollView: {
        paddingTop: 20,
        paddingBottom: 0,
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rowHalf: {
        flex: 1,
        justifyContent: 'center',
    },
    wrapEnd: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
    },

});