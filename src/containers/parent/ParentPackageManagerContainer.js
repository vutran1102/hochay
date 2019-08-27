import { connect } from 'react-redux';
import ParentPackageManagerScreen from '../../components/parent-science/ParentPackageManagerScreen';
import { fetchPackageByidStartAction, delPackageByIDStartAction } from '../../actions/parentAction';

const mapStateToProps = state => {
    return {
        listChild: state.parent.listChild,
        listPackageUser: state.package.listPackageUser
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getPackageById: (payload) => {
            dispatch(fetchPackageByidStartAction(payload));
        },
        deletePackageUser: (payload) => {
            dispatch(delPackageByIDStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentPackageManagerScreen);
