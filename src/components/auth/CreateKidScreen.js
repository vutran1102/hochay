import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView, FlatList, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RippleButton from '../common/RippleButton';
import authService from '../../services/authService';
import Container from '../common/Container';
import FormDate from '../common/FormDate';
import Helper from '../../utils/Helpers';
import AppIcon from '../../utils/AppIcon';
import FormMath from '../common/FormMath';
import TestPicker2 from '../main/TestPicker2';
import { dataGender, dataGrade } from '../../utils/DataTest';
import { main } from '../../themes/index';

export default class CreateKidScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listChild: [],
            gradeId: 'C1',
            userName: '',
            password: '',
            displayName: '',
            gender: 'NAM',
            birthday: '',
            visibleGo: false,
            errors: '',
            isDateTimePickerVisible: false,
        }
    }

    onLogin() {
        const { listChild } = this.state;
        const len = Object.keys(listChild).length;
        if (len > 0) {
            const userId = listChild[0].userId;
            const userName = listChild[0].userName;
            this.props.navigation.navigate('App', { userId, userName });
        } else {
            alert('Vui lòng tạo tài khoản cho con');
        }
    }

    componentDidMount() {
        this.getListChild();
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

    getListChild() {
        Helper.getToken().then(token => {
            authService.getListSubUser({ token }).then(response => {
                if (response !== "") {
                    console.log(response);
                    const len = Object.keys(response).length;
                    this.setState({
                        listChild: response,
                        visibleGo: len > 0 ? true : false,
                    });
                } else {
                    this.setState({
                        listChild: [],
                        visibleGo: false,
                    });
                }
            });
        });
    }

    addSubUser() {
        const codePin = '';
        const { gradeId, userName, displayName, gender, birthday, password } = this.state;
        console.log("birthday: ", birthday);
        if (userName == "") {
            this.setState({ errors: 'Tên đăng nhập học sinh không được để trống ' });
            return;
        }
        if (displayName == "") {
            this.setState({ errors: 'Tên học sinh không được để trống ' });
            return;
        }
        if (displayName.length < 4) {
            this.setState({ errors: 'Tên đăng nhập phải có ít nhất 4 kí tự' });
            return;
        }
        if (password == "") {
            this.setState({ errors: 'Mật khẩu không được để trống ' });
            return;
        }
        if (password.length < 4) {
            this.setState({ errors: 'Mật khẩu phải có ít nhất 4 kí tự' });
            return;
        }
        if (birthday == "") {
            this.setState({ errors: 'Ngày sinh không được để trống ' });
            return;
        }
        Helper.getToken().then(token => {
            authService.addChildSubUser({
                token, gradeId, userName, displayName, gender, birthday, codePin, password
            }).then(response => {
                console.log(response);
                if (response != "") {
                    const { status } = response;
                    if (status == 200) {
                        this.getListChild();
                        this.setState({
                            userName: '',
                            displayName: '',
                            errors: ''
                        });
                    } else {
                        this.setState({
                            errors: response.message
                        });
                    }
                } else {
                    this.setState({
                        errors: 'Có lỗi xảy ra'
                    });
                }
            });
        });

    }

    removeUserId(userId) {
        Alert.alert(
            '',
            'Bạn muốn xóa học sinh này !',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        Helper.getToken().then(token => {
                            authService.postRemoveSubUser({ token, userId }).then(response => {
                                if (response != '') {
                                    const { status } = response;
                                    if (status == 200) {
                                        this.getListChild();
                                    }
                                }
                            });
                        });
                    }
                },
            ],
            { cancelable: false },
        );
    }

    render() {
        return (
            <ImageBackground source={AppIcon.bg_score} style={{ width: '100%', height: '100%' }} resizeMode={'cover'}>
                <Container>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.rowAadd}>
                            <Text style={styles.textTitle}>Tạo tài khoản cho học sinh</Text>
                            <Text style={main.authValidate}>{this.state.errors}</Text>
                            <ScrollView style={styles.contents}>
                                <View style={styles.viewAccount}>
                                    <Image source={AppIcon.icon_girl} style={styles.avatar} />
                                    <KeyboardAwareScrollView style={styles.viewInfo}>
                                        <FormMath
                                            placeholder={'Tên Học sinh'}
                                            value={this.state.displayName}
                                            onChangeText={text => this.setState({ displayName: text })}
                                        />
                                        <FormMath
                                            placeholder={'Tên đăng nhập'}
                                            value={this.state.userName}
                                            onChangeText={text => this.setState({ userName: text })}
                                        />
                                        <FormMath
                                            placeholder={'Mật khẩu'}
                                            value={this.state.password}
                                            onChangeText={text => this.setState({ password: text })}
                                            secureTextEntry={true}
                                        />
                                        <View style={{ flexDirection: 'row', marginVertical: 10, marginLeft: 20, justifyContent: 'space-around' }}>
                                            <TestPicker2
                                                bgDrowdow={'#ececec'}
                                                onItemChange={(value) => this.setState({ gender: value })}
                                                data={dataGender}
                                            />
                                            <View style={{ marginRight: 10 }} />
                                            <TestPicker2
                                                bgDrowdow={'#ececec'}
                                                onItemChange={(value) => this.setState({ gradeId: value })}
                                                data={dataGrade}
                                            />
                                        </View>
                                        <FormDate
                                            label={'Ngày sinh'}
                                            icon={AppIcon.icon_birth}
                                            value={this.state.birthday}
                                            name={'birthday-cake'}
                                            onPress={() => {
                                                this.showDateTimePicker()
                                            }}
                                        />

                                    </KeyboardAwareScrollView>
                                </View>
                                <RippleButton style={styles.viewButtonAdd} color={'#fff'} onPress={() => this.addSubUser()}>
                                    <Text style={styles.textBtnAdd}>Thêm 1 học sinh khác</Text>
                                </RippleButton>
                            </ScrollView>
                        </View>
                        <View style={styles.rowList}>
                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data={this.state.listChild}
                                renderItem={({ item }) =>
                                    <View style={styles.rowItem}>
                                        <Image source={AppIcon.icon_girl} style={styles.avatarItem} />
                                        <View style={styles.colsItem}>
                                            <Text style={styles.textDisplayname}>{item.userName}</Text>
                                            <View style={styles.rowChildInfo}>
                                                <Icon name={'venus'} color={'#00ABF3'} size={13} style={styles.iconGender} />
                                                <Text style={styles.textGrade}>Lớp {item.gradeId.substring(1)}</Text>
                                            </View>
                                        </View>
                                        <RippleButton onPress={() => this.removeUserId(item.userId)} style={styles.btnRemove}>
                                            <Image source={AppIcon.icon_close} style={styles.icon} />
                                        </RippleButton>
                                    </View>
                                }
                            />
                        </View>
                        {/* {this.state.visibleGo && */}
                        <RippleButton onPress={() => this.onLogin()} style={styles.viewButton}>
                            <Text style={styles.textButton}>Hoàn thành</Text>
                        </RippleButton>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                        />
                    </View>
                </Container>
                {/* } */}
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    rowAadd: {
        flex: 1,
    },
    btnRemove: {
        position: 'absolute',
        right: 0,
        top: 20,
    },
    rowList: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        width: 200,
        paddingTop: 20,
        backgroundColor: '#fff',
        marginTop: 20,
        marginBottom: 60,
    },
    rowItem: {
        marginHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#fff'
    },
    icon: {
        width: 15,
        height: 15,
    },
    rowChildInfo: {
        flexDirection: 'row'
    },
    colsItem: {
        marginLeft: 10,
    },
    textBtnAdd: {
        color: '#00ABF3',
        fontFamily: 'SVN-Gumley',
        fontSize: 16,
    },
    textGender: {
        color: '#333',
        fontFamily: 'SVN-Gumley',
        fontSize: 14,
    },
    textGradeL: {
        color: '#333',
        fontFamily: 'SVN-Gumley',
        fontSize: 14,
    },
    textTitle: {
        fontFamily: 'SVN-Gumley',
        fontSize: 18,
        color: 'white',
        textShadowColor: 'rgb(5, 97, 203)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        marginVertical: 20,
        alignSelf: 'center'
    },
    iconGender: {
        alignSelf: 'center',
        marginRight: 10
    },
    textDisplayname: {
        color: '#0587D7',
        fontFamily: 'SVN-Gumley',
        fontSize: 14,
    },
    textGrade: {
        color: 'rgb(181, 182, 185)',
        fontFamily: 'SVN-Gumley',
        fontSize: 14,
    },
    contents: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 30,
    },
    viewAccount: {
        marginTop: 20,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    avatarItem: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignSelf: 'center'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignSelf: 'center'
    },
    viewDesc: {
        flexDirection: 'row'
    },
    input: {
        width: 200,
    },
    viewButtonAdd: {
        marginVertical: 15,
        width: 200,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignSelf: 'center',
        borderWidth: 1,
        borderStyle: 'dotted',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ddd'
    },
    viewInfo: {
        marginLeft: 10,
    },
    viewButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        alignSelf: 'flex-end',
        width: 160,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(122, 199, 12)'
    },
    textButton: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
    }
});