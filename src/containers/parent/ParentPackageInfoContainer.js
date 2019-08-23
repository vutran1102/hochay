import { connect } from 'react-redux';
import ParentPackageInfoScreen from '../../components/parent-science/ParentPackageInfoScreen';
import { fethPackageInfoStartAction, addPackageByIDStartAction } from '../../actions/parentAction';

const mapStateToProps = state => {
    return {
        listChild: state.parent.listChild,
        packageInfo: state.package.packageInfo,
        isLoadingAddPackage: state.package.isLoadingAddPackage,
        isLoading: state.package.isLoading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPackageInfo: (payload) => {
            dispatch(fethPackageInfoStartAction(payload));
        },
        addPackage: (payload) => {
            dispatch(addPackageByIDStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentPackageInfoScreen);
