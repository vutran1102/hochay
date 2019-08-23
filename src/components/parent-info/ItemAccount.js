import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ItemAccount = ({ title, label }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    label: {
        width: 200,
        color:'rgb(177,179,181)',
        fontFamily: 'Roboto-Bold'
    },
    title:{
        color:'rgb(177,179,181)',
        fontFamily: 'Roboto-Regular'
    }
});