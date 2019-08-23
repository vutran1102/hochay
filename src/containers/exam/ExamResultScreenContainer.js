import { connect } from 'react-redux';
import ExamResultScreen from '../../components/exam-result/ExamResultScreen';
import { fetchTestDoneStartAction } from '../../actions/examAction';

const mapStateToProps = state => {
    return {
        testDone: state.exam.testDone,
        testId: state.exam.testInfo.testId,
        testName: state.exam.testInfo.nameTest,
        isLoadingResult: state.exam.isLoadingResult,
        userName: state.user.userName,
        displayName: state.user.displayName,
        nav: state.nav
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTestDone: (payload) => {
            dispatch(fetchTestDoneStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamResultScreen);
