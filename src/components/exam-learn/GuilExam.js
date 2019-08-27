import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedbackComponent } from 'react-native';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';
import ScaleSlideAnim from '../anim/ScaleSlideAnim';


export default GuildExam = ({ onClose, onBack, callback }) => {
    return (
        <View style={styles.container}>
            <View style={styles.bodyModal}>
                <RippleButton onPress={onClose} style={styles.viewDel} >
                    <Image source={AppIcon.icon_close} style={styles.iconDel} />
                </RippleButton>
                <RippleButton onPress={onClose} style={styles.rowItem}>
                    <Image source={AppIcon.icon_run} style={styles.icon} />
                    <Text style={styles.textHead}>Tiếp tục làm</Text>
                </RippleButton>
                <RippleButton onPress={onBack} style={styles.rowItem} >
                    <Image source={AppIcon.icon_back_arrow} style={styles.icon} />
                    <Text style={styles.textHead}>Không làm nữa</Text>
                </RippleButton>
                <Text style={styles.textTitle}>Hướng dẫn</Text>
                <View style={styles.rowItem}>
                    <Image source={AppIcon.icon_desc_exam} style={styles.icons} />
                    <Text style={styles.textItem}>Mỗi câu trả lời đúng được 10 điểm, sai 0 điểm</Text>
                </View>
                <View style={styles.rowItem}>
                    <Image source={AppIcon.icon_select_exam} style={styles.icons} />
                    <Text style={styles.textItem}>Lựa chọn đáp án</Text>
                </View>
                <View style={styles.rowItem}>
                    <Image source={AppIcon.icon_page_view} style={styles.icons} />
                    <Text style={styles.textItem}>Ấn nút xem đáp án và hướng dẫn giải</Text>
                </View>
                <View style={styles.rowItem}>
                    <Image source={AppIcon.icon_warning} style={styles.icons} />
                    <Text style={styles.textItem}>Sử dụng nút báo lỗi nếu câu hỏi hoặc đáp án có vấn đề</Text>
                </View>
                <RippleButton style={{ width: 175, height: 38, alignSelf: 'center', marginTop: 40 }} onPress={() => callback()}>
                    <Image source={AppIcon.btn_nopbai} style={{ width: 175, height: 38 }} resizeMode='contain' />
                </RippleButton>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 3
    },
    bodyModal: {
        paddingTop: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    rowItem: {
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    icon: {
        alignSelf: 'center',
        width: 26,
        height: 26,
        marginRight: 10,
    },
    icons: {
        width: 20,
        height: 20,
        marginRight: 10,
        alignSelf: 'center'
    },
    viewDel: {
        position: 'absolute',
        right: 10,
        top: 5,
    },
    textHead: {
        color: 'rgb(181 ,182,185)',
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        lineHeight: 30,
    },
    textItem: {
        color: 'rgb(181 ,182,185)',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        lineHeight: 24,
    },
    textTitle: {
        color: 'rgb(181 ,182,185)',
        fontFamily: 'Roboto-Bold',
        fontSize: 24,
        marginLeft: 20,
        marginVertical: 20
    },
    iconDel: {
        width: 20,
        height: 20,
        borderRadius: 10,
    }
});