import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RippleButton from '../common/RippleButton';
import Color from '../../constants/colors';
import Common from '../../utils/Common';
import AppIcon from '../../utils/AppIcon';

export default Header = ({ onPress, onPressGuild, showQuestion, timeCount, onToggleSlide, visibleSlide }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <RippleButton size={100} onPress={onPressGuild} >
                    <Image source={AppIcon.icon_pause} style={styles.iconPause} />
                </RippleButton>
            </View>
            <View style={styles.row}>
                <Icon name={'clock-o'} color={'#333'} size={20} style={styles.icon} />
                <Text style={styles.textTime}>{Common.convertSeconds(timeCount)}</Text>
            </View>
            <View style={styles.row}>
                <RippleButton onPress={onToggleSlide} style={{ marginRight: 10 }}>
                    <Icon name={visibleSlide ? 'arrow-circle-o-down' : 'arrow-circle-o-up'} color={'#00ADF8'} size={20} style={styles.icon} />
                </RippleButton>
                <RippleButton onPress={showQuestion}>
                    <Icon name={'bullseye'} color={'#00ADF8'} size={20} style={styles.icon} />
                </RippleButton>
                <RippleButton onPress={onPress}>
                    <Text style={styles.textEnd}>Nộp Bài</Text>
                </RippleButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row'
    },
    icon: {
        alignSelf: 'center',
        marginRight: 5,
    },
    textTime: {
        alignSelf: 'center',
        color: Color.textColorPrimary,
        fontSize: 13,
        fontWeight: 'bold'
    },
    textEnd: {
        alignSelf: 'center',
        color: '#00ADF8',
        fontSize: 13,
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    iconPause: {
        width: 20,
        height: 20,
    },
});