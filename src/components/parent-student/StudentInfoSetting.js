import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard, Dimensions } from 'react-native';
import Header from '../parent-statistical/Header';
import StudentForm from './StudentForm';
import RippleBtn from '../common/RippleButton';
import { connect } from 'react-redux';
import { fetchUpdateChildStartAction } from '../../actions/authAction';
import global from '../../utils/Globals';
import HeaderParent from './HeaderParent';
import { updateAvatar } from '../../services/parentService';
import Helper from '../../utils/Helpers';


let { width, height } = Dimensions.get('window');
let s = width;
if (width > height) {
    width = height;
    height = s;
}
class StudentInfoSetting extends Component {

    onBackPress() {
        this.props.backCallback();
    }

    componentDidMount() {
        console.log('STUDENTINFOSETTING');
    }

    render() {
        return (
            <View style={styles.rootView} onPress={() => { Keyboard.dismiss(); console.log('press') }}>
                {/* <Header title={'Thông tin học sinh'} color={'blue'} onPress={this.onBackPress.bind(this)} /> */}
                <HeaderParent displayName='Thông tin học sinh' leftCallback={() => this.onBackPress()} />
                <View style={styles.wrapContent}>
                    <StudentForm dataStudent={this.props.data}>
                        <RippleBtn style={styles.updateBtn} onPress={() => { global.updateChild() }}>
                            <Text style={styles.label}>CẬP NHẬT</Text>
                        </RippleBtn>
                    </StudentForm>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUpdateChildInfo: (payload) => {
            dispatch(fetchUpdateChildStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentInfoSetting);

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: '#fff'
    },
    updateBtn: {
        width: 295,
        height: 44,
        backgroundColor: 'rgb(255, 155, 26)',
        borderBottomWidth: 2,
        borderRadius: 5,
        borderColor: '#FF7D06',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapContent: {
        width: width,
        paddingTop: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        flex:1,
        paddingBottom: 70
    }
})