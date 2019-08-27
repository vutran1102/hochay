import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, ImageBackground, WebView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../constants/colors';
import { BASE_URL_WEB } from '../../constants/const';
import MathJaxLibs from '../../utils/MathJaxUtils';
import { ButtonInfo, Button, ButtomCustomeSmall } from '../common/Button';
import Header from './Header';
import { playSoundButton } from '../../utils/AudioUtils';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';
import AppIcon from '../../utils/AppIcon';
import PopUp from '../common/PopUp';
import { HeaderWithBg } from '../modals/Header';
import RippleButton from '../common/RippleButton';

let { width, height } = Dimensions.get('window');
let s = width;
if (width < height) {
    width = height;
    height = s;
}
export default class GuildPracticeModal extends Component {
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

    nextQuestionAction() {
        this.props.closeGuild(false);
        playSoundButton();
        this.props.onPress();
    }

    render() {
        const { explain } = this.props;
        return (
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 10 }}>
                <HeaderWithBg >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <RippleButton style={{ width: 30, height: 30, position: 'absolute', top: 15, left: - 20 }} rippleSize={50} onPress={() => this.props.closeGuild(false)}>
                            <View>
                                <Image source={AppIcon.icon_back} style={{ width: 30, height: 30 }} resizeMode='contain' />
                            </View>
                        </RippleButton>
                    </View>
                </HeaderWithBg>
                <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: width * 0.42, height: height * 0.2, alignItems: 'center', position: 'absolute', alignSelf: 'center', zIndex: 1 }}>
                    <Image source={AppIcon.btn_huongdangiai} style={{ width: '50%', position: 'absolute', bottom: 0 }} resizeMode='contain' />
                </ImageBackground>
                <PopUp source={AppIcon.pop_up_1} width={0.86 * width} height={0.86 * height} style={{ paddingTop: 40, alignSelf: 'center', justifyContent: 'center', position: 'absolute', bottom: 8, alignSelf: 'center' }} resizeMode='contain'>
                    <View style={styles.viewAbsolute}>
                        <View style={styles.container}>
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
                            <View style={styles.wrapButton}>
                                {/* <ButtomCustomeSmall
                                    bgColor={'rgb(0, 173, 248)'}
                                    width={160}
                                    size={150}
                                    title={'Câu tiếp theo'}
                                    onPress={() => this.nextQuestionAction()} /> */}
                                <RippleButton style={{ width: 175, height: 38, alignSelf: 'center' }} onPress={() => this.nextQuestionAction()}>
                                    <Image source={AppIcon.btn_cautieptheo} style={{ width: 175, height: 38 }} resizeMode='contain' />
                                </RippleButton>
                            </View>
                        </View>
                    </View>
                    <Image source={AppIcon.icn_mascot_5} style={{ position: 'absolute', height: height * 0.5, width: 200, right: - 100, bottom: - 10, zIndex:99 }} resizeMode='contain' />
                    <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 50, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                    <Image source={AppIcon.text_hi_box} style={{ position: 'absolute', height: 56, width: 56, left: - 60, bottom: 170 }} resizeMode='contain' />
                </PopUp>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    viewAbsolute: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 11,
    },
    container: {
        flex: 1,
        borderColor: '#383838',
        borderRadius: 5,
        paddingTop: 30
    },
    body: {
        paddingVertical: 20,
        flex: 1,
        paddingHorizontal: 20
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