import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Image, Dimensions } from 'react-native';
import Orientation from 'react-native-orientation';
import jwtDecode from 'jwt-decode';
import HeaderNavigation from '../common/HeaderNavigation';
import Container from '../common/Container';
import Header from './Header';
import Helper from '../../utils/Helpers';
import AppIcon from '../../utils/AppIcon';
import ItemSla from './ItemSlaV2';
import ExamInfoDialog from '../../containers/exam/ExamInfoDialogContainer';
import { HeaderWithBg } from '../modals/Header';
import PopUp from '../common/PopUp';

let { width, height } = Dimensions.get('window');
if(height > width) {
    let s = width;
    width = height;
    height = s;
}

export default class ExamSlaScreen extends Component {
    constructor(props) {
        super(props);
        Orientation.lockToLandscape();
        this.state = {
            visibleExamInfo: false,
            duration: 0
        }
    }

    componentDidMount() {
        const { packageId } = this.props.navigation.state.params;
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            const indexPage = 0;
            this.props.fetchListTestByPage({ token, packageId, indexPage });
        }).catch(err => console.log(err));
    }

    handleAction(item) {
        const { index, title, testId, status, duration, totalAgain } = item;
        this.setState({
            testId: testId,
            title: title,
            status: status,
            visibleExamInfo: true,
            totalAgain: totalAgain,
            duration: duration,
            isShowPakageModal: false,
        });
        // this.props.navigation.navigate({ routeName: 'ExamInfo', key: 'ExamInfoId', params: { testId, title } });
    }

    onclose() {
        this.setState({
            visibleExamInfo: false,
        });
    }

    handleResultAction() {
        this.setState({
            visibleExamInfo: false
        });
        this.props.navigation.navigate({ routeName: 'ExamResult', key: 'ExamResultId', params: { type: 'Info' } });
    }

    handleExamAction(item) {

        this.setState({
            visibleExamInfo: false
        });
        const { status, testId, firstIdQuestion, nameTest } = item;
        this.props.navigation.navigate({ routeName: 'ExamLearn', key: 'ExamLearnId', params: { status, testId, firstIdQuestion, nameTest } });
    }

    goBack() {
        this.props.navigation.goBack();
    }

    listHeaderComponent() {
        return (
            <Header />
        );
    }

    render() {
        return (
            <ImageBackground source={AppIcon.background_main} style={{ width: '100%', height: '100%' }}>
                <Container>
                    {/* <HeaderNavigation title={'Kiểm tra năng lực'} color={'#fff'} onPress={() => this.goBack()} /> */}
                    <HeaderWithBg back={() => this.goBack()} />
                    <ImageBackground source={AppIcon.box_title} resizeMode='contain' style={{ width: width * 0.42, height: height * 0.2, alignItems: 'center', position: 'absolute', alignSelf: 'center', zIndex: 1 }}>
                        <Image source={AppIcon.title_toanhoc} style={{ width: '50%', position: 'absolute', bottom: -5 }} resizeMode='contain' />
                    </ImageBackground>
                    <View style={styles.container}>
                        <Image source={AppIcon.icon_preview} style={styles.iconPreview} resizeMode='contain' />
                        <PopUp source={AppIcon.pop_up_1} style={styles.wrap} resizeMode='contain' width={width * 0.8} height={height * 0.9}>
                            <View style={{ flexDirection: 'row', marginTop: -30 }}>
                                <FlatList
                                    contentContainerStyle={styles.flatList}
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.props.listTest}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    // ListHeaderComponent={this.listHeaderComponent()}
                                    renderItem={({ item, index }) =>
                                        <ItemSla
                                            index={index}
                                            isLoading={this.props.isLoadingPage}
                                            item={item}
                                            onPress={this.handleAction.bind(this)} />
                                    }
                                />
                            </View>
                            <Image source={AppIcon.icon_penholder} style={{ position: 'absolute', height: 98, width: 61, right: -10, bottom: 0 }} resizeMode='contain' />
                            <Image source={AppIcon.icon_book} style={{ position: 'absolute', height: 69, width: 72, left: - 50, bottom: 10 }} resizeMode='contain' />
                        </PopUp>
                        <Image source={AppIcon.icon_next} style={styles.iconNext} resizeMode='contain' />
                    </View>
                    {this.state.visibleExamInfo &&
                        <ExamInfoDialog
                            navigation={this.props.navigation}
                            handleResultAction={this.handleResultAction.bind(this)}
                            handleExamAction={this.handleExamAction.bind(this)}
                            onclose={this.onclose.bind(this)}
                            testId={this.state.testId}
                            title={this.state.title}
                            status={this.state.status}
                            totalAgain={this.state.totalAgain}
                            duration={this.state.duration} />
                    }
                    {
                        this.state.isShowPakageModal &&
                        <View style={styles.popUp}>
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
                    }
                </Container>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrap: {
        width: width * 0.8,
        height: height * 0.9,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 50,
        alignSelf: 'center',
        // borderWidth: 1.5,
        // borderColor: '#004DA5',
        // borderRadius: 10,
        // backgroundColor: '#FFF2AF'
    },
    flatList: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconPreview: {
        marginLeft: 5,
        width: 25,
        height: 26,
        alignSelf: 'center',
    },
    iconNext: {
        marginRight: 5,
        width: 25,
        height: 26,
        alignSelf: 'center',
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
        width: 0.9 * width,
        height: 0.9 * height,
        top: -20,
        left: 0.5 * width,
        backgroundColor: '#fff'
    },
});