import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { datalistProblemHierachy } from '../../utils/DataTest';
import ItemsPractice from '../practice-steps/ItemsPractice';

export default class TestLoading extends Component {

    gotoPracticeProblem() {

    }

    visibleKnowledge(){

    }
    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'blue' }}>
                <FlatList
                    ref={(ref) => { this.flatListRef = ref; }}
                    contentContainerStyle={styles.contents}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={datalistProblemHierachy}
                    renderItem={({ item }) => <ItemsPractice
                        isLoading={true}
                        onPress={this.gotoPracticeProblem.bind(this)}
                        item={item}
                        visibleKnowledge={this.visibleKnowledge.bind(this)}
                    />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    contents: {
        alignSelf: 'center',
    },
});