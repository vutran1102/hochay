import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import jwtDecode from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import Container from '../common/Container';
import Header from './Header';
import Helper from '../../utils/Helpers';
import paracticeService from '../../services/practiceService';
import { dataFlatlist } from '../../utils/DataTest';
import PickerKiwi from '../common/PickerKiwi';
import Color from '../../constants/colors';
import Common from '../../utils/Common';
import RippleButton from '../common/RippleButton';
import LoadingScreen from '../common/LoadingScreen';
import AppIcon from '../../utils/AppIcon';
import { MATH_KIT } from '../../constants/const';
import NoDataView from '../common/NoDataViewComp';
import NoDataViewComp from '../common/NoDataViewComp';

export default class ParentStatisticalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            listChart: [],
            listAllChart: [],
            subjectId: MATH_KIT,
            timeStart: 0,
            isLoading: true,
            userId: '',
            displayName: '',
            gradeId: ''
        }
    }

    componentDidMount() {
        const { listChild } = this.props;
        const length = Object.keys(listChild).length;
        if (length > 0) {
            const { displayName, gradeId, userId } = listChild[0];
            this.setState({
                userId,
                displayName,
                gradeId
            });
            const GradeId = gradeId;
            this.initData(GradeId, userId);
        }
    }

    initData(GradeId, userId) {
        const { subjectId, timeStart } = this.state;
        const timeEnd = 0;
        Helper.getTokenParent().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            paracticeService.getChartSubuser({ token, GradeId, subjectId, timeStart, timeEnd, userId })
                .then(response => {
                    Helper.saveCacheJSON(`@statistical${subjectId}-${GradeId}-${userId}`, response);
                    this.setState({ listChart: response, isLoading: false });
                }).catch(err => {
                    console.log(err);
                    this.setState({ listChart: [], isLoading: false });
                })
        });
    }

    changeAccount(item, index) {
        const GradeId = item.gradeId;
        const userId = item.userId;
        const displayName = item.displayName;
        if (this.state.index != index) {
            this.setState({
                index: index,
                gradeId: GradeId,
                userId: userId,
                displayName: displayName
            }, () => {
                this.initData(GradeId, userId);
            });
        } else {
            this.setState({
                index: index,
                gradeId: GradeId,
                userId: userId,
                displayName: displayName
            });
        }
    }

    handleNavigate(item) {
        const { displayName, userId, gradeId } = this.state;
        this.props.navigation.navigate({
            routeName: 'ParentChart', key: 'ParentChartId', params: {
                problemHierachyId: item.problemHierarchyId,
                title: item.problemHierarchyName,
                displayName,
                userId,
                gradeId
            }
        });
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        const { listChart, isLoading, displayName, gradeId } = this.state;
        const { listChild } = this.props;
        return (
            <View style={styles.container}>
                <Container>
                    <Header
                        title={'Thống kê học tập'}
                        displayName={displayName}
                        gradeId={gradeId}
                        onPress={() => this.goBack()}
                        bgColor={'rgb(28,176,246)'}
                        color={'white'} />
                    {listChild ? <View style={{ flex: 1 }}>
                        <View>
                            <FlatList
                                horizontal
                                data={listChild}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state.index}
                                renderItem={({ item, index }) =>
                                    <RippleButton onPress={() => this.changeAccount(item, index + 1)}
                                        style={this.state.index == 1 + index ? styles.wrapActive : styles.wrapInaactive}>
                                        <Image source={AppIcon.icon_girl} style={styles.iconAvatar} />
                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={styles.textUser}>{item.displayName}</Text>
                                            <Text style={styles.textClass}>Lớp {item.gradeId ? item.gradeId.substring(1) : ''}</Text>
                                        </View>
                                    </RippleButton>
                                }
                            />
                        </View>
                        {(listChart.length > 0) ? <FlatList
                            style={styles.flatlist}
                            keyExtractor={(item, index) => index.toString()}
                            data={listChart}
                            renderItem={({ item ,index}) => {
                                let colorBg = color[index % 4];
                                let textColor = colorText[index % 4];
                                return (
                                    <View style={[styles.containerItem, {backgroundColor: colorBg}]}>
                                        <RippleButton onPress={() => this.handleNavigate(item)} style={styles.rowItem}>
                                            <Text style={[styles.textTitle, {color:textColor}]}>{item.problemHierarchyName}</Text>
                                            <View style={styles.rowInfo}>
                                                <View style={styles.rowI2}>
                                                    <View style={styles.rowI}>
                                                        <Image source={AppIcon.check_mark} size={16} style={styles.iconL} />
                                                        <Text style={[styles.textInfo, {color:textColor}]}>{item.totalCorrect}</Text>
                                                    </View>
                                                    <View style={styles.rowI}>
                                                        <Image source={AppIcon.check_delete} style={styles.iconL} />
                                                        <Text style={[styles.textInfo, {color:textColor}]}>{item.totalIncorrect}</Text>
                                                    </View>
                                                    <View style={styles.rowI}>
                                                        <Image source={AppIcon.check_no} style={styles.iconL} />
                                                        <Text style={[styles.textInfo, {color:textColor}]}>{item.totalSkip}</Text>
                                                    </View>
                                                    <View style={styles.rowI}>
                                                        <Icon name={'clock-o'} color={'rgb(28,176,246)'} size={16} style={styles.icon} />
                                                        <Text style={[styles.textInfo, {color:textColor}]}>{Common.convertSeconds(item.totalDuration || 0)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </RippleButton>
                                    </View>
                                )
                            }
                            }
                        /> : <NoDataViewComp />}
                    </View> : <NoDataViewComp />}
                    <LoadingScreen isLoading={isLoading} />
                </Container>
            </View>
        )
    }
}

const color = ['#00A650', '#000', '#F7941D', '#3D0C2D'];
const colorText = ['#000', '#fff' ,'#fff', '#FFF902']

const styles = StyleSheet.create({
    containerItem: {
        backgroundColor: 'red',
        marginTop: 5,
        paddingLeft: 20,
        borderRadius: 10,

    },
    wrapHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold'
    },
    arround: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    icon: {
        alignSelf: 'center'
    },
    wrapActive: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: '#f0b37f',
        borderBottomWidth: 2,
        width: 150,
        justifyContent: 'center'
    },
    wrapInaactive: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    iconAvatar: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        borderRadius: 12,
        marginRight: 5
    },
    textUser: {
        fontSize: 13,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(177, 179, 181)'
    },
    textClass: {
        fontSize: 12,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(177, 179, 181)'
    },


    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    flatlist: {
        paddingHorizontal: 20,
    },
    textTitle: {
        fontFamily: 'Roboto-Bold',
        color: 'rgb(177, 179, 181)'
    },
    textInfo: {
        fontFamily: 'Roboto-Bold',
        color: 'rgb(177, 179, 181)'
    },
    rowItem: {
        paddingVertical: 5,
        marginVertical: 5
    },
    rowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowI: {
        flexDirection: 'row',
        marginLeft: 20,
    },
    rowI2: {
        marginTop: 5,
        flexDirection: 'row',
        marginLeft: 20,
    },
    iconL: {
        width: 14,
        height: 16,
        marginRight: 10,
    },
    iconL2: {
        width: 18,
        height: 16,
        marginRight: 10,
    },
    icon: {
        marginRight: 10,
        alignSelf: 'center'
    }
});