import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Container from '../common/Container';
import Helper from '../../utils/Helpers';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';
import { HeaderRightSelect } from '../common/HeaderNavigation';
import SelectChild from '../modals/SelectChild';

export default class ParentPackageManagerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleAccount: false,
            userId: Object.keys(this.props.listChild).length > 0 ? this.props.listChild[0].userId : '',
            displayName: Object.keys(this.props.listChild).length > 0 ? this.props.listChild[0].displayName : '',
        }
    }

    gotoPackageInfo() {

    }

    goBack() {
        this.props.navigation.goBack();
    }

    onRightEvent() {
        this.setState({
            visibleAccount: true
        });
    }

    onSelectItem(data) {
        const { userId, displayName } = data;
        this.setState({ userId, displayName, visibleAccount: false }, () => {
            this.getListPackage(userId);
        });
    }

    onClose() {
        this.setState({
            visibleAccount: false
        });
    }

    confirmRemovePackage(packageCode) {
        Alert.alert(
            'Xác nhận',
            'Bạn chắc chắn muốn xóa package này',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.deletePackageUser(packageCode) },
            ],
            { cancelable: false },
        );
    }

    render() {
        return (
            <ImageBackground source={AppIcon.bg_detail} style={{ width: '100%', height: '100%' }} >
                <Container>
                    <HeaderRightSelect
                        onRightEvent={this.onRightEvent.bind(this)}
                        title={'Quản lý gói học sinh'}
                        rightTitle={this.state.displayName}
                        onPress={() => this.goBack()} color={'white'} />
                    <View style={styles.container}>
                        <View style={styles.rowContent}>
                            <FlatList
                                data={this.props.listPackageUser}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={2}
                                renderItem={({ item }) =>
                                    <View style={styles.wrapItems} onPress={() => this.gotoPackageInfo()}>
                                        <RippleButton onPress={() => this.confirmRemovePackage(item.packageCode)} style={{ position: 'absolute', top: 10, right: 10 }}>
                                            <Icon name={'remove'} size={16} color={'#de7e7e'} />
                                        </RippleButton>
                                        <Text style={styles.textSubject}>{item.packageName}</Text>
                                        <Text style={styles.textPrice}>500.000đ</Text>
                                        <View style={styles.rowClass}>
                                            {item.listGrade.map((gradeId, key) => {
                                                return (
                                                    <Text key={`list-grade${key}`} style={styles.textC}>{gradeId}</Text>
                                                );
                                            })}
                                        </View>
                                        {/* <View style={styles.rowClass}>
                                            <Text style={styles.textC}>Toán</Text>
                                            <Text style={styles.textC}>Tiếng Việt</Text>
                                            <Text style={styles.textC}>Tiếng Anh</Text>
                                        </View> */}
                                    </View>
                                }
                            />
                        </View>
                    </View>
                    {this.state.visibleAccount &&
                        <SelectChild
                            listChild={this.props.listChild}
                            onSelectItem={this.onSelectItem.bind(this)}
                            onClose={this.onClose.bind(this)} />
                    }
                </Container>
            </ImageBackground>
        )
    }

    componentDidMount = () => {
        const { userId } = this.state;
        this.getListPackage(userId);
    }

    getListPackage(userId) {
        Helper.getTokenParent().then(token => {
            this.props.getPackageById({ token, userId });
        });
    }

    deletePackageUser(packageCode) {
        const { userId } = this.state;
        Helper.getTokenParent().then(token => {
            this.props.deletePackageUser({ token, userId, packageCode });
        });
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'center',
    },
    rowTabs: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        flex: 1,
        marginTop: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    textSubject: {
        color: 'rgb(181, 182, 185)',
        fontSize: 22,
        fontFamily: 'Roboto-Bold'
    },
    textPrice: {
        color: 'rgb(181, 182, 185)',
        fontSize: 27,
        fontFamily: 'Roboto-Bold'
    },
    textButton: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Roboto-Bold'
    },
    rowClass: {
        flexDirection: 'row',
        marginVertical: 5
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
    }

});