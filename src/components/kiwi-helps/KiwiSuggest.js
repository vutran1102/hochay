import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Image, AppState, Dimensions } from 'react-native';
import Orientation from 'react-native-orientation';
import Container from '../common/Container';
import HeaderNavigation from '../common/HeaderNavigation';
import Helper from '../../utils/Helpers';
import AppIcon from '../../utils/AppIcon';
import LoadingScreen from '../common/LoadingScreen';
import { playSoundButton } from '../../utils/AudioUtils';
import KnowledgeModal from '../modals/Knowledge';
import RippleButton from '../common/RippleButton';
import global from '../../utils/Globals';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';
import { HeaderWithBg } from '../modals/Header';
import PopUp from '../common/PopUp';

let { width, height } = Dimensions.get('window');
if (height > width) {
    let s = width;
    width = height;
    height = s;
}
const arraySource = [AppIcon.icon_board, AppIcon.icon_book, AppIcon.icon_pen, AppIcon.icon_penholder, AppIcon.icon_hat, AppIcon.icon_calc, AppIcon.icon_clock];

export default class PracticeStepScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    goBack() {
        this.props.goBack();
    }

    _handleAppStateChange = (nextAppState) => {

    }

    componentWillUnmount() {
    }

    handleNavigate(item) {
        const { subjectId } = this.props;
        const stepIdNow = item.stepIdNow || 0;
        const status = item.status || 0;
        const problemCode = item.problemId;
        const isKiwiSuggest = true;
        const isFromKiwiSuggest = true;
        this.props.navigation.navigate({ routeName: 'App', key: 'AppId', params: { problemCode, stepIdNow, subjectId, status, isKiwiSuggest, isFromKiwiSuggest } });
        // this.props.navigation.navigate({ routeName: 'PracticeLearn', key: 'PracticeLearnId', params: { problemCode, stepIdNow, subjectId, status, isKiwiSuggest } });
        // this.props.navigation.navigate({ routeName: 'App', key: 'AppId', params: { problemCode, stepIdNow, subjectId, status, isKiwiSuggest } });
    }

    render() {
        return (
            <ImageBackground source={AppIcon.background_main} style={{ width: width, height: height, position: 'absolute', zIndex: 999 }}>
                <Container>
                    <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: width * 0.42, height: height * 0.2, alignItems: 'center', position: 'absolute', alignSelf: 'center', zIndex: 1 }}>
                        <Image source={AppIcon.title_luyentap} style={{ width: '50%', position: 'absolute', bottom: 0 }} resizeMode='contain' />
                    </ImageBackground>
                    <HeaderWithBg >
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <RippleButton style={{ width: 50, height: 50, position: 'absolute', top: 15, left: - 20 }} rippleSize={50} onPress={this.goBack.bind(this)}>
                                <View>
                                    <Image source={AppIcon.icon_back} style={{ width: 30, height: 30, }} resizeMode='contain' />
                                </View>
                            </RippleButton>
                            <RippleButton style={{ width: 50, height: 50, position: 'absolute', right: 60, top: 5 }} rippleSize={50}>
                                <View>
                                    <Image source={AppIcon.icon_ico} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                </View>
                            </RippleButton>
                        </View>
                    </HeaderWithBg>
                    {/* <HeaderNavigation title={subjectName} onPress={this.goBack.bind(this)} color={'white'} /> */}
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', marginTop: -30, alignItems: 'center' }}>
                            <Image source={AppIcon.icon_preview} style={styles.iconPreview} resizeMode='contain' />
                            <PopUp source={AppIcon.pop_up_1} style={styles.wrap} resizeMode='contain' width={width * 0.8} height={height * 0.9}>
                                <FlatList
                                    ref={(ref) => { this.flatListRef = ref; }}
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.props.listKiwiSuggest}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <RippleButton style={styles.item} onPress={() => this.handleNavigate(item)}>
                                                <Image source={arraySource[index % 7]} resizeMode='contain' style={{ width: 30, height: 30 }} />
                                                <View style={styles.partition} />
                                                <Text style={styles.textStyle}>{item.name}</Text>
                                            </RippleButton>
                                        )
                                    }}
                                />
                                />
                                <Image source={AppIcon.icn_mascot} style={{ position: 'absolute', height: height * 0.45, width: 180, right: - 100, bottom: 0 }} resizeMode='contain' />
                                <Image source={AppIcon.icon_book} style={{ position: 'absolute', height: 64.8, width: 71.6, bottom: 10, left: -20 }} resizeMode='contain' />
                            </PopUp>
                            <Image source={AppIcon.icon_next} style={styles.iconNext} resizeMode='contain' />
                        </View>
                    </View>
                    {/* <LoadingScreen isLoading={isLoadingProblemHiarachy} color={'white'} /> */}
                </Container>
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
    wrap: {
        width: width * 0.8,
        height: height * 0.9,
        paddingHorizontal: 10,
        marginBottom: 10,
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30
        // borderWidth: 1.5,
        // borderColor: '#004DA5',
        // borderRadius: 10,
        // backgroundColor: '#FFF2AF'
    },
    item: {
        width: width * 0.65,
        height: 50,
        borderWidth: 1,
        borderColor: 'rgb(246, 177, 0)',
        borderRadius: 3,
        marginTop: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    textStyle: {
        color: 'rgb(0, 77, 166)',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 20
    },
    partition: {
        height: 40,
        width: 1,
        backgroundColor: 'rgb(246, 177, 0)',
        marginLeft: 15
    },
    contents: {
        alignSelf: 'center',
    },
    iconPreview: {
        marginLeft: 20,
        width: 25,
        height: 25,
        alignSelf: 'center',
    },
    iconNext: {
        marginRight: 20,
        width: 25,
        height: 25,
        alignSelf: 'center',
    }
});