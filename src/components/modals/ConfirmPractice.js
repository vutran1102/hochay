import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../constants/colors';
import { ButtonInfo, Button, TouchaButton } from '../common/Button';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';
import PopUp from '../common/PopUp';

let { width, height } = Dimensions.get('window');
let s = width;
if (width < height) {
    width = height;
    height = s;
}

export default class ConfirmPracticeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    gotoAction() {
        this.props.closeConfirm();
        const { statusConfirm } = this.props;
        if (statusConfirm == 2) {
            this.props.reset();
        }
    }

    gotoEnd() {
        this.props.closeConfirm();
        this.props.gotoEnd();
    }

    render() {
        const { statusConfirm } = this.props;
        return (
            <View style={styles.viewAbsolute}>
                <ScaleSlideAnim>
                    {/* <View style={styles.container}> */}
                    <PopUp source={AppIcon.pop_up_3} width={width * 0.53} height={height * 0.7} close={() => { this.props.closeConfirm() }} style={{ alignItems: 'center' }}>
                        <Image source={AppIcon.tamdung_title} resizeMode='contain' style={{ marginTop: 20, width: width * 0.16, height: 60 }} />
                        <View style={styles.body}>
                            <TouchaButton
                                width={width * 0.45}
                                title={statusConfirm == 2 ? 'Làm lại' : 'Tiếp tục làm'}
                                source={AppIcon.icon_play}
                                onPress={() => this.gotoAction()} />
                            <TouchaButton
                                onPress={() => {
                                    this.props.closeConfirm();
                                    this.props.navigation.navigate({ routeName: 'Video', key: 'VideoId', params: { problemId: this.props.problemId } });
                                }}
                                width={width * 0.45}
                                title={'Xem bài giảng'}
                                source={AppIcon.icon_video}
                            />
                            <TouchaButton
                                onPress={() => {
                                    this.props.closeConfirm();
                                    this.props.handlePracticeInvoke();
                                }}
                                width={width * 0.45}
                                source={AppIcon.icon_invoke}
                                title={'Xem các bài học liên quan'}
                                icon={'list'}
                            />
                            <TouchaButton
                                width={width * 0.45}
                                title={'Kết thúc'}
                                source={AppIcon.icon_power}
                                icon={'power-off'}
                                onPress={() => this.gotoEnd()} />
                        </View>
                    </PopUp>
                    {/* </View> */}
                </ScaleSlideAnim>
            </View>
        )
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
        zIndex: 11,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: 300,
        alignSelf: 'center',
        marginVertical: 40,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    body: {
        justifyContent: 'flex-start',
        paddingVertical: 0,
        alignItems: 'flex-start'
    },
    icon: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    wrButton: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        color: Color.textColorPrimary,
        fontWeight: 'bold',
        fontSize: 13,
        alignSelf: 'center',
        marginVertical: 20
    }
});