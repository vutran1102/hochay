import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList, ScrollView, Image } from 'react-native';
import RippleButton from '../../common/RippleButton';
import HeaderNavigation from '../../common/HeaderNavigation';
import AppIcon from '../../../utils/AppIcon';
import ManuallyChooseLesson from './ManuallyChooseLesson';
import parentService from '../../../services/parentService';
import HeaderParent from '../HeaderParent';
import Helper from '../../../utils/Helpers';

let { width, height } = Dimensions.get('window');
let s = width;
if(width > height) {
    width = height;
    height = s;
}

const arraySource = [AppIcon.icon_board, AppIcon.icon_book, AppIcon.icon_pen, AppIcon.icon_penholder, AppIcon.icon_hat, AppIcon.icon_calc, AppIcon.icon_clock];

export default class UpdateLessonScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isHideManallyChooseLession: true,
            dataListLesson: [],
        }
    }

    backCallback() {
        this.setState({ isHideManallyChooseLession: false })
    }

    componentDidMount() {
        Helper.getTokenParent().then(token => {
            const userId = this.props.userId;
            const packageCode = this.props.packageCode;
            parentService.getListLessonFollowPackageById({ userId, packageCode, token }).then(data => {
                this.setState({ dataListLesson: data })
            })
        })
    }

    handleData(isOrigin) {
        if (!this.props.data)
            return [];

        if (isOrigin) {
            const data = this.props.data.dataOrigin;
            return data;
        } else {
            const data = this.props.data.dataUser;
            return data;
        }
    }

    hanleStatusIndex(index) {
        switch (index) {
            case 0:
                return 'Chưa luyện tập';
                break;
            case 1:
                return 'Chưa đạt';
                break;
            case 2:
                return 'Đạt';
                break;
            case 3:
                return 'Giỏi';
                break;
            case 4:
                return 'Xuất sắc';
                break;
        }
    }

    renderItem(item, index) {
        return (
            <View>
                <View style={styles.item}>
                    <Image source={arraySource[index % (arraySource.length)]} resizeMode='contain' style={{ width: 30, height: 30 }}/>
                    <View style={styles.wrapItemText}>
                        <Text>{item.name}</Text>
                        <Text>Tình trạng: {this.hanleStatusIndex(item.levelPractice)}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isHideManallyChooseLession && <View style={styles.root}>
                    {/* <HeaderNavigation title='Cập nhật học theo lộ trình' onPress={() => { this.props.backCallback() }} bgColor='blue' color='#fff' /> */}
                    <HeaderParent displayName={`Chi tiết học theo lộ trình`} leftCallback={() => { this.props.backCallback() }} />

                    <View style={styles.container}>
                        <ScrollView>
                            <Text style={styles.text1}>Bài học khuyến nghị theo lộ trình chuẩn</Text>
                            <View style={styles.flatListContainer}>
                                <FlatList
                                    data={this.handleData(true)}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        return (
                                            this.renderItem(item, index)
                                        )
                                    }}
                                />
                            </View>
                            <Text style={styles.text1}>Bài phụ huynh tự chọn</Text>
                            <View style={styles.flatListContainer}>
                                <FlatList
                                    data={this.handleData(false)}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        return (
                                            this.renderItem(item, index)
                                        )
                                    }}
                                />
                            </View>
                            <View style={{ width: width, height: 70, alignItems: 'center', justifyContent: 'center' }}>
                                <RippleButton onPress={() => { this.setState({ isHideManallyChooseLession: false }) }}>
                                    <Text style={styles.listLb}>Danh sách bài học</Text>
                                </RippleButton>
                            </View>
                        </ScrollView>
                    </View>
                </View>}
                {!this.state.isHideManallyChooseLession && <ManuallyChooseLesson backCallback={() => { this.setState({ isHideManallyChooseLession: true }) }} data={this.state.dataListLesson} configId={this.props.configId} itemId={this.props.itemId} userId={this.props.userId} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        width: width,
        paddingTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
    },
    flatListContainer: {
        width: width * 0.9,
        marginLeft: width * 0.05,
    },
    item: {
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
    wrapItemText: {
        marginLeft: 20,
        justifyContent: 'center'
    },
    listLb: {
        color: 'blue',
    },
    text1: {
        fontFamily: 'Roboto-Bold',
        marginLeft: width * 0.05,
        marginTop: 10
    }
})

const dataFake = [
    {
        time: 'Tuần 16',
        title: 'Luyện tập đếm số đến 100',
        status: 3
    },
    {
        time: 'Tuần 16',
        title: 'Luyện tập đếm số đến 99',
        status: 2
    },
    {
        time: 'Tuần 16',
        title: 'Luyện tập đếm số đến 98',
        status: 1,
    },
    {
        time: 'Tuần 16',
        title: 'Luyện tập đếm số đến 97',
        status: 0,
        isLearning: true,
    },
    {
        time: 'Tuần 16',
        title: 'Luyện tập đếm số đến 95',
        status: 0,
    },
    {
        time: 'Tuần 16',
        title: 'Luyện tập đếm số đến 94',
        status: 0
    },
    {
        time: 'Tuần 16',
        title: 'Luyện tập đếm số đến 92',
        status: 0
    }
]