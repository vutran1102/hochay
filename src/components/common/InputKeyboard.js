import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, TouchableHighlight, SafeAreaView } from 'react-native';

export default class InputKeyBoard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: this.props.textInput
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <TextInput
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        autoFocus
                        keyboardType={this.props.keyboardType || 'default'}
                        secureTextEntry={this.props.secureTextEntry}
                        onChangeText={(text) => { this.setState({ value: text }); this.props.onChangeText(text) }}
                        underlineColorAndroid={'transparent'}
                        style={styles.inputText} />
                    {Platform.OS == 'ios' &&
                        <SafeAreaView>
                            <TouchableHighlight onPress={() => this.props.onPress()} style={styles.wrapButton}>
                                <Text style={styles.textAction}>H.TẤT</Text>
                            </TouchableHighlight>
                        </SafeAreaView>
                    }
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        zIndex: 10
    },
    inputText: {
        fontWeight: 'bold',
        fontSize: 16,
        margin: 10,
    },
    wrapButton: {
        position: 'absolute',
        right: 10,
        top: 80,
        borderWidth: 1,
        borderColor: '#cdcdcd',
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#d6d7d7'
    }
});

