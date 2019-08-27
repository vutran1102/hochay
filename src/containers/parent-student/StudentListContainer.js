import { connect } from 'react-redux';
import StudentList from '../../components/parent-student/StudentListScreen';
import {saveStackNavigatorAction } from '../../actions/commonAction';
import { getNotificationsStartAction } from '../../actions/parentAction';

const mapStateToProps = state => {
    return {
        userName: state.user.userName,
        gradeId: state.user.GradeId,
        listChild: state.parent.listChild,
        isCreateChild: state.common.isCreateChild,
        displayName: state.parent.displayName,
        gender: state.parent.gender,
        parentAvatarRedux: state.parent.parentUri,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveStackNavigator: (payload) => {
            dispatch(saveStackNavigatorAction(payload))
        },
        fetchNotiListData: (payload) => {
            dispatch(getNotificationsStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
