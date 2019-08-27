import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';

export default class SlideBottom extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RippleButton onPress={() => this.props.onClose()} style={styles.header}>
                    <Icon name={'angle-down'} color={'white'} size={30} />
                </RippleButton>
                <View style={styles.body}>
                    <Text style={styles.textTitle}>Thay đổi hiển thị</Text>
                    <RippleButton onPress={() => this.props.onPress('ALL')} style={styles.rowItem}>
                        <Image source={AppIcon.icon_question} style={styles.icon} />
                        <Text style={styles.text}>Tất cả các câu hỏi</Text>
                    </RippleButton>
                    <RippleButton onPress={() => this.props.onPress('TRUE')} style={styles.rowItem}>
                        <Image source={AppIcon.check_mark} style={styles.icon} />
                        <Text style={styles.text}>Chỉ xem các câu đúng</Text>
                    </RippleButton>
                    <RippleButton onPress={() => this.props.onPress('FALSE')} style={styles.rowItem}>
                        <Image source={AppIcon.check_delete} style={styles.icon} />
                        <Text style={styles.text}>Chỉ xem các câu sai</Text>
                    </RippleButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        bottom: 0,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 10,
    },
    header: {
        flex: 1,
        paddingVertical: 5,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        alignItems: 'center',
        backgroundColor: 'rgb(122, 199, 12)'
    },
    textTitle: {
        marginTop: 10,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(166, 168, 171)',
        fontSize: 18,
    },
    body: {
        paddingLeft: 20
    },
    rowItem: {
        marginVertical: 10,
        flexDirection: 'row'
    },
    icon: {
        width: 18,
        height: 20,
    },
    text: {
        marginLeft: 10,
        color: 'rgb(181, 182, 185)',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
    }
});