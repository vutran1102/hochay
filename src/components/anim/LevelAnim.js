import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class LevelAnim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftAnim: new Animated.Value(this.props.x || -80),
            topAnim: new Animated.Value(this.props.y || -80),
        };
    }

    componentDidMount() {
        this.slideLeftStart();
    }

    slideLeftStart() {
        const leftAnim = Animated.timing(
            this.state.leftAnim,
            {
                toValue: 0,
                duration: this.props.duration ? this.props.duration : 450,
                delay: this.props.delay ? this.props.delay : 100,
            }
        );
        const topAnim = Animated.timing(
            this.state.topAnim,
            {
                toValue: 0,
                duration: this.props.duration ? this.props.duration : 450,
                delay: this.props.delay ? this.props.delay : 100,
            }
        );
        Animated.parallel([leftAnim, topAnim]).start();
    }


    render() {
        const marginLeft = this.state.leftAnim;
        const marginTop = this.state.topAnim;
        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    marginLeft: marginLeft,
                    marginTop: marginTop
                }}>
                {this.props.children}
            </Animated.View>
        );
    }
}
