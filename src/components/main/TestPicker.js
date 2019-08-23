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
            data: [{ value: 'C1', label: 'Lớp 1' }, { value: 'C2', label: 'Lớp 2' },
            { value: 'C3', label: 'Lớp 3' }, { value: 'C4', label: 'Lớp 4' }, { value: 'C5', label: 'Lớp 5' }]
        }
    }

    componentDidMount() {
        const value = '';
        const index = this.state.data.findIndex(x => x.value == value);
        const label = this.state.data[index != -1 ? index : 0].label;
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
    }

    toggleAction() {
        this.setState({
            isVisible: !this.state.isVisible
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.wrPicker}>
                        <Text style={styles.textClass}>{this.state.label}</Text>
                        <RippleButton onPress={() => this.toggleAction()} style={styles.icon} color={'transparent'}>
                            <Icon name='caret-down' color={'#fff'} size={16} style={styles.icon} />
                        </RippleButton>
                    </View>
                    {this.state.isVisible &&
                        <View style={styles.flatList}>
                            {this.state.data.map((data, key) => {
                                return (
                                    <TouchableOpacity onPress={() => this.onPress(data)} style={styles.rowItem} key={key}>
                                        <Text style={styles.textItem}>
                                            Lớp {data.value.substring(1)}
                                        </Text>
                                    </TouchableOpacity>
                                );
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
        flex: 1,
        backgroundColor: '#999',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrPicker: {
        width: 100,
        height: 30,
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
        marginLeft: 5,
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