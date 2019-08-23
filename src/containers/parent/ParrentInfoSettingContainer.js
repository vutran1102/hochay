import { connect } from 'react-redux';
import ParentSettingTab from '../../components/parent-student/ParentSettingInfoTab';
import { makeRequestProfileParentAction, getSaveParentAvatarStartAction } from '../../actions/parentAction';

const mapStateToProps = state => {
    return {
        isCodePin: state.user.isCodePin,
        navigator: state.common.navigator,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        makeProfileUpdate: (payload) => {
            dispatch(makeRequestProfileParentAction(payload));
        },
        saveAvatarUriRedux: (payload) => {
            dispatch(getSaveParentAvatarStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentSettingTab);
