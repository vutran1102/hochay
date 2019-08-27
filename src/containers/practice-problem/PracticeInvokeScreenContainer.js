import { connect } from 'react-redux';
import PracticeInvokeScreen from '../../components/practice-invoke/PracticeInvokeScreen';
import { fetchPraticeRelateStartAction } from '../../actions/practiceAction';

const mapStateToProps = state => {
    return {
        listRelate: state.practice.listRelate
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPraticeRelateStart: (payload) => {
            dispatch(fetchPraticeRelateStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticeInvokeScreen);
