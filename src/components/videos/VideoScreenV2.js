import React, { Component } from 'react';
import {
    View, Text, FlatList, StyleSheet, Dimensions, TouchableHighlight, PixelRatio, ImageBackground, ActivityIndicator
} from 'react-native';
import YouTube from 'react-native-youtube';
import Helper from '../../utils/Helpers';
import HeaderNavigation from '../common/HeaderNavigation';

const height = PixelRatio.roundToNearestPixel(Dimensions.get('window').width / (16 / 9));

export default class Videos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: '',
            title: '',
            isPlay: false,
            listKnowledge: [],
            containerMounted: false,
            showFullscreenButton: true
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


    componentWillUnmount() {
        this.setState({
            isPlay: false,
        });
    }

    onChangeFullscreen(data) {

    }

    videoError(e) {
        console.log('PlayVideo *ERROR', e);
    }

    videoState(e) {
        if (e.state === 'playing') {
            if (this.state.fullscreen) {
                this.setState({ play: false, fullscreen: false, });
            }
        }
    }

    videoProgress(e) {
        console.log('PlayVideo videoProgress event,videoPosition', e);
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
        this.setState({ quality: e.quality });
    }

    render() {
        const opts = {
            loop: false,
            showFullscreenButton: false,
            showinfo: false,
            modestbranding: true,
            controls: 1,
            rel: true,
        };
        const { videoId } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <HeaderNavigation navigation={this.props.navigation} title={'Ôn Luyện'} bgColor={'#024a87'} />
                <View style={{ flex: 1, backgroundColor: '#fff',width:300 }}>
                    {videoId != '' &&
                        <YouTube
                        apiKey={'AIzaSyDczErB0NZ2yQxjv_wa_sz4ckJAVMo0Vso'}
                        videoId={videoId}
                         play={true}             // control playback of video with true/false
                         fullscreen={true}       // control whether the video should play in fullscreen or inline
                         loop={true}             // control whether the video should loop when ended
                         onReady={e => this.setState({ isReady: true })}
                         onChangeState={e => this.setState({ status: e.state })}
                         onChangeQuality={e => this.setState({ quality: e.quality })}
                         onError={e => this.setState({ error: e.error })}
 
                         style={{ height: 200 ,width:300}}
                     />
                    }
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    player: {
        alignSelf: 'stretch',
        height: PixelRatio.roundToNearestPixel(Dimensions.get('window').width / (16 / 9))
    },
    infoYoutube: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#cdcdcd',
        marginBottom: 10,
    },
    textTitleHead: {
        color: '#585858',
        fontWeight: 'bold',
        fontSize: 15,
    },
    textTitle: {
        color: '#585858',
        fontWeight: 'bold',
        fontSize: 13,
    },
    rowItem: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    rowInfo: {
        marginHorizontal: 10
    },
    viewTitleImage: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 1,
    },
    titleImage: {
        color: '#fff',
        fontSize: 9
    }
});
