import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, FlatList, ImageBackground, ScrollView, Image, Text } from 'react-native';
import Orientation from 'react-native-orientation';
import jwtDecode from 'jwt-decode';
import { HeaderBackImage, HeaderBackDarkImage } from '../common/Header';
import Container from '../common/Container';
import ProblemInfo from './ProblemInfo';
import Recent from './Recent';
import ListProblem from './ListProblem';
import AppIcon from '../../utils/AppIcon';
import { playSoundButton } from '../../utils/AudioUtils';
import Helper from '../../utils/Helpers';
import global from '../../utils/Globals';
import { HeaderWithBg } from '../modals/Header';
import RippleButton from '../common/RippleButton';
import PopUp from '../common/PopUp';

let { width, height } = Dimensions.get('window');
if(height > width) {
    let s = width;
    width = height;
    height = s;
}

export default class PracticeProblemScreen extends Component {
    constructor(props) {
        super(props);
        Orientation.lockToLandscape();
        this.state = {
            isHeaderDark: false,
            bgHeader: 'rgba(0,0,0,0.0)',
            isProblemInfo: false,
        }
        this.goback = this.goback.bind(this);
        this.gotoPracticeInfo = this.gotoPracticeInfo.bind(this);
        global.updatePracticeProblem = this.update.bind(this);
    }

    componentDidMount() {
        this.getInitData();
    }

    update() {
        this.getInitData();
    }

    getInitData() {
        const { subjectId } = this.props.navigation.state.params;
        const { problemHiearchyId } = this.props.navigation.state.params;
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            const { GradeId } = jwtDecode(token);
            this.props.fetchPracticeRecent({ token, problemHiearchyId });
            this.props.fetchListProblemHieById({ token, problemHiearchyId });
        }).catch(err => console.log(err));
    }

    goback() {
        global.updateOrientation();
        this.props.navigation.goBack();
    }

    gotoPracticeInfo(item) {
        const title = item.title;
        const { problemId } = item;
        const problemCode = problemId;
        playSoundButton();
        this.props.navigation.navigate({ routeName: 'PracticeInfo', key: 'PracticeInfoId', params: { title, problemCode } });
    }

    gotoProblemInfo(item) {
        this.setState({
            title: item.title,
            levelPractice: item.levelPractice,
            status: item.status,
            stepIdNow: item.stepIdNow,
            problemCode: item.problemId,
            isProblemInfo: true
        })
        // this.gotoPracticeInfo(item);
    }

    oncloseInfo() {
        this.setState({
            isProblemInfo: false
        });
    }

    recentHandle() {
        const { subjectId, packageId } = this.props.navigation.state.params;
        const { recent } = this.props;
        const { stepIdNow, problemId } = recent;
        const status = 1;
        const problemCode = problemId;
        playSoundButton();
        this.props.navigation.navigate({ routeName: 'PracticeLearn', key: 'PracticeLearnId', params: { problemCode, stepIdNow, subjectId, status, packageId } });
    }

    handleNavigate() {
        const { stepIdNow, status, problemCode } = this.state;
        const { subjectId, packageId } = this.props.navigation.state.params;
        this.setState({ isProblemInfo: false });
        this.props.navigation.navigate({ routeName: 'PracticeLearn', key: 'PracticeLearnId', params: { problemCode, stepIdNow, subjectId, status, packageId } });
    }

    renderSeparator() {
        return (
            <View style={{ height: 1, backgroundColor: '#999' }}></View>
        );
    }

    listHeaderComponent(recent) {
        if (recent.problemId != "" && recent.problemId != null) {
            return (
                <Recent recent={recent} onPress={() => this.recentHandle()} />
            );
        }
        return null;
    }

    onScroll(event) {
        const { contentOffset } = event.nativeEvent;
        const { y } = contentOffset;
        if (y > 60) {
            this.setState({
                isHeaderDark: true,
                bgHeader: 'rgba(255,255,255,0.3)',
            });
        } else {
            this.setState({
                isHeaderDark: false
            });
        }
    }


    render() {
        const { problemHieryExerice, problemexericeLength } = this.props;
        const listProblem = problemHieryExerice;
        const { problemHiearchyName } = this.props.navigation.state.params;
        console.log('====: ', problemHiearchyName);
        return (
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }}>
                <Container>
                    <HeaderWithBg >
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <RippleButton style={{ width: 30, height: 30, position:'absolute', top: 15, left: - 20 }} rippleSize={50} onPress={()=> {this.goback()}}>
                                <View>
                                    <Image source={AppIcon.icon_back} style={{ width: 30, height: 30 }} resizeMode='contain' />
                                </View>
                            </RippleButton>
                            <RippleButton style={{ width: 50, height: 50, position: 'absolute', right: 60 }} rippleSize={50}>
                                <View>
                                    <Image source={AppIcon.icon_ico} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                </View>
                            </RippleButton>
                            <Text style={styles.headerText}>{problemHiearchyName}</Text>
                        </View>
                    </HeaderWithBg>
                    {listProblem && problemexericeLength > 0 &&
                        <View style={styles.wrapView}>
                            <Image source={AppIcon.icon_preview} style={styles.iconPreview} resizeMode='contain' />
                            <PopUp source={AppIcon.pop_up_1} style={styles.wrap} resizeMode='contain' width={width* 0.8} height={height*0.9}>
                                <ScrollView>
                                    <FlatList
                                        contentContainerStyle={{
                                            alignSelf: 'flex-start'
                                        }}
                                        numColumns={problemexericeLength / 2}
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        data={listProblem}
                                        onScroll={this.onScroll.bind(this)}

                                        renderItem={({ item, index }) =>
                                            //push your code
                                            <ListProblem
                                                isLoading={this.props.isLoadingProblemExerice}
                                                onPress={this.gotoProblemInfo.bind(this)}
                                                item={item} index={index}
                                            />
                                        }
                                    />
                                </ScrollView>
                                <Image source={AppIcon.icon_penholder} style={{ position: 'absolute', height: 98.4, width: 63.75, right: - 30, bottom: 5 }} resizeMode='contain' />
                                <Image source={AppIcon.icon_book} style={{ position: 'absolute', height: 64.8, width: 71.6, bottom: 10, left: -20 }} resizeMode='contain' />
                            </PopUp>
                            <Image source={AppIcon.icon_next} style={styles.iconNext} resizeMode='contain' />
                        </View>

                    }
                    {this.state.isProblemInfo &&
                        <ProblemInfo
                            levelPractice={this.state.levelPractice}
                            title={this.state.title}
                            status={this.state.status}
                            handleNavigate={this.handleNavigate.bind(this)}
                            onclose={this.oncloseInfo.bind(this)}
                        />
                    }
                </Container>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    flatList: {
        marginTop: 10,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrap: {
        width: width * 0.8,
        height: height * 0.9,
        justifyContent: 'center',
        paddingHorizontal: 10,
        // borderWidth: 1.5,
        // borderColor: '#004DA5',
        // borderRadius: 10,
        // backgroundColor: '#FFF2AF'
        paddingVertical: 40,
        marginTop: - 50
    },
    iconPreview: {
        marginLeft: 20,
        width: 50,
        height: 50,
        alignSelf: 'center',
    },
    iconNext: {
        marginRight: 20,
        width: 50,
        height: 50,
        alignSelf: 'center',
    },
    wrapView: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    headerText: {
        color: '#45B8F2',
        fontSize: 13,
        fontFamily: 'Roboto-Bold',
        marginLeft: 80,
        marginTop: 15
    },
    iconPreview: {
        marginLeft: 20,
        width: 25,
        height: 25,
        alignSelf: 'center',
        top: -30,
    },
    iconNext: {
        marginRight: 20,
        width: 25,
        height: 25,
        alignSelf: 'center',
        top: -30,
    }
});
