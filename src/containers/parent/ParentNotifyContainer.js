import { connect } from 'react-redux';
import ParentNotifyScreen from '../../components/parent-notify/ParentNotifyScreen';
import { fetchParentNotifyStartAction } from '../../actions/parentAction';

const mapStateToProps = state => {
    return {
        dataNotify: state.parent.dataNotify
    };
}

const mapDispatchToProps = dispatch => {
    return {
        makeRequestNotify: (payload) => {
            dispatch(fetchParentNotifyStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentNotifyScreen);
