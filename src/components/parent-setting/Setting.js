import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RippleButton from '../common/RippleButton';
import Helper from '../../utils/Helpers';
import Slider from 'react-native-slider';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSound: 'off',
            isVibration: 'off',
            volumeVal: 0,
            icon: 'volume-off'
        }
    }

    onSlided(value) {
        Helper.saveSoundVolume(JSON.stringify(value));
    }

    componentDidMount() {
        Helper.getSoundVolume().then(volume => {
            this.setState({ volumeVal: volume });
            this.setIconName(volume);
        });
        Helper.getVibration().then(b => {
            this.setState({ isVibration: b });
        });
    }

    onVolumeChange(volumeVal) {
        console.log('onVolumeChange');
        this.setState({ volumeVal });
        this.setIconName(volumeVal);
    }

    setIconName(volumeVal) {
        if (volumeVal == 0) {
            this.setState({ icon: 'volume-off' });
        }

        if (volumeVal > 0 && volumeVal < 0.8) {
            this.setState({ icon: 'volume-down' });
        }

        if (volumeVal >= 0.8) {
            this.setState({ icon: 'volume-up' });
        }
    }

    onOffVibration(b) {
        this.setState({
            isVibration: b
        });
        Helper.saveVibration(b);
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}> */}
                <View style={[styles.rowContainer2]}>
                    <Text style={styles.textTitle}>Âm thanh</Text>
                    <View style={{ width: 10 }}></View>
                    <Icon name={this.state.icon} size={30} color={'rgb(181, 182, 185)'} />
                </View>
                <View style={styles.sliderContainer}>
                    <Slider
                        value={this.state.volumeVal}
                        onValueChange={this.onVolumeChange.bind(this)}
                        minimumValue={0}
                        maximumValue={1}
                        style={slider.container}
                        trackStyle={slider.track}
                        thumbStyle={slider.thumb}
                        minimumTrackTintColor='#31a4db'
                        thumbTouchSize={{ width: 50, height: 40 }}
                        step={0.1}
                        onSlidingComplete={this.onSlided.bind(this)}
                    />
                </View>
                <View style={[styles.rowContainer2, { marginTop: 30 }]}>
                    <Text style={styles.textTitle}>Rung khi làm sai</Text>
                    <View style={{ width: 10 }}></View>
                </View>
                <View style={[styles.rowContainer]}>
                    <View style={styles.row}>
                        <RippleButton onPress={() => this.onOffVibration('on')} style={this.state.isVibration == 'on' ? styles.viewActive : styles.viewInaActive} ></RippleButton>
                        <Text style={styles.textStatus}>Bật</Text>
                    </View>
                    <View style={styles.row}>
                        <RippleButton onPress={() => this.onOffVibration('off')} style={this.state.isVibration == 'on' ? styles.viewInaActive : styles.viewActive} ></RippleButton>
                        <Text style={styles.textStatus}>Tắt</Text>
                    </View>
                </View>
            </View>
            // </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingLeft: 20
    },
    sliderContainer: {
        width: 400,
        height: 10,
        justifyContent: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 200
    },
    rowContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 200,
    },
    row: {
        width: 80,
        flexDirection: 'row',
    },
    textTitle: {
        marginVertical: 20,
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        color: 'rgb(181, 182, 185)'
    },
    viewActive: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 10,
        paddingHorizontal: 20,
        backgroundColor: '#31a4db'
    },
    viewInaActive: {
        width: 16,
        height: 16,
        borderWidth: 2,
        borderRadius: 8,
        marginRight: 10,
        paddingHorizontal: 20,
        borderColor: '#31a4db',
        backgroundColor: '#fff'
    },
    textStatus: {
        fontFamily: 'Roboto-Bold',
        color: 'rgb(181, 182, 185)'
    }
});

const slider = StyleSheet.create({
    container: {
        height: 30,
    },
    track: {
        height: 3,
        backgroundColor: '#303030',
    },
    thumb: {
        width: 15,
        height: 15,
        backgroundColor: '#31a4db',
        borderRadius: 15 / 2,
        shadowColor: '#31a4db',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 2,
        shadowOpacity: 1,
    }
});