import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, ImageBackground } from 'react-native';
import { ScaleSlide } from 'react-native-animation-effects';
import Color from '../../constants/colors';
import { HeaderClose } from './Header';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';
import global from '../../utils/Globals';
import { playSoundButton, stopSoundTrack1 } from '../../utils/AudioUtils';
import { ButtomCustomeSmall } from '../common/Button';
import PopUp from '../common/PopUp';
import ScaleSlideAnim from '../../components/anim/ScaleSlideAnim';
import Helper from '../../utils/Helpers';
import { connect } from 'react-redux';

let { width, height } = Dimensions.get('window');
let s = width;
if (height > width) {
    width = height;
    height = s;
}

export class ListAccountModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            userPresent: 0,
            parentAvatar: '',
        }
        global.updateListChild = this.getData.bind(this);
    }

    componentDidMount() {
        console.log('ListAccountModal');
        this.getData();
        Helper.getParentAvatarUri().then(data => {
            this.setState({ parentAvatar: data });
        });
    }

    componentWillMount() {
        s = width;
        if (height > width) {
            width = height;
            height = s;
        }
    }

    getData() {

    }

    logOut() {
        stopSoundTrack1();
        this.props.logOut();
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
        playSoundButton();
    }

    confirmSecurity(item, role) {
        item.role = role;
        this.props.showConfirm(item);
        // const { userId, userName, codePin } = item;
        // this.props.updateSubuser({ userId, userName, codePin });
    }

    onPressParent() {
        this.props.navigation.navigate({ routeName: 'TabBottom', key: 'TabBottomId' })
    }

    getFooterComponent(Role) {
        const item = {
            userId: this.props.userParentId,
            userName: this.props.userParentName
        }
        return (
            // <View>
            <View style={{ paddingTop: 10 }} >
                <View style={styles.rowAcount} >
                    <ImageBackground source={AppIcon.box_avatar} resizeMode='contain' style={styles.boxAvatar}>
                        <Image source={this.props.parentAvatarRedux ? { uri: `${this.props.parentAvatarRedux}` } : AppIcon.avtart_blank} style={{ width: 70, height: 70, borderRadius: 2, left: 2.5, top: 2.27 }} resizeMode='contain' />
                    </ImageBackground>
                    <View style={[styles.colRight]}>
                        <Text style={styles.textName}>{this.props.displayNameParent}</Text>
                        <Text style={styles.textClass}>{this.props.phoneNumber}</Text>
                        {Role == 'PARENT' ?
                            <RippleButton style={styles.btnSelect} color={'#fff'} size={80} onPress={() => this.onPressParent()}>
                                {/* <Text style={styles.textBtn}>Đang dùng</Text> */}
                                <Image source={AppIcon.btn_dangdung} resizeMode='contain' style={styles.btnVaoHoc} />
                            </RippleButton>
                            :
                            <RippleButton onPress={() => this.confirmSecurity(item, 'PARENT')} style={styles.btnSelect} color={'#fff'} size={80}>
                                {/* <Text style={[styles.textBtn, { color: 'rgb(122, 199, 12)' }]}>Lựa chọn</Text> */}
                                <Image source={AppIcon.btn_quanly} resizeMode='contain' style={styles.btnVaoHoc} />
                            </RippleButton>
                        }
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.viewAbsolute}>
                {/* <ScaleSlide> */}
                <ScaleSlideAnim>
                    {/* close={() => this.props.showListAccount(false)} */}
                    <PopUp style={styles.container} source={AppIcon.pop_up_7} resizeMode='cover'  width={width * 0.75} height={height * 0.9}>
                        {/* <HeaderClose onPress={() => this.props.showListAccount(false)} /> */}
                        <Image source={AppIcon.title_thaydoi} resizeMode='contain' style={styles.textThaydoi} />
                        <View style={{ width: '100%', marginBottom: 30, marginTop: 20, paddingHorizontal: 20, height: 80 }}>
                            {Object.keys(this.props.listChild).length > 0 ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    // ListFooterComponent={this.getFooterComponent(this.props.role)}
                                    horizontal={true}
                                    data={this.props.listChild}
                                    extraData={this.props.userId}
                                    renderItem={({ item, index }) =>
                                        <View style={styles.rowAcount} >
                                            <ImageBackground source={AppIcon.box_avatar} resizeMode='contain' style={styles.boxAvatar}>
                                                <Image source={item.avatar ? { uri: `http:${item.avatar}` } : AppIcon.avtart_blank} style={{ width: 70, height: 70, borderRadius: 2, left: 2.5, top: 2.27 }} resizeMode='contain' />
                                            </ImageBackground>
                                            {/* <Image source={AppIcon.icon_girl} style={styles.iconAvatar} /> */}
                                            <View style={[styles.colRight]}>
                                                <Text style={styles.textName}>{item.displayName}</Text>
                                                <Text style={styles.textClass}>Học sinh lớp {item.gradeId.substring(1)}</Text>
                                                {(item.userId == this.props.userId && this.props.role == 'STUDENT') ?
                                                    < View style={styles.btnSelect} >
                                                        <Image source={AppIcon.btn_dangdung} resizeMode='contain' style={styles.btnVaoHoc} />
                                                        {/* <Text style={styles.textBtn}>Đang dùng</Text> */}
                                                    </View>
                                                    :
                                                    <RippleButton onPress={() => this.confirmSecurity(item, 'STUDENT')} style={styles.btnSelect} color={'#fff'} size={80}>
                                                        {/* <Text style={[styles.textBtn, { color: 'rgb(122, 199, 12)' }]}>Lựa chọn</Text> */}
                                                        <Image source={AppIcon.btn_vaohoc} resizeMode='contain' style={styles.btnVaoHoc} />
                                                    </RippleButton>
                                                }
                                            </View>
                                        </View>
                                    }
                                />
                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.textNoStudent}>Bạn chưa có tài khoản học sinh</Text>
                                    <ButtomCustomeSmall size={100} title={'Thêm ngay'}
                                        onPress={() => {
                                            this.props.showListAccount(false);
                                            this.props.navigation.navigate({
                                                routeName: 'ParentAccount', key: 'ParentAccountId'
                                            });
                                        }}
                                    />
                                </View>
                            }
                        </View>
                        <View style={styles.separation} />
                        <Image source={AppIcon.title_tkphuhuynh} resizeMode='contain' style={styles.textPhuhuynh} />
                        {this.getFooterComponent(this.props.role)}
                        <RippleButton onPress={() => this.logOut()} style={styles.viewLogout}>
                            <Image source={AppIcon.btn_dangxuat} resizeMode='contain' style={{width: 150, height: 35}}/>
                        </RippleButton>
                        <Image source={AppIcon.mascot_1} style={{ position: 'absolute', height: height * 0.5, width: 200, right: - 100, bottom: - 10 }} resizeMode='contain' />
                        <Image source={AppIcon.text_hi_box} style={{ position: 'absolute', height: 56, width: 56, left: - 80, bottom: 170 }} resizeMode='contain' />
                        <Image source={AppIcon.girl_child} style={{ position: 'absolute', height: 140, width: 95, left: - 55, bottom: 25, zIndex: -1 }} resizeMode='contain' />
                    </PopUp>
                </ScaleSlideAnim>
                {/* </ScaleSlide> */}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        parentAvatarRedux: state.parent.parentUri,
    }
}

const mapDispatchToProps = state => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAccountModal)
const styles = StyleSheet.create({
    viewAbsolute: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 11,
        justifyContent: 'center',
        alignItems: 'center'
    },
    separation: {
        width: 208,
        height: 1,
        borderTopWidth: 1,
        borderColor: '#fff',
        top: - 15,
    },
    container: {
        alignItems: 'center',
        marginVertical: 50,
        // backgroundColor:'#fff'
    },
    btnVaoHoc: {
        width: 87,
        height: 26,
    },
    body: {
        paddingVertical: 20,
    },
    icon: {
        alignSelf: 'center'
    },
    wrButton: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        color: Color.textColorPrimary,
        fontWeight: 'bold',
        fontSize: 13,
        alignSelf: 'center',
        marginVertical: 20
    },
    textNoStudent: {
        marginBottom: 10,
        fontSize: 15,
        color: 'rgb(38, 135, 218)',
        fontFamily: 'SVN-Gumley',
    },
    rowAcount: {
        marginBottom: 10,
        flexDirection: 'row',
        // justifyContent: 'space-around',
        borderWidth: 1,
        width: 230,
        height: 75,
        marginHorizontal: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgb(246, 177, 0)',
        borderRadius: 5
    },
    colRight: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-around',

    },
    textThaydoi: {
        width: 220,
        height: 23,
        marginTop: 30,
    },
    textPhuhuynh: {
        width: 220,
        height: 23,
        marginTop: 0,
    },
    iconAvatar: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#eab847',
        borderRadius: 25,
    },
    boxAvatar: {
        width: 75, height: 75, left: -3
    },
    textName: {
        fontSize: 15,
        fontFamily: 'SVN-Gumley',
        color: 'rgb(0, 77, 166)'
    },
    textLine: {
        marginVertical: 5,
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: 'SVN-Gumley',
        color: 'rgb(38, 135, 218)'
    },
    textClass: {
        fontSize: 11,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(20, 20, 20)'
    },
    btnUsing: {
        width: 90,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        backgroundColor: 'rgb(122, 199, 12)',
        alignItems: 'center'
    },
    btnSelect: {
        marginTop: 5,
        width: 87,
        height: 26,
        // borderRadius: 19,
        // borderWidth: 2,
        // borderColor: 'rgb(122, 199, 12)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        color: '#fff',
        fontFamily: 'Roboto-Bold'
    },
    viewLogout: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 40,
        marginTop: 10
    }
});