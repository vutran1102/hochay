import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { tab_main_width } from '../../constants/const';
import RippleButton from '../common/RippleButton';
import AppIcon from '../../utils/AppIcon';
const { width, height } = Dimensions.get('window');
const w = width > height ? width : height;
const h = width > height ? height : width;

const row_parent_width = (w - tab_main_width - 3 * 20) / 2;
const row_parent_bot = (row_parent_width - 20) / 2;
const height_parent = ((h - 72) - 5 * 20) / 3;

export default class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    gotoNavigate(index) {
        // this.props.showConfirm();
        // return;
        switch (index) {
            case 1:
                this.props.navigation.navigate({ routeName: 'ParentStatistical', key: 'ParentStatisticalId' });
                break;
            case 2:
                this.props.navigation.navigate({ routeName: 'ParentScience', key: 'ParentScienceId' });
                break;
            case 3:
                this.props.navigation.navigate({ routeName: 'ParentProgram', key: 'ParentProgramId' });
                break;
            case 4:
                this.props.navigation.navigate({ routeName: 'ParentAccount', key: 'ParentAccountId' });
                break;
            case 5:
                this.props.navigation.navigate({ routeName: 'ParentHelp', key: 'ParentHelpId' });
                break;
            case 6:
                this.props.navigation.navigate({ routeName: 'ParentSetting', key: 'ParentSettingId' });
                break;
            case 7:
                this.props.navigation.navigate({ routeName: 'ParentNotify', key: 'ParentNotifyId' });
                break;
            case 8:
                this.props.navigation.navigate({ routeName: 'ParentInfo', key: 'ParentInfoId' });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowItem}>
                    <RippleButton style={styles.wrapTop} onPress={() => this.gotoNavigate(1)}>
                        <Text style={styles.title}>Thống Kê Học Tập</Text>
                        <Image source={AppIcon.icon_bar_chart} style={styles.iconTop} />
                    </RippleButton>
                    <RippleButton onPress={() => this.gotoNavigate(2)} style={styles.wrapTop}>
                        <Text style={styles.title}>Đăng kí khóa học</Text>
                        <Image source={AppIcon.icon_cart} style={styles.iconTop2} />
                    </RippleButton>
                </View>
                <View style={styles.rowItem}>
                    <RippleButton style={styles.wrapTop} onPress={() => this.gotoNavigate(3)}>
                        <Text style={styles.title}>Khung chương trình</Text>
                        <Image source={AppIcon.icon_program} style={styles.iconTop} />
                    </RippleButton>
                    <RippleButton style={styles.wrapTop} onPress={() => this.gotoNavigate(4)}>
                        <Text style={styles.title}>Quản lý học sinh</Text>
                        <Image source={AppIcon.icon_account_manager} style={styles.iconTop4} />
                    </RippleButton>
                </View>
                <View style={styles.rowItem}>
                    <RippleButton style={styles.wrapBot} onPress={() => this.gotoNavigate(5)}>
                        <Image source={AppIcon.icon_book_parent} style={styles.iconTop5} />
                        <Text style={styles.title}>Giúp con học tốt</Text>
                    </RippleButton>
                    <RippleButton style={styles.wrapBot} onPress={() => this.gotoNavigate(7)}>
                        <Image source={AppIcon.icon_ring_tone} style={styles.iconTopx} />
                        <Text style={styles.title}>Thông báo</Text>
                    </RippleButton>
                    <RippleButton style={styles.wrapBot} onPress={() => this.gotoNavigate(6)}>
                        <Image source={AppIcon.icon_setting} style={styles.iconTop} />
                        <Text style={styles.title}>Cài đặt</Text>
                    </RippleButton>
                    <RippleButton style={styles.wrapBot} onPress={() => this.gotoNavigate(8)}>
                        <Image source={AppIcon.icon_information} style={styles.iconTop} />
                        <Text style={styles.title}>Thông tin</Text>
                    </RippleButton>
                </View>
                {/* <FlatList
                    data={this.state.data}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <RippleButton onPress={() => this.gotoNavigate(item)} style={styles.rows}>
                            <Icon name={item.icon} color={item.color} size={24} style={styles.icon} />
                            <Text style={styles.title}>{item.title}</Text>
                        </RippleButton>
                    }
                /> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: 20,
    },
    rowItem: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    wrapTop: {
        height: height_parent,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginBottom: 20,
        width: row_parent_width
    },
    wrapBot: {
        height: height_parent,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: row_parent_bot
    },
    iconTop: {
        width: 35,
        height: 35,
    },
    iconTop2: {
        width: 35,
        height: 35 * 38 / 47,
    },
    iconTop4: {
        width: 35,
        height: 35 * 51 / 39,
    },
    iconTop5: {
        width: 30,
        height: 30 * 44 / 41,
    },
    iconTopx: {
        width: 35,
        height: 41,
    },
    iconTop6: {
        width: 35,
        height: 35 * 35 / 41,
    },
    title: {
        color: 'rgb(181, 182, 185)',
        fontFamily: 'Roboto-Bold',
        fontSize: 14
    },
    icon: {
        position: 'absolute',
        right: 5,
        top: 5
    }

});
