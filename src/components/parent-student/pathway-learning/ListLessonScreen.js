import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import HeaderNavigation from '../../common/HeaderNavigation';
import RippleButton from '../../common/RippleButton';
import AppIcon from '../../../utils//AppIcon';

const screenSize = Dimensions.get('window');


export default class ChooseExerciseManually extends Component {
    constructor(props) {
        super(props);

    }
    renderItemGroup(dataGroup) {
        const { title, data } = dataGroup;
        return (
            <View style={styles.itemGroup}>
                <Text style={styles.titleGroup}>{title}</Text>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                this.renderItem(item)
                            )
                        }}
                    />
                </View>
            </View>
        )
    }

    renderItem(singleItemData) {
        return (
            <RippleButton>
                <View style={styles.item}>
                    <Image source={AppIcon.math_icon} resizeMode='contain' style={{ width: 30, height: 30 }} />
                    <View style={{ marginLeft: 20 }}>
                        <Text>{singleItemData.title}</Text>
                        <Text style={styles.statusItem}>Tình trạng: {singleItemData.status}</Text>
                    </View>
                </View>
            </RippleButton>
        )
    }

    render() {
        return (
            <View style={styles.root}>
                <HeaderNavigation title='Danh sách bài học' onPress={() => { this.props.backCallback() }} bgColor='blue' color='#fff' />
                <View style={styles.container}>
                    <FlatList
                        data={dataFake}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                this.renderItemGroup(item)
                            )
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    container: {
        width: screenSize.width * 0.95,
        borderWidth: 1,
        alignItems: 'center'
    },
    itemGroup: {
        width: screenSize.width * 0.9,
        borderWidth: 1,
        marginVertical: 15,
        paddingVertical: 15
    },
    item: {
        width: 0.88 * screenSize.width,
        height: 40,
        paddingLeft: 10,
        borderWidth: 2,
        marginVertical: 2,
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
    }
})


const dataFake = [
    {
        title: 'Chapter 1: Các số đếm, hình vuông, hình tròn, hình tam giác',
        data: [
            {
                status: 'Chưa luyện tập',
                title: 'Luyện tập đếm đến số 100',
            },
            {
                status: 'Chưa luyện tập',
                title: 'Luyện tập đếm đến số 100',
            },
            {
                status: 'Chưa luyện tập',
                title: 'Luyện tập đếm đến số 100',
            },
            {
                status: 'Chưa luyện tập',
                title: 'Luyện tập đếm đến số 100',
            }
        ]
    },
    {
        title: 'Chapter 2: Các số đếm, hình vuông, hình tròn, hình tam giác',
        data: [
            {
                status: 'Chưa luyện tập',
                title: 'Luyện tập đếm đến số 100',
            },
            {
                status: 'Chưa luyện tập',
                title: 'Luyện tập đếm đến số 100',
            },
            {
                status: 'Chưa luyện tập',
                title: 'Luyện tập đếm đến số 100',
            },
            {
                status: 'Chưa luyện tập',
                title: 'Luyện tập đếm đến số 100',
            }
        ]
    }
]