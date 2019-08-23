import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RippleButton from '../common/RippleButton';
import TextPulsating from './TextPulsating';
import AppIcon from '../../utils/AppIcon';
import { tab_main_width } from '../../constants/const';
import RotateAnim from '../anim/RotateAnim';
import { Dropdown } from 'react-native-material-dropdown';
let { width, height } = Dimensions.get('window');
let s = width;
if (width < height) {
    width = height;
    height = s;
}


const w = width > height ? width : height;
const h = width < height ? width : height;

export default class Header extends Component {

    formatData(data) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
            result.push({ value: data[i].packageCode, label: data[i].packageName })
        }
        console.log("result: ", JSON.stringify(result));
        return result;
    }

    getAvatar() {
        for (let i = 0; i < this.props.listChild.length; i ++) {
            if(this.props.listChild[i].userId == this.props.userId) {
                return `http:${this.props.listChild[i].avatar}`
            }
        }
    }

    render() {
        const { displayName, displayNameParent, userName, role, RoleParent } = this.props;
        console.log("getAvatar: " , this.getAvatar());
        return (
            <ImageBackground source={AppIcon.background_header_main} resizeMode={'stretch'} style={{ width: w }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <RippleButton onPress={this.props.onPress} style={styles.rowInfo} color={RoleParent ? '#fff' : 'transparent'} size={100}>
                            {/* <Image source={{uri: `${this.getAvatar()}`}} style={styles.iconAvatar} /> */}
                            {/* <RotateAnim> */}
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{
                                    width: 27, height: 3,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center'
                                }} />
                                <View style={{
                                    width: 27, height: 3,
                                    backgroundColor: 'transparent',
                                    alignSelf: 'center'
                                }} />
                            </View>
                            {/* </RotateAnim> */}
                        </RippleButton>
                        <View style={styles.colsInfo}>
                            {role == 'PARENT' &&
                                <Text style={styles.textChangeSub}>Chuyển đổi tài khoản</Text>
                            }
                            {role == 'STUDENT' &&
                                <Text style={styles.textClass}>{this.props.gradeName}</Text>
                            }
                            {
                                role == 'PARENT' ?
                                    <Text style={styles.textName}>{displayNameParent ? displayNameParent : userName}</Text>
                                    :
                                    displayName != '' &&
                                    <TextPulsating style={styles.textName} title={displayName} />
                            }
                        </View>
                    </View>
                    <RippleButton style={[styles.viewLogout, { right: 220 }]} onPress={() => { this.props.showParentShift() }} rippleSize={100}>
                        <Image source={AppIcon.icon_phu_huynh} style={{ height: 80 }} resizeMode='contain' />
                    </RippleButton>
                    <RippleButton style={[styles.viewLogout, { right: 140 }]} onPress={() => this.props.handleMission(true)} rippleSize={100}>
                        <Image source={AppIcon.icon_loi_nhan} style={{ height: 80 }} resizeMode='contain' />
                    </RippleButton>
                    <View style={[styles.viewLogout, { right: 40 }]} onPress={() => { }} rippleSize={100}>
                        <ImageBackground source={AppIcon.box_title_grade} style={{ height: 73, width: 120 }} resizeMode='contain' >
                            <View style={{top: 40, left: 5}}>
                                {(this.props.listPackage.length > 0) && <Dropdown
                                    dropdownOffset={{ top: 0, left: 10 }}
                                    ref='dropdown'
                                    textColor='rgb(169, 169, 169)'
                                    fontSize={13}
                                    rippleInsets={{top: - 10}}
                                    renderBase={({ title }) => {
                                        return (
                                            <View style={{ width: 100, height: 30 , borderRadius: 10}}>
                                                <Text style={styles.textInput}>{title}</Text>
                                                <Image source={AppIcon.arrow_down} style={{ width: 15, height: 10, position: 'absolute', top: 5, right: - 10, tintColor: '#FF9B19' }} resizeMode='contain' />
                                            </View>
                                        )
                                    }}
                                    data={this.formatData(this.props.listPackage)}
                                    // containerStyle={{ width: this.props.width || 320, height: 30, marginLeft: 10, position: 'absolute' }}

                                    value={this.formatData(this.props.listPackage)[0].value}
                                    onChangeText={(item) => { console.log('onChange Value dropdown,: ', item); this.props.onChangeText(item) }}
                                />}
                                {!this.props.listPackage.length && <Text style={{left: 15, top: 3, fontSize: 12, fontWeight: '800'}}>Chưa có gói!</Text>}
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: w,
        height: (w - tab_main_width) * 97 / 605,
        paddingHorizontal: 20,
        flexDirection: 'row',
        paddingLeft: tab_main_width,
        // justifyContent: 'space-between'
    },
    rowInfo: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: - 10
    },
    colsInfo: {
        top: -10,
        marginLeft: 5,
        justifyContent: 'center',
    },
    textClass: {
        fontSize: 15,
        color: 'rgb(38, 135, 218)',
        fontFamily: 'SVN-Gumley',
    },
    textChangeSub: {
        fontSize: 10,
        color: 'rgb(38, 135, 218)',
        fontFamily: 'Roboto-Italic',
    },
    textInput: {
        top: 5,
        fontSize: 12,
        alignSelf:'center',
        fontFamily: 'Roboto-Bold',
        // color: 'rgb(166, 168, 171)'
    },
    textName: {
        alignSelf: 'center',
        fontFamily: 'SVN-Gumley',
        fontSize: 21,
        color: 'rgb(38, 135, 218)'
    },
    textName1: {
        fontFamily: "SVN-Gumley",
        fontSize: 13,
        color: '#383838'
    },
    rowSelect: {
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconAvatar: {
        zIndex: 12,
        position: 'absolute',
        alignSelf: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    viewLogout: {
        marginTop: 0,
        width: 60,
        alignItems: 'center',
        position: 'absolute'
    }

});
