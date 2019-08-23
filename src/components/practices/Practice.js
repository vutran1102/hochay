import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { tab_main_width, type_exam, type_practice, type_kiwi, margin_row, type_trophy } from '../../constants/const';
import AppIcon from '../../utils/AppIcon';
import { playSoundButton } from '../../utils/AudioUtils';
import { MATH_KIT } from '../../constants/const';
import Helper from '../../utils/Helpers';
import parentService from '../../services/parentService';

const { width, height } = Dimensions.get('window');

console.log(`${width}x${height}`);

const w = width > height ? width : height;
const h = width < height ? width : height;


const tabWidth = tab_main_width;
const wrapWidth = w - tabWidth - 3 * margin_row;
const widthRowRight = wrapWidth * 211 / (211 + 326);
const widthRowLeft = 326 / 211 * widthRowRight;

const heightRowItem = widthRowLeft * 111 / 326;
const heightRow = widthRowRight * 239 / 211;



// const x1 = w / 2 + 10;
// const y1 = x1 * 221 / 651;
// const x2 = x1 - 130;
// const y2 = 2 * y1;


export default class Practice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPackages: '',
            isShow: false
        }
    }

    onButtonPress(packageCode) {
        console.log('packageCode:onButtonPress ', packageCode);
        Helper.savePackageCode(packageCode);
        this.setState({ isShow: false });
        const subjectId = MATH_KIT;
        const packageId = packageCode;
        const { type, userId } = this.props;
        switch (type) {
            case type_exam:
                this.props.navigation.navigate({ routeName: 'ExamSla', key: 'ExamSlaId', params: { subjectId, packageId } });
                break;
            case type_practice:
                console.log("navigate to PracticeSteps");
                this.props.navigation.navigate({ routeName: 'PracticeSteps', key: 'PracticeStepsId', params: { subjectId, packageId, subjectId } });
                break;
        }
    }

    gotoPracticeStep(subjectId) {
        const GradeId = 'C1';
        const subjectName = 'TOÁN';
        const { type } = this.props;
        playSoundButton();
        if (subjectId != '' && subjectId != undefined) {
            switch (type) {
                case type_exam:
                    this.onButtonPress(this.props.packageCode);
                    break;
                case type_kiwi:
                    this.props.navigation.navigate({ routeName: 'KiwiChallenge', key: 'KiwiChalleneId', params: { subjectName } });
                    break;
                case type_trophy:
                    this.props.navigation.navigate({ routeName: 'Trophy', key: 'TrophyId', params: {} });
                    break;
                default:
                    this.onButtonPress(this.props.packageCode);
                    break;
            }
        } else {
            this.props.maintenance();
        }
    }

    onPressClose() {
        this.setState({ isShow: false })
    }

    render() {
        const { listSubject, row_practice_width, type, displayName, userName } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {!!(type == type_practice) &&
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={AppIcon.emotion_smile} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                            <Text style={styles.textHello}>Chào <Text style={styles.textName}>{displayName ? displayName : userName}</Text>! Hãy cùng nhau luyện tập nào</Text>
                        </View>
                    }
                </View>
                <View style={styles.wrap}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.rowRight}>
                            <TouchableOpacity style={styles.wrapSub1} onPress={() => this.gotoPracticeStep()}>
                                <ImageBackground source={AppIcon.img_viet} resizeMode={'contain'} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} resizeMode={'contain'} >
                                    <Image source={AppIcon.icon_pass} style={styles.imageBg} />
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.wrapSub1} onPress={() => this.gotoPracticeStep()}>
                                <ImageBackground source={AppIcon.img_eng} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} resizeMode={'contain'}>
                                    <Image source={AppIcon.icon_pass} style={styles.imageBg} />
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.wrapSub1} onPress={() => {console.log('onPress');this.gotoPracticeStep(MATH_KIT)}}>
                                <ImageBackground source={AppIcon.img_math} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} resizeMode={'contain'}>
                                    {/* <Image source={AppIcon.icon_pass} style={styles.imageBgRight} /> */}
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>

                        {!!(listSubject && listSubject.length > 0) &&
                            listSubject.map((val, key) => {
                                if (key > 0) {
                                    return (
                                        <View style={styles.rowRight} key={key}>
                                            <TouchableOpacity style={styles.wrapSub3} onPress={() => this.gotoPracticeStep()}>
                                                <View source={AppIcon.bg_toanhoc_new} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} resizeMode={'contain'}>
                                                    <Image source={AppIcon.icon_pass} style={styles.imageBgRight} />
                                                    <Text>SUBJECT NAME</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }
                            })
                        }
                    </ScrollView>
                    {/* <TouchableOpacity style={{ width: 100, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', position: 'absolute', right: 20, bottom: 20 }}
                        onPress={() => { this.props.navigation.navigate({ routeName: 'TabBottom', key: 'TabBottomId' }) }}
                    >
                        <Text>Phụ Huynh</Text>
                    </TouchableOpacity> */}
                </View>
                {/* {
                    this.state.isShow &&
                    <View style={styles.popUp}>
                        <TouchableHighlight style={styles.closeBtn} onPress={this.onPressClose.bind(this)}>
                            <Text style={{ fontSize: 20 }}>X</Text>
                        </TouchableHighlight>
                        <Text style={styles.popUpHeader}>Chọn gói học</Text>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.listPackages}
                            renderItem={({ item }) => {
                                const { packageName, packageCode } = item;
                                console.log('packageCode: ', packageCode);
                                return (
                                    <TouchableHighlight underlayColor={'red'} onPress={() => { this.onButtonPress(packageCode) }}>
                                        <View style={styles.flatItem}>
                                            <Text style={styles.buttonText}>{packageName}</Text>
                                        </View>
                                    </TouchableHighlight>
                                )
                            }}
                        />
                    </View>
                } */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    closeBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'red',
        position: 'absolute',
        right: -10,
        top: -10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        marginTop: 10,
        fontSize: 15,
        fontFamily: 'SVN-Gumley',
        alignSelf: 'center'
    },
    popUpHeader: {
        marginVertical: 20,
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
    },
    flatItem: {
        width: 400,
        height: 50,
        borderRadius: 15,
        borderWidth: 2,
        marginTop: 10,
        marginLeft: '10%'
    },
    popUp: {
        alignItems: 'center',
        position: 'absolute',
        width: '90%',
        height: '90%',
        top: -20,
        left: '5%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10

    },
    container: {
        flex: 1,
    },
    textHello: {
        fontFamily: 'SVN-Gumley',
        fontSize: 18,
        color: 'rgb(0,77,166)',
        textShadowColor: 'rgb(255, 255, 255)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        marginLeft: 5
    },
    textName: {
        fontFamily: 'SVN-Gumley',
    },
    header: {
        marginTop: -5,
        alignItems: 'center',
        flex: 1,
    },
    wrap: {
        marginBottom: 15,
        flexDirection: 'row',
    },
    rowLeft: {
        marginLeft: margin_row,
        width: widthRowLeft,
        height: heightRow,
        justifyContent: 'space-between',
    },
    rowRight: {
        marginLeft: margin_row,
        // width: widthRowRight,
        // height: heightRow,
        flexDirection: 'row'
    },
    wrapSub1: {
        // flex:1,
        width: 200,
        height: 240,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapSub2: {
        width: widthRowLeft,
        height: heightRowItem,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapSub3: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#383838',
        fontSize: 13,
        fontWeight: 'bold'
    },
    icon: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    imageBg: {
        top: 5,
        left: 5,
        position: 'absolute',
        width: 20,
        height: 20,
    },
    imageBgRight: {
        top: 5,
        right: 5,
        position: 'absolute',
        width: 20,
        height: 20,
    }
});