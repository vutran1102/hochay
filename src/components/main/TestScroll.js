import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DataTest from '../../utils/DataTest';
import { Button } from '../common/Button';

export default class TestScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1
        }
    }

    handle() {
        this.setState({
            index: this.state.index + 1
        }, () => {
            this.flatListRef.scrollToIndex({ animated: true, index: this.state.index });
        });
    }

    handleScroll(event){
        console.log(event.nativeEvent);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    onScroll={this.handleScroll}
                    ref={(ref) => { this.flatListRef = ref; }}
                    data={DataTest.dataFlatlist}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={{ width: 200, height: 200, marginHorizontal: 20 }}>
                            <Text>Item {item.key}</Text>
                        </View>
                    }
                />
                <Button title={'next'} onPress={() => this.handle()} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});