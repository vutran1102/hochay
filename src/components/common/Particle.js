import { Emitter } from 'react-native-particles';
import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
export default class Particles extends Component {
    constructor(props) {
        super(props);
        const { source } = this.props
        this.state = {
            source: source
        }
    }
    render() {
        return (
            <Emitter
                autoStart={false}
                numberOfParticles={10}
                interval={100}
                emissionRate={5}
                particleLife={3000}
                direction={-90}
                spread={150}
                speed={8}
                segments={60}
                width={width}
                height={height}
                fromPosition={{ x: width / 2, y: height / 2 }}
                particleStyle={styles.emitter}
                gravity={0}
                ref={emitter => (this.emitter = emitter)}
            >
                <Image
                    style={styles.coin}
                    source={this.state.source || require('../../asserts/icon/star.png')}
                    resizeMode="contain"
                />
            </Emitter>
        )
    }

    start() {
        this.emitter.start();
    }

    stop() {
        this.emitter.stopEmitting();
    }
}

const styles = StyleSheet.create({
    coin: {
        width: 30,
        height: 30
    }
})