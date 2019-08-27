import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Keyboard } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ChonseSelect } from 'react-native-chonse-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputPlatform } from '../common/FormInput';
import InputKeyBoard from '../common/InputKeyboard';
import AppIcon from '../../utils/AppIcon';
import { ButtomCustomeSmall } from '../common/Button';
import PickerForm from '../common/PickerForm';
import FormDate from '../common/FormDate';
import RippleButton from '../common/RippleButton';
import { dataGrade, dataGender } from '../../utils/DataTest';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';

export default class FormUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userName: '',
            displayName: '',
            password: '',
            gender: 'NAM',
            gradeId: 'C1',
            codePin: '',
            birthday: '',
            isDateTimePickerVisible: false,
            type: 'add',
            visibleKeyboard: false,
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

    onChangeText(text) {
        const { indexInput } = this.state;
        switch (indexInput) {
            case 'displayname':
                this.setState({
                    displayName: text
                });
                break;
            case 'username':
                this.setState({
                    userName: text
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
        this.setState({ birthday: d.getFullYear() + '-' + (month) + '-' + date });
        this.hideDateTimePicker();
    };

    updateState(item) {
        const { userName, gradeId, gender, displayName, birthday, codePin, password, userId } = item;
        // this.refs.formGrade.update(gradeId);
        // this.refs.formGender.update(gender);
        this.setState({
            userId, userName, gradeId, gender, displayName, birthday, codePin, password, type: 'edit'
        });
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render() {
        const { userName, displayName, password, gender, birthday, codePin, gradeId, type } = this.state;
        return (
            <View style={styles.container}>
                <ScaleSlideAnim>
                    <View style={styles.body}>
                        <RippleButton onPress={() => this.props.handleForm(false)} style={styles.buttonClose} size={40}>
                            <Image source={AppIcon.icon_close} style={styles.icon_close} />
                        </RippleButton>
                        <ScrollView style={{ marginBottom: 10 }} showsVerticalScrollIndicator={false}>
                            <Image source={AppIcon.icon_girl} style={styles.avatar} />
                            <Text style={styles.textDesc}>Ảnh đại diện</Text>
                            <Text style={styles.textValidate}>{this.props.errors}</Text>
                            <KeyboardAwareScrollView>
                                <InputPlatform
                                    placeholder={'Tên học sinh'}
                                    value={this.state.displayName}
                                    indexInput={'displayname'}
                                    onPress={this.showInputKeyboard.bind(this)}
                                    onChangeText={text => this.setState({ displayName: text })}
                                    secureTextEntry={false}
                                />
                                {type == 'add' &&
                                    <InputPlatform
                                        placeholder={'Tên đăng nhập'}
                                        value={this.state.userName}
                                        onChangeText={text => this.setState({ userName: text })}
                                        secureTextEntry={false}
                                        indexInput={'username'}
                                        onPress={this.showInputKeyboard.bind(this)}
                                    />
                                }
                                {/* <PickerForm
                                    ref='formGrade'
                                    style={{ marginRight: 10 }}
                                    onItemChange={(value) => this.setState({ gradeId: value })}
                                    data={dataGrade}
                                /> */}
                                <ChonseSelect
                                    height={35}
                                    style={{ marginLeft: 20, marginBottom: 10 }}
                                    data={dataGrade}
                                    initValue={gradeId}
                                    textStyle={{ fontFamily: 'Roboto-MediumItalic', fontSize: 12 }}
                                    onPress={(item) => this.setState({ gradeId: item.value })}
                                />

                                <ChonseSelect
                                    height={35}
                                    style={{ marginLeft: 20, marginBottom: 10 }}
                                    data={dataGender}
                                    initValue={gender}
                                    textStyle={{ fontFamily: 'Roboto-MediumItalic', fontSize: 12 }}
                                    onPress={(item) => this.setState({ gender: item.value })}
                                />
                                {/* <PickerForm
                                    ref='formGender'
                                    style={{ marginRight: 10 }}
                                    onItemChange={(value) => this.setState({ gender: value })}
                                    data={dataGender}
                                /> */}
                                <FormDate
                                    icon={AppIcon.icon_birth}
                                    value={this.state.birthday}
                                    name={'birthday-cake'}
                                    onPress={() => {
                                        this.showDateTimePicker()
                                    }}
                                />

                                {/* <FormMath
                                    placeholder={'Mật khẩu'}
                                    value={this.state.password}
                                    onChangeText={text => this.setState({ password: text })}
                                    secureTextEntry={true}
                                /> */}
                            </KeyboardAwareScrollView>
                            {type == 'add' ?
                                <ButtomCustomeSmall
                                    onPress={() => this.props.save({
                                        userName, displayName, password, gender, birthday, codePin, gradeId
                                    })}
                                    title='Thêm Mới' style={{ alignSelf: 'center', marginBottom: 20 }} />
                                :
                                <ButtomCustomeSmall
                                    onPress={() => this.props.save({
                                        userId: this.state.userId, displayName, gender, birthday, gradeId, password, type: 'update'
                                    })}
                                    title='Cập nhật' style={{ alignSelf: 'center', marginBottom: 20 }} />
                            }
                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                            />
                        </ScrollView>
                    </View>
                </ScaleSlideAnim>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    body: {
        width: 400,
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: 'white'
    },
    avatar: {
        marginTop: 20,
        width: 60,
        height: 60,
        borderRadius: 20,
        alignSelf: 'center'
    },
    textValidate: {
        fontFamily: 'Roboto-Bold',
        color: '#d9534f',
        fontSize: 13,
        marginVertical: 5,
        alignSelf: 'center'
    },
    textDesc: {
        fontFamily: 'Roboto-Bold',
        color: 'rgb(181, 182, 185)',
        fontSize: 15,
        marginVertical: 5,
        alignSelf: 'center'
    },
    btnUpdate: {
        alignSelf: 'center'
    },
    icon_close: {
        width: 20,
        height: 20
    },
    buttonClose: {
        position: 'absolute',
        right: 0,
        top: 0,
        paddingVertical: 5,
        paddingHorizontal: 10,
        zIndex: 2
    }
});
