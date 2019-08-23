import React, { Component } from 'react';
import Ripple from 'react-native-material-ripple';

export default class RippleButton extends Component {
	render() {
		return (
			<Ripple
				rippleColor={this.props.color ? this.props.color : '#ddd'}
				rippleDuration={this.props.duration ? this.props.duration : 600}
				rippleSize={this.props.size ? this.props.size : 600}
				rippleOpacity={this.props.opacity ? this.props.opacity : 1}
				rippleContainerBorderRadius={this.props.radius ? this.props.radius : 0}
				rippleSequential={false}
				rippleCentered={true}
				disabled={this.props.disabled ? this.props.disabled : false}
				{...this.props}>
				{this.props.children}
			</Ripple>
		);
	}
}
