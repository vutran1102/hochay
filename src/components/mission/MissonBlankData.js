import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ButtomCustome } from '../common/Button';


export default class MissonBlankData extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bạn không có nhiệm vụ nào, hãy luyện tập</Text>
                <View style={styles.containerBtn}>
                    <ButtonCustom title={'Toán'}/>
                    <ButtonCustom title={'Tiếng Anh'}/>
                    <ButtonCustom title={'Tiếng Việt'}/>
                </View>
            </View>
        );
    }
}

export class ButtonCustom extends Component {
    render() {
        return(
            <ButtomCustome width={btnCustom.width} onPress={()=> {}} title={this.props.title} height={btnCustom.height} bgColor={btnCustom.backgroundColor}/>
        )
    }
}
const btnCustom = {
    width: 150,
    height: 150,
    backgroundColor: '#f67563'
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        paddingTop:20,
        fontFamily: 'iCiel Pony'
    },
    containerBtn: {
        height: 200,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 50
    }
})