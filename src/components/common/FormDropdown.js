import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { dataParent } from '../../utils/DataTest';
import RippleButton from './RippleButton';
import AppIcon from '../../utils/AppIcon';

export default class FormDropdown extends Component {
    state = {}
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.rowForm, { width: this.props.width || 370 }, this.props.style && {...this.props.style}]}>
                    {!this.props.icon && <Image source={AppIcon.arrow_down} resizeMode='contain' style={{ width: 20, height: 20, position:'absolute', right: 15, top: 5 }} />}
                    <Dropdown
                        dropdownOffset={{top: 80, left: 0}}
                        ref='dropdown'
                        textColor='rgb(169, 169, 169)'
                        fontSize={13}
                        // disabled={isDisable}
                        rippleInsets={{ top: 0, bottom: 0 }}
                        renderBase={({title}) => {
                            return (
                                <View style={{width: 320, height: 30}}>
                                    <Text style={styles.textInput}>{title}</Text>
                                    {this.props.icon && <Image source={this.props.icon} style={{ width: 15, height: 10, position: 'absolute', top: 10, right: 110, tintColor: '#FF9B19' }} resizeMode='contain'/>}
                                </View>
                                // <RippleButton onPress={()=>{consle.log('ewqjoehquiehqu')}} style={{width: this.props.width || 320, height: 30, marginLeft: 10, position: 'absolute', top: - 30}}>
                                //     <View>

                                //     </View>
                                // </RippleButton>
                            )
                        }}
                        data={this.props.data || dataParent}
                        containerStyle={{ width: this.props.width || 320, height: 30, marginLeft: 10, position: 'absolute'}}
                        // rippleInsets={{top:0, bottom: 0}}
                        // rippleCentered= {true}
                        value={this.props.value || dataParent[0].value}
                        onChangeText={(item) => { console.log('onChange Value dropdown,: ', item); this.props.onChangeText(item) }}
                    />
                </View>
            </View>
        );
    }
}

const data = [{ value: '' }]

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10
    },
    textInput: {
        top: 7,
        fontSize: 12,
        fontFamily: 'Roboto-MediumItalic',
        color: 'rgb(166, 168, 171)'
    },
    rowForm: {
        marginHorizontal: 20,
        flexDirection: 'row',
        height: 30,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgb(255, 160, 54)'
    },
})