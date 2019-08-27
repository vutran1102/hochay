import React, { Component } from 'react';
import * as Progress from 'react-native-progress';
import { width_device } from '../../constants/const';
import Color from '../../constants/colors';

export default class ProgressBar extends Component {
  render() {
    return (
      <Progress.Bar
        color={this.props.color ? this.props.color : '#71C839'}
        width={this.props.width || width_device - 160}
        height={this.props.height || 5}
        borderRadius={2} borderBottomWidth={1}
        borderColor={'#f5f5f5'}
        unfilledColor={'#dbd6d6'}
        progress={this.props.progress || 0}
        style={{ marginVertical: 8, ...this.props.style, opacity: 0.7}} />
    );
  }
}
