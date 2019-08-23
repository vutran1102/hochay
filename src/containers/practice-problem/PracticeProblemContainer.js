import { connect } from 'react-redux';
import PracticeProblemScreen from '../../components/practice-problem/PracticeProblemScreen';
import { fetchListProbelmHieByIdStartAction, fetchPraticeRecentStartAction } from '../../actions/practiceAction';

const mapStateToProps = state => {
    return {
        recent: state.practice.recent,
        problemHieryExerice: state.practice.problemHieryExerice,
        isLoadingProblemExerice: state.practice.isLoadingProblemExerice,
        problemexericeLength:state.practice.problemexericeLength
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPracticeRecent: (payload) => {
            dispatch(fetchPraticeRecentStartAction(payload));
        },
        fetchListProblemHieById: (payload) => {
            dispatch(fetchListProbelmHieByIdStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticeProblemScreen);
