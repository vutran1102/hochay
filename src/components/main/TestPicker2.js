import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RippleButton from '../common/RippleButton';

export default class TestPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            value: '',
            label: '',
        }
    }

    componentDidMount() {
        const value = '';
        const index = this.props.data.findIndex(x => x.value == value);
        const label = this.props.data[index != -1 ? index : 0].label;
        this.setState({
            value, label
        });
    }

    hideDrowdow() {
        this.setState({
            isVisible: false
        });
    }

    onPress(data) {
        this.hideDrowdow();
        const value = data.value;
        const label = data.label;
        this.setState({
            label, value
        });
        this.props.onItemChange(value);
    }

    toggleAction() {
        this.setState({
            isVisible: !this.state.isVisible
        });
    }
    render() {
        const { bgColor, color, borderColor, bgDrowdow, width } = this.props;
        return (
            <View>
                <View style={[
                    styles.wrPicker,
                    { backgroundColor: bgColor || 'white', borderColor: borderColor || '#cdcdcd', width: width || 100 }
                ]}>
                    <Text style={[styles.textClass, { color: color || '#666' }]}>{this.state.label}</Text>
                    <RippleButton onPress={() => this.toggleAction()} style={styles.icon} color={'transparent'}>
                        <Icon name='caret-down' color={color || '#666'} size={16} style={styles.icon} />
                    </RippleButton>
                </View>
                {this.state.isVisible &&
                    <View style={[styles.wrapDropdow, { backgroundColor: bgDrowdow || '#fff' }]}>
                        {this.props.data.map((item, key) => {
                            return (
                                <TouchableOpacity onPress={() => this.onPress(item)} style={styles.rowItem} key={key}>
                                    <Text style={[styles.textItem, { color: color || '#666' }]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrPicker: {
        width: 100,
        height: 30,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#005EC6'
    },
    textClass: {
        flex: 1,
        color: '#fff',
        fontFamily: 'SVN-Gumley',
        marginLeft: 5,
        alignSelf: 'center'
    },
    icon: {
        alignSelf: 'center',
        marginRight: 5,
    },
    wrapDropdow: {
        borderWidth: 1,
        borderColor: '#ececec',
        zIndex: 99999,
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