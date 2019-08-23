import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AppIcon from '../../utils/AppIcon';
import Color from '../../constants/colors';

export default class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={AppIcon.icon_robot} style={styles.icon} />
                <Text style={styles.title}>Nâng cao các bài kiểm tra của bạn với các kỹ năng phù hợp</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
    },
    icon: {
        alignSelf: 'center',
        width: 60,
        height: 60
    },
    title: {
        color: 'rgb(166, 168, 171)',
        fontWeight: 'bold',
        fontSize: 13,
        alignSelf: 'center'
    }
});