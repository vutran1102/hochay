import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import HeaderNavigation from '../common/HeaderNavigation';
import Container from '../common/Container';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';

export default class ParentScienceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1
        }
    }

    changeTabs(index) {
        this.setState({
            index: index
        });
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        const { index } = this.state;
        return (
            <ImageBackground source={AppIcon.bg_detail} style={{ width: '100%', height: '100%' }} >
                <Container>
                    <HeaderNavigation title={'Đăng kí khóa học'} onPress={() => this.goBack()} color={'white'} />
                    <View style={styles.container}>
                        <View style={styles.rowTabs}>
                            <RippleButton size={120} style={index == 1 ? styles.wrapTabActive : styles.wrapTab} onPress={() => this.changeTabs(1)}>
                                <Text style={index == 1 ? styles.textClassActive : styles.textClass}>Lớp 1</Text>
                            </RippleButton>
                            <RippleButton size={120} style={index == 2 ? styles.wrapTabActive : styles.wrapTab} onPress={() => this.changeTabs(2)}>
                                <Text style={index == 2 ? styles.textClassActive : styles.textClass}>Lớp 2</Text>
                            </RippleButton>
                            <RippleButton size={120} style={index == 3 ? styles.wrapTabActive : styles.wrapTab} onPress={() => this.changeTabs(3)}>
                                <Text style={index == 3 ? styles.textClassActive : styles.textClass}>Lớp 3</Text>
                            </RippleButton>
                        </View>
                        <View style={styles.rowContent}>
                            <View style={styles.wrapItems}>
                                <Text style={styles.textSubject}>Toán Học</Text>
                                <Text style={styles.textPrice}>500.000đ</Text>
                                <RippleButton style={styles.buttonReged}>
                                    <Text style={styles.textButton}>Đã đăng ký</Text>
                                </RippleButton>
                            </View>
                            <View style={styles.wrapItems}>
                                <Text style={styles.textSubject}>Tiếng Việt</Text>
                                <Text style={styles.textPrice}>500.000đ</Text>
                                <RippleButton style={styles.buttonReged}>
                                    <Text style={styles.textButton}>Đã đăng ký</Text>
                                </RippleButton>
                            </View>
                            <View style={styles.wrapItems}>
                                <Text style={styles.textSubject}>Tiếng Anh</Text>
                                <Text style={styles.textPrice}>500.000đ</Text>
                                <RippleButton style={styles.buttonReg}>
                                    <Text style={styles.textButton}>Đăng kí ngay</Text>
                                </RippleButton>
                            </View>
                        </View>
                    </View>
                </Container>
            </ImageBackground>
        )
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
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
    buttonReg: {
        marginTop: 5,
        backgroundColor: 'rgb(147, 206, 65)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
    },
    buttonReged: {
        marginTop: 5,
        backgroundColor: 'rgb(216, 216, 216)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 15,
    }
});