import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import jwtDecode from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome';
import RippleButton from '../common/RippleButton';
import global from '../../utils/Globals';

export default class SelectMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        }
    }

    hideDrowdow() {
        this.setState({
            isVisible: false
        });
    }

    onPress(data) {
        this.hideDrowdow();
        global.updateListSubject(data);
    }

    toggleAction() {
        this.setState({
            isVisible: !this.state.isVisible
        });
    }
    render() {
        const data = this.props.listGrade;
        const gradeId = this.props.gradeId;

        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.wrPicker}>
                        <Text style={styles.textClass}>{this.props.gradeName}</Text>
                        {/* <RippleButton onPress={() => this.toggleAction()} style={styles.icon} color={'transparent'}>
                            <Icon name='caret-down' color={'#fff'} size={16} style={styles.icon} />
                        </RippleButton> */}
                    </View>
                    {this.state.isVisible &&
                        <View style={styles.flatList}>
                            {data.map((data, key) => {
                                if (data.status) {
                                    return (
                                        <TouchableOpacity onPress={() => this.onPress(data)} style={styles.rowItem} key={key}>
                                            <Text style={styles.textItem}>
                                                {data.gradeName}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                }
                            })}
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    wrPicker: {
        width: 80,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgb(38, 135, 218)',
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#005EC6'
    },
    textClass: {
        flex: 1,
        color: '#fff',
        fontFamily: 'SVN-Gumley',
        marginLeft: 10,
        fontSize: 18,
        alignSelf: 'center'
    },
    icon: {
        alignSelf: 'center',
        marginRight: 5,
    },
    flatList: {
        zIndex: 100,
        top: 30,
        left: 20,
        position: 'absolute',
        backgroundColor: '#fff',
    },
    rowItem: {
        paddingLeft: 20,
        width: 100,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    textItem: {
        fontFamily: 'SVN-Gumley',
        fontSize: 15,
    }
});