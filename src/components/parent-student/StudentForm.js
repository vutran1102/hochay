import React, { Component } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ImageBackground, Image } from 'react-native';
import { TextInputForm } from './TextInputForm';
import FormDate from '../common/FormDate';
import AppIcon from '../../utils/AppIcon';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';
import Toast, { DURATION } from 'react-native-easy-toast';
import Helper from '../../utils/Helpers';
import authService from '../../services/authService';
import { fetchListChildStartAction } from '../../actions/authAction';
import { createFirstChildAction } from '../../actions/commonAction';
import { connect } from 'react-redux';
import global from '../../utils/Globals';
import FormDropdown from '../common/FormDropdown';
import RippleButton from '../common/RippleButton';
import ImagePickerCrop from 'react-native-image-crop-picker';
import { convertToBase64 } from '../../utils/Common';
import LoadingScreen from '../common/LoadingScreen';
import { updateAvatar } from '../../services/parentService';

const dataGenderDropdown = [{
    label: 'Nam',
    value: 'NAM',
}, {
    label: 'Nữ',
    value: 'NU',
}];

const dataGradeDropdown = [{
    label: 'Lớp 1',
    value: 'C1',
},
{
    label: 'Lớp 2',
    value: 'C2',
},
{
    label: 'Lớp 3',
    value: 'C3',
}];


class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            birthday: '',
            gender: 'NAM',
            gradeId: 'C1',
            code: '',
            displayName: '',
            password: '123123',
            userName: `user_${Date.now()}`,
            base64String: '',
            imageUri: '',
            isLoading: false,
        }
        global.createChild = this.addSubUser.bind(this);
        global.updateChild = this.updateSubUser.bind(this);
    }

    onBackPress() {
        this.props.onPress();
    }

    updateSubUser() {
        console.log("data: ", JSON.stringify(this.props.dataStudent));
        const codePin = '';
        const { userId } = this.props.dataStudent;
        const { gradeId, userName, displayName, gender, birthday, password } = this.state;
        if (userName == "") {
            this.refs.toast.show('Tên đăng nhập học sinh không được để trống ');
            return;
        }
        if (displayName == "") {
            this.refs.toast.show('Tên học sinh không được để trống ');
            return;
        }
        if (displayName.length < 4) {
            this.refs.toast.show('Tên đăng nhập phải có ít nhất 4 kí tự');
            return;
        }
        if (password == "") {
            this.refs.toast.show('Mật khẩu không được để trống ');
            return;
        }
        if (password.length < 4) {
            this.refs.toast.show('Mật khẩu phải có ít nhất 4 kí tự');
            return;
        }
        if (birthday == "") {
            this.refs.toast.show('Ngày sinh không được để trống ');
            return;
        }
        Helper.getToken().then(token => {
            this.setState({ isLoading: true });
            const imageBase64String = this.state.base64String;
            updateAvatar({ token, userId, imageBase64String }).then(rp => {
                authService.fetchUpdateSubUser({
                    token, gradeId, userName, displayName, gender, birthday, codePin, password, userId
                }).then(response => {
                    if (response != "") {
                        const { status } = response;
                        console.log("reposne: ", JSON.stringify(response));
                        if (status == 200) {
                            this.refs.toast.show('Cập nhật thành công!');
                            this.props.fetchListChild({ token });
                        } else {
                            this.refs.toast.show('Cập nhật thất bại!')
                        }
                    } else {
                        this.refs.toast.show('Cập nhật thất bại!')
                    }
                    this.setState({ isLoading: false });
                });
            })
        });
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


    addSubUser() {
        const codePin = '';
        const { gradeId, userName, displayName, gender, birthday, password, base64String } = this.state;
        if (userName == "") {
            this.refs.toast.show('Tên đăng nhập học sinh không được để trống ');
        }
        if (displayName == "") {
            this.refs.toast.show('Tên học sinh không được để trống ');
        }
        if (displayName.length < 4) {
            this.refs.toast.show('Tên đăng nhập phải có ít nhất 4 kí tự');
        }
        if (password == "") {
            this.refs.toast.show('Mật khẩu không được để trống ');
        }
        if (password.length < 4) {
            this.refs.toast.show('Mật khẩu phải có ít nhất 4 kí tự');
        }
        if (birthday == "") {
            this.refs.toast.show('Ngày sinh không được để trống ');
        }
        this.setState({ isLoading: true });
        Helper.getToken().then(token => {
            authService.addChildSubUser({
                token, gradeId, userName, displayName, gender, birthday, codePin, password
            }).then(response => {
                if (response != "") {
                    const { status } = response;
                    if (status == 200) {
                        this.refs.toast.show('Tạo tài khoản học sinh thành công!');
                        if (this.props.isCreateChild) {
                            this.props.navigation.navigate('Course');
                            this.props.setIsCreateChild({ isCreate: false });
                        }
                        const imageBase64String = base64String;
                        // const userId = this.props.dataStudent.userId;
                        if (imageBase64String) {
                            updateAvatar({ token, userId, imageBase64String }).then(rp => {
                                this.props.fetchListChild({ token });
                                this.setState({ isLoading: false });
                            });

                        } else {
                            new Promise((resolve, reject) => {
                                this.props.fetchListChild({ token, resolve, reject });
                            }).then(rp => {
                                this.setState({ isLoading: false });
                                this.props.backCallback()
                            }).catch(rp => {
                                this.props.setIsSuccess(true);
                            })
                            // this.props.fetchListChild({ token });
                            this.setState({ isLoading: true });
                        }
                    } else {
                        this.refs.toast.show('Tạo tài khoản học sinh thất bại!');
                        this.setState({ isLoading: false });
                        this.props.setIsSuccess(false);
                    }
                } else {
                    this.refs.toast.show('Tạo tài khoản học sinh thất bại!');
                    this.setState({ isLoading: false });
                    this.props.setIsSuccess(false);
                }
            });
        });

    }

    componentDidMount() {
        if (!this.props.dataStudent) {
            return;
        }
        this.props.dataStudent.avatar && this.setState({ imageUri: `http:${this.props.dataStudent.avatar}` })
        const { displayName, gender, birthday, gradeId, codePin } = this.props.dataStudent;
        this.setState({
            birthday: birthday,
            gender: gender,
            gradeId: gradeId,
            code: codePin,
            displayName: displayName,
        })
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => { this.setState({ isDateTimePickerVisible: false }); Keyboard.dismiss() };

    handleGenderPicked(value) {
        this.setState({ gender: value });
        Keyboard.dismiss();
    }

    handleGradePicked(value) {
        this.setState({ gradeId: value });
        Keyboard.dismiss();
    }

    handleDatePicked(d) {
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
    }

    onDonePress() {
        alert('Done press');
        this.props.onPress();
    }

    onDisplayNameChange(text) {
        this.setState({ displayName: text })
    }

    render() {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.rootView}>
                    <TextInputForm title={'Tên học sinh'} onChangeText={this.onDisplayNameChange.bind(this)} value={this.state.displayName} />
                    <View style={styles.formDateContainer}>
                        <Text style={styles.label}>Ngày sinh</Text>
                        <View style={{ position: 'absolute', right: 10 }}>
                            <FormDate
                                icon={AppIcon.icn_calender}
                                value={this.state.birthday}
                                name={'birthday-cake'}
                                width={230}
                                onPress={() => {
                                    this.showDateTimePicker()
                                }}
                            />
                        </View>
                    </View>
                    <View style={[styles.formDateContainer, { paddingTop: 10 }]}>
                        <Text style={styles.label}>Giới tính</Text>
                        <View style={styles.wrapChooseGender}>
                            <View style={{ width: 100, height: 36, alignItems: 'center', flexDirection: 'row' }}>
                                <RippleButton size={20} style={styles.cirleBorder} onPress={() => { this.handleGenderPicked('NAM') }}>
                                    {(this.state.gender == 'NAM') && <View style={{ width: 9.2, height: 9.2, borderRadius: 4.6, backgroundColor: 'rgb(255, 155, 26)' }} />}
                                </RippleButton>
                                <Text style={{ marginLeft: 15, fontWeight: '100' }}>Nam</Text>
                            </View>
                            <View style={{ width: 100, height: 36, alignItems: 'center', flexDirection: 'row' }}>
                                <RippleButton size={20} style={styles.cirleBorder} onPress={() => { this.handleGenderPicked('NU') }}>
                                    {(this.state.gender == 'NU') && <View style={{ width: 9.2, height: 9.2, borderRadius: 4.6, backgroundColor: 'rgb(255, 155, 26)' }} />}
                                </RippleButton>
                                <Text style={{ marginLeft: 15, fontWeight: '100' }}>Nữ</Text>
                            </View>
                            {/* <Dropdown
                                data={dataGenderDropdown}
                                containerStyle={{ width: 220, height: 20, marginLeft: 30, position: 'relative', top: - 35 }}
                                onChangeText={this.handleGenderPicked.bind(this)}
                                // rippleInsets={{top:0, bottom: 0}}
                                // rippleCentered= {true}
                                value={this.state.gender || (this.props.dataStudent && this.props.dataStudent.gender)}
                            /> */}
                        </View>
                    </View>
                    <View style={[styles.formDateContainer, { paddingTop: 10 }]}>
                        <Text style={styles.label}>Học lớp</Text>
                        <View style={styles.wrapDropdown}>
                            <FormDropdown
                                data={dataGradeDropdown}
                                // containerStyle={{ width: 220, height: 20, marginLeft: 30, position: 'relative', top: - 35 }}
                                onChangeText={this.handleGradePicked.bind(this)}
                                icon={AppIcon.icon_arrow_down_orange}
                                width={230}
                                // rippleInsets={{top:0, bottom: 0}}
                                // rippleCentered= {true}
                                style={{ borderRadius: 2, borderColor: 'rgb(187, 206, 228)', top: 3 }}
                                value={this.state.gradeId || (this.props.dataStudent && this.props.dataStudent.gradeId)}
                            />
                        </View>
                    </View>
                    <View style={{ top: -20 }}>
                        <TextInputForm title={'Mã an toàn'} keyboardType={"number-pad"} secureTextEntry={true} onChangeText={(txt) => { this.setState({ code: txt }) }} value={this.state.code} />
                    </View>
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
                            <Text style={{ width: 200, marginTop: 10, fontSize: 12, fontStyle: 'italic' }}>Hiện đang chưa có ảnh của bé, hãy cập ảnh bé lên nhé!</Text>
                        </View>
                    </View>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked.bind(this)}
                        onCancel={this.hideDateTimePicker.bind(this)}
                    />
                    {this.props.children}
                    <Toast ref="toast" position={'top'} />
                    <LoadingScreen isLoading={this.state.isLoading} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = state => {
    return {
        isCreateChild: state.common.isCreateChild,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchListChild: (payload) => {
            dispatch(fetchListChildStartAction(payload));
        },
        setIsCreateChild: (payload) => {
            dispatch(createFirstChildAction(payload));
        },
        setIsSuccess: (isSuccess) => {
            dispatch(setIsSuccess(isSuccess));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);

const styles = StyleSheet.create({
    doneBtnContainer: {
        width: '100%',
        height: 30,
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
    },
    wrapTextEnd: {
        marginLeft: 20,
    },
    doneButton: {
        backgroundColor: '#008BDB',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 30
    },
    rootView: {
        flex: 1,
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
    btnEdit: {
        width: 27,
        height: 27,
        position: 'absolute',
        right: 3,
        bottom: 3,
    },
    cirleBorder: {
        width: 18,
        height: 18,
        borderWidth: 0.5,
        borderRadius: 9,
        borderColor: 'rgb(255, 155, 26)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 12,
        paddingLeft: 20,
        // fontFamily: 'Roboto-Medium',
        fontWeight: '200',
        marginBottom: 5
    },
    formDateContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 20
    },
    wrapDropdown: {
        position: 'absolute',
        right: 10
    },
    wrapChooseGender: {
        position: 'absolute',
        right: 30,
        flexDirection: 'row',
        width: 230
    }
})