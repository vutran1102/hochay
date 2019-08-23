import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
const bgLoading = '#dadada';

export default class TranslateTextHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transAnim: new Animated.Value(0)
        };
    }

    componentDidMount() {
        this.start();
    }

    start() {
        const transAnim = Animated.timing(
            this.state.transAnim,
            {
                toValue: this.props.width || 120,
                duration: 3000,
            }
        );
        Animated.loop(transAnim).start();
    }

    render() {
        const transAnim = this.state.transAnim;
        const { width } = this.props;
        return (
            <View style={[styles.textLoading, { width: width }]}>
                <Animated.View style={[styles.viewEffect,
                {
                    marginLeft: transAnim
                }]}></Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewEffect: {
        width: 10,
        height: 10,
        borderRadius: 3,
        backgroundColor: '#fff'
    },
    textLoading: {
        backgroundColor: bgLoading,
        height: 10,
        marginTop: 3,
    }
});


