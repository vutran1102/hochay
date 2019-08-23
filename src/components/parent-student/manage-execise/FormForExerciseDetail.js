import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import RippleButton from '../../common/RippleButton';
import AppIcon from '../../../utils/AppIcon';

const screenSize = Dimensions.get('window');
let { width, height } = screenSize;
let s = width;
if (width > height) {
    width = height;
    height = s;
}

export const GradeSubjectDropDown = ({ data, callback, value, marginTop, isDisable, widthProps }) => {
    return (
        <View style={[styles.dropdownForm, { marginTop: marginTop || 0 }]}>
            <Text style={styles.lbInDropdownStyle}>Môn</Text>
            <View style={styles.containerDropdown}>
                <Image source={AppIcon.icon_arrow_down_orange} resizeMode='contain' style={{ width: 15, height: 10, tintColor: 'orange', position: 'absolute', right: 10 }} />
                <Dropdown
                    disabled={isDisable}
                    data={data}
                    // containerStyle={{ width: 150, height: 20, marginLeft: '30%', position: 'absolute', top: - 35 }}
                    rippleInsets={{ top: 0, bottom: 0 }}
                    dropdownOffset={{ top: 20, left: 5 }}
                    textColor='rgb(169, 169, 169)'
                    fontSize={13}
                    renderBase={({ title }) => {
                        return (
                            <View style={{ width: widthProps || 220, height: 30, paddingLeft: 10 }}>
                                <Text style={styles.textInput}>{title}</Text>
                            </View>
                            // <RippleButton onPress={()=>{consle.log('ewqjoehquiehqu')}} style={{width: this.props.width || 320, height: 30, marginLeft: 10, position: 'absolute', top: - 30}}>
                            //     <View>

                            //     </View>
                            // </RippleButton>
                        )
                    }}
                    // rippleInsets={{top:0, bottom: 0}}
                    // rippleCentered= {true}
                    value={value || 'MATH-C1'}
                    // onChangeText={(item) => { console.log('onChange Value dropdown,: ', item); callback(item) }}
                    onChangeText={(item) => { console.log('onChange Value dropdown,: ', item); callback(item) }}
                />
            </View>
        </View>
    )
}

export const ExerciseChoose = ({ callback, text, canEdit, onPress, isCreate }) => {
    return (
        <View style={styles.exerciseChoose}>
            <Text style={styles.textExerciseChoose}>Bài học</Text>
            <RippleButton style={styles.btnExerciseChoose} onPress={() => { onPress && onPress() }}>
                {!!isCreate && <Text style={styles.excerciseCanEdit}>+</Text>}
                <Text style={(canEdit || isCreate) && styles.excerciseCanEdit} multiline={true}>{text}</Text>
                {canEdit && <Icon name={'pencil'} size={25} color={'#4087EB'} style={{ left: 20, top: -5 }} />}
            </RippleButton>
        </View>
    )
}

export const InputMessage = ({ callback, value }) => {
    return (
        <View style={styles.input}>
            <Text style={styles.lbInput}>Nội dung nhắn con</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    ref='iii'
                    multiline={true}
                    placeholder='Nội dung lời nhắn 300 kí tự'
                    value={value || ''}
                    onChangeText={(text) => { callback(text) }}
                />
            </View>
        </View>
    )
}

export const DeadlineForm = ({ text, callback, isBlue, marginRight }) => {
    return (
        <View style={styles.deadLine}>
            <Text style={styles.lbDeadline}>Thời hạn hoàn thành</Text>
            <RippleButton style={[styles.btnDeadline, { marginRight: marginRight || 0 }]} onPress={() => callback()}>
                <Image source={AppIcon.icn_calender} resizeMode='contain' style={{ width: 16, height: 16, position: 'absolute', right: 10 }} />
                <Text style={{ color: '#4087EB', fontSize: 14, }} >{text}</Text>
            </RippleButton>
        </View>
    )
}

export const PackageNameForm = ({ text }) => {
    return (
        <View style={styles.packageName}>
            <Text style={styles.lbDeadline}>Môn</Text>
            <RippleButton style={styles.btnPackageName}>
                <Text style={{ color: '#000', fontSize: 14, }} >{text}</Text>
            </RippleButton>
        </View>
    )
}

export const ConditionForm = ({ data, callback, canEdit, value }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', width: width, marginTop: 30 }}>
            <Text style={styles.lbCondition}>Điều kiện tối thiểu</Text>
            {canEdit ? <View style={styles.condition}>
                <Dropdown
                    data={data}
                    // containerStyle={{ width: 150, height: 20, top: - 40 }}
                    // rippleInsets={{top:0, bottom: 0}}
                    // rippleCentered= {true}
                    value={value}
                    onChangeText={(item) => { console.log('onChange Value dropdown,: ', item); callback(item) }}
                    rippleInsets={{ top: 0, bottom: 0 }}
                    dropdownOffset={{ top: 20, left: 5 }}
                    textColor='rgb(169, 169, 169)'
                    fontSize={13}
                    renderBase={({ title }) => {
                        return (
                            <View style={{ width: width * 0.5, height: 30, paddingLeft: 10 }}>
                                <Text style={styles.textInput}>{title}</Text>
                            </View>
                            // <RippleButton onPress={()=>{consle.log('ewqjoehquiehqu')}} style={{width: this.props.width || 320, height: 30, marginLeft: 10, position: 'absolute', top: - 30}}>
                            //     <View>

                            //     </View>
                            // </RippleButton>
                        )
                    }}
                />
            </View> : <Text>{data}</Text>}
        </View>
    )
}

export const FormRecord = () => {
    return (
        <View style={styles.recordForm} >
            <RippleButton style={{ width: 35, height: 35 }} radius={20}>
                {/* <Icon name='microphone' size={30} color='#000' /> */}
                <Image source={AppIcon.icn_micro} resizeMode='contain' style={{ width: 35, height: 35 }} />
            </RippleButton>
            <Text style={styles.lbRecord}>Ghi âm lời nhắn cho bé</Text>
        </View>
    )
}

export const ListenRecordForm = ({ isHideDelete }) => {
    return (
        <View style={styles.recordForm} >
            <RippleButton>
                {/* <Icon name='play-circle' size={30} color='#000' /> */}
                <Image source={AppIcon.icn_play} resizeMode='contain' style={{ width: 49, height: 49 }} />
            </RippleButton>
            <Text style={styles.lbRecord}>Nghe lại lời nhắn</Text>
            {!isHideDelete && <View style={{flexDirection: 'row', alignItems:'center', marginLeft: 30}}>
                <RippleButton>
                    <Image source={AppIcon.icn_trash} resizeMode='contain' style={{ width: 49, height: 49 }} />
                </RippleButton>
                <Text style={[styles.lbRecord, { color: 'red' }]}>Xóa lời nhắn</Text>
            </View>}
        </View>
        )
    }
    
export const MessageViewForm = ({value}) => {
    return (
        <View style={styles.input}>
                <Text style={styles.lbInput}>Nội dung nhắn con</Text>
                <View style={styles.inputContainer}>
                    <Text>{value}</Text>
                </View>
            </View>
            )
        }
        
        
const styles = StyleSheet.create({
                btnPackageName: {
                width: 0.7 * width,
            height: 32,
            borderWidth: 1,
            borderRadius: 3,
            borderColor: 'rgb(187, 206, 228)',
            position: 'absolute',
            right: 20,
            // alignItems: 'center',
            paddingLeft: 10,
            justifyContent: 'center'
        },
    lbRecord: {
                color: '#bcbcbc',
            marginLeft: 10,
            fontSize: 14,
            color:'rgb(247, 189, 2)'
        },
    recordForm: {
                flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center'
        },
    lbCondition: {
                fontSize: 14,
            fontWeight: '100'
        },
    condition: {
                width: width * 0.5,
            position: 'absolute',
            right: 40,
            borderWidth: 1,
            borderRadius: 3,
            borderColor: 'rgb(187, 206, 228)',
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
        },
    btnDeadline: {
                marginLeft: 40,
            paddingLeft:10,
            // alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 3,
            borderColor: 'rgb(187, 206, 228)',
            width: 0.5 * width,
            position: 'absolute',
            right: 0,
            height: 32,
        },
    deadLine: {
                flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30
        },
    packageName: {
                marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 20
        },
    textExerciseChoose: {
                fontSize: 14,
            fontWeight: '100'
        },
    btnExerciseChoose: {
                flexDirection: 'row',
            alignSelf: 'center',
            position: 'absolute',
            right: 40,
            width: width * 0.7,
            borderWidth: 1,
            height: 35,
            borderColor: 'rgb(187, 206, 228)',
            alignItems: 'center',
            paddingLeft: 10,
            borderRadius: 3
        },
    exerciseChoose: {
                marginTop: 10,
            width: width,
            flexDirection: 'row',
            // backgroundColor: 'red'
        },
    excerciseCanEdit: {
                color: 'rgb(107, 195, 44)',
        },
    dropdownForm: {
                width: width,
            height: 40,
            flexDirection: 'row',
        },
    lbInDropdownStyle: {
                fontSize: 14,
            fontWeight: '100'
        },
    lbInput: {
                fontWeight: '100',
            fontSize: 14,
        },
    lbDeadline: {
                fontSize: 14,
            fontWeight: '100'
        },
    input: {
                width: width,
            height: 150,
            marginTop: 40,
        },
    inputContainer: {
                flex: 1,
            borderWidth: 1,
            marginTop: 10,
            width: width - 40,
            height: 120,
            paddingLeft: 10,
            borderColor: 'rgb(187, 206, 228)',
            borderRadius: 3
        },
    containerDropdown: {
                marginBottom: 10,
            backgroundColor: '#fff',
            flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 3,
            marginLeft: 10,
            paddingLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 4,
            right: 40,
            width: width * 0.7,
            borderColor: 'rgb(187, 206, 228)'
        },
    textInput: {
                top: 7,
            fontSize: 12,
            // color: 'rgb(166, 168, 171)'
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
    
