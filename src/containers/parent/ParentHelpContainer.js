import { connect } from 'react-redux';
import ParentHelpScreen from '../../components/parent-help/ParentHelpScreen';
import { fetchFlashCardStartAction } from '../../actions/parentAction';

const mapStateToProps = state => {
    return {
        listFlashCardVideo: state.parent.listFlashCardVideo,
        isLoadingHelp: state.parent.isLoadingHelp
    };
}

const mapDispatchToProps = dispatch => {
    return {
        makeRequestFlashCard: (payload) => {
            dispatch(fetchFlashCardStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentHelpScreen);
