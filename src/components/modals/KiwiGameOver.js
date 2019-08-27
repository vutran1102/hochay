import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { ScaleSlide } from "react-native-animation-effects";
import AppIcon from '../../utils/AppIcon';
import { ButtomCustomeSmall } from '../common/Button';
import  Particles  from '../common/Particle';

export default class KiwiGameOver extends Component {

    onPress() {
        this.props.navigation.goBack();
    }
    componentDidMount() {
        this.refs.particles.start();
    }

    render() {
        return (
            <View style={styles.viewAbsolute}>
                <ScaleSlide>
                    <ImageBackground source={AppIcon.bg_score} style={{ width: '100%', height: '100%' ,justifyContent:'center',alignItems:'center'}}>
                        {/* <ImageBackground source={AppIcon.bg_score} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',opacity:0.3 }}> */}
                            {this.props.numWrong == 100 &&
                                <Text style={styles.warning}>Nội dung đang được xây dựng</Text>
                            }
                            <Text style={styles.textScore}>{this.props.score} ĐIỂM</Text>
                            <Text style={styles.textGame}>GAME OVER</Text>
                            <ButtomCustomeSmall
                                onPress={() => this.onPress()}
                                title={'Trở lại'} size={140}
                            />
                        </ImageBackground>
                    {/* </ImageBackground> */}
                </ScaleSlide>
                <View style={{position:'absolute', flex:1}}>
                    <Particles ref='particles'/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewAbsolute: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 15,
    },
    warning: {
        fontFamily: 'SVN-Gumley',
        fontSize: 20,
        color: '#ef5b4c',
        marginVertical: 5,
    },
    textScore: {
        fontFamily: 'SVN-Gumley',
        fontSize: 25,
        color: '#fff'
    },
    textGame: {
        lineHeight: 50,
        fontFamily: 'SVN-Gumley',
        fontSize: 45,
        color: '#fff'
    }
});