import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import HeaderNavigation from '../common/HeaderNavigation';
import Container from '../common/Container';
import ProgressBar from '../common/ProgressBar';
import AppIcon from '../../utils/AppIcon';

const ItemsTrophy = ({ title, icon, desc }) => {
    return (
        <View style={styles.rowsItem}>
            <Image source={icon} style={styles.icon} />
            <View>
                <Text style={styles.textSkill}>{title || ''}</Text>
                <Text style={styles.textSkillDesc}>{desc || ''}</Text>
                <ProgressBar progress={0.5} color={'rgb(255, 225, 35)'} />
            </View>
        </View>
    );
}

export default class TrophyDetaiScreen extends Component {

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        const { displayName } = this.props;
        return (
            <ImageBackground source={AppIcon.bg_score} style={{ width: '100%', height: '100%' }}>
                <Container>
                    <HeaderNavigation bgColor={'transparent'} color={'white'} onPress={() => this.goBack()} />
                    <ScrollView style={styles.container}>
                        <View style={styles.rows}>
                            <Image source={AppIcon.icon_girl} style={styles.avatar} />
                            <Text style={styles.textUsername}>{displayName || ''}</Text>
                            <Text style={{color:'#dec15a',fontFamily:'Roboto-Italic'}}>Nội dung đang được xây dựng !!!</Text>
                        </View>
                        <Text style={styles.textTitleTrophy}>Thành tích học tập</Text>
                        <ItemsTrophy title={'Chăm chỉ'} icon={AppIcon.icon_achievement_cc} desc='Hoàn thành 15 kỹ năng' />
                        <ItemsTrophy title={'Thông hiểu'} icon={AppIcon.icon_achievement_th} desc='Thu thập 100 huy hiệu' />
                        <ItemsTrophy title={'Rèn luyện'} icon={AppIcon.icon_achievement_rl} desc='Sử dụng ứng dụng 100 tiếng' />
                        <ItemsTrophy title={'Chăm chỉ'} icon={AppIcon.icon_achievement_cc} desc='Hoàn thành 15 kỹ năng' />
                    </ScrollView>
                </Container>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
        marginBottom: 20,
        borderRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 20,
    },
    rows: {
        marginTop: 10,
        flexDirection: 'row'
    },
    rowsItem: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    textUsername: {
        fontFamily: 'SVN-Gumley',
        fontSize: 22,
        marginLeft: 20,
        alignSelf: 'center',
        color: '#0085D6'
    },
    textTitleTrophy: {
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        marginVertical: 10,
    },
    icon: {
        width: 44,
        height: 49,
        alignSelf: 'center',
        marginRight: 30,
    },
    textSkill: {
        fontFamily: 'Roboto-Medium',
        color: 'rgb(166, 168, 171)',
        fontSize: 13,
    },
    textSkillDesc: {
        fontFamily: 'Roboto-Regular',
        color: 'rgb(166, 168, 171)',
        fontSize: 10,
    }
});