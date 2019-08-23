import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { Picker, Icon } from 'native-base';

export default class FormSelectBeta extends Component {
    render() {
        return (
            <View style={styles.rowForm}>
                <Text style={styles.label}>{this.props.label}</Text>
                <View style={styles.viewInput}>
                    {this.props.data &&
                        <Picker
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            note
                            mode="dropdown"
                            textStyle={{ color: '#333' }}
                            style={{ marginLeft: 10, color: '#333', width: 110, height: 30, }}
                            selectedValue={this.props.selectedValue}
                            onValueChange={(value) => {
                                this.props.onValueChange(value);
                            }}
                        >
                            {this.props.data.map((val, key) => {
                                return (
                                    <Picker.Item key={key} label={val.label} value={val.value} />
                                );
                            })}
                        </Picker>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowForm: {
    },
    label: {
        color: '#333',
        marginLeft: 5
    },
    viewInput: {
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#cdcdcd',
        marginTop: 10,
    }
});
