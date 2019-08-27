import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import ItemSubject from './ItemSubject';


export default class Trophy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { key: 1, title: 'TOÁN HỌC' },
                { key: 2, title: 'TIẾNG VIỆT' },
                { key: 3, title: 'TIẾNG ANH' }
            ]

        }
    }

    componentDidMount() {

    }

    handleAction() {

    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <ItemSubject item={item} onPress={this.handleAction.bind(this)} />
                    }
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        marginLeft: 20
    }
});