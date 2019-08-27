import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import RippleButton from '../../common/RippleButton';
import UpdatePathwayScreen from './UpdatePathwayScreen';
import { LoadingTransparent } from '../../common/LoadingScreen';
import { connect } from 'react-redux';
import { fetchPathwayAction } from '../../../actions/parentAction';
import parentService from '../../../services/parentService';
import Helper from '../../../utils/Helpers';
import HeaderParent from '../HeaderParent';
import AppIcon from '../../../utils/AppIcon';
import FormDropdown from '../../common/FormDropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast, { DURATION } from 'react-native-easy-toast';


const screenSize = Dimensions.get('window');
let { width, height } = screenSize;
let s = width;
if (width > height) {
    width = height;
    height = s;
}

class PathwayLearningListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfItems: 0,
            isShowUpdatePathwayScreen: false,
            time: 0,
            subjectName: '',
            packageCode: '',
            itemId: '',
            isDateTimePickerVisible: false,
            isShowPopupUpdate: false,
            datePicked: 'Chọn ngày',
            itemId: '',
        }
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleTimeLapPicker(d) {
        this.setState({itemId: d});
    }

    handleDatePicked = (d) => {
        // console.log('A date has been picked: ', d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear());
        let month = d.getMonth() + 1;
        let date = d.getDate();
        if (month < 10) {
            month = `0${month}`;
        }
        if (date < 10) {
            date = `0${date}`;
        }
        const datePicked = `${date}/${month}/${d.getFullYear()}`;
        this.setState({ datePicked });
        // console.log("datePicked: ",datePicked);
        // this.setState({ datePicked: d.getFullYear() + '-' + (month) + '-' + date });
        this.hideDateTimePicker();
    };

    getTimesNow() {
        const d = new Date(Date.now());
        let month = d.getMonth() + 1;
        let date = d.getDate();
        if (month < 10) {
            month = `0${month}`;
        }
        if (date < 10) {
            date = `0${date}`;
        }
        const datePicked = `${date}/${month}/${d.getFullYear()}`;
        this.setState({ datePicked });
    }

    componentWillMount() {
        if (this.props.listPackage.length)
            this.setState({ packageCode: this.props.listPackage[0].packageCode, numberOfItems: (this.props.listPathway).length });
    }

    componentDidMount() {
        if (this.props.listPackage.length) {
            Helper.getTokenParent().then(token => {
                const packageCode = this.props.listPackage[0].packageCode;
                this.setState({packageCode});
                const userId = this.props.userId;
                this.props.fetchListPathway({ token, userId, packageCode });
            })
        }
    }

    showPopUpdate() {
        this.setState({ isShowPopupUpdate: true });
    }

    hidePopUpdate() {
        this.setState({ isShowPopupUpdate: false });
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

    hanleStatusIndex(index) {
        switch (index) {
            case 0:
                return { status: 'Chưa luyện tập', textColor: 'rgb(187, 206, 228)' };
                break;
            case 1:
                return { status: 'Chưa đạt', textColor: 'rgb(252, 115, 106)' };
                break;
            case 2:
                return { status: 'Đạt', textColor: 'rgb(247, 189,2)' };
                break;
            case 3:
                return { status: 'Giỏi', textColor: 'rgb(107, 195, 44)' };
                break;
            case 4:
                return { status: 'Xuất sắc', textColor: 'rgb(107, 195, 44)' };
                break;
        }
    }

    isLearningNode(timeStart, timeEnd) {
        const currentTime = Math.floor(Date.now() / 1000);
        return (timeStart < currentTime && currentTime < timeEnd)
    }

    onDropdownChoosed(packageCode) {
        this.setState({ packageCode: packageCode });
        Helper.getTokenParent().then(token => {
            const userId = this.props.userId;
            this.props.fetchListPathway({ token, userId, packageCode });
        })
    }

    onItemPress(timeStart, title, itemId) {
        // Helper.getTokenParent().then(token => {
        this.setState({ isShowUpdatePathwayScreen: true, time: timeStart, subjectName: title, idItem: itemId })
        // })
    }

    makeDataGradeDropdown(inputData) {
        let dataResult = [];
        if (!inputData || !inputData.length) return dataResult;
        for (let i = 0; i < inputData.length; i++) {
            let singleData = inputData[i];
            dataResult.push({ value: singleData.id, label: singleData.title })
        }
        return dataResult;
    }

    onPressUpdate() {
        this.getTimesNow();
        Helper.getTokenParent().then(token => {
            // const data = this.props.data;
            const idItem = this.state.itemId;
            const configId = this.props.configId;
            const userId = this.props.userId;
            const dateStart = this.state.datePicked;
            if(!this.validate({dateStart, idItem})) return;
            this.setState({ isLoading: true })
            console.log("{ token, configId, idItem, userId, dateStart }: ", JSON.stringify({ token, configId, idItem, userId, dateStart }));
            parentService.updatePathway({ token, configId, idItem, userId, dateStart }).then((reponse) => {
                this.hidePopUpdate();
                alert('Cập nhật thành công!');
                this.setState({ isLoading: false })
                console.log("reponse: " , JSON.stringify(reponse));
                Helper.getTokenParent().then(token => {
                    const packageCode = this.state.packageCode;
                    const userId = this.props.userId;
                    this.props.fetchListPathway({ token, userId, packageCode });
                })
                // this.props.backCallback();
                // this.props.removeProplemsIdCached({ data: [] });
            })
        })
    }

    validate({ dateStart , idItem}) {
        console.log('dateStart , idItem: ', JSON.stringify({dateStart , idItem}));
        if (idItem == '') {
            this.refs.toast.show('Hãy chọn tuần học phù hợp!');
            return false;
        }
        if (dateStart=='Chọn ngày') {
            this.refs.toast.show('Hãy chọn ngày tương ứng với tuần học nhé!');
            return false;
        }
        return true;
    }

    render() {
        return (
            <View style={styles.root}>
                {!this.state.isShowUpdatePathwayScreen && <View style={{ flex: 1 }} >
                    <HeaderParent displayName={'Lộ trình học tập'} leftCallback={() => this.props.backCallback()} />
                    <View style={styles.containerItems}>
                        <View style={styles.wrapRowHeaderContainer}>
                            <RippleButton style={{ flexDirection: 'row', alignItems: 'center' }} radius={10} onPress={this.showPopUpdate.bind(this)}>
                                <Image source={AppIcon.icn_pen_edit} resizeMode='contain' style={{ width: 24, height: 24 }} />
                                <Text style={styles.updatelb}>Cập nhật lại lộ trình</Text>
                            </RippleButton>
                            <View style={styles.containerDropdown}>
                                {this.makeDataDropdown().length && <Dropdown
                                    data={this.makeDataDropdown()}
                                    containerStyle={{ width: 160, height: 30 }}
                                    rippleInsets={{ top: 0, bottom: 0 }}
                                    // textColor='#fff'
                                    // baseColor='#fff'
                                    // renderAccessory={() => {
                                    //     return(
                                    //         <Icon name='caret-down' size={20} color='#fff'/>
                                    //     )
                                    // }}
                                    renderBase={({ title }) => {
                                        return (
                                            <View style={{ flexDirection: 'row', width: 160, height: 30, alignItems: 'center' }}>
                                                <Text style={{ left: 20 }}>{title}</Text>
                                                <Image source={AppIcon.icon_arrow_down_orange} style={{ width: 15, height: 10, position: 'absolute', top: 10, right: 10, tintColor: '#FF9B19' }} resizeMode='contain' />
                                                {/* <Icon name='caret-down' size={20} color='#fff' style={{ position: 'absolute', top: 5, right: 10 }} /> */}
                                            </View>
                                        )
                                    }}
                                    value={this.makeDataDropdown()[0].label}
                                    onChangeText={(item) => { this.onDropdownChoosed(item) }}
                                />}
                            </View>
                        </View>
                        {this.makeDataDropdown().length && <FlatList
                            data={this.props.listPathway.length ? (this.props.listPathway) : []}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                const numberOfItems = (this.props.listPathway).length;
                                const isLastItem = (index == (numberOfItems - 1));
                                const { status, textColor } = this.hanleStatusIndex(item.levelPractice);
                                const { title, timeStart, timeEnd, id } = item;
                                // console.log("this.props.listPathway:, ", JSON.stringify(this.props.listPathway));
                                return (
                                    <RippleButton onPress={() => { this.onItemPress(timeStart, title, id) }}>
                                        {/* <RippleButton onPress={() => {  }}> */}
                                        <View style={styles.item}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                {!isLastItem && <View style={[styles.line, { borderColor: textColor }, this.isLearningNode(item.timeStart, item.timeEnd) && { borderColor: 'rgb(107, 195, 44)' }]} />}
                                                {/* {item.isLearning && <Icon name='flag' size={30} color='green' style={styles.flag} />} */}
                                                <View style={[styles.circle, { backgroundColor: textColor }, this.isLearningNode(item.timeStart, item.timeEnd) && { backgroundColor: 'rgb(107, 195, 44)' }]} >
                                                    <Text style={{ zIndex: 9, color: '#fff', fontWeight: '800' }}>{((index + 1) >= 10) ? (index + 1) : `0${index + 1}`}</Text>
                                                    {(index % 2 == 0)
                                                        ?
                                                        <View style={[styles.lineOutLeft, { borderColor: textColor }, this.isLearningNode(item.timeStart, item.timeEnd) && { borderColor: 'rgb(107, 195, 44)' }]}>
                                                            <View style={[styles.circleLeft, { backgroundColor: textColor }, this.isLearningNode(item.timeStart, item.timeEnd) && { backgroundColor: 'rgb(107, 195, 44)' }]}>
                                                                {item.isLearning && <Image source={AppIcon.icn_flag} style={styles.flag} />}
                                                                <View style={[styles.wrapCol]}>
                                                                    {/* <Text>{time}</Text> */}
                                                                    <Text style={[styles.title, { borderColor: textColor }, this.isLearningNode(item.timeStart, item.timeEnd) && { borderColor: 'rgb(107, 195, 44)' }]}>{title}</Text>
                                                                    <Text style={[styles.status, { color: textColor }, this.isLearningNode(item.timeStart, item.timeEnd) && { color: 'rgb(107, 195, 44)' }]}>{status}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        :
                                                        <View style={[styles.lineOutRight, { borderColor: textColor }, this.isLearningNode(item.timeStart, item.timeEnd) && { borderColor: 'rgb(107, 195, 44)' }]}>
                                                            <View style={[styles.circleRight, { backgroundColor: textColor }, this.isLearningNode(item.timeStart, item.timeEnd) && { backgroundColor: 'rgb(107, 195, 44)' }]}>
                                                                {item.isLearning && <Image source={AppIcon.icn_flag} style={styles.flag} />}
                                                                <View style={[styles.wrapColRight]}>
                                                                    {/* <Text>{time}</Text> */}
                                                                    <Text style={[styles.title, { borderColor: textColor }, this.isLearningNode(item.timeStart, item.timeEnd) && { borderColor: 'rgb(107, 195, 44)' }]}>{title}</Text>
                                                                    <Text style={[styles.status, { color: textColor }, this.isLearningNode(item.timeStart, item.timeEnd) && { color: 'rgb(107, 195, 44)' }]}>{status}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                    </RippleButton>
                                )
                            }}
                        />}
                        {!this.makeDataDropdown().length && <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 20 }}>Hãy đăng ký gói học cho con!</Text>}
                    </View>
                    {this.state.isShowPopupUpdate && <View style={styles.blackOverLay}>
                        <View style={styles.popUpUpdate}>
                            <Text style={styles.titlePopup}>CON BẠN ĐANG HỌC Ở TUẦN NÀO?</Text>
                            <View style={[styles.wrapRow, { marginTop: 20, paddingHorizontal: 10 }]}>
                                <Text style={styles.labelDetail}>Tuần học hiện tại:</Text>
                                <View style={styles.wrapDropdown}>
                                    <FormDropdown
                                        data={this.makeDataGradeDropdown(this.props.listPathway)}
                                        // containerStyle={{ width: 220, height: 20, marginLeft: 30, position: 'relative', top: - 35 }}
                                        onChangeText={this.handleTimeLapPicker.bind(this)}
                                        icon={AppIcon.icon_arrow_down_orange}
                                        width={120}
                                        // rippleInsets={{top:0, bottom: 0}}
                                        // rippleCentered= {true}
                                        style={{ borderRadius: 2, borderColor: 'rgb(187, 206, 228)', top: 3, }}
                                        value={'Chọn tuần phù hợp!'}
                                    />
                                </View>
                            </View>
                            {/* <View style={styles.wrapRow}>
                                <Text style={styles.labelDetail}>Thời gian tương ứng:</Text>
                                <View style={styles.wrapDropdown}>
                                    <RippleButton style={styles.textBox} radius={10} onPress={this.showDateTimePicker.bind(this)}>
                                        <Text style={styles.textInput}>{this.state.datePicked}</Text>
                                        <Image source={AppIcon.icn_calender} resizeMode='contain' style={{ width: 16, height: 16, position: 'absolute', right: 10 }} />
                                    </RippleButton>
                                </View>
                            </View> */}
                            <View style={[styles.wrapRow, { justifyContent: 'space-evenly', }]}>
                                <RippleButton style={styles.btnHuy} radius={10} onPress={this.hidePopUpdate.bind(this)}>
                                    <Text style={[styles.textInput, { fontFamily: 'Roboto-Bold', color: '#fff', top: 2, fontSize: 15 }]}>HỦY</Text>
                                </RippleButton>
                                <RippleButton style={styles.btnUpdate} radius={10} onPress={this.onPressUpdate.bind(this)}>
                                    <Text style={[styles.textInput, { fontFamily: 'Roboto-Bold', color: '#fff', top: 2, fontSize: 15 }]}>CẬP NHẬT</Text>
                                </RippleButton>
                            </View>
                        </View>
                    </View>}
                </View>}
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={(d) => this.handleDatePicked(d)}
                    onCancel={this.hideDateTimePicker}
                />
                <Toast ref="toast" position={'top'} />
                {this.state.isShowUpdatePathwayScreen && <UpdatePathwayScreen backCallback={() => { this.setState({ isShowUpdatePathwayScreen: false }) }} packageCode={this.state.packageCode} time={this.state.time} subjectName={this.state.subjectName} userId={this.props.userId} configId={this.props.configId} idItem={this.state.idItem} />}
                <LoadingTransparent isLoading={this.props.isLoading || this.state.isLoading} bgColor='rgba(0,0,0,0.5)' />
            </View>
        );
    }
}

mapStateToProps = state => {
    return {
        isLoading: state.parent.isLoading,
        listPathway: state.parent.pathway,
        listPackage: state.package.listPackageUser,
        configId: state.parent.configId
    }
}

mapDispathToProps = dispatch => {
    return {
        fetchListPathway: (payload) => {
            dispatch(fetchPathwayAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(PathwayLearningListScreen);

const itemHeight = 100;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    status: {
        top: 3
    },
    title: {
        top: -3
    },
    btnHuy: {
        width: 120,
        height: 40,
        backgroundColor: 'rgb(252, 115, 106)',
        borderRadius: 4,
        borderBottomWidth: 2,
        borderColor: '#FF5501',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnUpdate: {
        width: 120,
        height: 40,
        backgroundColor: 'rgb(255, 155, 26)',
        borderRadius: 4,
        borderBottomWidth: 2,
        borderColor: '#FF7D06',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titlePopup: {
        color: 'rgb(255, 155, 26)',
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
    },
    textInput: {
        fontSize: 12,
        fontFamily: 'Roboto-MediumItalic',
        color: 'rgb(166, 168, 171)'
    },
    labelDetail: {
        fontSize: 12,
        fontWeight: '800',
    },
    wrapDropdown: {
        height: 80,
        alignItems: 'center',
        width: 120,
        // backgroundColor:'red',
        justifyContent: 'center',
        position: 'absolute',
        right: 0
    },
    textBox: {
        borderRadius: 2,
        borderColor: 'rgb(187, 206, 228)',
        width: 120, height: 30,
        justifyContent: 'center',
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    wrapRow: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    popUpUpdate: {
        width: width * 0.8,
        height: height * 0.4,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignSelf: 'center',
        top: -20,
        borderWidth: 1.5,
        borderColor: 'rgb(94, 181, 234)',
        alignItems: 'center',
        padding: 20
    },
    blackOverLay: {
        width: width,
        height: height,
        zIndex: 9,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center'
    },
    flag: {
        position: 'absolute',
        top: -21,
        left: 9,
        zIndex: 1,
        width: 17.2,
        height: 21.2
    },
    circleRight: {
        width: 17.6,
        height: 17.6,
        borderRadius: 8.8,
        position: 'absolute',
        right: -9,
        top: -8.8
    },
    circleLeft: {
        width: 17.6,
        height: 17.6,
        borderRadius: 8.8,
        position: 'absolute',
        left: -8.8,
        top: -8.8
    },
    lineOutLeft: {
        position: 'absolute',
        width: 156,
        height: 2,
        borderWidth: 1,
        left: -134,
        top: 22
    },
    lineOutRight: {
        position: 'absolute',
        width: 156,
        height: 2,
        borderWidth: 1,
        left: 22,
        top: 22
    },
    containerDropdown: {
        height: 40,
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        right: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgb(187, 206, 228)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerItems: {
        flex: 1,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
    },
    item: {
        // borderLeftWidth: 2,
        width: width * 0.9,
        height: 100,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    updatelb: {
        color: 'rgb(107, 195, 44)',
        marginLeft: 10
    },
    circle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        width: 2,
        height: 100,
        borderLeftWidth: 2,
        left: 22,
        top: 50
    },
    lastLine: {
        width: 2,
        bottom: itemHeight / 4,
        height: itemHeight / 2,
        borderLeftWidth: 2,
        left: 22,
    },
    wrapCol: {
        // height: itemHeight,
        // paddingLeft: 20,
        // justifyContent: 'space-evenly',
        top: -10,
        left: 30,
        width: 120,
        position: 'absolute'
    },
    wrapColRight: {
        // height: itemHeight,
        // paddingLeft: 20,
        // justifyContent: 'space-evenly',
        top: -10,
        right: 10,
        width: 120,
        position: 'absolute'
    },
    wrapRowHeaderContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        paddingLeft: 15,
        alignItems: 'center'
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