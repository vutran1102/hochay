import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RippleButton from '../common/RippleButton';

export default Recent = ({ recent, onPress }) => {
    return (
        <RippleButton style={styles.container} onPress={onPress}>
            <View style={styles.info}>
                <Text style={styles.title}>{recent.problemHiearchyName}</Text>
                <Text style={styles.title}>{recent.problemName}</Text>
            </View>
            <Icon name={'arrow-circle-right'} color={'#fff'} size={30} style={styles.icon} />
        </RippleButton>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgba(43, 120, 228, 0.15)',
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        borderColor: '#ececec'
    },
    info: {
        paddingHorizontal: 10,
        flex: 1,
    },
    icon: {
        marginHorizontal: 20,
        alignSelf: 'center'
    },
    title: {
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-Bold',
        fontSize: 14
    }
});