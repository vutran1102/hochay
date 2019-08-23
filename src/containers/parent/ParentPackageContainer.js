import { connect } from 'react-redux';
import ParentPackageScreen from '../../components/parent-science/ParentPackageScreen';
import { fetchPackageListStartAction, fethPackageInfoStartAction, addPackageByIDStartAction } from '../../actions/parentAction';


const mapStateToProps = state => {
    return {
        listPackage: state.package.listPackage,
        isLoading: state.package.isLoading,
        packageInfo: state.package.packageInfo,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPakageList: (payload) => {
            dispatch(fetchPackageListStartAction(payload));
        },
        fetchPackageInfo: (payload) => {
            dispatch(fethPackageInfoStartAction(payload));
        },
        addPackage: (payload) => {
            dispatch(addPackageByIDStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentPackageScreen);
