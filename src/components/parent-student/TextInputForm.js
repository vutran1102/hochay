import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Text, Dimensions } from 'react-native';

let {width, height} = Dimensions.get('window');
let s = width;
if(width > height) { 
    width = height;
    height =s;
}

export const TextInputForm = ({ title='', keyboardType = 'default', onChangeText=()=>null, secureTextEntry, value}) => {
    return (
        <View style={styles.rootView}>
            <Text style={styles.textTitle}>{title}</Text>
            <View style={styles.ereaInput}>
                <TextInput
                    value={value|| ''}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry || false}
                    style={[styles.textInput, {
                        color: value != '' ? '#000' : '#000'
                    }]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ereaInput: {
        marginLeft: 20,
        width: 230,
        height: 30,
        borderColor: 'rgb(187, 206, 228)',
        justifyContent: 'center',
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius: 2,
        position: 'absolute',
        right: 30,
        backgroundColor: '#fff',

    },
    rootView: {
        width: width,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 12,
        paddingLeft: 20,
        marginBottom: 5,
        fontWeight: '200'
    },
    textInput: {
        fontSize: 13,
        fontWeight: '600',
        // fontFamily: 'Roboto-MediumItalic',
    },
    inputView: {
        width: 100,
        height: 70,
        position:'absolute',
        right: 20
    }
})