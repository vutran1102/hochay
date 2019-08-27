import { connect } from 'react-redux';
import ParentStatisticalScreen from '../../components/parent-statistical/ParentStatisticalScreen';

const mapStateToProps = state => {
    return {
        userName: state.user.UserName,
        gradeId: state.user.GradeId,
        listChild: state.parent.listChild
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentStatisticalScreen);
