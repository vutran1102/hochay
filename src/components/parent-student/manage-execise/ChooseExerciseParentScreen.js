import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList, Image } from 'react-native';
import HeaderNavigation from '../../common/HeaderNavigation';
import AppIcon from '../../../utils//AppIcon';
import RippleButton from '../../common/RippleButton';
import ChooseExerciseManually from './ChooseExerciseManually';
import { connect } from 'react-redux';
import HeaderParent from '../HeaderParent';


const screenSize = Dimensions.get('window');
let { width, height } = screenSize;
let s = width;
if (width > height) {
    width = height,
        height = s;
}
const arraySource = [AppIcon.icon_board, AppIcon.icon_book, AppIcon.icon_pen, AppIcon.icon_penholder, AppIcon.icon_hat, AppIcon.icon_calc, AppIcon.icon_clock];


class ChooseExerciseParentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHideManuallyExerciseChoose: true
        }
    }

    renderItem(itemData, index) {
        return (
            <RippleButton onPress={() => this.onItemPressed(itemData)}>
                <View style={styles.item}>
                    <Image source={arraySource[index % (arraySource.length)]} style={styles.icon} resizeMode='contain' />
                    <View style={{ marginLeft: 20 }}>
                        <Text>{itemData.name}</Text>
                        <Text style={styles.statusItem}>Tình trạng: {this.hanleStatusIndex(itemData.levelPractice)}</Text>
                    </View>
                </View>
            </RippleButton>
        )
    }

    onItemPressed(itemData) {
        this.props.onChoosedExercise(itemData);
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

    onPressListLessonBtn() {
        this.setState({ isHideManuallyExerciseChoose: false });
    }

    backCallback() {
        this.setState({ isHideManuallyExerciseChoose: true })
    }

    render() {
        return (
            <View style={styles.root} >
                {this.state.isHideManuallyExerciseChoose && <View style={styles.root}>
                    {/* <HeaderNavigation title='Lựa chọn bài giao' onPress={() => { this.props.backCallback() }} /> */}
                    <HeaderParent displayName={'Lựa chọn bài giao'} leftCallback={() => { this.props.backCallback() }} rightCallback={() => { }} />

                    <View style={styles.container}>
                        <ScrollView
                            contentContainerStyle={{ width: width }}
                        >
                            <Text style={styles.textTitle}>Bài luyện khuyến nghị theo lộ trình của con</Text>
                            <FlatList
                                contentContainerStyle={{ width: width, alignItems: 'center' }}
                                data={this.props.dataExercise}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        this.renderItem(item, index)
                                    )
                                }}
                            />
                            {/* <Text style={styles.textTitle}>Khuyến nghị giao bài theo yếu điểm của con</Text>
                            <FlatList
                                contentContainerStyle={{ width: width, alignItems: 'center' }}
                                data={data2}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        this.renderItem(item)
                                    )
                                }}
                            /> */}
                            <Text style={styles.textTitle}>Tự chọn bài học để giao</Text>
                            <FlatList
                                contentContainerStyle={{ width: width, alignItems: 'center' }}
                                data={this.props.dataExercise.dataUser}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        this.renderItem(item)
                                    )
                                }}
                            />
                            <View style={{ width: width, alignItems: 'center' }}>
                                <RippleButton style={{ borderRadius: 10, marginTop: 10, width: 295, height: 44, backgroundColor: 'rgb(255, 155, 26)', alignItems: 'center', justifyContent: 'center' }} onPress={this.onPressListLessonBtn.bind(this)}>
                                    <Text style={styles.listLessonLb}>DANH SÁCH BÀI HỌC</Text>
                                </RippleButton>
                            </View>
                        </ScrollView>
                    </View>
                </View>}
                {!this.state.isHideManuallyExerciseChoose && <ChooseExerciseManually backCallback={this.backCallback.bind(this)} userId={this.props.userId} packageCode={this.props.packageCode} onChoosedExercise={(data) => this.props.onChoosedExercise(data)} />}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        configId: state.parent.configId
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseExerciseParentScreen);

const styles = StyleSheet.create({
    statusItem: {
        color: 'green'
    },
    icon: {
        width: 35,
        height: 35,
        marginTop: 0
    },
    listLessonLb: {
        color: 'blue',
        fontSize: 16,
        fontWeight: '500',
        color:'#fff',
    },
    textTitle: {
        marginHorizontal: '5%',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        marginTop: 20,
        marginBottom: 10,
        color: 'rgb(255, 155, 26)'
    },
    root: {
        width: width,
        height: height,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
    }
})