import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, Image, TouchableHighlight, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FormInput extends Component {
    render() {
        const { keyboardType, placeholder, name, value } = this.props;
        return (
            <View style={styles.formVertical}>
                {this.props.label &&
                    <Text style={styles.labelFormHightlight}>{this.props.label}</Text>
                }
                <View style={styles.rowForm}>
                    <View style={styles.wrapFormIcon}>
                        {this.props.type && this.props.type == 'image' ?
                            <Image source={this.props.icon} style={styles.iconImage} />
                            :
                            <Icon name={name} size={17} color={'#fff'} style={styles.iconInput} />
                        }
                    </View>
                    <TextInput
                        {...this.props.iii}
                        secureTextEntry={this.props.secureTextEntry || false}
                        onChangeText={(text) => this.props.onChangeText(text)}
                        underlineColorAndroid="transparent"
                        keyboardType={keyboardType || 'default'}
                        placeholder={placeholder || ''}
                        value={value}
                        onSubmitEditing={this.props.onSubmitEditing || null}
                        placeholderTextColor={'#fff'}
                        style={styles.formTextInput} />
                </View>
            </View>
        )
    }
}

export const InputPlatform = ({ width, indexInput, onPress, placeholder = '', value, secureTextEntry = false, onChangeText, disabled = false, label, keyboardType = 'default' }) => {
    return (
        <View>
            {label &&
                <Text style={styles.label}>{label || ''}</Text>
            }
            {Platform.OS == 'ios' ?
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => onPress(value, placeholder, indexInput, secureTextEntry, keyboardType)}
                >
                    <View style={[styles.viewInput, width && {width:width}]}>
                        <TextInput
                            keyboardType={keyboardType || 'default'}
                            pointerEvents="none"
                            secureTextEntry={value == '' ? false : secureTextEntry}
                            value={value != '' ? value : placeholder} style={[styles.textInput, {
                                color: value != '' ? '#383838' : 'rgb(166, 168, 171)'
                            }]} />

                    </View>
                </TouchableHighlight>
                :
                <TextInput
                    editable={!disabled}
                    selectTextOnFocus={!disabled}
                    value={value}
                    keyboardType={keyboardType || 'default'}
                    secureTextEntry={secureTextEntry}
                    onChangeText={(text) => onChangeText(text)}
                    underlineColorAndroid={'transparent'}
                    placeholderTextColor={'rgb(166, 168, 171)'}
                    placeholder={placeholder}
                    style={[styles.formInput,  width && {width:width}]} />
            }
        </View>
    );
}

export const FormMath = ({ placeholder = '', value, secureTextEntry = false, onChangeText, disabled = false, label, keyboardType }) => {
    return (
        <View>
            {label &&
                <Text style={styles.label}>{label || ''}</Text>
            }
            <TextInput
                editable={!disabled}
                selectTextOnFocus={!disabled}
                value={value}
                keyboardType={keyboardType || 'default'}
                secureTextEntry={secureTextEntry}
                onChangeText={(text) => onChangeText(text)}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'rgb(166, 168, 171)'}
                placeholder={placeholder}
                style={styles.formInput} />
        </View>
    );
}


const styles = StyleSheet.create({
    formVertical: {
        marginVertical: 5,
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    labelFormHightlight: {
        color: 'white',
    },
    labelFormDark: {
        color: '#999',
    },
    rowForm: {
        flexDirection: 'row',
    },
    wrapFormIcon: {
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
    label: {
        fontSize: 12,
        paddingLeft: 20,
        fontFamily: 'Roboto-Medium',
        marginBottom: 5
    },
    textInput: {
        fontSize: 12,
        fontFamily: 'Roboto-MediumItalic',
    },
    formInput: {
        backgroundColor: '#fff',
        borderColor: 'rgb(255, 160, 54)',
        borderWidth:1,
        fontSize: 12,
        borderRadius: 8,
        marginHorizontal: 80,
        height: 30,
        paddingLeft: 10,
        marginBottom: 10,
        fontFamily: 'Roboto-MediumItalic',
    },
    viewInput: {
        backgroundColor: '#fff',
        borderColor: 'rgb(255, 160, 54)',
        borderRadius: 8,
        borderWidth:1,
        marginHorizontal: 80,
        height: 30,
        paddingLeft: 10,
        marginBottom: 10,
        justifyContent: 'center',
    }
});

FormInput.propTypes = {
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func,
    type: PropTypes.oneOf([
        'image', 'font'
    ]),
}