import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConfirmDelete = () => {
    return (
        <View style={styles.container}>
            <Text>Bạn muốn xóa học sinh User1</Text>
        </View>
    );
}

export default ConfirmDelete;

const styles = StyleSheet.create({
    container: {
        width: 300,
        backgroundColor: '#fff'
    }
});