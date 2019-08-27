import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RippleButton from '../common/RippleButton';

export default Header = ({ index, onPress }) => {
    return (
        <View style={styles.container}>
            <View style={index == 1 ? styles.buttonContainerActive : styles.buttonContainer}>
                <RippleButton size={160} onPress={() => onPress(1)} style={index == 1 ? [styles.tabsActive, { borderLeftWidth: 0.2 }] : styles.tabs}>
                    <Text style={index == 1 ? styles.textTabActive : styles.textTab}>Thông tin tài khoản</Text>
                </RippleButton>
            </View>
            <View style={index == 2 ? styles.buttonContainerActive : styles.buttonContainer}>
                <RippleButton size={160} onPress={() => onPress(2)} style={index == 2 ? styles.tabsActive : styles.tabs}>
                    <Text style={index == 2 ? styles.textTabActive : styles.textTab}>Cài đặt chung</Text>
                </RippleButton>
            </View>
            <View style={index == 3 ? styles.buttonContainerActive : styles.buttonContainer}>
                <RippleButton size={160} onPress={() => onPress(3)} style={index == 3 ? styles.tabsActive : styles.tabs}>
                    <Text style={index == 3 ? styles.textTabActive : styles.textTab}>Điều khoản sử dụng</Text>
                </RippleButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        paddingLeft: 15,
        zIndex: 9
    },
    buttonContainerActive: {
        height: 50,
        // backgroundColor:'#fff',
        marginLeft: 5,
        width: 160

    },
    buttonContainer: {
        paddingTop: 5,
        marginLeft: 5,
        height: 50,
        width: 160
    },
    tabs: {
        backgroundColor: '#FFAD00',
        height: 50,
    },
    tabsActive: {
        backgroundColor: '#fff',
        borderTopWidth: 0.2,
        borderColor: '#666666',
        height: 60,
    },
    textTab: {
        fontFamily: 'Roboto-Bold',
        color: '#fff',
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 15
    },
    textTabActive: {
        fontFamily: 'Roboto-Bold',
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 20
    }
});