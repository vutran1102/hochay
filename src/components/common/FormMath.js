import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default FormMath = ({ placeholder = '', value, secureTextEntry = false, onChangeText, disabled = false, label, keyboardType }) => {
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
    label: {
        fontSize: 12,
        paddingLeft: 20,
        fontFamily: 'Roboto-MediumItalic',
        marginBottom: 5
    },
    formInput: {
        backgroundColor: '#fff',
        fontSize: 12,
        borderWidth:1,
        borderColor: 'rgb(255, 160, 54)',
        borderRadius: 4,
        marginHorizontal: 20,
        height: 36,
        paddingLeft: 20,
        marginBottom: 10,
        fontFamily: 'Roboto-MediumItalic',
    }
});