import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';

export default class PickerForm extends Component {
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

    update(value) {
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
        const { bgColor, color, borderColor, bgDrowdow, disabled, width, label } = this.props;
        return (
            <View style={this.props.style}>
                {label &&
                    <Text style={styles.label}>{label || ''}</Text>
                }
                <View style={[
                    styles.wrPicker,
                    { backgroundColor: bgColor || 'rgb(230, 230, 230)', borderColor: borderColor || '#cdcdcd' }
                ]}>
                    {!disabled ?
                        <Text style={[styles.textClass, { color: color || '#383838' }]}>{this.state.label}</Text>
                        :
                        <Text style={[styles.textClass, { color: '#999' }]}>{this.state.label}</Text>
                    }
                    <RippleButton disabled={disabled} onPress={() => this.toggleAction()} style={styles.wrapIcon} color={'transparent'}>
                        <Image source={AppIcon.icon_select} style={styles.icon} />
                    </RippleButton>
                </View>
                {this.state.isVisible &&
                    <View style={[styles.wrapDropdow, { backgroundColor: bgDrowdow || '#fff' }]}>
                        {this.props.data.map((item, key) => {
                            return (
                                <TouchableOpacity onPress={() => this.onPress(item)} style={styles.rowItem} key={key}>
                                    <Text style={[styles.textItem, { color: color || '#383838' }]}>
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
    label: {
        fontSize: 12,
        paddingLeft: 20,
        fontFamily: 'Roboto-MediumItalic',
        marginBottom: 5
    },
    wrPicker: {
        height: 36,
        marginLeft: 20,
        marginRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 10,
        borderColor: '#005EC6',
        backgroundColor: 'rgb(230, 230, 230)'
    },
    textClass: {
        flex: 1,
        color: '#fff',
        fontFamily: 'Roboto-MediumItalic',
        fontSize: 12,
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
        top: 40,
        left: 20,
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 999,
    },
    rowItem: {
        paddingLeft: 20,
        width: 200,
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
        fontFamily: 'Roboto-MediumItalic',
        fontSize: 14,
    }
});