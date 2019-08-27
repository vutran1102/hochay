import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LevelPractice from '../common/LevelPractice';
import RippleButton from '../common/RippleButton';
import AppIcon from '../../utils/AppIcon';

export default class ListInvoke extends Component {
    render() {
        const { item } = this.props;
        const { levelPractice } = item;
        return (
            <RippleButton style={styles.listItem} onPress={() => this.props.onPress(item)} color={'white'}>
                <View>
                    <Image source={AppIcon.icon_play} style={styles.iconPlay} />
                </View>
                <View style={styles.rowRight}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textInfo}>Mức độ luyện tập</Text>
                        <LevelPractice levelPractice={levelPractice} />
                    </View>
                </View>
            </RippleButton>
        )
    }
}
const styles = StyleSheet.create({
    listItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderColor: '#cdcdcd'
    },
    title: {
        flex: 1,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(166, 168, 171)',
        marginRight: 5,
        fontSize: 14
    },
    rowRight: {
        marginLeft: 20
    },
    iconPlay: {
        width: 25,
        height: 25,
    },
    icon: {
        width: 15,
        height: 18,
        marginRight: 5,
    },
    textInfo: {
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-MediumItalic',
        marginRight: 10,
        fontSize: 13
    },
    iconApple: {
        width: 16,
        height: 20,
        marginRight: 5,
    },
    rows: {
        flexDirection: 'row'
    }
});