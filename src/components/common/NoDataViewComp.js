import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class NoDataViewComp extends Component {

    render() {
        console.log('NoDataViewComp');
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title||"Không có dữ liệu để hiển thị"}</Text>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    title: {
        fontFamily: 'iCiel Pony',
        fontSize: 18,
        marginTop: 20,
    },
    childViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    }
})