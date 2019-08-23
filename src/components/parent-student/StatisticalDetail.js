import React, { Component } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import Header from '../parent-statistical/Header';
import RippleButton from '../common/RippleButton';
import { EnumLevelPractice } from '../../constants/const';
import HeaderParent from './HeaderParent';
import AppIcon from '../../utils/AppIcon';

const screenSize = Dimensions.get('window');
let {width, height}  = screenSize;
let s = width;
if(width > height) {
    width = height;
    height = s;
}


export default class StatisticalDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indexBtnActive: 3
        }
    }

    isButtonActive(index) {
        if (index == this.state.indexBtnActive) {
            return true;
        } else return false;
    }

    onButtonPress(index) {
        this.setState({ indexBtnActive: index });
    }

    filterData() {
        const index = (this.state.indexBtnActive+1);
        result = [];
        if(!this.props.data)
            return;
        if(this.props.data && this.props.data.length <= 0) 
            return;
        for (let i = 0; i < this.props.data.length; i++) {
            let arrayProplem = this.props.data[i].data;
            count = 0;
            resultProplems = [];
            arrayProplem.map((item) => {
                if (item.levelPractice == index) {
                    count++;
                    resultProplems.push({
                        problemName: item.problemName,
                        percentComplete: item.percentComplete
                    })
                }
            })
            count > 0 && result.push({
                data: resultProplems,
                problemHierarchyName: this.props.data[i].problemHierarchyName
            })
        }
        return result;
    }

    renderGroup(data) {
        return (
            <View style={styles.groupItem}>
                <Text style={styles.titleItem}>{data.problemHierarchyName}</Text>
                <FlatList
                    data={data.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.singleItem}>
                                <View style={{width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: 'rgb(187, 206, 228)',bottom: 2, justifyContent: 'center', backgroundColor:'#e0e0e0'}}>
                                    <Image source={AppIcon.icon_calc} resizeMode='contain' style={{width: 35, height: 35, alignSelf: 'center'}}/>
                                </View>
                                <Text style={styles.proplemName}>{item.problemName}</Text>
                                <Text style={styles.percentComplete}>{item.percentComplete}/100 điểm</Text>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.rootContainer} >
                {/* <Header title={'Thống kê tổng hợp'} onPress={() => { this.props.backCallback() }} /> */}
                <HeaderParent displayName={'Thống kê học tập'} leftCallback={()=>{this.props.backCallback()}} rightCallback={() => { }} />
                <View style={styles.wrapRow}>
                    <RippleButton style={[this.isButtonActive(3) ? styles.buttonActive : styles.buttonInActive, {borderTopLeftRadius: 10}]} onPress={() => { this.onButtonPress(3) }}>
                        <Text style={{color: this.isButtonActive(3) ? "#fff" : 'rgb(160, 180, 204)'}}>{EnumLevelPractice.LEVEL3.title}</Text>
                    </RippleButton>
                    <RippleButton style={this.isButtonActive(2) ? styles.buttonActive : styles.buttonInActive} onPress={() => { this.onButtonPress(2) }}>
                        <Text style={{color: this.isButtonActive(2) ? "#fff" : 'rgb(160, 180, 204)'}}>{EnumLevelPractice.LEVEL2.title}</Text>
                    </RippleButton>
                    <RippleButton style={this.isButtonActive(1) ? styles.buttonActive : styles.buttonInActive} onPress={() => { this.onButtonPress(1) }}>
                        <Text style={{color: this.isButtonActive(1) ? "#fff" : 'rgb(160, 180, 204)'}}>{EnumLevelPractice.LEVEL1.title}</Text>
                    </RippleButton>
                    <RippleButton style={[this.isButtonActive(0) ? styles.buttonActive : styles.buttonInActive, {borderTopRightRadius: 10}]} onPress={() => { this.onButtonPress(0) }}>
                        <Text style={{color: this.isButtonActive(0) ? "#fff" : 'rgb(160, 180, 204)'}}>{EnumLevelPractice.LEVEL0.title}</Text>
                    </RippleButton>
                </View>
                <View style={styles.containerView}>
                    <FlatList
                        data={this.filterData()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (this.renderGroup(item))}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    singleItem: {
        width: width * 0.9,
        height: 60,
        borderWidth: 1,
        marginTop: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingTop: 5,
        borderColor: 'rgb(94, 181, 234)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupItem: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        paddingBottom: 10
    },
    rootContainer: {
        flex: 1
    },
    proplemName: {
        width: '55%',
        fontSize: 13,
        marginLeft: 10
    },
    percentComplete: {
        color: 'rgb(252, 115, 106)'
    },
    containerView: {
        width: width,
        height: '88%',
        alignItems: 'center',
        paddingBottom: 70,
        backgroundColor: '#fff'
    },
    wrapRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        // borderBottomWidth: 1,
    },
    buttonActive: {
        width: width * 0.25,
        height: 45,
        borderBottomWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -1,
        backgroundColor: 'rgb(247, 189, 2)'
    },
    buttonInActive: {
        width: width * 0.25,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgb(234, 244, 255)",
        borderBottomWidth: 0,
    },
    titleItem: {
        fontFamily: 'Roboto-Regular',
        margin: 5,
        fontSize: 11,
        color: 'rgb(255, 155, 26)',
        width: '80%'
    }
})
