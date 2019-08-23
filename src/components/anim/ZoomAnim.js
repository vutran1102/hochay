import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

export default class ZoomAnim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaleAnim: new Animated.Value(0)
        };
    }

    componentDidMount() {
        const anim = Animated.timing(
            this.state.scaleAnim,
            {
                toValue: 1,
                duration: this.props.duration ? this.props.duration : 750,
                delay: this.props.delay || 0
            }
        );
       anim.start();
    }

    render() {
        const scale = this.state.scaleAnim;
        return (
            <Animated.View
                style={{ ...this.props.style, transform: [{ scale: scale }] }}>
                {this.props.children}
            </Animated.View>
        );
    }
}
