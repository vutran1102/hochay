import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar, Platform, ImageBackground } from 'react-native';
import Orientation from 'react-native-orientation';
import Splash from 'react-native-splash-screen'
import Helper from '../../utils/Helpers';
import authService from '../../services/authService';
import global from '../../utils/Globals';
import AppIcon from '../../utils/AppIcon';

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        global.updatePracticeInfo = this.initGlobal.bind(this);
        global.onSignIn = this.initGlobal.bind(this);
        global.updateListChild = this.initGlobal.bind(this);
        global.updatePracticeProblem = this.initGlobal.bind(this);
        // Orientation.lockToLandscape();
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        Splash.hide();
        this._bootstrapAsync();
    }

    initGlobal() {

    }

    componentWillUnmount() {

    }
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        // const token = await Helper.getToken();
        // if (token != '' && token != null) {
        //     this.props.navigation.navigate('App');
        // }else{
        //     this.props.navigation.navigate('Auth');
        // }
        Helper.getToken().then(token => {
            if (token != '' && token != null) {
                this.props.navigation.navigate('App');
                // authService.refreshTokenV2(token).then(response => {
                //     const status = response.status;
                //     if (status == 200) {
                //         this.props.navigation.navigate('App');
                //     } else {
                //         this.props.navigation.navigate('Auth');
                //     }
                // }).catch(err => {
                //     this.props.navigation.navigate('Auth');
                // });
            } else {
                this.props.navigation.navigate('Auth');
            }
        });
    };

    // Render any loading content that you like here
    render() {
        return (
            <ImageBackground source={AppIcon.backgroundSplash} style={styles.container} resizeMode='cover'>
                <StatusBar hidden={true} translucent />
                <Image source={AppIcon.logoSplash} style={{ width: 150, height: 150, zIndex: 9 }} resizeMode='contain'/>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Platform.OS == 'ios' ? '#fff' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 20,
        color: '#7EC6FF'
    },
    bgStyle: {
        width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'
    },
    dotStyle: {
        position: 'absolute', bottom: 30
    },
    viewLogo: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'
    },
    logo: {
        width: 60, height: 60
    },
    noIntenet: {
        color: '#fff',
        marginVertical: 20,
    }
});