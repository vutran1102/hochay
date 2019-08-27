import React, { Component } from "react";
import { View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import AppIcon from '../../utils/AppIcon';
import LinearGradient from 'react-native-linear-gradient';

const screenSize = Dimensions.get('window');

export default class BottomTabCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onPressStudent () {
        this.props.navigation.navigate('Student')
    }

    onPressCourse() {
        this.props.navigation.navigate('Course')
    }

    onPressAccount() {
        this.props.navigation.navigate('Info')
    }

    render() {
        return (
            <LinearGradient
                start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1}}
                locations={[1, 0]}
                colors={['rgb(137,63,246)', 'rgb(90,203,234)']}
                style={styles.wrapRow}
            >
                <View style={[styles.wrapRow, {paddingTop: 10}]}>
                    <TouchableWithoutFeedback style={styles.wrapButton} onPress={()=> this.onPressStudent()}>
                        <View style={styles.wrapView}>
                            <Image source={AppIcon.icon_hoc_sinh} style={styles.image} />
                            <Text style={styles.text}>Học Sinh</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={styles.wrapButton} onPress={()=> this.onPressCourse()}>
                        <View style={styles.wrapView}>
                            <Image source={AppIcon.icon_khoa_hoc} style={styles.image} />
                            <Text style={styles.text}>Khóa Học</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={styles.wrapButton} onPress={()=> this.onPressAccount()}>
                        <View style={styles.wrapView}>
                            <Image source={AppIcon.icon_tai_khoan} style={styles.image} />
                            <Text style={styles.text}>Tài Khoản</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    wrapRow: {
        width: screenSize.width>screenSize.height ? screenSize.height : screenSize.width,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        height: 60,
    },
    wrapButton: {
        width: screenSize.width>screenSize.height ? screenSize.height / 3 : screenSize.width / 3,
        height: 60,
    },
    wrapView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    text: {
        color:'#fff',
        marginTop:5
    }
})