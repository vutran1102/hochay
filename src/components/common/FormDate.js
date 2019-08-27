import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FormDateDefault extends Component {
    render() {
        const { keyboardType, placeholder, name, value, disabled, label, icon } = this.props;
        return (
            <View style={styles.formVertical}>
                {label &&
                    <Text style={styles.label}>{label || ''}</Text>
                }
                <View style={[styles.rowForm, { width: this.props.width || 150 }]}>
                    <View style={styles.wrapFormIcon}>
                        {icon ?
                            <Image source={icon} style={{ width: 20, height: 20, top: 0 }} resizeMode='contain' />
                            :
                            <Icon name={name} size={17} color={disabled ? '#999' : '#333'} style={styles.iconInput} />
                        }
                    </View>
                    <TouchableOpacity onPress={() => this.props.onPress()} style={{ flex: 1 }}>
                        <TextInput
                            underlineColorAndroid='transparent'
                            editable={false}
                            style={styles.textInput}
                            selectTextOnFocus={false}
                        />
                        <View style={[styles.inputDate,
                        { width: this.props.width || 150, height: this.props.height || 40 }]}>
                            <Text style={[styles.textDate, { color: disabled ? '#999' : '#000' }]}>
                                {this.props.value}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formVertical: {
        marginBottom: 10,
        alignItems:'center'
    },
    label: {
        fontSize: 12,
        paddingLeft: 20,
        fontFamily: 'Roboto-Medium',
        marginBottom: 5
    },
    labelFormHightlight: {
        color: '#333',
        marginBottom: 5,
    },
    labelFormDark: {
        color: '#999',
    },
    rowForm: {
        marginHorizontal: 10,
        position: 'relative',
        flexDirection: 'row',
        height: 30,
        borderRadius: 2,
        backgroundColor: '#fff',
        borderWidth:1,
        borderColor: 'rgb(187, 206, 228)',
        marginRight: 20,
    },
    wrapFormIcon: {
        position: 'absolute',
        top: 3,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50
    },
    iconImage: {
        width: 20,
        height: 20
    },
    iconInput: {
        alignSelf: 'center',
    },
    formTextInput: {
        flex: 1,
        height: 40,
        color: '#f8f8f8',
    },
    textInput: {
        paddingLeft: 30,
    },
    inputDate: {
        position: 'absolute',
        top: -6,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    textDate: {
        paddingLeft: 0,
        fontSize: 12,
        top: 0,
        fontFamily: 'Roboto-Bold',
        color: 'rgb(166, 168, 171)'
    }
});
