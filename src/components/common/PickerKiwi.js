import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';

export default class PickerKiwi extends Component {
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
            <View style={this.props.style}>
                <View style={[
                    styles.wrPicker,
                    { backgroundColor: bgColor || 'white', borderColor: borderColor || '#cdcdcd', width: width || 100 }
                ]}>
                    <Text style={[styles.textClass, { color: color || 'rgb(166, 168, 171)' }]}>{this.state.label}</Text>
                    <RippleButton onPress={() => this.toggleAction()} style={styles.wrapIcon} color={'transparent'}>
                        <Image source={AppIcon.icon_select} style={styles.icon} />
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
        height: 25,
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: '#005EC6'
    },
    textClass: {
        flex: 1,
        color: '#fff',
        fontFamily: 'SVN-Gumley',
        marginLeft: 5,
        paddingHorizontal: 5,
        alignSelf: 'center'
    },
    icon: {
        alignSelf: 'center',
        marginRight: 5,
        marginLeft: 5,
        width: 20,
        height: 20
    },
    wrapDropdow: {
        borderWidth: 1,
        borderColor: '#ececec',
        zIndex: 100,
        top: 30,
        left: 20,
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 999,
    },
    rowItem: {
        paddingLeft: 20,
        width: 100,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    wrapIcon: {
        backgroundColor: '#cdcdcd',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    textItem: {
        fontFamily: 'SVN-Gumley',
        fontSize: 15,
    }
});