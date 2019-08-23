import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

class TransTextAnim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transAnim: new Animated.Value(0),
            fadeAnim: new Animated.Value(1)
        };
    }

    componentDidMount() {
        const transAnim = Animated.timing(
            this.state.transAnim,
            {
                toValue: 120,
                duration: 600,
            }
        );

        const blinkAnim = Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: this.props.duration ? this.props.duration : 1000,
            }
        );
        
        const animatedAll = Animated.sequence([transAnim, Animated.loop(blinkAnim)]);
        animatedAll.start();
    }

    render() {
        const transAnim = this.state.transAnim;
        const opacity = this.state.fadeAnim;
        return (
            <View style={[styles.container]}>
                <Animated.View style={[styles.view, { opacity: opacity }]}>
                    <Text style={[styles.textEffects]}>Perfect</Text>
                </Animated.View>
                <Animated.View style={[styles.wrapEffect, { left: transAnim }]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        alignSelf: 'center',
        alignItems: 'center'
    },
    view: {
        width: 120,
        justifyContent: 'center'
    },
    wrapEffect: {
        width: 120,
        position: 'absolute',
        backgroundColor: '#fff',
        top: 0, left: 0,
        right: 0, bottom: 0,
    },
    textEffects: {
        fontFamily: 'SVN-Gumley',
        fontSize: 36,
        alignSelf: 'center',
        color: '#fff',
        textShadowColor: 'rgb(5, 97, 203)',
        textShadowOffset: { width: 3, height: 2 },
        textShadowRadius: 2
    }
});


export default class ResultEffect extends Component {
    render() {
        return (
            <TransTextAnim>
            </TransTextAnim>
        );
    }

}

