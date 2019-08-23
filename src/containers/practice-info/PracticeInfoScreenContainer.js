import { connect } from 'react-redux';
import PracticeInfoScreen from '../../components/practice-info/PracticeInfoScreen';
import { fetchPraticeInfoStartAction } from '../../actions/practiceAction';

const mapStateToProps = state => {
    return {
        practiceInfo: state.practice.practiceInfo
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPracticeInfo: (payload) => {
            dispatch(fetchPraticeInfoStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticeInfoScreen);
