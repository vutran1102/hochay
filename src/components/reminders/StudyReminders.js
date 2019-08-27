import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import RippleButton from '../common/RippleButton';
import ReminderDailyForm from './ReminderDailyForm';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenSize = Dimensions.get('window');
const DATA = [
    {
        time: 'Hôm nay',
        reminderData: {
            0: {
                title: 'Con làm các bài tập toán này nhé! Tối về mẹ xem!'
            },
            1: {
                title: 'Con làm các bài tập Tiếng Anh này nhé! Tối về mẹ xem!'
            }
        }
    },
    {
        time: 'Hôm qua',
        reminderData: {
            0: {
                title: ' Con làm các bài tập toán này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! '
            },
            1: {
                title: 'Con làm các bài tập Tiếng Anh này nhé! Tối về mẹ xem!'
            },
            3: {
                title: ' Con làm các bài tập Văn này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! '
            },
        }
    },
    {
        time: 'Hôm kia',
        reminderData: {
            0: {
                title: ' Con làm các bài tập toán này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! '
            },
            1: {
                title: 'Con làm các bài tập Tiếng Anh này nhé! Tối về mẹ xem!'
            },
            3: {
                title: ' Con làm các bài tập Văn này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! '
            },
            4: {
                title: ' Con làm các bài tập Văn này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! '
            },
            5: {
                title: ' Con làm các bài tập Văn này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! Con làm các bài tập toán này nhé! Tối về mẹ xem! '
            },
        }
    },
]

export default class StudyRemindersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: DATA
        }
    }

    render() {
        return (
            <View style={styles.containerView}>
                <View style={styles.headerContainer}>
                    <RippleButton style={styles.bell} size={40}>
                        <Icon name={'bell'} color={'rgb(38, 135, 218)'} size={35} />
                    </RippleButton>
                    <Text style={styles.text}>Lời nhắn học tập của ba mẹ dành cho bạn</Text>
                    <RippleButton style={styles.home} size={40}>
                        <Icon name={'home'} color={'rgb(38, 135, 218)'} size={35} />
                    </RippleButton>
                </View>
                <ScrollView style={styles.scrollView}>
                    {this.state.data.map((value, index) => {
                        console.log('value: ', index)
                        return (
                            <ReminderDailyForm key={index} data={value} index={index}/>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 70,
        // backgroundColor: 'orange',
        flexDirection: 'row'
    },
    containerView: {
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center'
    },
    scrollView: {
        width: screenSize.width,
        // backgroundColor: 'green',
        // alignItems: 'center'
    },
    bell: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 15,
        left: 20
    },
    home: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 15,
        right: 20
    },
    text: {
        fontSize: 20,
        position: 'absolute',
        top: 18,
        left: 60
    }
})