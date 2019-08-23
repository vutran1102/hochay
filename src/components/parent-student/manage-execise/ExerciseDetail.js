import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as FormforExercise from './FormForExerciseDetail';
import HeaderNavigation from '../../common/HeaderNavigation';
import RippleButton from '../../common/RippleButton';
import { connect } from 'react-redux';
import { fetchPathwayAction, getExerciesToAssignStartAction } from '../../../actions/parentAction';
import { LoadingTransparent } from '../../common/LoadingScreen';
import Toast, { DURATION } from 'react-native-easy-toast';
import parentService from '../../../services/parentService';
import Helper from '../../../utils/Helpers';
import { getExerciesStartAction, getExerciseDetailStartAction } from '../../../actions/parentAction';
import DateTimePicker from 'react-native-modal-datetime-picker';
import HeaderParent from '../HeaderParent';
import AppIcon from '../../../utils/AppIcon';
import InputMessage from './InputMessage';

const screenSize = Dimensions.get('window');
let { width, height } = screenSize;
let s = width;
if (width > height) {
    width = height;
    height = s;
}

class ExerciseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageText: 'Làm cẩn thận nha con',
            levelCondition: '',
            isDateTimePickerVisible: false,
        }
    }

    onTextChange(text) {
        this.setState({ messageText: text })
    }

    goBack(isSave) {
        this.props.backCallback();
    }

    onDeadlinePress() {
        this.setState({ isDateTimePickerVisible: true })
    }

    onConditionChanged(index) {
        this.setState({ levelCondition: index })
    }

    onDropDownChoose() {

    }

    onDeletePress() {
        Alert.alert(
            'Thông báo!',
            'Bạn có muốn xóa bài này không?',
            [
                {
                    text: 'Đồng ý',
                    onPress: () => {
                        Helper.getTokenParent().then(token => {
                            const { exerciseId } = this.props.data;
                            const { userId } = this.props;
                            parentService.deleteExercise({ token, exerciseId }).then(rp => {
                                this.refs.toast.show('Đã xóa bài tập !');
                                this.props.fetchExerciseData({ userId, token });
                                this.goBack();
                            })
                        })
                    }
                },
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }


    handleConditionIndex(index) {
        switch (index) {
            case 2: return 'Đạt';
            case 3: return 'Giỏi';
            case 4: return 'Xuất sắc'
        }
    }

    componentDidMount() {
        Helper.getTokenParent().then(token => {
            const { exerciseId } = this.props.data;
            const userId = this.props.userId;
            new Promise((resolve, reject) => {
                this.props.fetchExerciseDetail({ token, exerciseId, resolve, reject })
            }).then(response => {
                const { name, packageName, endTime, levelCondition, message, packageCode } = this.props.exerciseData;
                this.setState({ name, packageName, endTime, levelCondition, message, packageCode });
                this.props.fetchListPathway({ token, packageCode, userId });
            }).catch(err => {
                // 
            })
        })
    }

    validate({ configId, problemId, message, userId, packageCode, endTime, levelCondition }) {
        if (message == '') {
            this.refs.toast.show('Tin nhắn không được để trống !');
            return false;
        }
        if (!endTime) {
            this.refs.toast.show('Thời hạn không được để trống !');
            return false;
        }
        if (!problemId) {
            this.refs.toast.show('Bài học không được để trống !');
        }
        return true;
    }

    handleDatePicked = (d) => {
        let month = d.getMonth() + 1;
        let date = d.getDate();
        const timeStamp = (new Date(d.getFullYear(), month, date)).getTime();
        if (timeStamp < Date.now()) {
            this.setState({ timeEnd: 'không yêu cầu' })
            return;
        }
        if (month < 10) {
            month = `0${month}`;
        }
        if (date < 10) {
            date = `0${date}`;
        }
        this.setState({ endTime: timeStamp / 1000 });
        // this.setState({ timeEnd: date + '/' + (month) + '/' + d.getFullYear() });
        this.hideDateTimePicker();
    };

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });


    onSavePress() {
        Helper.getTokenParent().then(token => {
            const { message, packageCode, levelCondition } = this.state;
            const { problemId, exerciseId } = this.props.data;
            const userId = this.props.userId;
            const endTime = this.state.endTime;
            const configId = this.props.configId;
            const validate = this.validate({ configId, problemId, exerciseId, message, userId, packageCode, endTime, levelCondition });
            if (!validate) {
                return;
            }
            parentService.createExercise({ token, configId, exerciseId, problemId, message, userId, packageCode, endTime, levelCondition }).then(rp => {
                if (rp) {
                    this.refs.toast.show('Cập nhật thành công');
                    // this.props.fetchExerciseData({ userId, token });
                } else {
                    this.refs.toast.show('Cập nhật thất bại');
                }
            })
        })
    }

    render() {
        const { name, packageName, endTime, levelCondition, message } = this.state;
        const timeExpiration = (new Date(endTime * 1000)).toLocaleDateString();
        return (
            <TouchableWithoutFeedback style={{flex:1}} onPress={()=>{Keyboard.dismiss()}}>
                <View style={styles.root} >
                    <HeaderParent displayName={'Quản lý bài tập giao'} leftCallback={this.goBack.bind(this)} rightCallback={() => { this.goback(true) }} rightIcon={AppIcon.icn_check} />
                    {/* <HeaderNavigation title='Giao bài cho con' color='#fff' bgColor='blue' onPress={this.goBack.bind(this)} onMenuPress={() => { this.goback(true) }} icon='check' /> */}
                    <View style={styles.wrapWhite}>
                        <View style={{ paddingLeft: 20 }}>
                            <FormforExercise.PackageNameForm text={packageName} />
                            <FormforExercise.ExerciseChoose text={name} isCreate={false} canEdit={false} callback={() => { }} />
                            <FormforExercise.DeadlineForm text={timeExpiration} callback={this.onDeadlinePress.bind(this)} isBlue={true} marginRight={20} />
                            <FormforExercise.ConditionForm data={dataCondition} callback={this.onConditionChanged.bind(this)} canEdit={true} value={this.handleConditionIndex(levelCondition)} />
                            <InputMessage callback={this.onTextChange.bind(this)} value={message} />
                            <FormforExercise.ListenRecordForm />
                        </View>
                        <View style={styles.wrapEnd}>
                            <RippleButton style={styles.btnDelete} onPress={this.onDeletePress.bind(this)}>
                                <Text style={{ color: '#fff' }}>Xóa bài giao</Text>
                            </RippleButton>
                            <RippleButton style={styles.btnSave} onPress={this.onSavePress.bind(this)}>
                                <Text style={{ color: '#fff' }}>Lưu</Text>
                            </RippleButton>
                        </View>
                    </View>
                    <LoadingTransparent isLoading={this.props.isLoadingExerciseDetail} bgColor='rgba(0,0,0,0.5)' />
                    <Toast ref="toast" position={'top'} />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={(d) => this.handleDatePicked(d)}
                        onCancel={this.hideDateTimePicker}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

mapStateToProps = state => {
    return {
        listPackage: state.package.listPackageUser,
        configId: state.parent.configId,
        listExerciseToAssign: state.parent.exercisesToAssign,
        isLoading: state.parent.isLoading,
        exerciseData: state.parent.exerciseDetail
    }
}

mapDispathToProps = dispatch => {
    return {
        fetchListPathway: (payload) => {
            dispatch(fetchPathwayAction(payload))
        },
        // fetchListExerciseToAssign: payload => {
        //     dispatch(getExerciesToAssignStartAction(payload))
        // },
        fetchExerciseData: payload => {
            dispatch(getExerciesStartAction(payload))
        },
        fetchExerciseDetail: payload => {
            dispatch(getExerciseDetailStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(ExerciseDetail);

const styles = StyleSheet.create({
    wrapWhite: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: height,
    },
    root: {
        flex: 1,
        height: height
    },
    wrapEnd: {
        marginTop: 40,
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnDelete: {
        width: 170,
        height: 37,
        borderBottomWidth: 3,
        borderColor: '#f8544f',
        backgroundColor: '#fa746e',
        alignItems: 'center',
        justifyContent: 'center',
        left: -10,
        borderRadius: 8,
    },
    btnSave: {
        width: 170,
        height: 37,
        borderBottomWidth: 3,
        backgroundColor: '#fd9c2d',
        borderColor: '#fd7d25',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        right: -10,
    }
})

const dataDropDown = [{
    value: 'MATH-C1',
    label: 'Toán - Lớp 1'
}, {
    value: 'MATH-C2',
    label: 'Toán - Lớp 2'
}, {
    value: 'MATH-C3',
    label: 'Toán - Lớp 3'
}, {
    value: 'ENG-C1',
    label: 'Tiếng Anh - Lớp 1'
}, {
    value: 'ENG-C2',
    label: 'Tiếng Anh - Lớp 2'
}, {
    value: 'ENG-C3',
    label: 'Tiếng Anh - Lớp 3'
}, {
    value: 'VIET-C1',
    label: 'Tiếng Việt - Lớp 1'
}, {
    value: 'VIET-C2',
    label: 'Tiếng Việt - Lớp 2'
}, {
    value: 'VIET-C3',
    label: 'Tiếng Việt - Lớp 3'
}];

const dataCondition = [{
    value: 4,
    label: 'Xuất sắc'
}, {
    value: 3,
    label: 'Giỏi'
}, {
    value: 2,
    label: 'Đạt'
}]