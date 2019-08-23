import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableHighlight, WebView, Image, ImageBackground, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../constants/colors';
import { BASE_URL_WEB } from '../../constants/const';
import MathJaxLibs from '../../utils/MathJaxUtils';
import { ButtonInfo, Button, ButtomCustomeSmall } from '../common/Button';
import Header from './Header';
import { playSoundButton } from '../../utils/AudioUtils';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';
import PopUp from '../common/PopUp';
import { HeaderWithBg } from '../modals/Header';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';

const { width, height } = Dimensions.get('window');

export default class GuildExamModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            explain: ''
        }
    }

    setModalVisible(visible, explain = '') {
        this.setState({ modalVisible: visible, explain });
    }


    gotoAction() {
        this.setModalVisible(false);
    }

    render() {
        const { explain } = this.props;
        return (
            <ImageBackground style={styles.viewAbsolute} resizeMode='cover' source={AppIcon.background_main}>
                <HeaderWithBg />
                <View style={styles.container}>
                    {/* <Header title={'Hướng dẫn giải'} onPress={() => this.props.closeGuild(false)} /> */}
                    <RippleButton style={{ width: 30, height: 30, position: 'absolute', left: 20, top: 20 }} radius={20} onPress={() => { this.props.closeGuild(false) }}>
                        <Image source={AppIcon.icon_back} style={[{ width: 30, height: 30 }]} resizeMode='contain' />
                    </RippleButton>
                    <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: width * 0.42, height: height * 0.2, alignItems: 'center', zIndex: 2 }}>
                        <Image source={AppIcon.btn_huongdangiai} style={{ width: '50%', position: 'absolute', bottom: 0 }} resizeMode='contain' />
                    </ImageBackground>
                    <ImageBackground source={AppIcon.pop_up_1} style={{ width: width * 0.83, height: height * 0.85, alignItems: 'center', position: 'absolute', bottom: 10 }} resizeMode='contain'>
                        <View style={styles.body}>
                            {explain != '' && explain != null &&
                                <WebView
                                    ref={(webView) => this.webView = webView}
                                    showsVerticalScrollIndicator={false}
                                    ignoreSsError={false}
                                    scalesPageToFit={false}
                                    scrollEnabled
                                    style={styles.webviewStyle}
                                    source={{
                                        html: MathJaxLibs.renderExplain(explain, this.props.template),
                                        baseUrl: BASE_URL_WEB
                                    }}
                                />
                            }
                        </View>
                        <Image source={AppIcon.icon_penholder} style={{ position: 'absolute', height: 96, width: 61, right: -20, bottom: - 5 }} resizeMode='contain' />
                        {/* <Image source={AppIcon.icn_eraser} style={{ position: 'absolute', height: 27, width: 27, top: -10, left: 20 }} resizeMode='contain' /> */}
                        <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 50, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                        <Image source={AppIcon.text_hi_box} style={{ position: 'absolute', height: 56, width: 56, left: - 60, bottom: 170 }} resizeMode='contain' />
                    </ImageBackground>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    viewAbsolute: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        alignItems: 'center'
    },
    container: {
        width: width,
        height: height,
        borderColor: '#383838',
        borderRadius: 5,
        position: 'absolute',
        alignItems: 'center'
    },
    body: {
        paddingVertical: 20,
        width: '90%',
        height: '80%',
        marginTop: 30,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    icon: {
        alignSelf: 'center'
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
    },
    wrapButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    webviewStyle: {
        flex: 1
    }
});