import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import HeaderNavigation from '../../common/HeaderNavigation';
import RippleButton from '../../common/RippleButton';
import AppIcon from '../../../utils//AppIcon';
import { connect } from 'react-redux';
import HeaderParent from '../HeaderParent';
import { saveDataProplemsIdToUpdatePathwayAction } from '../../../actions/parentAction';


let { width, height } = Dimensions.get('window');
let s = width;
if (width > height) {
    width = height;
    height = s;
}
const arraySource = [AppIcon.icon_board, AppIcon.icon_book, AppIcon.icon_pen, AppIcon.icon_penholder, AppIcon.icon_hat, AppIcon.icon_calc, AppIcon.icon_clock];
class ChooseLessonManually extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choosedIndex: {}
        }
    }

    onItemPress(problemId) {
        this.setState({
            choosedIndex: {
                ...this.state.choosedIndex,
                [problemId]: !this.state.choosedIndex[problemId]
            }
        })
    }

    renderItemGroup(dataGroup) {
        const { name, data } = dataGroup;
        return (
            <View style={styles.itemGroup}>
                <Text style={styles.titleGroup}>{name}</Text>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <FlatList
                        data={data}
                        extraData={this.state.choosedIndex}
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

    calculateData() {
        let result = [];
        let data = this.state.choosedIndex;
        for (var key in data) {
            if (data[key]) {
                result.push(key)
            }
        }
        return result;
    }

    saveChoosedData() {
        const data = this.calculateData();
        this.props.saveDataProplemsIdToUpdatePathway({ data })
    }

    renderItem(singleItemData, index) {
        return (
            <View onPress={() => this.onItemPress(singleItemData.problemId)}>
                <View style={styles.item}>
                    <Image source={arraySource[index%7]} resizeMode='contain' style={{ width: 30, height: 30 }} />
                    <View style={{ marginLeft: 20 }}>
                        <Text>{singleItemData.name}</Text>
                        <Text style={styles.statusItem}>Tình trạng: {this.hanleStatusIndex(singleItemData.levelPractice)}</Text>
                    </View>
                    {this.state.choosedIndex[singleItemData.problemId] && <View style={styles.buttonChoose} >
                        <View style={styles.insideChooseBtn}>
                        </View>
                    </View>}
                </View>
            </View>
        )
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

    render() {
        return (
            <View style={styles.root}>
                <HeaderParent displayName={`Danh sách bài học`} leftCallback={() => { this.props.backCallback() }} />
                {/* <HeaderNavigation title='Danh sách bài học' onPress={() => { this.props.backCallback(); this.saveChoosedData() }} bgColor='blue' color='#fff' /> */}
                <View style={styles.container}>
                    <FlatList
                        data={this.props.data}
                        extraData={this.state.choosedIndex}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                this.renderItemGroup(item, index)
                            )
                        }}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveDataProplemsIdToUpdatePathway: payload => {
            dispatch(saveDataProplemsIdToUpdatePathwayAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLessonManually);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
    },
    container: {
        width: width * 1,
        // borderWidth: 1,
        alignItems: 'center',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor: '#fff',
        paddingBottom: 110
    },
    itemGroup: {
        width: width * 0.9,
        // borderWidth: 1,
        marginVertical: 15,
        paddingVertical: 15
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
        fontFamily: 'Roboto-Bold'
    },
    buttonChoose: {
        width: 20,
        height: 20,
        backgroundColor: '#fff',
        borderWidth: 4,
        borderColor: 'green',
        position: 'absolute',
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    insideChooseBtn: {
        backgroundColor: 'green',
        width: 8,
        height: 8,
    }
})
