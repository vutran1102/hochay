import { connect } from 'react-redux';
import ParentSettingScreen from '../../components/parent-setting/ParentSettingScreen';
import { makeRequestProfileParentAction } from '../../actions/parentAction';

const mapStateToProps = state => {
    return {
        isCodePin: state.user.isCodePin,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        makeProfileUpdate: (payload) => {
            dispatch(makeRequestProfileParentAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentSettingScreen);
