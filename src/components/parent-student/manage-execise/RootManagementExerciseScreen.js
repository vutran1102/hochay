import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, Dimensions } from 'react-native';
import Header from '../../parent-statistical/Header';
import RippleButton from '../../common/RippleButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppIcon from '../../../utils/AppIcon';
import CreateExerciseScreen from './CreateExerciseScreen';
import ExerciseDetail from './ExerciseDetail';
import CompletedExerciseDetail from './CompletedExerciseDetail';
import { connect } from 'react-redux';
import * as parentAction from '../../../actions/parentAction';
import Helper from '../../../utils/Helpers';
import Toast, { DURATION } from 'react-native-easy-toast';
import HeaderParent from '../HeaderParent';


const screenSize = Dimensions.get('window');
let {width, height}  = Dimensions.get('window');
let s = width;
if(width > height) {
    width = height;
    height = s;
}

class RootManagementExerciseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowCompletedItems: false,
            isHideCreateScreen: true,
            isHideExerciseDetail: true,
            childData: null,
            isHideExerciseCompleted: true,
        }
    }

    onPressItem(data, isCompleted) {
        if (isCompleted) {
            this.setState({ isHideExerciseCompleted: false, childData: data });
        } else {
            this.setState({ isHideExerciseDetail: false, childData: data })
        }
    }

    renderItem(data, isRendernCompletedItem) {
        const { endTime, name, isCompleted } = data;
        let dateStartString;
        if (endTime) {
            dateStartString = (new Date(endTime * 1000)).toLocaleDateString();
        }

        let isShowExpiration = false;
        if (endTime && endTime * 1000 < Date.now()) {
            isShowExpiration = true;
        }
        return (
            <RippleButton onPress={() => { this.onPressItem(data, isCompleted) }}>
                <View style={styles.singleItem}>
                    <View style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: 'rgb(187, 206, 228)', bottom: 2, justifyContent: 'center', backgroundColor: '#e0e0e0' }}>
                        <Image source={AppIcon.icon_calc} resizeMode='contain' style={{ width: 35, height: 35, alignSelf: 'center' }} />
                    </View>
                    <Text style={[{ left: 10, width: '60%', fontSize: 13, }, , isRendernCompletedItem && { textDecorationLine: 'line-through' }]} mutiline={true}>{name}</Text>
                    <Text style={[{ position: 'absolute', right: 10, color: 'rgb(94, 181, 234)' }, isRendernCompletedItem && { textDecorationLine: 'line-through' }]}>{dateStartString}</Text>
                    {(!isRendernCompletedItem && isShowExpiration) && <View style={styles.expirationTag}>
                        <Text style={{ color: '#fff' }}>Hết hạn</Text>
                    </View>}
                    {(isRendernCompletedItem) && <Icon name={'check'} color={'green'} size={30} style={{ position: 'absolute', bottom: 25, left: 20 }} />}
                </View>
            </RippleButton>
        )
    }

    componentDidMount() {
        Helper.getTokenParent().then(token => {
            const userId = this.props.userId;
            const type = 0;
            this.props.fetchExerciseData({ userId, token, type });
        })
    }

    backCallback() {
        this.setState({ isHideCreateScreen: true, isHideExerciseDetail: true, isHideExerciseCompleted: true })
    }

    onPressAssignBtn() {
        console.log('this.props.listPackageUser: ', JSON.stringify(this.props.listPackageUser));
        if (this.props.listPackageUser.length == 0) {
            this.refs.toast.show('Học sinh chưa có gói học tập nào. Hãy mua cho con để có thể giao nhiệm vụ');
            return;
        }
        this.setState({ isHideCreateScreen: false })
    }

    render() {
        console.log("this.props.listExerciseNotDoneL ", this.props.listExerciseNotDone.length);
        return (
            <View style={styles.rootView} >
                {(this.state.isHideCreateScreen && this.state.isHideExerciseDetail && this.state.isHideExerciseCompleted) &&
                    <View style={{ paddingBottom: 10, flex: 1 }}>
                        <HeaderParent displayName={'Quản lý bài tập giao'} leftCallback={() => { this.props.backCallback() }} rightCallback={() => { }} />
                        {/* <Header title={'Quản lý bài tập giao'} onPress={() => { this.props.backCallback() }} bgColor={'blue'} color='#fff' /> */}
                        <View style={styles.containerView}>
                            <ScrollView >
                                <RippleButton style={styles.newExerciseBtn} onPress={() => { this.onPressAssignBtn() }}>
                                    <Icon name={'plus'} size={40} color={'#fff'} style={{ left: 10 }} />
                                    <Text style={styles.lbInAddButton}>Giao bài tập mới</Text>
                                </RippleButton>
                                <View style={{ width: width * 0.9, alignItems: 'center' }}>
                                    <FlatList
                                        data={(this.props.listExerciseNotDone)}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            return (
                                                this.renderItem(item)
                                            )
                                        }}
                                    />
                                    <RippleButton style={styles.btnShowCompletedItems} onPress={() => { this.setState({ isShowCompletedItems: !this.state.isShowCompletedItems }) }}>
                                        <Text style={{ color: '#fff', top: 2 }}>{this.state.isShowCompletedItems ? 'ẨN BÀI ĐÃ HOÀN THÀNH' : 'HIỂN THỊ BÀI ĐÃ HOÀN THÀNH'}</Text>
                                    </RippleButton>
                                    {this.state.isShowCompletedItems && <FlatList
                                        data={(this.props.listExerciseDone)}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            return (
                                                this.renderItem(item, true)
                                            )
                                        }}
                                    />}
                                </View>
                            </ScrollView>
                        </View>
                        <Toast ref="toast" position={'top'} />
                    </View>}
                {!this.state.isHideCreateScreen && <CreateExerciseScreen backCallback={this.backCallback.bind(this)} userId={this.props.userId} />}
                {!this.state.isHideExerciseDetail && <ExerciseDetail backCallback={this.backCallback.bind(this)} data={this.state.childData} userId={this.props.userId} />}
                {!this.state.isHideExerciseCompleted && <CompletedExerciseDetail backCallback={this.backCallback.bind(this)} data={this.state.childData} />}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        listExerciseNotDone: state.parent.exerciseNotDoneList,
        listExerciseDone: state.parent.exerciseDoneList,
        listPackageUser: state.package.listPackageUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchExerciseData: payload => {
            dispatch(parentAction.getExerciesStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootManagementExerciseScreen);

const styles = StyleSheet.create({

    rootView: {
        width: width,
        height: height,
    },
    containerView: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        width: width,
    },
    wrapRow: {
        flexDirection: 'row'
    },
    srollView: {
        width: width * 0.9
    },
    newExerciseBtn: {
        backgroundColor: 'rgb(107, 195, 44)',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8
    },
    lbInAddButton: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        left: 60,
    },
    singleItem: {
        width: width * 0.9,
        height: 60,
        borderWidth: 1,
        marginTop: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingTop: 5,
        borderColor: 'rgb(94, 181, 234)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    expirationTag: {
        width: 60,
        height: 40,
        backgroundColor: 'red',
        borderWidth: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnShowCompletedItems: {
        marginTop: 20,
        width: 250,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 155, 26)',
        borderBottomWidth: 2,
        borderColor: '#fd7d25',
    }
})