import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RippleButton from '../common/RippleButton';
import Color from '../../constants/colors';

export default HeaderKiwi = ({ onPress, questionIndex, numWrong, scoreKiwi }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <RippleButton size={50} onPress={onPress} style={{ paddingVertical: 10, paddingHorizontal: 20 }} >
                    <Icon name={'remove'} color={'#333'} size={16} style={styles.icon} />
                </RippleButton>
                <Text style={styles.textQuestion}>Câu hỏi: {questionIndex}</Text>
            </View>
            <View style={styles.row}>
                <Icon name={'clock-o'} color={'#333'} size={20} style={styles.icon} />
                <Text style={styles.textTime}>Nội dung đang được xây dựng</Text>
            </View>
            {numWrong == 0 &&
                <View style={styles.row}>
                    <Text style={styles.textScore}>Score: {scoreKiwi}</Text>
                    <Icon name={'heart'} color={'#CF2A28'} size={16} style={styles.icon} />
                    <Icon name={'heart'} color={'#CF2A28'} size={16} style={styles.icon} />
                    <Icon name={'heart'} color={'#CF2A28'} size={16} style={styles.icon} />
                </View>
            }
            {numWrong == 1 &&
                <View style={styles.row}>
                    <Text style={styles.textScore}>Score: {scoreKiwi}</Text>
                    <Icon name={'heart'} color={'#333'} size={16} style={styles.icon} />
                    <Icon name={'heart'} color={'#CF2A28'} size={16} style={styles.icon} />
                    <Icon name={'heart'} color={'#CF2A28'} size={16} style={styles.icon} />
                </View>
            }
            {numWrong == 2 &&
                <View style={styles.row}>
                    <Text style={styles.textScore}>Score: {scoreKiwi}</Text>
                    <Icon name={'heart'} color={'#333'} size={16} style={styles.icon} />
                    <Icon name={'heart'} color={'#333'} size={16} style={styles.icon} />
                    <Icon name={'heart'} color={'#CF2A28'} size={16} style={styles.icon} />
                </View>
            }
            {numWrong >= 3 &&
                <View style={styles.row}>
                    <Text style={styles.textScore}>Score: {scoreKiwi}</Text>
                    <Icon name={'heart'} color={'#333'} size={16} style={styles.icon} />
                    <Icon name={'heart'} color={'#333'} size={16} style={styles.icon} />
                    <Icon name={'heart'} color={'#333'} size={16} style={styles.icon} />
                </View>
            }
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
    textQuestion: {
        alignSelf: 'center',
        marginLeft: 10,
        color: Color.textColorPrimary,
        fontSize: 13
    },
    textTime: {
        alignSelf: 'center',
        color: Color.textColorPrimary,
        fontSize: 13,
        fontWeight: 'bold'
    },
    textScore: {
        alignSelf: 'center',
        color: Color.textColorPrimary,
        fontSize: 13,
        marginRight: 10
    }
});