import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default class TranslateTextAnim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transAnim: new Animated.Value(70)
        };
    }

    componentDidMount() {

    }

    start() {
        const transAnim = Animated.timing(
            this.state.transAnim,
            {
                toValue: 150,
                duration: 600,
            }
        );
        transAnim.start();
    }

    render() {
        const transAnim = this.state.transAnim;
        const opacity = this.state.fadeAnim;
        return (
            <View style={[styles.container]} ellipsizeMode={'clip'}>
                <Animated.Text letterSpacing={5} numberOfLines={1} style={[styles.textEffects, { width: transAnim }]}>Tuyệt Vời</Animated.Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        alignSelf: 'center',
        alignItems: 'center'
    },
    view: {
        width: 150,
        justifyContent: 'center'
    },
    wrapEffect: {
        width: 150,
        position: 'absolute',
        backgroundColor: '#fff',
        top: 0, left: 0,
        right: 0, bottom: 0,
    },
    textEffects: {
        fontFamily: 'SVN-Gumley',
        fontSize: 40,
        alignSelf: 'center',
        color: '#005068',
        textShadowColor: 'rgb(5, 97, 203)',
        textShadowOffset: { width: 3, height: 2 },
        textShadowRadius: 2
    }
});


