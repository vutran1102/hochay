import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Keyboard, ImageBackground, Dimensions } from 'react-native';
import Color from '../../constants/colors';
import AppIcon from '../../utils/AppIcon';
import RippleBtn from '../common/RippleButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import StudentInfoSetting from './StudentInfoSetting';
import StatisticalScreen from './StatisticalScreen';
import RootManagementExerciseScree from './manage-execise/RootManagementExerciseScreen';
import PathwayLearningListScreen from './pathway-learning/PathwayLearningListScreen';
import { connect } from 'react-redux';
import { fetchPackageByidStartAction } from '../../actions/parentAction';
import Helper from '../../utils/Helpers';
import { LoadingTransparent } from '../common/LoadingScreen';
import HeaderParent from './HeaderParent';
import BackgroundParent from './BackgroundParent';

let { width, height } = Dimensions.get('window');
let s;
if(width > height) {
    s = width;
    width = height;
    height = s;
}

class StudentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHideSettingInfo: true,
            isHideStatisticalScreen: true,
            isHideRootManagementExercise: true,
            isHidePathwayLearning: true,
        }
    }

    onBackPress() {
        this.props.backCallback();
    }

    componentWillMount() {
        s = width;
        if (height > width) {
            width = height;
            height = s;
        }
    }

    componentDidMount() {
        const data = this.props.listChild[this.props.indexChild];
        StatusBar.setHidden(true);
        Helper.getTokenParent().then(token => {
            const userId = data.userId;
            const indexPage = 0;
            this.props.fetchListPackage({ token, userId, indexPage });
        })
    }

    onGearBtnPress() {
        this.setState({ isHideSettingInfo: false })
    }

    backCallback() {
        this.setState(
            {
                isHideSettingInfo: true,
                isHideStatisticalScreen: true,
                isHideRootManagementExercise: true,
                isHidePathwayLearning: true
            }
        );

    }

    onStatisticalBtnPress() {
        this.setState({ isHideStatisticalScreen: false });
    }

    onPathwayPress() {
        this.setState({ isHidePathwayLearning: false });
    }

    render() {
        const data = this.props.listChild[this.props.indexChild];
        console.log("child DATA: " , JSON.stringify(data));
        return (
            <BackgroundParent>
                <View style={styles.rootView} onPress={() => { Keyboard.dismiss() }}>
                    {(this.state.isHideSettingInfo && this.state.isHideStatisticalScreen && this.state.isHideRootManagementExercise && this.state.isHidePathwayLearning) &&
                        <View style={styles.rootView}>
                            <HeaderParent displayName={data.displayName} leftCallback={this.onBackPress.bind(this)} rightCallback={this.onGearBtnPress.bind(this)} rightIcon={AppIcon.btn_gear_parent}/>
                            {/* <View style={styles.headerContainer}>
                                <View style={styles.header}>
                                    <RippleBtn leftCallback={this.onBackPress.bind(this)} size={40} duration={250} style={styles.arround}>
                                        <Icon name={'arrow-left'} color={Color.iconHeaderColor} size={24} />
                                    </RippleBtn>
                                    <RippleBtn onPress={this.onGearBtnPress.bind(this)} size={40} duration={250} style={styles.arroundGear}>
                                        <Icon name={'cog'} color={Color.iconHeaderColor} size={24} />
                                    </RippleBtn>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={AppIcon.icon_apple} style={styles.icon} resizeMode={'contain'} />
                                    <Text style={{ fontSize: 20 }}>66</Text>
                                </View>
                                <Image source={AppIcon.avtart_blank} style={{ width: 100, height: 100, marginTop: 20 }} />
                                <Text style={[styles.title]}>{data.displayName}</Text>
                            </View> */}
                            <View style={styles.contentWrap}>
                                <Image source={data.avatar ? {uri:`http:${data.avatar}`} : AppIcon.default_avatar} style={{ width: 104, height: 104, borderRadius: 52, borderWidth: 1.5, borderColor: 'rgb(4, 166, 255)', alignSelf: 'center', position: 'absolute', top: -52 }} />
                                <ImageBackground source={AppIcon.background_detail} style={styles.bgBtnThongKe} resizeMode='contain'>
                                    <RippleBtn radius={90} style={styles.statisticalBtn} onPress={() => { this.onStatisticalBtnPress() }}>
                                        <ImageBackground source={AppIcon.icn_thongke} style={styles.statisticalBtn}>
                                            <Text style={styles.textThongKe}>THỐNG KÊ HỌC TẬP</Text>
                                        </ImageBackground>
                                    </RippleBtn>
                                    <View style={styles.wrap3Btn}>
                                        <RippleBtn radius={90} style={styles.style3Btn} onPress={() => { }}>
                                            <ImageBackground source={AppIcon.icn_giupcon} style={styles.style3Btn} resizeMode='contain'>
                                                <Text style={styles.text3Btn}>Giúp con học tốt</Text>
                                            </ImageBackground>
                                        </RippleBtn>
                                        <RippleBtn radius={90} style={[styles.style3Btn, {top:50}]} onPress={() => { this.setState({ isHideRootManagementExercise: false }) }}>
                                            <ImageBackground source={AppIcon.icn_giaobai} style={styles.style3Btn} resizeMode='contain'>
                                                <Text style={styles.text3Btn}>Quản lý bài tập giao</Text>
                                            </ImageBackground>
                                        </RippleBtn>
                                        <RippleBtn radius={90} style={styles.style3Btn} onPress={() => { this.onPathwayPress() }}>
                                            <ImageBackground source={AppIcon.icn_lotring} style={styles.style3Btn} resizeMode='contain'>
                                                <Text style={styles.text3Btn}>Lộ trình học tập</Text>
                                            </ImageBackground>
                                        </RippleBtn>
                                    </View>
                                </ImageBackground>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 100, paddingLeft: 40 }}>
                                    <RippleBtn radius={90} style={styles.exManagementBtn} onPress={() => { this.setState({ isHideRootManagementExercise: false }) }}>
                                        <Text style={{ textAlign: 'center' }}>Quản lý bài tập giao</Text>
                                    </RippleBtn>
                                </View>
                                <RippleBtn radius={90} style={styles.helpLearnBtn} onPress={() => { }}>
                                    <Text style={{ textAlign: 'center' }}>Giúp con học tốt</Text>
                                </RippleBtn>
                                <RippleBtn radius={90} style={styles.pathwayLearningBtn} onPress={() => { this.onPathwayPress() }}>
                                    <Text style={{ textAlign: 'center' }}>Lộ trình học tập</Text>
                                </RippleBtn> */}
                            </View>
                        </View>
                    }
                    {!this.state.isHideSettingInfo && <StudentInfoSetting backCallback={this.backCallback.bind(this)} data={data} />}
                    {!this.state.isHideStatisticalScreen && <StatisticalScreen userId={data.userId} backCallback={this.backCallback.bind(this)} />}
                    {!this.state.isHideRootManagementExercise && <RootManagementExerciseScree backCallback={this.backCallback.bind(this)} userId={data.userId} />}
                    {!this.state.isHidePathwayLearning && <PathwayLearningListScreen backCallback={this.backCallback.bind(this)} userId={data.userId} />}
                    <LoadingTransparent isLoading={this.props.isLoading} bgColor='rgba(0,0,0,0.5)' />
                </View>
            </BackgroundParent>
        );
    }
}

mapStateToProps = state => {
    return {
        isLoading: state.package.isLoading,
        listChild: state.parent.listChild,
    }
}

mapDispatchToProps = dispatch => {
    return {
        fetchListPackage: (payload) => {
            dispatch(fetchPackageByidStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    style3Btn: {
        width: 86,
        height: 86,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrap3Btn: {
        width: width,
        height: 150,
        // backgroundColor: 'red',
        position: 'absolute',
        alignSelf: 'center',
        bottom: -20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    text3Btn: {
        fontSize: 8,
        width: 90,
        fontWeight: '600',
        textAlign:'center',
        top: 45
    },
    bgBtnThongKe: {
        top: 45,
        width: width,
        height: height * 0.6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    exManagementBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30
    },
    textThongKe: {
        color:'#fff',
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: '600',
        top: 30
    },
    contentWrap: {
        flex: 1,
        marginTop: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        paddingBottom: 70
    },
    helpLearnBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 110,
        bottom: 0
    },
    pathwayLearningBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        left: 30,
        top: 40
    },
    statisticalBtn: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: width * 0.3,
        // backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20,
    },
    rootView: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        // left: 130,
        position: 'absolute',
        color: '#fff',
        top: 22
    },
    headerContainer: {
        width: '100%',
        height: 150,
        backgroundColor: '#2a6dfc',
        alignItems: 'center'
    },
    arround: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    arroundGear: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        position: 'absolute',
        right: 10
    },
    container: {
        width: '100%',
        height: 50,
        flexDirection: 'row'
    }
})