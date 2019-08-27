import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class SlideInBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transInBotAnim: new Animated.Value(this.props.translateY || 200),
    };
  }

  componentDidMount() {
    const autoStart = this.props.autoStart || true;
    if (autoStart) {
      this.start();
    }
  }

  start() {
    this.slideLeftStart();
  }

  slideLeftStart() {
    Animated.timing(
      this.state.transInBotAnim,
      {
        toValue: 0,
        duration: this.props.duration ? this.props.duration : 600,
        delay: this.props.delay ? this.props.delay : 100,
      }
    ).start();
  }


  render() {
    const translateY = this.state.transInBotAnim;
    return (
      <Animated.View
        style={{ ...this.props.style, transform: [{ translateY }] }}>
        {this.props.children}
      </Animated.View>
    );
  }
}
