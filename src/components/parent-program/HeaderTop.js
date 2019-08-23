import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RippleButton from '../common/RippleButton';
import IconIon from 'react-native-vector-icons/Ionicons';
import { ChonseSelect } from 'react-native-chonse-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import PickerKiwi from '../common/PickerKiwi';
import PropsTypes from 'prop-types';
import Color from '../../constants/colors';
import { dataGrade } from '../../utils/DataTest';
import { playSoundButton } from '../../utils/AudioUtils';

export default class HeaderTop extends Component {
    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.props.bgColor || 'transparent' }]}>
                <RippleButton onPress={() => { this.props.onPress(); playSoundButton(); }} size={40} duration={250} style={styles.arround}>
                    <IconIon name={'md-arrow-back'} color={this.props.color ? this.props.color : Color.iconHeaderColor} size={24} style={styles.icon} />
                </RippleButton>
                <Text style={[styles.title, { color: this.props.color }]}>{this.props.title || ''}</Text>
                {this.props.icon &&
                    <RippleButton onPress={() => { this.props.onMenuPress(); playSoundButton(); }} size={40} duration={250} style={styles.arround}>
                        <Icon name={this.props.icon} color={this.props.color ? this.props.color : Color.iconHeaderColor} size={24} style={styles.icon} />
                    </RippleButton>
                }

                <ChonseSelect
                    height={35}
                    style={{ marginLeft: 20, marginRight: 10 }}
                    data={dataGrade}
                    color={'#f8f8f8'}
                    onPress={(item) => this.props.onChangeGrade(item)}
                    initValue={this.props.gradeId}
                />

                {/* <PickerKiwi
                    style={{marginRight:10}}
                    onItemChange={(value) => this.setState({ gradeId: value })}
                    data={[{ label: 'Theo SGK', value: 'sgk' }, { label: 'Theo kỹ năng', value: 'skill' }]}
                /> */}
                {/* <Text style={[styles.textEnd, { color: this.props.color ? this.props.color : Color.iconHeaderColor }]}>Gửi về email</Text> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.textHeaderColor
    },
    textEnd: {
        marginRight: 5,
        fontSize: 13,
        fontFamily: 'Roboto-Bold'
    },
    arround: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    icon: {
        alignSelf: 'center'
    }
});

HeaderTop.propsTypes = {
    title: PropsTypes.string,
    onPress: PropsTypes.func.isRequired
}
