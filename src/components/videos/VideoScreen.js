import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, PixelRatio, Dimensions, ScrollView, Platform } from 'react-native';
import YouTube from 'react-native-youtube';
import HeaderNavigation from '../common/HeaderNavigation';
import { Button, ButtomCustomeSmall } from '../common/Button';
import Helper from '../../utils/Helpers';
import AppIcon from '../../utils/AppIcon';
const { width, height } = Dimensions.get('window');
import NoDataViewComp from '../common/NoDataViewComp';

export default class VideoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            videoId: '',
            title: '',
            isPlay: false,
            listKnowledge: [],
            containerMounted: false,
        };
    }

    componentDidMount() {
        this.initData();
    }

    initData() {
        const { problemId, type } = this.props.navigation.state.params;
        if (type == 'help') {
            const { codeYoutube, title, urlmedia } = this.props.navigation.state.params;
            if (codeYoutube != '' && codeYoutube != null) {
                this.setState({
                    videoId: codeYoutube
                });
            }
        }
        Helper.getToken().then(token => {
            this.props.fetchPraticeVideoStart({ token, problemId });
        });
    }

    onChangeFullscreen(data) {
        console.log(data);
        // this.setState({
        //     isPlay: false
        // });
    }

    onReady() {
        this.setState({ isReady: true });
    }

    onChangeState(e) {
        this.setState({ status: e.state });
    }

    onError(e) {
        this.setState({ error: e.error });
    }

    onChangeQuality(e) {
        console.log('onChangeQuality quanty');
        this.setState({ quality: e.quality });
    }

    goBack() {
        this.props.navigation.goBack();
    }
    render() {
        const { videoId } = this.state;
        const { dataDefault } = this.props.videoPractice;
        let { title, type, urlmedia } = this.props.navigation.state.params;
        return (
            <ImageBackground source={AppIcon.bg_info} style={{ width: '100%', height: '100%' }}>
                <HeaderNavigation
                    color={'rgb(166, 168, 171)'}
                    title={title}
                    onPress={() => this.goBack()} />
                {
                    ((videoId != '' && videoId != null) || (dataDefault != '' && dataDefault != undefined && dataDefault != null)) 
                    ?
                    <ScrollView style={styles.body}>
                        <View style={{ flex: 1, width: 400, alignSelf: 'center' }}>
                            {(type != 'help' && dataDefault != '' && dataDefault != undefined && dataDefault != null) &&
                                <YouTube
                                    apiKey={'AIzaSyDczErB0NZ2yQxjv_wa_sz4ckJAVMo0Vso'}
                                    videoId={dataDefault.codeYoutube}
                                    fullscreen={false}
                                    play={true}
                                    controls={1}
                                    onChangeFullscreen={(e) => this.onChangeFullscreen(e)}
                                    onReady={() => this.onReady()}
                                    onChangeState={e => this.onChangeState(e)}
                                    onChangeQuality={e => this.onChangeQuality(e)}
                                    onError={e => this.onError(e)}
                                    style={styles.player} />
                            }
                            {(type == 'help' && videoId != '' && videoId != null) &&
                                <YouTube
                                    apiKey={'AIzaSyDczErB0NZ2yQxjv_wa_sz4ckJAVMo0Vso'}
                                    videoId={videoId}
                                    fullscreen={false}
                                    play={true}
                                    controls={1}
                                    showFullscreenButton={Platform.OS == 'android' ? false : true}
                                    onChangeFullscreen={(e) => this.onChangeFullscreen(e)}
                                    onReady={() => this.onReady()}
                                    onChangeState={e => this.onChangeState(e)}
                                    onChangeQuality={e => this.onChangeQuality(e)}
                                    onError={e => this.onError(e)}
                                    style={styles.player} />
                            }
                        </View>
                        {type != 'help' &&
                            <View style={styles.wrapButton}>
                                <ButtomCustomeSmall
                                    onPress={() => this.goBack()}
                                    title={'Đã hiểu, tiếp tục luyện tập'} width={200}
                                />
                            </View>
                        }
                    </ScrollView>
                    :
                    <NoDataViewComp />
                }
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    body: {
        flex: 1
    },
    wrapButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
    },
    player: {
        alignSelf: 'stretch',
        height: PixelRatio.roundToNearestPixel(400 / (16 / 9))
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});