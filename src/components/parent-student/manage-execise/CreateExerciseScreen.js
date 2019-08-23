import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import HeaderNavigation from '../../common/HeaderNavigation';
import * as FormforExercise from './FormForExerciseDetail'
import RippleButton from '../../common/RippleButton';
import ChooseExerciseParentScreen from './ChooseExerciseParentScreen';
import { fetchPathwayAction, getExerciesToAssignStartAction, getExerciesStartAction } from '../../../actions/parentAction';
import { connect } from 'react-redux';
import { LoadingTransparent } from '../../common/LoadingScreen';
import Helper from '../../../utils/Helpers';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast, { DURATION } from 'react-native-easy-toast';
import parentService from '../../../services/parentService';
import HeaderParent from '../HeaderParent';
import AppIcon from '../../../utils/AppIcon';
import { Dropdown } from 'react-native-material-dropdown';
import InputMessage from './InputMessage';

const screenSize = Dimensions.get('window');
let { width, height } = screenSize;
let s = width;
if (width > height) {
    width = height;
    height = s;
}

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

// export class CustomizeDropdown extends Component {
//     state = {}
//     render() {
//         return (
//             <View style={styles.containerDropdown}>
//                 <View style={[styles.rowForm, { width: this.props.width || 370 }]}>
//                     <Image source={AppIcon.icon_arrow_down_orange} resizeMode='contain' style={{ width: 20, height: 20, position:'absolute', right: 15, top: 5 }} />
//                     <Dropdown
//                         dropdownOffset={{top: 80, left: 20}}
//                         ref='dropdown'
//                         textColor='rgb(169, 169, 169)'
//                         fontSize={13}
//                         // disabled={isDisable}
//                         rippleInsets={{ top: 0, bottom: 0 }}
//                         renderBase={({title}) => {
//                             return (
//                                 <View style={{width: 320, height: 30}}>
//                                     <Text style={styles.textInput}>{title}</Text>
//                                 </View>
//                                 // <RippleButton onPress={()=>{consle.log('ewqjoehquiehqu')}} style={{width: this.props.width || 320, height: 30, marginLeft: 10, position: 'absolute', top: - 30}}>
//                                 //     <View>

//                                 //     </View>
//                                 // </RippleButton>
//                             )
//                         }}
//                         data={this.props.data}
//                         containerStyle={{ width: this.props.width || 320, height: 30, marginLeft: 10, position: 'absolute'}}
//                         // rippleInsets={{top:0, bottom: 0}}
//                         // rippleCentered= {true}
//                         value={this.props.value || this.props.data[0].value}
//                         onChangeText={(item) => { console.log('onChange Value dropdown,: ', item); this.props.onChangeText(item) }}
//                     />
//                 </View>
//             </View>
//         );
//     }
// }

class CreateExerciseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            isHideChooseScreen: true,
            packageCode: '',
            isDateTimePickerVisible: false,
            timeEnd: 'không yêu cầu',
            isBlue: true,
            timeStamp: 0,
            levelCondition: 2,
            endTimeStampBySec: 0,
            lessonName: 'Thêm bài học cần giao',
            problemId: ''
        }
    }

    goback(isSave) {
        this.props.backCallback();
    }

    onTextChange(text) {
        this.setState({ message: text });
    }

    onDeadlinePress() {
        this.setState({ isDateTimePickerVisible: true })
    }

    onConditionChanged(index) {
        this.setState({ levelCondition: index });
    }

    onAddExerciseBtn() {
        this.setState({ isHideChooseScreen: false })
    }

    onChoosedAnExercise(data) {
        this.setState({ isHideChooseScreen: true });
        const { problemId, name } = data;
        this.setState({ lessonName: name, problemId: problemId });
    }

    backCallback() {
        this.setState({ isHideChooseScreen: true })
    }

    onAssignBtnPressed() {
        Helper.getTokenParent().then(token => {
            const { message, packageCode, levelCondition, problemId } = this.state;
            const userId = this.props.userId;
            const endTime = this.state.endTimeStampBySec;
            const configId = this.props.configId;
            const validate = this.validate({ configId, problemId, message, userId, packageCode, endTime, levelCondition });
            if (!validate) {
                return;
            }
            parentService.createExercise({ token, configId, problemId, message, userId, packageCode, endTime, levelCondition }).then(rp => {
                if (rp) {
                    this.refs.toast.show('Cập nhật thành công');
                    new Promise((resolve, rejects) => {
                        this.props.fetchExerciseData({ userId, token, resolve, rejects });
                    }).then(rp => {
                        this.goback();
                        this.backCallback();
                    }).catch(err => {
                        this.refs.toast.show('Cập nhật thất bại');
                    });
                } else {
                    this.refs.toast.show('Cập nhật thất bại');
                }
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

    componentDidMount() {
        if (this.props.listPackage.length) {
            Helper.getTokenParent().then(token => {
                const packageCode = this.props.listPackage[0].packageCode;
                const userId = this.props.userId;
                // const userId = '5c77b8e3de2a200001947fed';
                this.props.fetchListExerciseToAssign({ token, userId, packageCode });
                this.props.fetchListPathway({ token, userId, packageCode });
            })
        }
    }

    componentWillMount() {
        if (this.props.listPackage.length)
            this.setState({ packageCode: this.props.listPackage[0].packageCode });
    }

    makeDataDropdown() {
        if (this.props.listPackage.length > 0) {
            let result = [];
            const listPackage = this.props.listPackage;
            for (let i = 0; i < listPackage.length; i++) {
                result.push({ value: listPackage[i].packageCode, label: listPackage[i].packageName })
            }
            return result;
        }
        return [];
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
        this.setState({ endTimeStampBySec: timeStamp / 1000 });
        this.setState({ timeEnd: date + '-' + (month) + '-' + d.getFullYear() });
        this.hideDateTimePicker();
    };

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    onDropDownChoose(packageCode) {
        this.setState({ packageCode: packageCode });
        Helper.getTokenParent().then(token => {
            const userId = this.props.userId;
            this.props.fetchListPathway({ token, userId, packageCode });
            this.props.fetchListExerciseToAssign({ token, userId, packageCode });
        })
    }

    render() {
        // console.log("listExerciseToAssign: ", JSON.stringify(this.props.listExerciseToAssign));
        return (
            <TouchableWithoutFeedback style={{ width: width, height: height }} onPress={() => Keyboard.dismiss()}>
                <View style={styles.rootView}>
                    {this.state.isHideChooseScreen && <View style={styles.container}>
                        {/* <HeaderNavigation title='Giao bài cho con' bgColor='blue' color='#fff' onPress={() => { this.goback() }} onMenuPress={() => { this.goback(true) }} icon='check' /> */}
                        <HeaderParent displayName={'Quản lý bài tập giao'} leftCallback={() => { this.goback() }} rightCallback={() => { this.onAssignBtnPressed() }} rightIcon={AppIcon.icn_check} />
                        <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, width: width, marginBottom: 0, paddingHorizontal: 20, paddingTop: 20 }}>
                            {/* <View style={{ flex: 1, paddingHorizontal: 20 }}> */}
                            {this.props.listPackage.length && <FormforExercise.GradeSubjectDropDown widthProps={width * 0.7} data={this.makeDataDropdown()} callback={this.onDropDownChoose.bind(this)} marginTop={20} value={this.makeDataDropdown()[0].value} />}
                            <FormforExercise.ExerciseChoose text={this.state.lessonName} isCreate={true} onPress={this.onAddExerciseBtn.bind(this)} />
                            <FormforExercise.DeadlineForm text={this.state.timeEnd} callback={this.onDeadlinePress.bind(this)} isBlue={this.setState.isBlue} />
                            <FormforExercise.ConditionForm data={dataCondition} callback={this.onConditionChanged.bind(this)} canEdit={true} value={2} />
                            {/* <TouchableWithoutFeedback onPress={()=>this.refMessage.refs.iii.focus()}>
                                <FormforExercise.InputMessage callback={this.onTextChange.bind(this)} value={this.state.message} ref={view=>this.refMessage=view}/>
                            </TouchableWithoutFeedback> */}
                            <InputMessage callback={this.onTextChange.bind(this)} value={this.state.message}/>
                            <FormforExercise.FormRecord />
                        </View>
                        <RippleButton style={styles.btn} onPress={() => { this.onAssignBtnPressed() }}>
                            <Text style={styles.lbTextOnButton}>GIAO BÀI CHO CON</Text>
                        </RippleButton>
                        {/* </View> */}
                    </View>}
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={(d) => this.handleDatePicked(d)}
                        onCancel={this.hideDateTimePicker}
                    />
                    {!this.state.isHideChooseScreen && <ChooseExerciseParentScreen backCallback={this.backCallback.bind(this)} dataExercise={this.props.listExerciseToAssign} userId={this.props.userId} packageCode={this.state.packageCode} onChoosedExercise={(data) => this.onChoosedAnExercise(data)} />}
                    <LoadingTransparent isLoading={this.props.isLoading} bgColor='rgba(0,0,0,0.5)' />
                    <Toast ref="toast" position={'top'} />
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
    }
}

mapDispathToProps = dispatch => {
    return {
        fetchListPathway: (payload) => {
            dispatch(fetchPathwayAction(payload))
        },
        fetchListExerciseToAssign: payload => {
            dispatch(getExerciesToAssignStartAction(payload))
        },
        fetchExerciseData: payload => {
            dispatch(getExerciesStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(CreateExerciseScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    rootView: {
        // flex: 1,
        width: width,
        height: height,
        alignItems: 'center',
    },
    lbTextOnButton: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
    btn: {
        backgroundColor: 'rgb(255, 155, 26)',
        position: 'absolute',
        width: 295,
        height: 44,
        bottom: 20,
        justifyContent: 'center',
        alignItems: "center"
    },
    containerDropdown: {
        alignItems: 'center',
        marginBottom: 10
    },
    textInput: {
        top: 7,
        fontSize: 12,
        fontFamily: 'Roboto-MediumItalic',
        color: 'rgb(166, 168, 171)'
    },
    rowForm: {
        marginHorizontal: 20,
        flexDirection: 'row',
        height: 30,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgb(255, 160, 54)'
    },
})