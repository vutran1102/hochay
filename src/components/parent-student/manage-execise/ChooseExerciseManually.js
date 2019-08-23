import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import HeaderNavigation from '../../common/HeaderNavigation';
import RippleButton from '../../common/RippleButton';
import AppIcon from '../../../utils//AppIcon';
import { LoadingTransparent } from '../../common/LoadingScreen';
import Helpler from '../../../utils/Helpers';
import { connect } from 'react-redux';
import * as parentAction from '../../../actions/parentAction';
import HeaderParent from '../HeaderParent';

const screenSize = Dimensions.get('window');
let { width, height } = screenSize;
let s = width;
if (width > height) {
    width = height;
    height = s;
}

const arraySource = [AppIcon.icon_board, AppIcon.icon_book, AppIcon.icon_pen, AppIcon.icon_penholder, AppIcon.icon_hat, AppIcon.icon_calc, AppIcon.icon_clock];

class ChooseExerciseManually extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        Helpler.getTokenParent().then(token => {
            const userId = this.props.userId;
            const packageCode = this.props.packageCode;
            // const userId = '5c77b8e3de2a200001947fed';
            // const packageCode = '5CD64';
            this.props.fetchLessonListPackage({ token, userId, packageCode })
        })
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

    renderItemGroup(dataGroup) {
        const { name, data } = dataGroup;
        return (
            <View style={styles.itemGroup}>
                <Text style={styles.titleGroup}>{name}</Text>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                this.renderItem(item, index)
                            )
                        }}
                    />
                </View>
            </View>
        )
    }

    renderItem(singleItemData, index) {
        return (
            <RippleButton onPress={() => this.onItemPress(singleItemData)}>
                <View style={styles.item}>
                    <Image source={arraySource[index % (arraySource.length)]} resizeMode='contain' style={{ width: 30, height: 30 }} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ marginRight: 10 }}>{singleItemData.name}</Text>
                        <Text style={styles.statusItem}>Tình trạng: {this.hanleStatusIndex(singleItemData.levelPractice)}</Text>
                    </View>
                </View>
            </RippleButton>
        )
    }

    onItemPress(singleItemData) {
        this.props.onChoosedExercise(singleItemData);
    }

    render() {
        return (
            <View style={styles.root}>
                <HeaderParent displayName={'Danh sách bài học'} leftCallback={() => { this.props.backCallback() }} rightCallback={() => { this.goback(true) }} />
                {/* <HeaderNavigation title='Danh sách bài học' onPress={() => { this.props.backCallback() }} bgColor='blue' color='#fff' /> */}
                <View style={styles.container}>
                    <FlatList
                        data={this.props.listLessonFollowPackage}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                this.renderItemGroup(item)
                            )
                        }}
                    />
                </View>
                <LoadingTransparent isLoading={this.props.isLoading} bgColor='rgba(0,0,0,0.5)' />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.parent.isLoading,
        listLessonFollowPackage: state.parent.listLessonFollowPackage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchLessonListPackage: payload => {
            dispatch(parentAction.getListLessonFlowByPackageStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseExerciseManually);

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    container: {
        flex:1,
        // borderWidth: 1,
        alignItems: 'center',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        backgroundColor: '#fff',
        height: height,
        paddingTop: 20,
    },
    itemGroup: {
        width: width * 0.9,
        // borderWidth: 1,
        marginVertical: 15,
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
    statusItem: {
        color: 'green'
    },
    titleGroup: {
        marginHorizontal: 10,
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        width: 0.8 * width,
        alignSelf: 'center',
        fontSize: 12,
        color: 'rgb(255, 155, 26)'
    }
})
