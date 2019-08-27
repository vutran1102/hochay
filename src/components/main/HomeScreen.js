import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, AppState, Image } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import jwtDecode from 'jwt-decode';
import Orientation from 'react-native-orientation';
import ListAccountModal from '../modals/ListAccount';
import ConfirmSecurity from '../modals/ConfirmSecurity';
import MissionContainer from '../../containers/modals/MissionContainer';
import Header from './Header';
import Tabs from './Tabs';
import Practice from '../practices/Practice';
import Parent from '../parents/Parent';
import Helper from '../../utils/Helpers';
import LoadingMain from '../common/LoadingMain';
import { playSoundButton, playSoundTrack } from '../../utils/AudioUtils';
import { type_exam, type_practice, type_kiwi, type_trophy, tab_main_width } from '../../constants/const';
import authService from '../../services/authService';
import global from '../../utils/Globals';
import { MATH_KIT } from '../../constants/const';
import AppIcon from '../../utils/AppIcon';
import parentService from '../../services/parentService';

const { height, width } = Dimensions.get('window');

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        Orientation.lockToLandscape();
        this.state = {
            index: 1,
            row_practice_width: 0,
            gradeId: '',
            gradeName: '',
            Role: '',
            RoleParent: true,
            visibleAcountModal: false,
            visibleCodePin: false,
            visibleMisson: false,
            typeCodePin: '',
            userId: '',
            userName: '',
            errors: '',
            roleSelect: '',
            isLoadingGrade: true,
            isLoadingMissonEx: true,
            listPackagesChild: [],
            currentPackageCode: '',
        }
        global.updateListSubject = this.updateListSubject.bind(this);
    }

    componentWillMount() {

    }

    updateListSubject(data) {
        const gradeId = data.gradeId;
        const gradeName = data.gradeName;
        this.setState({
            gradeId, gradeName
        });
        const GradeId = gradeId;
        Helper.getToken().then(token => {
            this.props.fetchListSubjectStart({ GradeId, token });
        });
        //to do update subject
    }
    componentWillUpdate() {

    }

    loadingMissonExercise(token, packageCode) {
        new Promise((resolve, reject) => {
            this.props.fetchMissonData({ token, packageCode, resolve, reject })
        }).then(rp => {
            if(rp.length > 0)
                this.setState({ isLoadingMissonEx: false, visibleMisson: true });
        }).catch(err => {
            this.setState({ isLoadingMissonEx: false, visibleMisson: false });
        })
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        this.getRowWidthPractice();
        playSoundTrack();
        if (this.props.navigation.state.params) {
            const { problemCode, stepIdNow, subjectId, status, isKiwiSuggest, isFromKiwiSuggest } = this.props.navigation.state.params;
            if (isFromKiwiSuggest) {
                const isKiwiSuggest = true;
                this.props.navigation.navigate({ routeName: 'PracticeLearn', key: 'PracticeLearnId', params: { problemCode, stepIdNow, subjectId, status, isKiwiSuggest } });
            }
        }
        Helper.getToken().then(token => {
            console.log("token: ", token);
            const { Role } = jwtDecode(token);
            console.log('Role: ', Role);
            Helper.saveToken(token);
            this.setState({ Role });
            const indexPage = 0;
            if (Role == 'PARENT') {
                Helper.saveTokenParent(token);
                authService.fetchDataUser({ token }).then(reponse => {
                    if (reponse && reponse.avatar) {
                        Helper.saveParentAvatarUri(reponse.avatar);
                        this.props.saveParentAvatar({ uri: `http:${reponse.avatar}` })
                    }
                })
                new Promise((resolve, reject) => {
                    this.props.makeRequestListChild({ token, resolve, reject });
                }).then(listChild => {
                    if (listChild.length == 0) {
                        this.props.createChildAction({ isCreate: true })
                        this.props.navigation.navigate({ routeName: 'TabBottom', key: 'TabBottomId' });
                    } else {
                        this.showListAccount(true);
                    }
                }).catch(err => {
                    console.log("err listChild: ", JSON.stringify(err));
                });
                authService.postAccountInfo({ token }).then(res => {
                    const { isCodePin, displayName, gradeId, email, gender, birthday, phoneNumber, userId } = res;
                    const userName = phoneNumber;
                    this.props.makeRequestProfileParentAction({
                        displayName, gradeId, isCodePin, email, gender, birthday, phoneNumber, userName, userId
                    });
                    if (!isCodePin) this.addCodePin();
                }).catch(e => { });
                this.setState({ index: 5, RoleParent: true });
                const subjectId = MATH_KIT;
                this.props.makeRequestFlashCard({ token, subjectId, gradeId: 'C1', indexPage });
                this.props.fetchPakageList({ token, indexPage });
            } else {
                Helper.saveTokenChild(token);
                parentService.getPackageListChild({ token, indexPage }).then(response => {
                    console.log("token: ", token);
                    this.setState({ listPackagesChild: response });
                    if (response.length > 0) {
                        const packageCode = response[0].packageCode;
                        this.setState({ currentPackageCode: packageCode })
                        console.log('packageCode: ', packageCode);
                        this.loadingMissonExercise(token, packageCode)
                    }
                });
                // const packageCode = '5CD64';
                // commonService.fetchListExerciseAssigned({token,packageCode}).then(rp => {
                // console.log('respone bài giao: ', (rp));
                // })
                Helper.getTokenParent().then(token => {
                    this.props.makeRequestListChild({ token });
                    authService.postAccountInfo({ token }).then(res => {
                        const { isCodePin, displayName, gradeId, email, gender, birthday, phoneNumber, userId } = res;
                        const userName = phoneNumber;
                        this.props.makeRequestProfileParentAction({
                            displayName, gradeId, isCodePin, email, gender, birthday, phoneNumber, userName, userId
                        });
                    }).catch(e => { });
                });
                const { GradeId, DisplayName, userId, userName } = jwtDecode(token);
                this.props.fetchListSubjectStart({ GradeId, token });
                this.setState({
                    index: 1,
                    RoleParent: false,
                    gradeName: `Lớp ${GradeId.substring(1)}`
                });
                const displayName = DisplayName;
                const gradeId = GradeId;
                this.props.makeRequestProfileAction({
                    displayName, gradeId, userName, userId
                });
                this.props.fetchPakageList({ token, indexPage });
            }
        });
    }

    updateSubuser({ userId, userName, codePin }) {
        const { roleSelect } = this.state;
        const indexPage = 0;
        if (roleSelect == 'PARENT') {
            Helper.getToken().then(token => {
                authService.fetchDataUser({ token }).then(reponse => {
                    if (reponse && reponse.avatar) {
                        Helper.saveParentAvatarUri(reponse.avatar);
                        this.props.saveParentAvatar({ uri: `http:${reponse.avatar}` })
                    }
                })
                authService.postTokenByParentId({ token, userId, userName, codePin }).then(response => {
                    console.log(response);
                    if (response != '') {
                        const { status } = response;
                        if (status == 200) {
                            const { access_token } = response;
                            Helper.saveToken(response.access_token);
                            Helper.saveUserId(response.userid);
                            const { GradeId, DisplayName, Role } = jwtDecode(access_token);
                            const gradeId = GradeId;
                            const displayName = DisplayName;
                            this.props.fetchListSubjectStart({ GradeId, token });
                            this.setState({
                                Role: Role,
                                index: Role == 'PARENT' ? 5 : 1,
                                visibleAcountModal: false,
                                isLoadingGrade: false,
                                visibleCodePin: false,
                                RoleParent: true,
                            });
                            this.props.makeRequestProfileAction({
                                displayName, gradeId, userName, userId
                            });
                            const subjectId = MATH_KIT;
                            this.props.makeRequestFlashCard({ token, subjectId, gradeId: 'C1', indexPage });
                            this.props.fetchPakageList({ token, indexPage });
                            this.props.navigation.navigate({ routeName: 'TabBottom', key: 'TabBottomId' });
                        } else {
                            this.setState({ isLoadingGrade: false, errors: response.message });
                        }
                    } else {
                        this.setState({ isLoadingGrade: false, errors: 'Có lỗi xảy ra' });
                    }
                }).catch(err => {
                    console.log("a son bin log 1")
                })
            });
        } else {
            Helper.getTokenParent().then(token => {
                authService.postTokenByUserid({ token, userId, userName, codePin }).then(response => {
                    if (response != '') {
                        const { status } = response;
                        if (status == 200) {
                            const { access_token } = response;
                            Helper.saveTokenChild(response.access_token);
                            Helper.saveToken(response.access_token);
                            Helper.saveUserId(response.userid);

                            const { GradeId, DisplayName, Role } = jwtDecode(access_token);
                            const gradeId = GradeId;
                            const displayName = DisplayName;
                            this.props.fetchListSubjectStart({ GradeId, token });
                            this.setState({
                                Role: Role,
                                index: Role == 'PARENT' ? 5 : 1,
                                gradeName: `Lớp ${GradeId.substring(1)}`,
                                visibleAcountModal: false,
                                isLoadingGrade: false,
                                visibleCodePin: false,
                                RoleParent: false,
                            });
                            this.props.makeRequestProfileAction({
                                displayName, gradeId, userName, userId
                            });
                            this.props.fetchPakageList({ token, indexPage });
                            Helper.getTokenChild().then(token2 => {
                                console.log("token2: ,", token2);
                                const indexPage = 0;
                                const token = token2;
                                parentService.getPackageListChild({ token, indexPage }).then(response => {
                                    console.log("response: ", JSON.stringify(response));
                                    this.setState({ listPackagesChild: response });
                                    if (response.length > 0) {
                                        const packageCode = response[0].packageCode;
                                        this.setState({ currentPackageCode: packageCode });
                                        console.log('packageCode: ', packageCode);
                                        this.loadingMissonExercise(token, packageCode)
                                    }
                                }).catch(err => {
                                    console.log("a son bin log 2")
                                });
                            })
                        } else {
                            this.setState({ isLoadingGrade: false, errors: response.message });
                        }
                    } else {
                        this.setState({ isLoadingGrade: false, errors: 'Có lỗi xảy ra' });
                    }
                })
            });
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (AppState.currentState == 'active') {
            Orientation.lockToLandscape();
        }
    }

    componentWillReceiveProps(previewState, nextState) {
        return true;
    }

    getRowWidthPractice() {
        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            this.setState({
                row_practice_width: ((height - 100) / 2) - 10
            });
            // do something
        } else {
            this.setState({
                row_practice_width: ((height - 100) / 2) - 10
            });
            // do something else
        }
    }

    onPress(type) {
        const { Role } = this.state;
        if (Role == 'STUDENT') {
            switch (type) {
                case 2:
                    this.setState({ index: 2 });
                    break;
                case 3:
                    this.setState({ index: 3 });
                    break;
                case 4:
                    this.setState({ index: 4 });
                    break;
                case 5:
                    this.setState({ index: 5 });
                    break;
                default:
                    this.setState({ index: 1 });
                    break;
            }
        } else {
            this.refs.toast.show('Bạn cần phải chuyển đổi sang tài khoản học sinh!');
        }

    }

    renderContent() {
        const { index } = this.state;
        console.log("indexL ", index);
        switch (index) {
            case 2:
                return <Practice
                    displayName={this.props.displayName}
                    row_practice_width={this.state.row_practice_width}
                    navigation={this.props.navigation}
                    type={type_exam}
                    maintenance={this.maintenance.bind(this)}
                    listSubject={this.props.listSubject}
                    packageCode={this.state.currentPackageCode}
                />;
            case 3:
                return <Practice type={type_kiwi}
                    navigation={this.props.navigation}
                    packageCode={this.state.currentPackageCode}
                    maintenance={this.maintenance.bind(this)} />;
            case 4:
                return <Practice
                    maintenance={this.maintenance.bind(this)}
                    type={type_trophy}
                    packageCode={this.state.currentPackageCode}
                    navigation={this.props.navigation} />;
            case 5:
                return <Parent navigation={this.props.navigation} showConfirm={this.showConfirm.bind(this)} />;
            default:
                return <Practice
                    maintenance={this.maintenance.bind(this)}
                    userName={this.props.UserName}
                    displayName={this.props.displayName}
                    navigation={this.props.navigation}
                    type={type_practice}
                    listSubject={this.props.listSubject}
                    packageCode={this.state.currentPackageCode}
                    userId={this.props.userId}
                />;
        }
    }

    getBackground(index) {
        switch (index) {
            // case 1:
            //     return AppIcon.background_main;
            // case 2:
            //     return AppIcon.background_intro;
            // case 3:
            //     return AppIcon.bg_score;
            // case 4:
            //     return AppIcon.background_new;
            default:
                return AppIcon.background_main;
        }
    }

    updateParent(codePin) {
        const displayName = this.props.displayNameParent;
        const email = this.props.emailParent;
        const gender = this.props.genderParent || 'NU';
        const birthday = this.props.birthdayParent || '0000-00-00';
        if (codePin.length < 4 || codePin.length > 8) {
            this.setState({ errors: 'Mã pin phải từ 4 đến 8 kí tự!' });
            return;
        }
        Helper.getToken().then(token => {
            authService.postUpdateParent({ displayName, email, codePin, gender, birthday, token }).then(res => {
                if (res != "") {
                    console.log(res);
                    const { status } = res;
                    if (status == 200) {
                        this.setState({ visibleCodePin: false });
                        Helper.saveToken(res.access_token);
                        this.refs.toast.show('Cập nhật thành công!');
                    } else {
                        this.setState({ errors: 'Tạo mã pin thất bại, xin vui lòng thử lại!' });
                        this.refs.toast.show('Cập nhật thất bại!');
                    }
                    this.setState({ isLoading: false });
                } else {
                    this.refs.toast.show('Cập nhật thất bại!');
                    this.setState({
                        errors: 'Có lỗi xảy ra, xin vui lòng thử lại!',
                        isLoading: false
                    });
                }
            });
        });
    }

    maintenance() {
        this.refs.toast.show('Nội dung đang được xây dựng, vui lòng thử lại sau !');
    }

    showListAccount(b) {
        this.setState({
            visibleAcountModal: b
        });
        playSoundButton();
    }

    showConfirm(item) {
        const { userId, userName, role } = item;
        this.setState({
            userId,
            userName,
            typeCodePin: 'confirm',
            visibleCodePin: true,
            roleSelect: role,
            errors: ''
        });
        playSoundButton();
    }

    showConfirmDialog() {
        const item = {
            userId: this.props.userParentId,
            userName: this.props.userParentName,
            role: 'PARENT'
        }
        this.showConfirm(item);
    }

    addCodePin() {
        this.setState({
            typeCodePin: 'add',
            visibleCodePin: true,
            errors: ''
        });
        playSoundButton();
    }

    gotoSignOut() {
        Helper.saveToken('');
        Helper.saveTokenParent('');
        Helper.saveUserId('');
        Helper.saveUserPost('');
        this.props.navigation.navigate('Auth');
    }

    handleMission(b) {
        this.setState({
            visibleMisson: b
        });
    }


    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    onChangedPackage(value) {
        console.log("changed value: ", value);
        this.setState({ currentPackageCode: value });
        const packageCode = value;
        Helper.getTokenChild().then(token => {
            this.loadingMissonExercise(token, packageCode);
        })
    }

    render() {
        const { index, typeCodePin } = this.state;
        const { isLoadingSubject, listChild, isLoadingGrade } = this.props;
        return (
            <View style={styles.container}>
                <ImageBackground source={this.getBackground(index)} style={{ width: '100%', height: '100%' }} resizeMode={'cover'} >
                    {!this.state.RoleParent && <View style={{ flex: 1 }}>
                        <Header
                            listPackage={this.state.listPackagesChild}
                            ref='header'
                            role={this.state.Role}
                            RoleParent={this.state.RoleParent}
                            listGrade={this.props.listGrade}
                            gradeId={this.props.gradeId}
                            gradeName={this.state.gradeName}
                            userName={this.props.UserName}
                            displayName={this.props.displayName}
                            displayNameParent={this.props.displayNameParent}
                            onPress={() => { }}
                            // onPress={() => {this.showListAccount(true)}}
                            handleMission={this.handleMission.bind(this)}
                            onChangeText={this.onChangedPackage.bind(this)}
                            listChild={listChild}
                            userId={this.props.userId}
                            showParentShift={() => { this.showConfirmDialog() }}
                        />
                        <View style={styles.contents}>
                            {this.renderContent()}
                        </View>
                    </View>}
                    {!this.state.RoleParent && <Tabs
                        Role={this.state.Role}
                        RoleParent={this.state.RoleParent}
                        index={index}
                        onPress={this.onPress.bind(this)}
                    />}
                </ImageBackground>
                {(this.state.visibleAcountModal || this.state.RoleParent) &&
                    <ListAccountModal
                        ref='listAccountModal'
                        role={this.state.Role}
                        userId={this.props.userId}
                        listChild={listChild}
                        navigation={this.props.navigation}
                        logOut={this.gotoSignOut.bind(this)}
                        displayName={this.props.displayName}
                        displayNameParent={this.props.displayNameParent}
                        userParentId={this.props.userParentId}
                        userParentName={this.props.userParentName}
                        phoneNumber={this.props.phoneNumberParent}
                        showConfirm={this.showConfirm.bind(this)}
                        showListAccount={this.showListAccount.bind(this)}
                        updateSubuser={this.updateSubuser.bind(this)}
                    />
                }
                <LoadingMain isLoading={isLoadingSubject && isLoadingGrade && this.state.isLoadingMissonEx} />
                {this.state.visibleCodePin &&
                    <ConfirmSecurity ref='confirmsecurity'
                        typeCodePin={typeCodePin}
                        errors={this.state.errors}
                        userId={this.state.userId}
                        userName={this.state.userName}
                        closeCodePin={() => this.setState({ visibleCodePin: false })}
                        updateSubuser={this.updateSubuser.bind(this)}
                        updateParent={this.updateParent.bind(this)} />
                }
                {this.state.visibleMisson &&
                    <MissionContainer
                        handleMission={this.handleMission.bind(this)}
                        navigation={this.props.navigation} />
                }
                <Toast ref="toast" position={'top'} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    body: {
        flex: 1,
        flexDirection: 'row'
    },
    contents: {
        flex: 1,
        marginLeft: tab_main_width,
    }

});