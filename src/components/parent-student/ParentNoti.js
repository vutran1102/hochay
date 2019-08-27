import React, { Component } from 'react';
import { Text, View, Image, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import RippleButton from '../common/RippleButton';
import NotiDetail from './NotiDetail';
import { connect } from 'react-redux';
import HeaderParent from './HeaderParent';
import AppIcon from '../../utils/AppIcon';


class ParentNoti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHideDetail: true,
        }
    }

    handleTime(timestamp) {
        const date = new Date(timestamp * 1000);
        const timesString = date.toLocaleString();
        return timesString;
    }

    onBack() {
        this.setState({
            isHideDetail: true
        })
    }

    onItemPress(index) {
        this.setState({
            isHideDetail: false
        })
    }

    render() {
        console.log('this.props.notifyData: ', JSON.stringify(this.props.notifyData));
        return (
            <View style={{ flex: 1 }}>
                {this.state.isHideDetail && <View style={styles.rootView} >
                    <HeaderParent displayName={'Thông báo'} leftCallback={() => { this.props.backCallback() }} />
                    {/* <View style={styles.headerView}>
                        <RippleButton style={styles.backButton} onPress={() => { this.props.backCallback() }}>
                            <IconIon name={'md-arrow-back'} color={'#fff'} size={24} />
                        </RippleButton>
                        <Text style={{ color: '#fff' }}>Thông báo</Text>
                        <TouchableHighlight onPress={() => { }} style={styles.chooseAll} underlayColor={'transparent'}>
                            <Text style={styles.textButton}>Đánh dấu đã đọc tất cả</Text>
                        </TouchableHighlight>
                    </View> */}
                    <View style={styles.container}>
                        <FlatList
                            data={this.props.notifyData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(data) => {
                                const { isRead, message, timeCreate } = data.item;
                                // let nameIcon = isRead ? 'envelope-open' : 'envelope';
                                return (
                                    <TouchableHighlight onPress={(index) => { this.onItemPress(index) }} underlayColor={'transparent'} >
                                        <View style={styles.itemForm}>
                                            {/* <Icon name={nameIcon} size={40} /> */}
                                            <View style={{width: 60, height: 60, borderRadius: 30, borderColor: '#BBCEE4', alignItems: 'center', justifyContent:'center', borderWidth: 1}}>
                                                <Image source={AppIcon.letter} style={{ width: 27, height: 20 }} resizeMode='contain' />
                                            </View>
                                            <Text style={{ left: 20, width: '80%', top: -10 }}>{message}</Text>
                                            <Text style={{ position: 'absolute', bottom: 10, right: 10, color: '#5EB5EA' }}>{this.handleTime(timeCreate)}</Text>
                                        </View>
                                    </TouchableHighlight>
                                )
                            }}
                        />
                    </View>
                </View>}
                {!this.state.isHideDetail && <NotiDetail backCallback={this.onBack.bind(this)} />}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        notifyData: state.parent.listNoti
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentNoti);

const styles = StyleSheet.create({
    itemForm: {
        backgroundColor: '#fff',
        width: '90%',
        height: 80,
        marginLeft: "5%",
        marginTop: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        borderColor:'#5EB5EA',
        borderRadius: 10
    },
    rootView: {
        flex: 1,
        // backgroundColor: '#3f72ff',
    },
    headerView: {
        paddingTop: 10,
        width: '100%',
        height: 80,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        paddingTop: 20,
        // alignItems: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    chooseAll: {
        width: 200,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    textButton: {
        textDecorationLine: 'underline',
        fontSize: 16,
        color: '#fff'
    },
    backButton: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 20,
        top: 10
    }
})