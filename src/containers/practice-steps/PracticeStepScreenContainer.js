import { connect } from 'react-redux';
import PracticeStepScreen from '../../components/practice-steps/PracticeStepScreen';
import { fetchListProbelmHierachyStartAction, fetchKiwiSuggestStartAction } from '../../actions/practiceAction';

const mapStateToProps = state => {
    return {
        listProblemHierachy: state.practice.listProblemHierachy,
        isLoadingProblemHiarachy: state.practice.isLoadingProblemHiarachy,
        listKiwiSuggest: state.practice.kiwiSuggest
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchListProblemHierachy: (payload) => {
            dispatch(fetchListProbelmHierachyStartAction(payload));
        },
        fetchListKiwiSuggest: (payload) => {
            dispatch(fetchKiwiSuggestStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticeStepScreen);
