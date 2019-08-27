import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderNavigation from '../common/HeaderNavigation';
import Container from '../common/Container';
import AppIcon from '../../utils/AppIcon';
import SelectChild from '../modals/SelectChild';
import { Button } from '../common/Button';
import Helper from '../../utils/Helpers';
import DateUtils from '../../utils/DateUtils';
import LoadingScreen from '../common/LoadingScreen';

export default class ParentPackageInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleAccount: false,
            userId: Object.keys(this.props.listChild).length > 0 ? this.props.listChild[0].userId : '',
            displayName: Object.keys(this.props.listChild).length > 0 ? this.props.listChild[0].displayName : '',
        }
    }

    componentDidMount = () => {
        const { packageCode } = this.props.navigation.state.params;
        Helper.getTokenParent().then(token => {
            this.props.fetchPackageInfo({ token, packageCode });
        }).catch(err => { })
    }


    goBack() {
        this.props.navigation.goBack();
    }

    showListAccount() {
        this.setState({
            visibleAccount: true
        });
    }

    onSelectItem(data) {
        const { userId, displayName } = data;
        this.setState({ userId, displayName, visibleAccount: false });
    }

    onClose() {
        this.setState({
            visibleAccount: false
        });
    }

    addPackage() {
        const { packageCode } = this.props.navigation.state.params;
        const { userId } = this.state;
        Helper.getTokenParent().then(token => {
            new Promise((resolve, reject) => {
                this.props.addPackage({ token, packageCode, userId, resolve, reject });
            }).then(response => {
                // to do toast success
            }).catch(err => { })
        });
    }

    render() {
        const { packageInfo } = this.props;
        const { listGrade, listSubject } = this.props.navigation.state.params;
        return (
            <ImageBackground source={AppIcon.bg_detail} style={{ width: '100%', height: '100%' }} >
                <Container>
                    <HeaderNavigation title={'Đăng kí khóa học bước 2'} onPress={() => this.goBack()} color={'white'} />
                    <View style={styles.container}>
                        <View style={styles.wrapPackage}>
                            <TouchableHighlight onPress={() => this.showListAccount()}>
                                <View style={styles.viewSelect}>
                                    <Text style={styles.textChild}>{this.state.displayName}</Text>
                                    <Icon name={'caret-down'} size={16} color={'#999'} style={styles.iconCaret} />
                                </View>
                            </TouchableHighlight>
                            <Text style={styles.textPackage}>{packageInfo.packageName}</Text>
                            <Text style={styles.textDesc}>{packageInfo.description || ''}</Text>
                            <Text style={styles.textDesc}>Số dư tài khoản : {packageInfo.userWallet}</Text>
                            <Text style={styles.textDesc}>Kiểu gói : {packageInfo.totalDay} ngày</Text>
                            <Text style={styles.textDesc}>Ngày hết hạn: {DateUtils.formatDateHMYMD(packageInfo.expiresTime || 0)}</Text>
                            <View style={styles.rowClass}>
                                {listGrade.map((gradeId, key) => {
                                    return (
                                        <Text key={`list-grade${key}`} style={styles.textC}>{gradeId}</Text>
                                    );
                                })}
                            </View>
                            <View style={styles.rowClass}>
                                {listSubject.map((subject, key) => {
                                    return (
                                        <Text key={key} style={styles.textC}>{subject}</Text>
                                    );
                                })}
                            </View>
                            <Button title='Mua ngay' onPress={() => this.addPackage()} />
                        </View>
                    </View>
                    {this.state.visibleAccount &&
                        <SelectChild
                            listChild={this.props.listChild}
                            onSelectItem={this.onSelectItem.bind(this)}
                            onClose={this.onClose.bind(this)} />
                    }
                    <LoadingScreen isLoading={this.props.isLoadingAddPackage} />
                </Container>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    wrapPackage: {
        borderRadius: 10,
        marginHorizontal: 30,
        paddingVertical: 30,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    viewSelect: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgb(181, 182, 185)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginVertical: 10,
    },
    textPackage: {
        color: 'rgb(181, 182, 185)',
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
    },
    textDesc: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: 'rgb(181, 182, 185)',
        lineHeight: 24,
    },
    rowClass: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    textChild: {
        marginRight: 10,
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: 'rgb(181, 182, 185)',
        lineHeight: 24,
    },
    textC: {
        color: 'rgb(181, 182, 185)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#b8b8b8',
        fontFamily: 'Roboto-Bold',
        marginHorizontal: 2,
        borderRadius: 10,
    },
    iconCaret: {
        alignSelf: 'center'
    }
});