import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, Dimensions } from 'react-native';
import RippleButton from '../common/RippleButton';
import Header from '../parent-statistical/Header';
import AppIcon from '../../utils/AppIcon';
import Pie from 'react-native-pie';
import Icon from 'react-native-vector-icons/FontAwesome';
import paracticeService from '../../services/practiceService';
import { MATH_KIT } from '../../constants/const';
import Helper from '../../utils/Helpers';
import StatisticalDetail from './StatisticalDetail';
import { connect } from 'react-redux';
import { fetchPackageByidStartAction, getChartDetaillStartAction } from '../../actions/parentAction';
import { LoadingTransparent } from '../common/LoadingScreen';
import HeaderParent from './HeaderParent';
import { Dropdown } from 'react-native-material-dropdown';

// import { Defs, LinearGradient, Polygon, Stop, Svg } from "react-native-svg";


const chartWidth = 178;
class ProgressChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: chartWidth
        }
    }

    componentDidMount() {
        if (this.props.width) {
            this.setState({
                width: this.props.width
            })
        }
    }

    render() {
        return (
            <View style={[styles.wrapChart, { width: this.state.width }]} >
                <View style={[styles.wrapRow, { height: 30 }]}>
                    <Text style={styles.titleChart}>{this.props.title}</Text>
                    {this.props.title &&
                        <Text style={styles.percentChart}>{`${this.props.percent ? this.props.percent : 0}%`}</Text>}
                </View>
                <View style={[styles.chart, { width: this.state.width }]} >
                    <View style={{ marginLeft: 0, flex: 1, backgroundColor: this.props.color || 'orange', width: this.props.percent ? this.state.width * this.props.percent / 100 - 4 || this.state.width - 4 : 0 }}>
                    </View>
                </View>
            </View>
        )
    }
}

class StatisticalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnTabActive: 1,
            percentChanged: 5,
            correctRate: 60,
            isIncreaseRate: true,
            subjectId: MATH_KIT,
            timeStart: 0,
            GradeId: 'C1',
            btnGradeActive: 1,
            reload: true,
            isHideStatisticalDetail: true,
        }
    }

    initData(userId, packageCode) {
        Helper.getTokenParent().then(token => {
            if (this.props.listPackage.length) {
                this.props.fetchChartData({ token, userId, packageCode });
                paracticeService.getChartSubuser({ token, packageCode, userId })
                    .then(response => {
                        Helper.saveCacheJSON(`@statistical${packageCode}-${userId}`, response);
                        this.setState({ listChart: response, isLoading: false });
                    }).catch(err => {
                        this.setState({ listChart: [], isLoading: false });
                    })
            }
        });
    }

    componentDidMount() {
        if(this.props.listPackage.length) {
            this.initData(this.props.userId,this.props.listPackage[0].packageCode);
        }
    }

    handleIsActiveButtonTabView(index) {
        if (index == this.state.btnTabActive) {
            return true;
        } else return false;
    }

    isBtnGradeActive(index) {
        if (index == this.state.btnGradeActive) {
            return true;
        } else return false;
    }

    onPressSubjectButton(packageCode) {
        if(!packageCode) {
            return;
        }
        this.setState({ reload: true });
        // this.setState({ btnGradeActive: index, reload: true });
        this.initData(this.props.userId, packageCode)
    }

    calculatePercent(completedPercent) {
        if (!completedPercent) {
            return [0, 100];
        }
        return [completedPercent, 100 - completedPercent]
    }

    onbackPress() {
        this.props.backCallback();
        // this.props.navigator.dispatch(NavigationActions.back())
        // this.props.navigator.goback()
        // this.props.navigator.(NavigationActions.navigate({routerName: 'ParentPackageInfo'}))
        // this.props.navigator.navigate('Auth');
    }

    backCallback() {
        this.setState({ isHideStatisticalDetail: true });
    }

    formatData(data) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
            result.push({ value: data[i].packageCode, label: data[i].packageName })
        }
        console.log("result: ", JSON.stringify(result));
        return result;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <View>
                    <Svg height={300} width={300}>
                        <Defs>
                            <LinearGradient id="gradient1"
                                x1="0%" y1="0%" x2="0%" y2="100%"
                            >
                                <Stop offset="0%" stopColor="blue" />
                                <Stop offset="100%" stopColor="red" />
                            </LinearGradient>
                        </Defs>
                        <VictoryPie
                            standalone={false}
                            height={300}
                            width={300}
                            colorScale={[
                                "url(#gradient1)",
                            ]}
                            data={[1]}
                        />
                    </Svg>
                </View> */}
                {
                    this.state.isHideStatisticalDetail ? <View style={styles.rootView}>
                        <HeaderParent displayName={'Thống kê học tập'} leftCallback={this.onbackPress.bind(this)} rightCallback={() => { }} />
                        {/* <Header title={'Thống kê học tập'} onPress={this.onbackPress.bind(this)} /> */}
                        <View style={styles.wrapContent}>
                            {this.props.listPackage.length && <View style={{ flex: 1 }}>
                                <View key={this.state.btnTabActive} style={{ marginTop: 0, height: 60, width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                    {/* <FlatList
                                        key={this.state.btnTabActive}
                                        data={this.props.listPackage}
                                        horizontal={true}
                                        keyExtractor={(item, index) => index.toString()}
                                        extraData={this.state.btnGradeActive}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <RippleButton style={this.isBtnGradeActive(index + 1) ? styles.buttonSubjectActive : styles.buttonSubject} onPress={() => { this.onPressSubjectButton(index + 1) }}>
                                                    <Image source={AppIcon.math_icon} style={{ resizeMode: 'contain', width: 30, height: 30 }} />
                                                    <Text style={{ marginTop: 5, textAlign: 'center' }}>{item.packageName}</Text>
                                                </RippleButton>
                                            )
                                        }}
                                    /> */}
                                    <Text style={{ fontWeight: '100', fontSize: 16 }}>Gói</Text>
                                    <View style={{ width: 150, height: 40 }}>
                                        <Dropdown
                                            dropdownOffset={{ top: 60, left: 0 }}
                                            ref='dropdown'
                                            textColor='rgb(169, 169, 169)'
                                            fontSize={13}
                                            // disabled={isDisable}
                                            rippleInsets={{ top: 0, bottom: 0 }}
                                            renderBase={({ title }) => {
                                                return (
                                                    <View style={{ width: 150, height: 40, borderRadius: 5, borderColor: '#BBCEE4', borderWidth: 1, justifyContent: 'center', paddingLeft: 10 }}>
                                                        <Text style={styles.textInput}>{title}</Text>
                                                        <Image source={AppIcon.arrow_down} style={{ width: 15, height: 10, position: 'absolute', top: 12, right: 10, tintColor: '#FF9B19', alignSelf: 'center' }} resizeMode='contain' />
                                                    </View>
                                                )
                                            }}
                                            data={this.formatData(this.props.listPackage)}
                                            containerStyle={{ width: 150, height: 30, marginLeft: 10, position: 'absolute' }}
                                            // rippleInsets={{top:0, bottom: 0}}
                                            // rippleCentered= {true}
                                            value={this.formatData(this.props.listPackage)[0].value}
                                            onChangeText={(item) => { console.log('onChange Value dropdown,: ', item); this.setState({packageCodeChoosed: item})}}
                                        />
                                    </View>
                                    <RippleButton style={styles.btnChoose} onPress={()=> {this.onPressSubjectButton(this.state.packageCodeChoosed)}}>
                                        <Text style={{color: '#fff', top:2, fontWeight: '800'}}>CHỌN</Text>
                                    </RippleButton>
                                </View>
                                <View style={styles.linePartition} />
                                <View style={styles.scrollViewContainer}>
                                    <ScrollView>
                                        <View style={styles.wrapRow}>
                                            <View style={styles.pieView}>
                                                <Pie
                                                    radius={75}
                                                    innerRadius={60}
                                                    series={this.calculatePercent(Math.floor(this.props.chartData.accuracy))}
                                                    colors={['#67A6EE', '#BCD0E5']}
                                                // backgroundColor='#ddd' 
                                                />
                                                <Text style={{ fontWeight: 'bold', position: 'absolute', alignSelf: 'center', top: '50%', fontSize: 10 }}>Tỉ lệ đúng trung bình</Text>
                                                <Text style={styles.percentRateLb}>{`${Math.floor(this.props.chartData.accuracy)}%`}</Text>
                                            </View>
                                            <View style={styles.wrapProgressChart}>
                                                {/* câu dễ */}
                                                <ProgressChart color={'green'} percent={Math.floor(10 + Math.random() * 80)} title={'Câu dễ'} />
                                                {/* câu vừa */}
                                                <ProgressChart color={'rgb(247, 189, 2)'} percent={Math.floor(10 + Math.random() * 80)} title={'Câu trung bình'} />
                                                {/* câu khó */}
                                                <ProgressChart color={'rgb(252, 115, 105)'} percent={Math.floor(10 + Math.random() * 80)} title={'Câu khó'} />
                                            </View>
                                            {/* <View style={styles.wrapProgressChart}>
                                                <ProgressChart color={'green'} percent={this.props.percentDe} title={'Câu dễ'} />
                                                <ProgressChart color={'rgb(247, 189, 2)'} percent={this.props.percentTrungBinh} title={'Câu trung bình'} />
                                                <ProgressChart color={'rgb(252, 115, 105)'} percent={this.props.percentKho + this.props.percentCucKho} title={'Câu khó'} />
                                            </View> */}
                                        </View>
                                        {/* <View style={[styles.wrapRow, { alignSelf: 'center', paddingTop: 10 }]} >
                                            <Icon name={this.state.isIncreaseRate ? 'caret-up' : 'caret-down'} size={30} color={this.state.isIncreaseRate ? 'green' : 'red'} />
                                            <Text style={{ top: 6, left: 4, fontSize: 16, fontWeight: 'bold' }}>{this.state.percentChanged}% so với lần luyện tập gần nhất</Text>
                                        </View> */}
                                        <View style={styles.wrapEnd}>
                                            <RippleButton style={styles.btnDetails} onPress={() => { this.setState({ isHideStatisticalDetail: false }) }}>
                                                <Text style={styles.lbBtn}>XEM CHI TIẾT</Text>
                                            </RippleButton>
                                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'rgb(255, 155, 26)', marginTop: 30 }}>Chuyên Cần Luyện Tập</Text>
                                            <View style={styles.diligenceView}>
                                                <View style={{ marginTop: 20, width: '100%', marginLeft: 20 }}>
                                                    <Text>Tỉ lệ hoàn thành nhiệm vụ hiện tại</Text>
                                                    <View style={[styles.wrapRow, { top: -20 }]}>
                                                        <ProgressChart width={250} color='green' percent={55} />
                                                        <Text style={{ top: 22, left: 10, color: 'rgb(252, 115, 106)' }}>55%</Text>
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: 20, width: '100%', marginLeft: 20 }}>
                                                    <Text>Số bài đã hoàn thành theo lộ trình học tập</Text>
                                                    <View style={[styles.wrapRow, { top: -20 }]}>
                                                        <ProgressChart width={250} color='green' percent={55} />
                                                        <Text style={{ top: 22, left: 10, color: 'rgb(252, 115, 106)' }}>30/54 bài</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>}
                        </View>
                    </View> : <StatisticalDetail backCallback={this.backCallback.bind(this)} data={this.state.listChart} />
                }
                <LoadingTransparent isLoading={this.props.isLoading || this.props.isLoadingchartData} bgColor='rgba(0,0,0,0.3)' />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        navigator: state.common.navigator,
        listPackage: state.package.listPackageUser,
        isLoading: state.package.isLoading,
        isLoadingchartData: state.parent.isLoadingchartData,
        chartData: state.parent.chartData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPackageListById: (payload) => {
            dispatch(fetchPackageByidStartAction(payload))
        },
        fetchChartData: (payload) => {
            dispatch(getChartDetaillStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticalScreen);

const styles = StyleSheet.create({
    diligenceView: {
        width: "90%",
        height: 200,
        borderWidth: 1,
        marginTop: 15,
        alignItems: 'center',
        paddingTop: 10,
        borderColor: 'rgb(94, 181, 234)',
        borderRadius: 12,
    },
    linePartition: {
        width: '80%',
        height: 1,
        backgroundColor: '#BBCEE4',
        alignSelf: 'center'
    },
    wrapContent: {
        flex: 1,
        marginTop: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        paddingTop: 20
    },
    lbBtn: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
        top: 2
    },
    btnDetails: {
        width: 181,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF9D12',
        borderBottomWidth: 3,
        borderColor: '#fd7d25',
        borderRadius: 10
    },
    wrapEnd: {
        flex: 1,
        alignItems: 'center',
    },
    wrapProgressChart: {
        paddingLeft: 20
    },
    titleChart: {
        top: 10
    },
    percentChart: {
        position: 'absolute',
        right: 0,
        top: 10,
        color: 'rgb(252, 115, 105)'
    },
    wrapChart: {
        width: chartWidth,
        height: 40
    },
    chart: {
        width: chartWidth,
        height: 2,
        borderRadius: 1,
        backgroundColor: 'rgb(187, 206, 228)'
    },
    wrapRow: {
        flexDirection: 'row'
    },
    percentRateLb: {
        position: 'absolute',
        top: '30%',
        alignSelf: 'center',
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(252, 115, 106)'
    },
    scrollViewContainer: {
        paddingTop: 10,
        flex: 1,
    },
    pieView: {
        marginLeft: 10,
        width: 150,
        height: 170,
        alignItems: 'center'
    },
    rootView: {
        flex: 1,

    },
    headerTabRow: {
        flexDirection: "row",
        width: '100%',
        height: 30,

    },
    btnTabActive: {
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    btnTabUnActive: {
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSubject: {
        height: 80,
        width: 100,
        alignItems: 'center',
        marginLeft: 10,
        marginLeft: 20
    },
    buttonSubjectActive: {
        height: 80,
        width: 100,
        alignItems: 'center',
        marginLeft: 10,
        marginLeft: 20,
        // backgroundColor: 'green'
    },
    textInput: {
        fontSize: 12,
        fontFamily: 'Roboto-Bold',
        // color: 'rgb(166, 168, 171)'
    },
    btnChoose: {
        width: 75,
        height: 41,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 155, 26)',
        borderBottomWidth: 2,
        borderColor: '#fd7d25',
        position:'absolute',
        right: 20,
    }
})