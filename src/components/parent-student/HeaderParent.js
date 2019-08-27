import React, { Component } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, Dimensions } from "react-native";
import RippleButton from '../common/RippleButton';
import { isIphoneX, isIphoneXsMax } from '../../constants/const';
import AppIcon from '../../utils/AppIcon';

let { width, height } = Dimensions.get('window');
let s;
if(width > height) {
    s = width;
    width = height;
    height = s;
}

export default class HeaderParent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.headerWrap}>
                <View style={styles.wrapRow}>
                    {this.props.leftCallback && <RippleButton style={styles.wrapLeft} onPress={()=> {this.props.leftCallback()}}>
                        <Image source={this.props.leftIcon || AppIcon.btn_left_arrow_parent} resizeMode='contain' style={styles.btnHeaderLeft}/>
                    </RippleButton>}
                    <Text style={styles.displayName}>{this.props.displayName}</Text>
                    {this.props.rightIcon && <RippleButton style={styles.wrapRight} onPress={()=> {this.props.rightCallback()}}>
                        <Image source={this.props.rightIcon} resizeMode='contain' style={styles.btnHeaderRight}/>
                    </RippleButton>}

                    {/* <RippleButton style={styles.btnHeaderLeft} onPress={()=> {this.props.leftCallback()}}>
                        <Image source={AppIcon.btn_left_arrow_parent} resizeMode='contain' style={styles.btnHeaderLeft}/>
                    </RippleButton>
                    <Text style={styles.displayName}>{this.props.displayName}</Text>
                    <RippleButton style={styles.btnHeaderRight} onPress={()=> {this.props.rightCallback()}}>
                        <Image source={AppIcon.btn_gear_parent} resizeMode='contain' style={styles.btnHeaderRight}/>
                    </RippleButton> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapLeft:{
        width:25,
        height:25,
        position: 'absolute',
        left: 20,
        alignSelf: 'center'
    },
    wrapRight: {
        width:31,
        height:31,
        position: 'absolute',
        right: 20,
        alignSelf: 'center'
    },
    headerWrap: {
        marginTop: (isIphoneX() || isIphoneXsMax()) ? 40 : 10,
        height: 60,
        width: width,
    },
    displayName: {
        color: '#fff',
        fontFamily:'Roboto-Regular',
        fontSize: 17,
        alignSelf: 'center'
    },
    btnHeaderRight: {
        width:31,
        height:31,
    },
    btnHeaderLeft: {
        width:25,
        height:25,
    },
    wrapRow: {
        flexDirection: 'row',
        width: width,
        height: 60,
        justifyContent:'space-around',
        alignItems:'center'
    }
})