import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import jwtDecode from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import Container from '../common/Container';
import Helper from '../../utils/Helpers';
import paracticeService from '../../services/practiceService';
import Common from '../../utils/Common';
import RippleButton from '../common/RippleButton';
import LoadingScreen from '../common/LoadingScreen';
import AppIcon from '../../utils/AppIcon';
import { MATH_KIT } from '../../constants/const';

export default class ParentChartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listChart: [],
            subjectId: MATH_KIT,
            timeStart: 0,
            isLoading: true
        }
    }

    componentDidMount() {
        const { userId, problemHierachyId } = this.props.navigation.state.params;
        Helper.getTokenParent().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            paracticeService.getChartSubuserDetail({ token, problemHierachyId, userId }).then(response => {
                this.setState({ listChart: response.data, isLoading: false });
            }).catch(err => {
                this.setState({ listChart: [], isLoading: false });
                console.log(err);
            })
        });
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        const { listChart, isLoading } = this.state;
        const { title } = this.props.navigation.state.params;
        const { displayName, gradeId } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Container>
                    <Header
                        displayName={displayName}
                        gradeId={gradeId}
                        title={title} onPress={() => this.goBack()}
                        bgColor={'rgb(28,176,246)'} color={'white'} type={'detail'}
                    />
                    <FlatList
                        style={styles.flatlist}
                        keyExtractor={(item, index) => index.toString()}
                        data={listChart}
                        renderItem={({ item, index }) => {
                            let colorBg = color[index % 4];
                            let textColor = colorText[index % 4];
                            return (
                                <View style={[styles.containerItem, { backgroundColor: colorBg }]}>
                                    <RippleButton style={styles.rowItem}>
                                        <Text style={[styles.textTitle, {color: textColor}]}>{item.problemName}</Text>
                                        <View style={styles.rowInfo}>
                                            <View style={styles.rowI2}>
                                                <View style={styles.rowI}>
                                                    <Image source={AppIcon.check_mark} size={16} style={styles.iconL} />
                                                    <Text style={[styles.textInfo, {color: textColor}]}>{item.totalCorrect}</Text>
                                                </View>
                                                <View style={styles.rowI}>
                                                    <Image source={AppIcon.check_delete} style={styles.iconL} />
                                                    <Text style={[styles.textInfo, {color: textColor}]}>{item.totalInCorrect}</Text>
                                                </View>
                                                <View style={styles.rowI}>
                                                    <Image source={AppIcon.check_no} style={styles.iconL} />
                                                    <Text style={[styles.textInfo, {color: textColor}]}>{item.totalSkip}</Text>
                                                </View>
                                                <View style={styles.rowI}>
                                                    <Icon name={'clock-o'} color={'rgb(28,176,246)'} size={16} style={styles.icon} />
                                                    <Text style={[styles.textInfo, {color: textColor}]}>{Common.convertSeconds(item.totalDuration || 0)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </RippleButton>
                                </View>
                            )
                        }}
                    />
                    <LoadingScreen isLoading={isLoading} />
                </Container>
            </View>
        )
    }
}

const color = ['#00A650', '#000', '#F7941D', '#3D0C2D'];
const colorText = ['#000', '#fff' ,'#fff', '#FFF902'];

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
    iconAvatar: {
        width: 24,
        height: 24,
        alignSelf: 'center',
        borderRadius: 12,
        marginRight: 5
    },
    textUser: {
        fontSize: 12,
        fontFamily: 'SVN-Gumley',
        color: 'white'
    },
    textClass: {
        fontSize: 11,
        fontFamily: 'SVN-Gumley',
        color: 'white'
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
        marginVertical: 5,
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