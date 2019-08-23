import React, { Component } from 'react';
import { View, ImageBackground, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import RippleButton from './RippleButton';
import AppIcon from '../../utils/AppIcon';
const { width, height } = Dimensions.get('window');

export default class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <ImageBackground source={this.props.source} style={[{width: this.props.width, height: this.props.height}, this.props.style && this.props.style]} resizeMode='stretch'>
                {this.props.close && <RippleButton onPress={()=>{this.props.close(); console.log('PRESSSSSSSSSS')}} style={{width:30, height: 30, position: 'absolute', right: 15, top: 10, zIndex:9}} rippleSize={30}>
                    <Image source={AppIcon.icon_close} style={{width: 30, height: 30}}/>
                </RippleButton>}
                {this.props.children}
            </ImageBackground>
        )
    }
}

PopUp.propTypes = {
    // bgSource: PropTypes.isRequired
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
}