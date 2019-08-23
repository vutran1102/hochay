import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import HeaderNavigation from '../common/HeaderNavigation';
import Container from '../common/Container';
import Helper from '../../utils/Helpers';
import { LoadingLearn } from '../common/LoadingScreen';
import { dataNotify } from '../../utils/DataTest';
import AppIcon from '../../utils/AppIcon';
import NoDataViewComp from '../common/NoDataViewComp';

export default class ParentNotifyScreen extends Component {

    goBack() {
        this.props.navigation.goBack();
    }

    componentDidMount() {
        Helper.getTokenParent().then(token => {
            if (token == '' || token == null) this.props.navigation.navigate('Auth');
            this.props.makeRequestNotify({ token });
        });
    }

    render() {
        const { dataNotify } = this.props;
        return (
            <ImageBackground source={AppIcon.bg_info} style={{ width: '100%', height: '100%' }}>
                <Container>
                    <HeaderNavigation title={'Thông báo'} onPress={() => this.goBack()} />
                    {dataNotify != '' ?
                        <FlatList
                            data={dataNotify}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={styles.rowItem}>
                                    <Text style={styles.textTime}>13:20</Text>
                                    <Text style={styles.textDesc}>{item.message}</Text>
                                </View>
                            }
                        /> : <NoDataViewComp />
                    }
                    <LoadingLearn isLoading={false} />
                </Container>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    rowItem: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
    textTime: {
        marginLeft: 20,
        fontFamily: 'Roboto-Bold',
        fontSize: 13
    },
    textDesc: {
        borderRadius: 40,
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
});