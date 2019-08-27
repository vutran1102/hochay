import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class ZoomOutAnim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radiusAnim: new Animated.Value(0),
            widthAnim: new Animated.Value(this.props.height),
            opacityAnim: new Animated.Value(1),
        };
    }

    componentDidMount() {
    }

    startAnimation(callback) {
        const animRadius = Animated.timing(
            this.state.radiusAnim,
            {
                toValue: this.props.height / 2,
                duration: this.props.duration ? this.props.duration : 650,
            }
        );

        const animWidth = Animated.timing(
            this.state.widthAnim,
            {
                toValue: 0,
                duration: this.props.duration ? this.props.duration : 650,
            }
        );

        const opacityAnim = Animated.timing(
            this.state.opacityAnim,
            {
                toValue: 0,
                duration: this.props.duration ? this.props.duration : 650,
            }
        );

        Animated.parallel([animRadius, animWidth, opacityAnim]).start(callback);
    }

    render() {
        const borderRadius = this.state.radiusAnim;
        const width = this.state.widthAnim;
        const opacityAnim = this.state.opacityAnim;
        return (
            <Animated.View
                style={{ ...this.props.style, width: width, height: width, borderRadius: borderRadius, opacity: opacityAnim }}>
                {this.props.children}
            </Animated.View>
        );
    }
}