import { connect } from 'react-redux';
import ParentAcountScreen from '../../components/parent-account/ParentAcountScreen';
import { fetchAddChildStartAction, fetchUpdateChildStartAction, fetchRemoveChildStartAction } from '../../actions/authAction';

const mapStateToProps = state => {
    return {
        listChild: state.parent.listChild
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addSubuser: (payload) => {
            dispatch(fetchAddChildStartAction(payload));
        },
        updateSubuser: (payload) => {
            dispatch(fetchUpdateChildStartAction(payload));
        },
        removeSubUser: (payload) => {
            dispatch(fetchRemoveChildStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentAcountScreen);
