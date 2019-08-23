import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

export default class ScaleSlideAnim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaleAnim: new Animated.Value(0.3)
        };
    }

    componentDidMount() {
        const { type } = this.props;
        if (type == 'timing') {
            const anim = Animated.timing(
                this.state.scaleAnim,
                {
                    easing: Easing.ease,
                    toValue: 1,
                    duration: this.props.duration ? this.props.duration : 750,
                    delay: this.props.delay || 0
                }
            );
            anim.start();
        } else {
            const anim = Animated.spring(
                this.state.scaleAnim,
                {
                    easing: Easing.ease,
                    toValue: 1,
                    duration: this.props.duration ? this.props.duration : 750,
                }
            );
            anim.start();
        }
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
