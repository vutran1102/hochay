import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import jwtDecode from 'jwt-decode';
import Toast, { DURATION } from 'react-native-easy-toast';
import HeaderNavigation from '../common/HeaderNavigation';
import InputKeyBoard from '../common/InputKeyboard';
import Container from '../common/Container';
import authService from '../../services/authService';
import AppIcon from '../../utils/AppIcon';
import Header from './Header';
import Setting from './Setting';
import Provision from './Provision';
import Helper from '../../utils/Helpers';
import AccountInfoContainer from '../parent-setting/AcountInfo';

export default class ParentSettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            visibleKeyboard: false,
            displayName: '',
            email: '',
            codePin: '',
            gender: 'NAM',
            birthday: ''
        }
    }
    onPress(index) {
        this.setState({
            index
        });
    }
    goBack() {
        this.props.navigation.goBack();
    }

    componentDidMount() {
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            const { Email, DisplayName, Birthday, Gender } = jwtDecode(token);
            this.setState({
                email: Email,
                displayName: DisplayName,
                birthday: Birthday,
                gender: Gender
            });
            // this.refs.formGender.update(Gender);
        });
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

    updateInfo() {
        const { displayName, email, codePin, gender, birthday } = this.state;
        if (this.validate({ displayName, email, codePin, gender, birthday })) {
            this.setState({
                isLoading: true
            }, () => {
                Helper.getToken().then(token => {
                    authService.postUpdateParent({ displayName, email, codePin, gender, birthday, token }).then(res => {
                        if (res != "") {
                            const { status } = res;
                            if (status == 200) {
                                Helper.saveToken(res.access_token);
                                this.refs.toast.show('Cập nhật thành công!');
                                this.props.makeProfileUpdate({ displayName, email, gender, birthday });
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

    renderContent() {
        const propsObj = this.state;
        const { index } = this.state;
        switch (index) {
            case 1:
                return <AccountInfoContainer
                    ref="accountinfo"
                    propsObj={propsObj}
                    onChangeText={this.onChangeText.bind(this)}
                    onchangeGrade={(item) => this.setState({ gender: item.value })}
                    showInputKeyboard={this.showInputKeyboard.bind(this)}
                    onchageDatePiker={(birthday) => this.setState({ birthday: birthday })}
                    updateInfo={this.updateInfo.bind(this)}
                    goBack={this.goBack.bind(this)}
                />
            case 2:
                return <Setting />;
            default:
                return <Provision />
        }
    }

    /** 
    * override
     * Not required
     * @param {*} text 
     */
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
            default:
                break;
        }
    }

    /** 
     * override
      * Not required
      * @param {*} text 
      */
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

    _keyboardDidHide() {
        this.setState({
            visibleKeyboard: false
        });
    }

    render() {
        return (
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }}>
                <Container>
                    <HeaderNavigation title={'Cài đặt'} onPress={() => this.goBack()} color={'white'} />
                    <Header onPress={this.onPress.bind(this)} index={this.state.index} />
                    <View style={styles.body}>
                        {this.renderContent()}
                    </View>
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
                </Container>
                <Toast ref="toast" position='top' />
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    body: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 5,
        marginBottom: 20,
        // borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 0.2,
        borderColor: '#666'
    }
});