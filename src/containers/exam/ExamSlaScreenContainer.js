import { connect } from 'react-redux';
import ExamSlaScreen from '../../components/exam-sla/ExamSlaScreen';
import { fetchListTestStartAction } from '../../actions/examAction';

const mapStateToProps = state => {
    return {
        listTest: state.exam.listTest,
        isLoadingPage: state.exam.isLoadingPage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchListTestByPage: (payload) => {
            dispatch(fetchListTestStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamSlaScreen);
