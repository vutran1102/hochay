import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ImageBackground } from 'react-native';
import Header from './Header';
import RippleButton from '../common/RippleButton';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';
import PopUp from '../common/PopUp';
import AppIcon from '../../utils/AppIcon';

let { width, height } = Dimensions.get('window');
if (width < height) {
    let s = width;
    width = height;
    height = s;
}
export default class ListQuestionModal extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.viewAbsolute}>
                <View style={styles.container}>
                    <ScaleSlideAnim>
                        <PopUp source={AppIcon.pop_up_5} width={width * 0.75} height={height * 0.74} style={{ alignSelf: 'center', padding: 15 }} close={() => this.props.hideQuestion()}>
                            <View style={{}}>
                                <Image source={AppIcon.title_danhsachcauhoi} style={{ width: 236, height: 28, alignSelf: 'center' }} resizeMode='contain'></Image>
                                <View style={styles.viewTop}>
                                    <Image source={AppIcon.icon_apple_cauhoi} style={[styles.imageWrap, {top: 2}]} resizeMode='contain'/>
                                    <Text style={styles.textTop}>Đã làm</Text>
                                    <Image style={[styles.imageWrap, {top: 2}]} source={AppIcon.icon_apple_cauhoi_inactive} resizeMode='contain'/>
                                    <Text style={styles.textTop}>Chưa làm</Text>
                                </View>
                                <View style={{width: '90%', height: 1, backgroundColor: 'rgb(255, 160, 54)', alignSelf: 'center', marginTop: 10}} />
                                <View>
                                    <FlatList
                                        contentContainerStyle={styles.wrapList}
                                        numColumns={8}
                                        keyExtractor={(item, index) => index.toString()}
                                        data={this.props.listQuestion}
                                        renderItem={({ item }) =>
                                            item.status == 1 ?
                                                <RippleButton style={styles.viewNumberActive} onPress={() => this.props.stepCurrentQuesion(item.stepId)}>
                                                    <Image source={AppIcon.icon_apple_cauhoi} style={styles.imageWrap} resizeMode='contain' />
                                                    <Text style={styles.textNumberActive}>{1 + item.index}</Text>
                                                </RippleButton> :
                                                <RippleButton style={styles.viewNumber} onPress={() => this.props.stepCurrentQuesion(item.stepId)}>
                                                    <Image source={AppIcon.icon_apple_cauhoi_inactive} style={styles.imageWrap} resizeMode='contain' />
                                                    <Text style={styles.textNumber}>{1 + item.index}</Text>
                                                </RippleButton>
                                        }
                                    />
                                </View>
                            </View>
                        </PopUp>
                    </ScaleSlideAnim>
                </View>
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
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapList: {
        marginTop: 10,
        paddingTop: 10,
        paddingLeft: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    viewTop: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textTop: {
        fontFamily: 'Roboto-Medium',
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 13,
        marginRight: 20,
        color: 'rgb(0, 77, 166)'
    },
    viewNumber: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 10,
    },
    viewNumberActive: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginTop: 10,
    },
    imageWrap: {
        width: 35,
        height: 35,
        bottom: 5
    },
    textNumber: {
        color: '#fff',
        alignSelf: 'center',
        position: 'absolute',
        color: '#fff',
        fontWeight: '900'
    },
    textNumberActive: {
        color: 'white',
        alignSelf: 'center',
        position: 'absolute',
        fontWeight: '900',
        color: '#fff',
    }
});