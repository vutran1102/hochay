import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';

export default ItemAccount = ({ item, removeAction, onLongPress, onPress }) => {
    return (
        <View style={styles.rowAccount}>
            <Image source={AppIcon.icon_girl} style={styles.iconAvata} />
            <View style={styles.viewInfo}>
                <Text style={styles.textName}>{item.displayName}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {item.gender == 'NU' ?
                        <Icon name={'venus'} color={'#E61B5F'} size={16} /> :
                        <Icon name={'mars-stroke-v'} color={'#01366A'} size={16} />
                    }
                    <Text style={styles.textClass}>Lớp {item.gradeId.substring(1)}</Text>
                </View>
            </View>
            <RippleButton onPress={() => onPress(item)} style={styles.viewEdit}>
                <Icon name={'pencil'} color={'#fff'} size={14} />
            </RippleButton>
            <RippleButton onPress={() => onLongPress(item.userId)} style={styles.viewDel}>
                <Icon name={'remove'} color={'red'} size={14} />
            </RippleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    rowAccount: {
        flex: 1,
        marginBottom: 10,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingVertical: 5,
        marginRight: 20,
        backgroundColor: '#fff',
        borderRadius: 6
    },
    iconAvata: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    textName: {
        color:'rgb(177,179,181)',
        fontSize: 15,
        fontFamily: 'Roboto-Bold'
    },
    textClass: {
        fontSize: 14,
        color:'rgb(177,179,181)',
        fontFamily: 'Roboto-Bold'
    },
    viewEdit: {
        width: 30,
        borderRadius: 6,
        backgroundColor: 'rgb(122, 199, 12)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingHorizontal: 10,
    },
    viewDel: {
        width: 30,
        borderRadius: 6,
        backgroundColor: '#cdcdcd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingHorizontal: 10,
    },
    viewInfo: {
        flex: 1,
        justifyContent: 'center'
    }
});