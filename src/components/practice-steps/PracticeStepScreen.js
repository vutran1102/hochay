import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Image, AppState, Dimensions } from 'react-native';
import Orientation from 'react-native-orientation';
import Container from '../common/Container';
import jwtDecode from 'jwt-decode';
import HeaderNavigation from '../common/HeaderNavigation';
import Helper from '../../utils/Helpers';
import AppIcon from '../../utils/AppIcon';
import ItemPractice from './ItemsPractice';
import LoadingScreen from '../common/LoadingScreen';
import { playSoundButton } from '../../utils/AudioUtils';
import KnowledgeModal from '../modals/Knowledge';
import RippleButton from '../common/RippleButton';
import global from '../../utils/Globals';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';
import { HeaderWithBg } from '../modals/Header';
import PopUp from '../common/PopUp';
import KiwiSuggest from '../kiwi-helps/KiwiSuggest';

let { width, height } = Dimensions.get('window');
if (height > width) {
    let s = width;
    width = height;
    height = s;
}

export default class PracticeStepScreen extends Component {

    constructor(props) {
        super(props);
        console.log('PracticeStepScreen');

        Orientation.lockToLandscape();
        this.state = {
            isLoadNumber: true,
            isModalKnowledge: false,
            hideKiwiHelper: false,
            knowledge: {
            }
        }
        global.updateOrientation = this.updateOrientation.bind(this);
    }

    componentDidMount() {
        const { packageId } = this.props.navigation.state.params;
        const packageCode = packageId;
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            this.props.fetchListProblemHierachy({ token, packageId });
            this.props.fetchListKiwiSuggest({ token, packageCode });
        }).catch(err => {
            console.log(err);
        });
        this.mytimer = setTimeout(() => {
            this.setState({
                isLoadNumber: false,
            });
        }, 2000);
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    updateOrientation() {
        Orientation.lockToLandscape();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    gotoPracticeProblem(item) {
        const subjectId = item.subjectId;
        const problemHiearchyId = item.id;
        const problemHiearchyName = item.name;
        const { packageId } = this.props.navigation.state.params;
        playSoundButton();
        this.props.navigation.navigate({ routeName: 'PracticeProblem', key: 'PracticeProblemId', params: { problemHiearchyId, problemHiearchyName, subjectId, packageId } });
    }

    visibleKnowledge(visible, item) {
        let knowledge = {};
        if (visible) {
            const { name, totalProblem, totalProblemLevel0, totalProblemLevel1, totalProblemLevel2, totalProblemLevel3 } = item;
            knowledge.totatotalProblem = totalProblem;
            knowledge.name = name;
            knowledge.totalProblemLevel0 = totalProblemLevel0;
            knowledge.totalProblemLevel1 = totalProblemLevel1;
            knowledge.totalProblemLevel2 = totalProblemLevel2;
            knowledge.totalProblemLevel3 = totalProblemLevel3;
        }
        this.setState({
            isModalKnowledge: visible,
            knowledge: knowledge
        });
    }

    _handleAppStateChange = (nextAppState) => {

    }

    clearTimer() {
        if (this.mytimer != null) {
            clearTimeout(this.mytimer);
            this.mytimer = null;
        }
    }

    hideKiwiHelper() {
        this.setState({ hideKiwiHelper: true })
    }

    componentWillUnmount() {
        this.clearTimer();
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    isShowKiwiSuggest() {
        if (!this.state.hideKiwiHelper) {
            if (this.props.listKiwiSuggest.length) {
                return true;
            } else return false;
        } else return false;
    }

    render() {
        const { listProblemHierachy, isLoadingProblemHiarachy } = this.props;
        console.log("listProblemHierachy: ", JSON.stringify(listProblemHierachy));
        return (
            // <View/>
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }}>
                <Container>
                    <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: width * 0.42, height: height * 0.2, alignItems: 'center', position: 'absolute', alignSelf: 'center', zIndex: 1 }}>
                        <Image source={AppIcon.title_toanhoc} style={{ width: '50%', position: 'absolute', bottom: 0 }} resizeMode='contain' />
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
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', marginTop: -30, alignItems: 'center' }}>
                            <Image source={AppIcon.icon_preview} style={styles.iconPreview} resizeMode='contain' />
                            <PopUp source={AppIcon.pop_up_1} style={styles.wrap} resizeMode='contain' width={width * 0.8} height={height * 0.9}>
                                <FlatList
                                    ref={(ref) => { this.flatListRef = ref; }}
                                    contentContainerStyle={styles.contents}
                                    horizontal
                                    extraData={isLoadingProblemHiarachy}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    data={listProblemHierachy}
                                    renderItem={({ item, index }) => <ItemPractice
                                        index={index}
                                        isLoading={isLoadingProblemHiarachy}
                                        onPress={this.gotoPracticeProblem.bind(this)} item={item}
                                        visibleKnowledge={this.visibleKnowledge.bind(this)}
                                    />}
                                />
                                <Image source={AppIcon.icon_penholder} style={{ position: 'absolute', height: 98.4, width: 63.75, right: - 30, bottom: 5 }} resizeMode='contain' />
                                <Image source={AppIcon.icon_book} style={{ position: 'absolute', height: 64.8, width: 71.6, bottom: 10, left: -20 }} resizeMode='contain' />
                            </PopUp>
                            <Image source={AppIcon.icon_next} style={styles.iconNext} resizeMode='contain' />
                        </View>
                    </View>
                    {this.state.isModalKnowledge &&
                        <KnowledgeModal knowledge={this.state.knowledge} isModalKnowledge={this.state.isModalKnowledge} visibleKnowledge={this.visibleKnowledge.bind(this)} />
                    }
                    {(this.isShowKiwiSuggest()) && <KiwiSuggest navigation={this.props.navigation} subjectId={this.props.navigation.state.params.subjectId} listKiwiSuggest={this.props.listKiwiSuggest} goBack={() => { this.hideKiwiHelper() }} />}
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
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
        // borderWidth: 1.5,
        // borderColor: '#004DA5',
        // borderRadius: 10,
        // backgroundColor: '#FFF2AF'
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