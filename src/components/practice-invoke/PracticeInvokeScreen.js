import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import HeaderNavigation from '../common/HeaderNavigation';
import ListInvoke from './ListInvoke';
import Container from '../common/Container';
import AppIcon from '../../utils/AppIcon';
import Helper from '../../utils/Helpers';

export default class PracticeInvokeScreen extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { problemId } = this.props.navigation.state.params;
        this.getInitData(problemId);
    }

    getInitData(problemId) {
        Helper.getToken().then(token => {
            if (token == '') this.props.navigation.navigate('Auth');
            this.props.fetchPraticeRelateStart({ token, problemId });
        });
    }

    goback() {
        this.props.navigation.goBack();
    }

    renderSeparator() {
        return (
            <View style={{ height: 1, backgroundColor: 'rgb(166, 168, 171)', marginHorizontal: 10 }}></View>
        );
    }

    handleInvokeAction(item) {
        const { problemId, status, title } = item;
        const problemCode = problemId;
        this.props.navigation.pop();
        this.props.navigation.pop();
        this.props.navigation.navigate({ routeName: 'PracticeInfo', key: 'PracticeInfoId2', params: { problemCode, title } });
    }

    render() {
        return (
            <ImageBackground source={AppIcon.bg_info} style={{ width: '100%', height: '100%' }}>
                <Container>
                    <HeaderNavigation
                        onPress={this.goback.bind(this)}
                        title={'Bài học liên quan'}
                        color={'rgb(166, 168, 171)'}
                    />
                    <FlatList
                        contentContainerStyle={styles.flatList}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.props.listRelate}
                        renderItem={({ item }) => <ListInvoke item={item} onPress={this.handleInvokeAction.bind(this)} />}
                    />
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
    flatList: {
    }
});