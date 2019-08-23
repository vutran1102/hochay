import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';

export default class IntroScreen extends Component {
    gotoSinin(){
        this.props.navigation.navigate('SignIn');
    }

    render() {
        return (
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <RippleButton style={styles.buttonInfo} size={150} color={'white'} onPress={() => this.gotoSinin()}>
                        <Text style={styles.textButton}>Đăng nhập / Đăng ký</Text>
                    </RippleButton>
                    <RippleButton style={styles.buttonDanger} size={150} color={'white'}>
                        <Text style={styles.textButton}>Dùng thử</Text>
                    </RippleButton>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonInfo: {
        width: 300,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#rgb(139, 197, 63)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDanger: {
        marginTop: 20,
        width: 300,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#rgb(213, 0, 0)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: 'white',
        fontSize: 18,
        fontFamily:'Roboto-Bold'
    }
});