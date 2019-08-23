import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Dimensions, Image } from 'react-native';
import { HeaderRightTitle } from '../common/HeaderNavigation';
import Container from '../common/Container';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';
import Helper from '../../utils/Helpers';
import Orientation from 'react-native-orientation';
import { NavigationActions } from 'react-navigation';
import { LoadingTransparent } from '../common/LoadingScreen';
import Toast, { DURATION } from 'react-native-easy-toast';
import BottomTabCustom from '../parent-student/BottomTabCustom';
import HeaderParent from '../parent-student/HeaderParent';
import LinearGradient from 'react-native-linear-gradient';



const screenSize = Dimensions.get('window');
let { width, height } = screenSize;
let s = width;
if (width > height) {
    width = height;
    height = s;
}
export default class ParentPackageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            indexPage: 0,
            packageName: '',
            itemSellected: {},
            totalCost: 0,
            packagePrice: 500000,
            isHidePopUp: true,
            currentPackageCode: '',
            isLoading: false,
        }
    }

    componentDidMount = () => {

    }

    onPress(i) {
        if(i > 0 ) {
            this.refs.toast.show('Chức năng đang trong quá trình xây dựng!');
            return;
        }
        this.setState({ index: i });
    }

    renderTab() {
        list = [];
        for (let i = 0; i < 3; i++) {
            let text;
            switch (i) {
                case 0:
                    text = ('Môn Toán');
                    break;
                case 1:
                    text = ('Môn Tiếng Anh');
                    break;
                case 2:
                    text = ('Môn Tiếng Việt');
                    break;
            }
            list.push(<RippleButton size={40} key={i} style={[(i == this.state.index) ? styles.buttonActive : styles.buttonInActive, i == 0 && { borderTopLeftRadius: 20 }, i == 2 && { borderTopRightRadius: 20 }]} onPress={() => { this.onPress(i) }}>
                <Text style={{ color: (i == this.state.index) ? '#fff' : 'rgb(160, 180, 204)', fontWeight: '100', fontSize: 12, }}>{text}</Text>
            </RippleButton>)
        }
        return (list)
    }

    onItemPress(item) {
        if (item.status) {
            return;
        }
        this.setState({
            itemSellected: {
                ...this.state.itemSellected,
                [item.userId]: !this.state.itemSellected[item.userId]
            }
        })
    }

    onRegisterPress(data) {
        const packageCode = data.packageCode;
        this.setState({ packageName: data.packageName, isHidePopUp: false });
        Helper.getTokenParent().then(token => {
            this.props.fetchPackageInfo({ token, packageCode })
        })
        this.setState({ currentPackageCode: data.packageCode })
    }

    calcTotalCost() {
        let count = 0;
        Object.values(this.state.itemSellected).map((data) => {
            if (data) {
                count++;
            }
        })
        if (count > 1) {
            count = ((count - 1) * 0.9 + 1)
        }

        return `${Math.ceil(count * this.state.packagePrice)}đ`;
    }

    onBuyBtnPress() {
        const packageCode = this.state.currentPackageCode;
        let result = [];
        this.setState({ isLoading: true });
        Helper.getTokenParent().then(token => {
            this.setState({ isLoading: false });
            const { itemSellected } = this.state;
            this.closePress();
            for (i in itemSellected) {
                if (itemSellected[i]) {
                    result.push(i);
                    let userId = i;
                    new Promise((resolve, reject) => {
                        this.props.addPackage({ token, packageCode, userId, resolve, reject });
                    }).then(response => {
                        this.refs.toast.show('Mua gói thành công !')
                    }).catch(err => { })
                }
            }
        })
    }

    closePress() {
        this.setState({ isHidePopUp: true, itemSellected: {} })
    }

    render() {
        return (
            <ImageBackground source={AppIcon.background_parent} style={{ width: '100%', height: '100%' }} >
                <View>
                    {/* <View style={styles.header}>
                        <Text style={styles.headerText}>Đăng kí khóa học</Text>
                    </View> */}
                    <HeaderParent displayName={'Đăng kí khóa học'} />
                    <View style={styles.headerTab}>
                        {/* {this.renderTab().map((data) => {
                           return(
                               {data}
                           )
                       })} */}
                        {this.renderTab()}
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.titleLb}>Đăng kí khóa học cho con ngay hôm nay</Text>
                        <View style={styles.flatlistContent}>
                            <FlatList
                                data={this.props.listPackage}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) =>
                                    <View style={styles.wrapItems} >
                                        <Text style={styles.textSubject}>Trọn gói khóa học {item.packageName}</Text>
                                        <Text style={styles.textDetail}>Có trong tay toàn bộ các bài học trong chương trình học môn {item.packageName} chỉ với giá:</Text>
                                        <Text style={styles.textPrice}>500.000đ</Text>
                                        <View style={styles.wrapRow}>
                                            <RippleButton style={styles.registerBtn} onPress={() => { this.onRegisterPress(item) }}>
                                                <Text style={styles.registerLb}>Đăng kí ngay</Text>
                                            </RippleButton>
                                            <RippleButton style={styles.tryBtn}>
                                                <Text style={styles.tryLb}>Xem thử</Text>
                                            </RippleButton>
                                        </View>
                                    </View>
                                }
                            />
                        </View>
                    </View>
                    {!this.state.isHidePopUp && <View style={styles.overlay}>
                        <View style={styles.popUp}>
                            <LinearGradient
                                start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
                                locations={[1, 0]}
                                colors={['rgb(90, 203, 234)', 'rgb(137, 63, 246)']}
                                style={styles.popUpHeader}
                            >
                                {/* <View style={styles.popUpHeader}> */}
                                <RippleButton style={{ width: 14.4, height: 14.4, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 10, top: 10 }} size={14} onPress={() => { this.closePress() }}>
                                    <Image source={AppIcon.icn_close_popup_package} style={{ width: 14.4, height: 14.4 }} resizeMode='contain' />
                                </RippleButton>
                                <Text style={styles.popUpHeaderText}>Đăng kí {this.state.packageName}</Text>
                                {/* </View> */}
                            </LinearGradient>

                            <Text multiline={true} style={styles.textContainer} >Bạn sẽ đăng ký khóa học theo tài khoản. Nếu đăng khóa học từ tài khoản thứ 2 trờ lên, với mỗi tài khoản sẽ được giảm giá <Text style={{ color: 'rgb(255, 155, 26)', fontWeight: '800' }}>10%</Text> giá gốc.{"\n"}Hãy lựu chọn tài khoản cần mua và ấn nút '<Text style={{ color: 'rgb(255, 155, 26)', fontWeight: '800' }}>Mua ngay</Text>'</Text>
                            <View style={styles.flastListContainer}>
                                <FlatList
                                    data={this.props.packageInfo.data}
                                    keyExtractor={(item, index) => index.toString()}
                                    extraData={this.state.itemSellected}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <RippleButton onPress={() => { this.onItemPress(item) }}>
                                                <View style={styles.item} >
                                                    <Image source={AppIcon.icon_girl} style={{ width: 55, height: 55, borderRadius: 27.5, borderWidth: 1, borderColor: 'rgb(190, 204, 230)' }} />
                                                    {!item.status ? <View style={(this.state.itemSellected[item.userId]) ? styles.choosedCircle : styles.unChooseCircle} >
                                                        <Text style={{ color: '#fff' }}>{(this.state.itemSellected[item.userId]) ? 'BỎ CHỌN' : 'CHỌN'}</Text>
                                                    </View> :
                                                        <View style={styles.unChooseCircle} >
                                                            <Text style={{ color: '#fff' }}>ĐÃ MUA</Text>
                                                        </View>}
                                                    <Text style={styles.itemLb}>{item.name}</Text>
                                                </View>
                                            </RippleButton>
                                        )
                                    }}
                                />
                            </View>
                            <LinearGradient
                                start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                                locations={[0, 0.5, 1]}
                                colors={['#fff', 'rgb(229, 237, 246)', '#fff']}
                                style={{ width: '100%', height: 47, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
                            >
                                {/* <View style={{ width: '100%', height: 20, marginTop: 20 }}> */}
                                <Text style={{ color: '#000', fontWeight: '100' }}>Thành tiền: <Text style={styles.textPrice}>{this.calcTotalCost()}</Text></Text>
                                {/* </View> */}
                            </LinearGradient>
                            <View style={{ width: '100%', height: 40, position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: 20 }}>
                                <RippleButton style={styles.btnBuy} onPress={this.onBuyBtnPress.bind(this)}>
                                    <Text style={styles.btnText}>Mua ngay</Text>
                                </RippleButton>
                            </View>
                        </View>
                    </View>}
                </View>
                <Toast ref="toast" position={'top'} />
                <LoadingTransparent isLoading={this.props.isLoading || this.state.isLoading} bgColor='rgba(0,0,0,0.5)' />
                <BottomTabCustom navigation={this.props.navigation} />
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    popUp: {
        // position: 'absolute',
        width: 0.88 * width,
        height: '70%',
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        // top: 80
    },
    headerTab: {
        width: width,
        height: 55.2,
        // backgroundColor: '#fff',
        flexDirection: 'row'
    },
    overlay: {
        position: 'absolute',
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    buttonActive: {
        backgroundColor: 'rgb(255, 155, 26)',
        width: width / 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 55.2
    },
    buttonInActive: {
        width: width / 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(234, 244, 255)',
        height: 55.2
    },
    header: {
        width: '100%',
        backgroundColor: 'blue',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    headerText: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
    },
    container: {
        flex: 1,
        width: width,
        // justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    rowTabs: {
        // flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flatlistContent: {
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingBottom: 20,
    },
    wrapTab: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    wrapTabActive: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgb(122, 199, 12)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    textClass: {
        fontSize: 18,
        color: 'rgb(181, 182, 185)',
        fontFamily: 'Roboto-Bold'
    },
    textClassActive: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Roboto-Bold'
    },
    wrapItems: {
        width: 0.88 * width,
        marginTop: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 20,
        height: 165,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'rgb(94, 181, 234)'
    },
    textSubject: {
        color: 'rgb(107, 195, 44)',
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        marginBottom: 10,
    },
    textDetail: {
        color: '#000',
        fontSize: 12,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    textButton: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Roboto-Bold'
    },
    wrapRow: {
        flexDirection: 'row',
        height: 40,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10,
    },
    textC: {
        color: 'rgb(181, 182, 185)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#b8b8b8',
        fontWeight: 'bold',
        marginHorizontal: 2,
        borderRadius: 10,
    },
    registeredBtn: {

    },
    registerBtn: {
        width: 124,
        height: 31.2,
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(255, 155, 26)',
        borderColor: '#fd7d25',
        borderRadius: 3,
    },
    tryBtn: {
        width: 124,
        height: 31.2,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#4BAE13',
        borderBottomWidth: 2,
        backgroundColor: '#6BC528',
        borderRadius: 3,
    },
    registerLb: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: 13
    },
    tryLb: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: 13
    },
    titleLb: {
        fontFamily: 'Roboto-Bold',
        alignSelf: 'center',
        marginTop: 20,
        color: 'rgb(255, 155, 26)'
    },
    popUpHeader: {
        width: '100%',
        height: 40,
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    popUpHeaderText: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
    },
    textContainer: {
        fontSize: 12,
        marginVertical: 10,
        marginHorizontal: 10,
        fontWeight: '100'
    },
    flastListContainer: {
        width: '90%',
        height: '40%',
    },
    item: {
        width: width * 0.8,
        height: 90,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgb(94, 181, 234)'
    },
    choosedCircle: {
        width: 96,
        height: 30.5,
        borderBottomWidth: 2,
        borderColor: '#FB524A',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FC736A',
        right: 28,
        position: 'absolute',
        borderRadius: 3,
    },
    unChooseCircle: {
        width: 96,
        height: 30.5,
        borderBottomWidth: 2,
        borderColor: '#4BAE13',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6BC528',
        right: 28,
        position: 'absolute',
        borderRadius: 3,
    },
    inCircle: {
        width: 5,
        height: 5,
        backgroundColor: 'green'
    },

    itemLb: {
        fontWeight: '200',
        marginLeft: 12
    },
    textPrice: {
        marginTop: 10,
        fontSize: 20,
        marginLeft: 20,
        fontWeight: '800',
        color: 'rgb(255, 155, 26)'
    },
    btnBuy: {
        width: 182,
        height: 36.5,
        borderBottomWidth: 2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(255, 155, 26)',
        borderColor: '#fd7d25',
    },
    btnText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: '#fff'
    },
    closeBtn: {
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        top: 0,
    }
});