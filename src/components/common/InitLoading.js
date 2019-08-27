import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, ImageBackground, Dimensions } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import ZoomOutAnim from '../anim/ZoomOutAnim';
import AppIcon from '../../utils/AppIcon';

let {width, height} = Dimensions.get('window');
let s = width;
if (width < height) {
    width = height;
    height = s;
}

export default class InitLoading extends Component {
    render() {
        const { maxScreen } = this.props;
        return (
            <View style={styles.container}>
                <ZoomOutAnim ref={'zoomanim'} height={maxScreen || 720} style={{
                    backgroundColor: '#00ADF8', justifyContent: 'center', alignItems: 'center'
                }}>
                    <ImageBackground source={AppIcon.backgroundSplash} style={{width: width, height: height, alignItems:'center', justifyContent:'center'}} resizeMode='stretch'>
                        <Image source={AppIcon.logoSplash} style={{ width: 150, height: 150}} resizeMode='contain'/>
                        <Image source={AppIcon.loaddingSplash} style={{ width: 150, height: 40}} resizeMode='contain'/>
                        {/* <View style={{ height: 80 }}>
                            <DotIndicator count={3} color={'#fff'} size={4} />
                        </View> */}
                    </ImageBackground>
                </ZoomOutAnim>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    textWaiting: {
        marginTop: 10,
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Roboto-Bold'
    }
});