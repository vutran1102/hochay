import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
import HeaderNavigation from '../common/HeaderNavigation';
import AppIcon from '../../utils/AppIcon';
import Helper from '../../utils/Helpers';
import RippleButton from '../common/RippleButton';
import LoadingScreen from '../common/LoadingScreen';
import { MATH_KIT } from '../../constants/const';
import NoDataViewComp from '../common/NoDataViewComp';

export default class ParentHelpScreen extends Component {

    goBack() {
        this.props.navigation.goBack();
    }

    componentDidMount() {
        Helper.getTokenParent().then(token => {
            if (token == '') this.props.navigation.navigation('Auth');
            // const subjectId = MATH_KIT;
            // const indexPage = 0;
            // const gradeId = 'C1';
            // this.props.makeRequestFlashCard({ token, subjectId, gradeId, indexPage });
        })
    }

    gotoVideo(item) {
        this.props.navigation.navigate({
            routeName: 'Video',
            key: 'VideoId',
            params: {
                type: 'help',
                title: item.title,
                codeYoutube: item.codeYoutube,
                urlmedia: item.urlmedia
            }
        });
    }

    render() {
        const {listFlashCardVideo} = this.props;
        return (
            <ImageBackground source={AppIcon.bg_info} style={{ width: '100%', height: '100%' }}>
                <HeaderNavigation title={'Giúp con học tốt'} onPress={() => this.goBack()} />
                {listFlashCardVideo ? <FlatList
                    data={listFlashCardVideo}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <RippleButton style={styles.rowItem} onPress={() => this.gotoVideo(item)}>
                            <Image source={{ uri: item.thumbnail }} style={styles.viewThumb} />
                            <View style={styles.wrapRight}>
                                <Text style={styles.textTitle}>{item.title}</Text>
                                <Text style={styles.textDesc}>{item.title}</Text>
                            </View>
                        </RippleButton>
                    }
                /> : <NoDataViewComp/>}
                <LoadingScreen isLoading={this.props.isLoadingHelp} />
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    rowItem: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#cdcdcd'
    },
    viewThumb: {
        width: 200,
        height: 100,
    },
    textTitle: {
        fontFamily: 'Roboto-Bold',
    },
    textDesc: {

    },
    wrapRight: {
        marginLeft: 20
    }
});