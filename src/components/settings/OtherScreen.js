import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderNavigation from '../common/HeaderNavigation';

export default class OtherScreen extends Component {

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderNavigation title={'Other'} onPress={() => this.goBack()} />
                <Text>Wellcome to react native</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});