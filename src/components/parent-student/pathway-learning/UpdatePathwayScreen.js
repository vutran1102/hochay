import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import RippleButton from '../../common/RippleButton';
import HeaderNavigation from '../../common/HeaderNavigation';
import UpdateLessonScreen from './UpdateLessonScreen';
import Helper from '../../../utils/Helpers';
import parentService from '../../../services/parentService';
import { connect } from 'react-redux';
import { LoadingTransparent } from '../../common/LoadingScreen';
import { saveDataProplemsIdToUpdatePathwayAction } from '../../../actions/parentAction';
import HeaderParent from '../HeaderParent';


const screenSize = Dimensions.get('window');

class UpdatePathwayScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHideUpdateLessonScreen: true,
            lessonOfUser: [],
            isLoading: false,
        }
    }

    onChangePress() {
        this.setState({ isHideUpdateLessonScreen: false });
    }

    backCallback() {
        this.setState({
            isHideUpdateLessonScreen: true
        })
    }

    updatePathway() {
        if(this.props.data.length < 1) return;
        Helper.getTokenParent().then(token => {
            // const data = this.props.data;
            const idItem = this.props.idItem;
            const configId = this.props.configId;
            const userId = this.props.userId;
            this.setState({ isLoading: true })
            parentService.updatePathway({ token, configId, idItem, userId, dateStart }).then((reponse) => {
                alert('Cập nhật thành công!');
                this.setState({ isLoading: false })
                this.props.backCallback();
                this.props.removeProplemsIdCached({data:[]});
            })
        })
    }

    componentDidMount() {
        Helper.getTokenParent().then(token => {
            const userId = this.props.userId;
            const configId = this.props.configId;
            const idItem = this.props.idItem;
            parentService.getListLessonFollowPathwayById({ userId, configId, idItem, token }).then((data) => {
                this.setState({ lessonOfUser: data });
            });
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isHideUpdateLessonScreen && <View style={styles.root} >
                    {/* <HeaderNavigation title={`Cập nhật lộ trình môn - ${this.props.title}`} onPress={() => { this.props.backCallback() }} /> */}
                    {/* <HeaderNavigation title={'Cập nhật lộ trình môn - Toán -Lớp 2'} onPress={() => { this.props.backCallback(); }} bgColor='blue' color='#fff' /> */}
                    <HeaderParent displayName={`Chi tiết lộ trình - ${this.props.subjectName}`} leftCallback={()=>{this.props.backCallback()}}/>
                    <View style={styles.container}>
                        <Text style={{fontSize: 16, fontWeight: '800'}}>Bài học bé đang học - {(new Date(this.props.time * 1000)).toLocaleDateString()}</Text>
                        <View style={styles.wrapRow}>
                            <Text style={{fontSize: 16, fontWeight: '800'}}>{this.props.subjectName}</Text>
                            <RippleButton onPress={() => { this.setState({ isHideUpdateLessonScreen: false }) }} style={{ marginLeft: 40 }}>
                                <Text style={styles.changeLb}>Chi Tiết</Text>
                            </RippleButton>
                        </View>
                        {/* <RippleButton style={styles.btnUpdate} onPress={() => { this.updatePathway(); console.log('list ID: ', JSON.stringify(this.props.data)) }}>
                            <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold' }}>Cập nhật lộ trình</Text>
                        </RippleButton> */}
                    </View>
                </View>}
                {!this.state.isHideUpdateLessonScreen && <UpdateLessonScreen backCallback={this.backCallback.bind(this)} data={this.state.lessonOfUser} packageCode={this.props.packageCode} userId={this.props.userId} itemId={this.props.itemId} configId={this.props.configId} />}
                <LoadingTransparent isLoading={this.state.isLoading} bgColor='rgba(0,0,0,0.5)' />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.parent.proplemsId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeProplemsIdCached: (payload) => {
            dispatch(saveDataProplemsIdToUpdatePathwayAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePathwayScreen)

const styles = StyleSheet.create({
    root: {
        flex: 1,

    },
    container: {
        paddingTop: 40,
        flex: 1,
        paddingLeft: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    wrapRow: {
        paddingTop: 20,
        width: screenSize.width,
        flexDirection: 'row',
    },
    changeLb: {
        color: 'blue',
    },
    btnUpdate: {
        backgroundColor: 'blue',
        width: screenSize.width,
        height: 40,
        borderWidth: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 70
    }
})