import React, { Component } from 'react';
import { TextInput, View, Text, StyleSheet, Dimensions } from 'react-native';
import RippleButton from '../common/RippleButton';
import StudentForm from './StudentForm';
import Header from '../parent-statistical/Header';
import global from '../../utils/Globals';
import HeaderPerent from './HeaderParent';

let { width, height } = Dimensions.get('window');
let s = width;
if (width > height) {
    width = height;
    height = s;
}
export default class CreateNewStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onBackPress() {
        this.props.backCallback();
    }

    onDonePress() {
        // alert('Done press');
        // this.props.backCallback();
        // this.refs.studentform.addSubUser();
        // this.props.navigation.navigate('Course');
        global.createChild();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <Header title={'Thêm tài khoản học sinh'} color={'blue'} onPress={this.onBackPress.bind(this)} /> */}
                <HeaderPerent displayName='Thêm tài khoản học sinh' leftCallback={() => this.onBackPress()} />
                <View style={styles.wrapCotainer}>
                    <StudentForm ref='studentform' navigation={this.props.navigation}>
                        <View style={styles.doneBtnContainer}>
                            <RippleButton style={styles.doneButton} onPress={this.onDonePress.bind(this)}>
                                <Text style={[styles.label, { color: 'white', fontSize: 18, top: 2 }]}>Hoàn Thành</Text>
                            </RippleButton>
                        </View>
                    </StudentForm>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    doneBtnContainer: {
        width: width,
        height: 44,
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
    },
    wrapCotainer: {
        flex: 1,
        width: width,
        paddingBottom: 70,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff'
    },
    doneButton: {
        backgroundColor: '#FF9D12',
        alignItems: 'center',
        justifyContent: 'center',
        width: 295,
        height: 44,
        borderColor: '#FF7D06',
        borderBottomWidth: 3,
        borderRadius: 4
    },
    label: {
        fontSize: 12,
        paddingLeft: 20,
        fontFamily: 'Roboto-Medium',
        marginBottom: 5
    }
})