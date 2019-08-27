import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import RippleButton from '../common/RippleButton';

const { width, height } = Dimensions.get('window');

const paddingH = width / 4;

export default SelectChild = ({
    onSelectItem = () => null,
    onClose = () => null,
    listChild = []
}) => {
    return (
        <RippleButton onPress={() => onClose()}>
            <View style={styles.container}>
                <View style={styles.body}>
                    {listChild.map((data, key) => {
                        console.log(data.displayName);
                        return (
                            <TouchableHighlight key={key}
                                onPress={() => onSelectItem(data)}
                                underlayColor={'#b8b8b8'}
                                style={styles.rowItem}>
                                <Text>{data.displayName}</Text>
                            </TouchableHighlight>
                        )
                    })}
                </View>
            </View>
        </RippleButton>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.65)',
        paddingHorizontal: paddingH,
        paddingVertical: 20,
    },
    body: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    rowItem: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#b8b8b8'
    }
});