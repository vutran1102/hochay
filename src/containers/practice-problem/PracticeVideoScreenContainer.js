import { connect } from 'react-redux';
import VideoScreen from '../../components/videos/VideoScreen';
import { fetchPraticeVideoStartAction } from '../../actions/practiceAction';

const mapStateToProps = state => {
    return {
        videoPractice: state.practice.videoPractice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPraticeVideoStart: (payload) => {
            dispatch(fetchPraticeVideoStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);
