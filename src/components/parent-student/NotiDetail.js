import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RippleButton from '../common/RippleButton';
import IconIon from 'react-native-vector-icons/Ionicons';
import HeaderNavigation from '../common/HeaderNavigation';


export default class NotiDetail extends Component {
    constructor(props) {
        super(props);
    }

    goBack() {
        this.props.backCallback();
    }

    render() {
        return (
            <View style={styles.rootView}>
                <HeaderNavigation
                    bgColor={'blue'}
                    title={'BACK'}
                    color='#fff'
                    onPress={() => this.goBack()} />
                <View style={styles.container}>
                    <Text style={styles.textStyle}>Chưa có thông tin</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        alignItems: 'center',
        height: '90%',
        paddingHorizontal: 10,
        paddingTop: 10,
        width: '95%',
        borderWidth: 1,
        marginTop: 5
    },
    textStyle: {
        color: 'red',
        fontSize: 20,
        fontFamily: 'Roboto-Bold'
    },
})

