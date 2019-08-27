import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Container from '../common/Container';
import { dataProgramC1, dataProgramC2, dataProgramC3 } from '../../utils/DataTest';
import HeaderTop from './HeaderTop';

const Header = ({ title }) => {
    return (
        <View style={styles.rows}>
            <Text style={styles.textHeader}>{title || ''}</Text>
        </View>
    );
}

const Items = ({ title }) => {
    return (
        <View style={styles.rows}>
            {/* <Text style={[styles.textItems, { marginRight: 10 }]}>1.1</Text> */}
            <Text style={styles.textItems}>{title || ''}</Text>
        </View>
    );
}

export default class ParentProgramScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gradeId: 'C1',
            listProgram: dataProgramC1
        }
    }

    onChangeGrade(item) {
        let value = item.value;
        this.setState({
            gradeId: value,
            listProgram: value == 'C2' ? dataProgramC2 : value == 'C3' ? dataProgramC3 : dataProgramC1
        });
    }


    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Container>
                    <HeaderTop
                        gradeId={this.state.gradeId}
                        onChangeGrade={this.onChangeGrade.bind(this)}
                        title={'Khung chương trình'} onPress={() => this.goBack()}
                        bgColor={'rgb(28, 176, 246)'}
                        color={'white'} />
                    <ScrollView style={styles.body}>
                        {this.state.listProgram.map((item, key) => {
                            if (item.type == 'head') return (<Header key={key} title={item.title} />);
                            else return (<Items key={key} title={item.title} />);
                        })}
                    </ScrollView>
                </Container>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    rows: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    textHeader: {
        fontFamily: 'Roboto-Bold',
        color: 'rgb(177, 179, 181)'
    },
    textItems: {
        fontFamily: 'Roboto-Italic',
        color: 'rgb(177, 179, 181)'
    },
    body: {
        paddingLeft: 20
    }
});