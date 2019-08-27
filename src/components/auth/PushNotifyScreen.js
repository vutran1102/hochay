import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class PushNotificationScreen extends Component {

    pushNoti() {
        PushNotification.localNotification({
            title: 'Kiwi thông báo',
            message: "Nhắc nhở học tập", // (required)
            date: new Date(Date.now() + (60 * 1000)) // in 60 secs
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.pushNoti()}>
                    <Text style={{ fontSize: 40, color: '#333' }}>Push Noti</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
});