import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { Button } from '../common/Button';
import AppIcon from '../../utils/AppIcon';
import ModalReminder from './ModalReminder';


export default class ReminderDailyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.data.time,
            cellData: this.props.data.reminderData
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textHeader}>{this.state.time}</Text>
                {Object.values(this.state.cellData).map((value, key) => {
                    return (
                        <View key={key} style={styles.cellContainer}>
                            <ModalReminder ref='modalReminder' dataIndex={this.props.index + key/10}/>
                            <Image source={AppIcon.mother_avatar} style={{ width: 70, height: 70 }} />
                            <View style={[styles.containerText]}>
                                <Text style={styles.textMessage}>{value.title}</Text>
                            </View>
                            <View style={{marginLeft: 20, alignSelf: 'center'}}>
                                <Button width={80} title='Làm Bài'
                                    onPress={() => {
                                        this.refs.modalReminder.setModalVisible(true);
                                    }}
                                />
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cellContainer: {
        height: 80,
        // backgroundColor: '#fff',
        flexDirection: 'row',
        borderWidth: 1,
        paddingTop: 5,
        marginTop: 3
    },
    container: {
        paddingLeft: Dimensions.get('window').width * 5 / 100,
        width: '95%',
        marginTop: 5,
        marginBottom: 5
    },
    containerText: {
        paddingLeft: 10,
        height: 70,
        // justifyContent: 'center',
        paddingTop: 5,
        width: '65%',
        // backgroundColor: 'green'
    },
    textHeader: {
        fontSize: 20,
        fontFamily: 'SVN-Gumley',
    },
    textMessage: {
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
    }
})