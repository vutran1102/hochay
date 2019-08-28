import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, ScrollView, Image, AppState } from 'react-native';
import Orientation from 'react-native-orientation';
import RippleButton from '../common/RippleButton';
import { NavigationActions } from 'react-navigation';
import CreateNewStudent from './CreateNewStudent';
import StudentDetail from './StudentDetail';
import AppIcon from '../../utils/AppIcon';
import ParentNoti from './ParentNoti';
import Helper from '../../utils/Helpers';
import BottomTabCustom from './BottomTabCustom';
import BackgroundParent from './BackgroundParent';
import { BackHandler, Platform } from "react-native"
export default class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHideCreateNewStudent: true,
            isHideStudentDetail: true,
            isHideParentNoti: true,
            isHideCreatePopUp: true,
            parentAvatar: ''
        }
    }

    isAllPopUpHide() {
        let isAllHide = true;
        if (!this.state.isHideCreateNewStudent || !this.state.isHideStudentDetail || !this.state.isHideParentNoti) {
            isAllHide = false;
        }
        return isAllHide;
    }

    componentWillMount() {
        Helper.getTokenParent().then(token => {
            const indexPage = 0;
            this.props.fetchNotiListData({ token, indexPage })
        })
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        Orientation.lockToPortrait();
        this.props.saveStackNavigator(this.props.navigation);
        this.setState({ isHideCreatePopUp: !this.props.isCreateChild });
        if (Platform.OS == "android") {
            BackHandler.addEventListener("hardwareBackPress", () => {
              return true;
            })
          }
    }

    _handleAppStateChange = (nextAppState) => {
        if (AppState.currentState == 'active') {
            Orientation.lockToPortrait();
        }
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    goBack() {
        this.props.navigation.dispatch(NavigationActions.back());
        Orientation.lockToLandscape();
        // this.props.navigation.navigate('StudentInfo');
    }

    onBack() {
        this.setState({ isHideCreateNewStudent: true });
        this.setState({ isHideStudentDetail: true });
        this.setState({ isHideParentNoti: true });
    }

    onPressStudent(data) {
        this.setState({
            childIndex: data,
            isHideStudentDetail: false
        })
    }
    onPressBell() {
        this.setState({
            isHideParentNoti: false
        })
    }

    onBtnCreatePress() {
        this.setState({
            isHideCreateNewStudent: false,
            isHideCreatePopUp: true
        })
    }

    render() {
        // console.log("this.props.listChild: ", JSON.stringify(this.props.listChild));
        return (
            <BackgroundParent>
                <View style={{ flex: 1 }}>
                    {this.isAllPopUpHide()
                        &&
                        <View style={{ flex: 1 }}>
                            <View style={styles.headerView}>
                                <View style={styles.rowWrap}>
                                    {/* <RippleButton style={styles.buttonStyle} onPress={this.goBack.bind(this)} /> */}
                                    <Text style={styles.headerText}> Chào {this.props.gender == 'NAM' ? 'ba' : 'mẹ'} {this.props.displayName}</Text>
                                </View>
                                <RippleButton onPress={this.onPressBell.bind(this)} style={{ width: 24, height: 30, right: 10, position: 'absolute', top: 10 }} radius={20}>
                                    <Image source={AppIcon.bell_png} style={{ width: 24, height: 30 }} resizeMode={'contain'} />
                                </RippleButton>
                            </View>
                            <View style={styles.flatListWrap} >
                                {/* <Image source={AppIcon.default_avatar} style={{ width: 104, height: 104, borderRadius: 52, borderWidth: 1.5, borderColor: 'rgb(4, 166, 255)', alignSelf: 'center', position: 'absolute', top: -52 }} /> */}
                                <RippleButton style={{ width: 104, height: 104, borderRadius: 52, alignSelf: 'center', position: 'absolute', top: -52 }} radius={52} onPress={() => { this.goBack() }}>
                                    <Image source={this.props.parentAvatarRedux ? { uri: `${this.props.parentAvatarRedux}` } : AppIcon.default_avatar} style={{ width: 104, height: 104, borderRadius: 52, borderWidth: 1.5, borderColor: 'rgb(4, 166, 255)' }} resizeMode='contain' />
                                </RippleButton>

                                <ScrollView>
                                    <FlatList
                                        keyExtractor={(item, index) => index.toString()}
                                        data={this.props.listChild}
                                        renderItem={({ item, index }) => {
                                            const { displayName, avatar } = item;
                                            return (
                                                <View style={styles.flatItem}>
                                                    <View style={styles.wrapAvatarItems}>
                                                        <Image source={avatar ? { uri: `http:${avatar}` } : AppIcon.default_avatar} resizeMode='contain' style={styles.itemAvatar} />
                                                    </View>
                                                    <Text style={styles.name} ellipsizeMode='tail'>{displayName}</Text>
                                                    <TouchableHighlight underlayColor={'transparent'} style={styles.button} onPress={() => { this.onPressStudent(index) }}>
                                                        <Text style={styles.buttonText} >XEM THỐNG KÊ HỌC TẬP</Text>
                                                    </TouchableHighlight>
                                                </View>
                                            )
                                        }}
                                    />
                                    <RippleButton style={styles.createStudent}
                                        onPress={() => { this.setState({ isHideCreateNewStudent: false }) }}

                                    >
                                        <Text style={styles.text}>THÊM MỚI TÀI KHOẢN HỌC SINH</Text>
                                    </RippleButton>
                                </ScrollView>
                            </View>
                            {!this.state.isHideCreatePopUp && <View style={styles.overLayer}>
                                <View style={styles.popUp}>
                                    <Text style={styles.titlePopUp}>Chưa có học sinh nào. Hãy tạo thêm học sinh!</Text>
                                    <RippleButton style={styles.btnCreate} radius={20} onPress={() => this.onBtnCreatePress()}>
                                        <Text style={styles.btnText}>Tạo ngay</Text>
                                    </RippleButton>
                                </View>
                            </View>}
                        </View>}

                    {!this.state.isHideCreateNewStudent && <CreateNewStudent backCallback={this.onBack.bind(this)} navigation={this.props.navigation} />}

                    {!this.state.isHideStudentDetail && <StudentDetail indexChild={this.state.childIndex} backCallback={this.onBack.bind(this)} />}

                    {!this.state.isHideParentNoti && <ParentNoti backCallback={this.onBack.bind(this)} />}

                    {(this.state.isHideCreateNewStudent && this.state.isHideStudentDetail && this.state.isHideParentNoti) && <BottomTabCustom navigation={this.props.navigation} />}
                </View>
            </BackgroundParent>
        );
    }
}


const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        color: '#fff'
    },
    wrapAvatarItems: {
        width: 52,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemAvatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },
    createStudent: {
        alignSelf: 'center',
        marginTop: 20,
        width: 295,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(255, 155, 26)',
        // borderWidth: 2
        // borderRadius: 15,
    },
    container: {
        flex: 1,
        paddingVertical: 10,
    },
    name: {
        // alignSelf: 'center',
        fontFamily: 'Roboto-Regular',
        marginLeft: 10,
        width: 80
    },
    flatItem: {
        width: '90%',
        height: 73,
        marginLeft: '5%',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'rgb(94, 181, 234)',
        paddingHorizontal: 20,

    },
    btnCreate: {
        width: 120,
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7cd34e',
        marginTop: 50
    },
    headerView: {
        width: '100%',
        height: 120,
        // backgroundColor: '#cd63e2',
        // borderWidth: 1,
        borderColor: '#000',
    },
    buttonStyle: {
        backgroundColor: 'orange',
        borderRadius: 20,
        width: 40,
        height: 40,
        marginLeft: 10,
        marginTop: 10,
    },
    rowWrap: {
        flexDirection: 'row'
    },
    headerText: {
        fontFamily: 'Roboto-Bold',
        marginTop: 20,
        marginLeft: 10,
    },
    flatListWrap: {
        flex: 1,
        paddingTop: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        paddingBottom: 70
    },
    buttonText: {
        // fontStyle: 'italic',
        fontSize: 12,
        fontWeight: '500',
        color: 'rgb(107, 195, 44)',
    },
    button: {
        width: 180,
        height: 25,
        justifyContent: 'center',
    },
    btnText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
    },
    overLayer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    popUp: {
        width: '70%',
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        // position: 'absolute',
        // alignSelf: 'center',
        // marginTop: 200
        // justifyContent: 'center',
        padding: 20
    },
    titlePopUp: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
    }
})
