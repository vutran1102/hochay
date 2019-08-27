import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class ScaleLoopAnim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaleAnim: new Animated.Value(0),
        };
    }

    componentDidMount() {
        const animate = Animated.timing(
            this.state.scaleAnim,
            {
                toValue: 1,
                duration: this.props.duration ? this.props.duration : 900,
                delay: this.props.delay ? this.props.delay : 0,
            }
        );
        Animated.loop(
            animate
        ).start();
    }

    render() {
        const scale = this.state.scaleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.9],
        });
        return (
            <Animated.View
                style={{ ...this.props.style, transform: [{ scale }] }}>
                {this.props.children}
            </Animated.View>
        );
    }
}
