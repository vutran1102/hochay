import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, TextInput } from 'react-native';
let { width } = Dimensions.get('window');

export default class InputMessage extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.input}>
                <Text style={styles.lbInput}>Nội dung nhắn con</Text>
                <TouchableWithoutFeedback style={styles.inputContainer} onPress={() => this.refs.abc.focus()}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref='abc'
                            multiline={true}
                            placeholder='Nội dung lời nhắn 300 kí tự'
                            value={this.props.value || ''}
                            onChangeText={(text) => { this.props.callback(text) }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lbInput: {
        fontWeight: '100',
        fontSize: 14,
    },
    input: {
        width: width,
        height: 150,
        marginTop: 40,
    },
    inputContainer: {
        flex: 1,
        borderWidth: 1,
        marginTop: 10,
        width: width - 40,
        height: 120,
        paddingLeft: 10,
        borderColor: 'rgb(187, 206, 228)',
        borderRadius: 3,
    },
})