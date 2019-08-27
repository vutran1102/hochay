import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

export default class FormInputDefault extends Component {
    render() {
        return (
            <View style={styles.rowForm}>
                <Text style={styles.label}>{this.props.label}</Text>
                <View style={styles.viewInput}>
                    <TextInput
                        keyboardType={this.props.keyboardType || 'default'}
                        style={styles.inputText}
                        placeholder={this.props.placeholder}
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor={this.props.placeholderTextColor || '#999'}
                        onChangeText={(text) => this.props.onChangeText(text)}
                        value={this.props.value} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowForm: {
        marginVertical: 10,
    },
    label: {
        color: '#333',
        marginLeft: 5
    },
    viewInput: {
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: '#cdcdcd',
        paddingLeft: 20,
        marginTop: 10,
    }
});

FormInputDefault.propTypes = {
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
}
