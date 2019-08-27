import { connect } from 'react-redux';
import ExamInfoDialog from '../../components/exam-sla/ExamInfoDialog';
import { fetchTestInfoStartAction } from '../../actions/examAction';

const mapStateToProps = state => {
    return {
        testInfo: state.exam.testInfo,
        isLoadingInfo: state.exam.isLoadingInfo
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTestInfo: (payload) => {
            dispatch(fetchTestInfoStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamInfoDialog);
