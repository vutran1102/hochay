import { connect } from 'react-redux';
import ExamInfoScreen from '../../components/exam-info/ExamInfoScreen';
import { fetchListTestStartAction, fetchTestInfoStartAction } from '../../actions/examAction';

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

export default connect(mapStateToProps, mapDispatchToProps)(ExamInfoScreen);
