import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarIndicator } from 'react-native-indicators';
import LevelPractice from '../common/LevelPractice';
import RippleButton from '../common/RippleButton';
import ProgressBar from '../common/ProgressBar';
import AppIcon from '../../utils/AppIcon';
import Color from '../../constants/colors';

export default HeaderPractice = ({ onPress, percentComplete, isAnswer, index, widthProgress, isLoading, levelPractice }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <RippleButton size={100} onPress={onPress} style={styles.wrapPause}>
                    <Image source={AppIcon.icon_pause} style={styles.iconPause} />
                </RippleButton>
            </View>
            <View style={styles.rowIsAnswer}>
                {isLoading &&
                    <BarIndicator color={'#3AB5E7'} size={24} />
                }
                {/* {isAnswer == 1 &&
                    <Icon name={'check'} color={'#228B22'} size={15} style={styles.icon} />
                }
                {isAnswer == -1 &&
                    <Icon name={'remove'} color={'#A52A2A'} size={15} style={styles.icon} />
                } */}
            </View>
            <View style={styles.wrapProgress}>
                <LevelPractice levelPractice={levelPractice} />
                <ProgressBar width={widthProgress || 200} progress={percentComplete / 100} />
                <Text style={styles.textScore}>{percentComplete}/100</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconApple: {
        width: 16,
        height: 20,
        marginRight: 5,
    },
    rows: {
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    wrapPause: {
        paddingVertical: 5
    },
    iconPause: {
        width: 20,
        height: 20,
    },
    icon: {
        alignSelf: 'center',
        marginRight: 5,
    },
    wrapProgress: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textScore: {
        marginLeft: 20,
        fontSize: 16,
        alignSelf: 'center',
        color: 'rgb(139, 197, 63)',
        fontFamily: 'Roboto-Bold'
    },
    rowIsAnswer: {
        paddingHorizontal: 5,
        flexDirection: 'row'
    },
    icon1: {
        width: 16,
        height: 20,
        position: 'absolute',
        zIndex: 1,
    },
    icon2: {
        width: 16,
        height: 20,
        position: 'absolute',
    },
    icon3: {
        width: 16,
        height: 20,
        position: 'absolute',
    },
    textNumquestion: {
        fontSize: 13,
        color: Color.textColorPrimary,
        alignSelf: 'center'
    }
});