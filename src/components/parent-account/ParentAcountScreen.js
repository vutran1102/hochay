import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, ImageBackground, Alert } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import HeaderNavigation from '../common/HeaderNavigation';
import Container, { Wrapper } from '../common/Container';
import ItemAccount from './ItemAccount';
import AppIcon from '../../utils/AppIcon';
import { ButtomCustomeSmall } from '../common/Button';
import Helper from '../../utils/Helpers';
import authService from '../../services/authService';
import FormUser from './FormUser';
import global from '../../utils/Globals';
import ConfirmDelete from './ConfirmDelete';
import TestPicker2 from '../main/TestPicker2';
import LoadingScreen from '../common/LoadingScreen';

const pass_word = '000000';

export default class ParentAccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listChild: [],
            userName: '',
            gender: '1',
            gradeId: 'C1',
            displayName: '',
            birthday: '',
            visibleConfirm: true,
            visibleForm: false,
            isLoading: true,
        };
    }

    componentDidMount() {

    }

    addSubuser(payload) {
        const password = pass_word;
        const { userName, gradeId, gender, displayName, birthday, codePin } = payload;
        if (this.validate({ displayName, birthday, password, userName, type: 'add' })) {
            Helper.getToken().then(token => {
                if (token == '') this.props.navigation.navigate('Auth');
                new Promise((resolve, reject) => {
                    this.props.addSubuser({ token, gradeId, userName, displayName, gender, birthday, codePin, password, resolve, reject });
                }).then(response => {
                    const { status } = response;
                    if (status == 200) {
                        this.refs.toast.show('Thêm thành công!');
                        this.setState({
                            userName: '',
                            errors: '',
                            visibleForm: false
                        });
                    } else {
                        this.refs.toast.show('Thêm thất bại!');
                        this.setState({
                            errors: response.message,
                        });
                    }
                }).catch(err => {
                    this.refs.toast.show('Có lỗi xảy ra!');
                    this.setState({
                        errors: 'Có lỗi xảy ra',
                    });
                });
            });
        }
    }

    validate({ displayName, birthday, password, userName, type }) {
        if (displayName == '') {
            this.setState({ errors: 'Tên hiển thị không được để trống!' });
            this.refs.toast.show('Tên hiển thị không được để trống!');
            return false;
        }
        if (type == 'add') {
            if (userName == '') {
                this.setState({ errors: 'Tên đăng nhập không được để trống!' });
                this.refs.toast.show('Tên đăng nhập không được để trống!');
                return false;
            }
        }
        if (displayName.length <= 2) {
            this.setState({ errors: 'Tên hiển thị phải lớn hơn 2 kí tự!' });
            this.refs.toast.show('Tên hiển thị phải lớn hơn 2 kí tự!');
            return false;
        }
        if (birthday == '' || birthday == null) {
            this.setState({ errors: 'Ngày sinh thị không được để trống!' });
            this.refs.toast.show('Ngày sinh thị không được để trống!');
            return false;
        }
        if (password == '' || password == undefined) {
            this.setState({ errors: 'Mật khẩu không được để trống!' });
            this.refs.toast.show('Mật khẩu không được để trống!');
            return false;
        }
        return true;
    }
  
    updateSubuser(payload) {
        const password = pass_word;
        const { userId, gradeId, displayName, birthday, gender } = payload;
        if (this.validate({ displayName, birthday, password })) {
            Helper.getToken().then(token => {
                if (token == '') this.props.navigation.navigate('Auth');
                new Promise((resolve, reject) => {
                    this.props.updateSubuser({ userId, gradeId, displayName, birthday, gender, password, token, resolve, reject });
                }).then(res => {
                    const { status } = res;
                    if (status == 200) {
                        this.refs.toast.show('Cập nhật thành công!');
                        this.setState({ visibleForm: false });
                    } else {
                        this.refs.toast.show('Cập nhật thất bại!');
                    }
                }).catch(err => {
                    this.refs.toast.show('Có lỗi xảy ra !');
                });
            });
        }
    }

    removeUserId(userId) {
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            new Promise((resolve, reject) => {
                this.props.removeSubUser({ token, userId, resolve, reject });
            }).then(response => {
                const { status } = response;
                if (status == 200) {
                    this.refs.toast.show('Cập nhật thành công!');
                } else {
                    this.refs.toast.show('Cập nhật thất bại!');
                }
            }).catch(err => {
                this.refs.toast.show('Có lỗi xảy ra !');
            });
        });
    }

    onLongPress(userId) {
        Alert.alert(
            '',
            'Bạn có chăc muốn xóa học sinh này',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.removeUserId(userId) },
            ],
            { cancelable: false },
        );
    }

    handleForm(b, type, item) {
        this.setState({
            visibleForm: b,
            errors: ''
        });
        if (type == 'edit') {
            this.refs.formuser.updateState(item);
        }
    }

    saveSubuser(payload) {
        const { type } = payload;
        if (type == 'update') {
            this.updateSubuser(payload);
        } else {
            this.addSubuser(payload);
        }
    }

    goBack() {
        this.props.navigation.goBack();
    }

    handleAction(item) {
        this.handleForm(true, 'edit', item);
    }

    render() {
        const { isLoading } = this.state;
        const { listChild, isLoadingAddChild } = this.props;
        return (
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }}>
                <Wrapper>
                    <HeaderNavigation title={'Quản lý tài khoản học sinh'} onPress={() => this.goBack()} color={'white'} />
                </Wrapper>
                <Container >
                    <View style={styles.wrapTop}>
                        <ButtomCustomeSmall title={'Thêm mới'} size={100} onPress={() => this.handleForm(true)} />
                    </View>
                    <FlatList
                        numColumns={2}
                        style={styles.contents}
                        keyExtractor={(item, index) => index.toString()}
                        data={listChild}
                        renderItem={({ item }) =>
                            <ItemAccount
                                item={item}
                                onLongPress={this.onLongPress.bind(this)}
                                onPress={this.handleAction.bind(this)}
                            />}
                    />
                </Container>
                {this.state.visibleForm &&
                    <FormUser
                        errors={this.state.errors}
                        ref='formuser'
                        save={this.saveSubuser.bind(this)}
                        handleForm={this.handleForm.bind(this)} />
                }
                <Toast ref="toast" />
                <LoadingScreen isLoading={isLoadingAddChild} />
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    wrapTop: {
        paddingLeft: 20,
        marginVertical: 10
    },
    contents: {
        marginBottom: 30,
        paddingLeft: 20,
    }
});