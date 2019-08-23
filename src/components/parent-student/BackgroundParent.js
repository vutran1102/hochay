import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import AppIcon from '../../utils/AppIcon';
import { isIphoneX, isIphoneXsMax } from '../../constants/const';


export default class BackgroundParent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <ImageBackground source={AppIcon.background_parent} style={styles.background} resizeMode='cover'>
                {this.props.children}
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        paddingTop: isIphoneX() || isIphoneXsMax() ? 30 : 0,
    }
})