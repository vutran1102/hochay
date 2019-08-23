import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import jwtDecode from 'jwt-decode';
import FormMath from '../common/FormMath';
import { ButtomCustomeSmall } from '../common/Button';
import Container from '../common/Container';
import { dataGender } from '../../utils/DataTest';
import authService from '../../services/authService';
import Helper from '../../utils/Helpers';
import AppIcon from '../../utils/AppIcon';
import PickerForm from '../common/PickerForm';
import HeaderNavigation from '../common/HeaderNavigation';
import ItemAccount from './ItemAccount';


export default class ParentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            displayName: '',
            email: '',
            codePin: '',
            gender: '',
            birthday: '',
            phoneNumber: '',
            isDateTimePickerVisible: false,
        }
    }

    componentDidMount() {
        Helper.getToken().then(token => {
            const { userName, DisplayName, Birthday, PhoneNumber, Email, Gender } = jwtDecode(token);
            this.setState({
                userName: userName,
                displayName: DisplayName,
                birthday: Birthday,
                phoneNumber: PhoneNumber,
                email: Email,
                gender: Gender
            });
        })
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }}>
                <Container>
                    <HeaderNavigation title='Thông tin tài khoản' color={'white'} onPress={() => this.goBack()} />
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.container}>
                            <View style={styles.rowHalf}>
                                <ItemAccount label={'Tên hiển thị'} title={this.state.displayName} />
                                <ItemAccount label={'Tên đăng nhập'} title={this.state.userName} />
                                <ItemAccount label={'Email'} title={this.state.email} />
                                <ItemAccount label={'Giới tính'} title={this.state.gender == 'NU' ? 'Nữ' : 'Nam'} />
                                <ItemAccount label={'Điện thoại'} title={this.state.phoneNumber} />
                                <ItemAccount label={'Ngày sinh'} title={this.state.birthday} />
                            </View>
                        </View>
                        <View style={styles.wrapEnd}>
                            <ButtomCustomeSmall onPress={() => this.goBack()} title={'Quay lại'} bgColor={'rgb(122, 199, 12)'} />
                        </View>
                    </ScrollView>
                </Container>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    scrollView: {
        paddingTop: 20,
        paddingBottom: 20,
        flex: 1,
        backgroundColor: '#fff'
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
        alignItems: 'center',
        marginBottom: 30,
    },

});