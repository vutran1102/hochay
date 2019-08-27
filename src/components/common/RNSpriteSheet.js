import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SpriteSheet from 'rn-sprite-sheet';

export default class RNSpriteSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loop: true,
            resetAfterFinish: false,
            index: 0,
        }
        fps = 100;
    }
    componentDidMount = () => {
        this.play('walk');
    }

    play = type => {
        this.mummy.play({
            type,
            fps: 24,
            loop: this.state.loop,
            resetAfterFinish: this.state.resetAfterFinish,
            onFinish: () => this.onFinish()
        });
    };

    onFinish = () => {

    }

    stop = () => {
        this.mummy.stop(() => console.log('stopped'));
    };

    render() {
        return (
            <View style={styles.container}>
                <SpriteSheet
                    ref={ref => (this.mummy = ref)}
                    source={require('../../asserts/icon/mummy.png')}
                    columns={9}
                    rows={6}
                    height={80} // set either, none, but not both
                    width={80}
                    imageStyle={{ marginTop: -1 }}
                    animations={{
                        walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                        appear: Array.from({ length: 15 }, (v, i) => i + 18),
                        die: Array.from({ length: 21 }, (v, i) => i + 33)
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
});