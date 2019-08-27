import { connect } from 'react-redux';
import HomeScreen from '../../components/main/HomeScreen';
import { fetchListSubjectStartAction, fetListGradeStartAction, createFirstChildAction ,fetchMissonByPackageCodeStudentStartAction} from '../../actions/commonAction';
import { makeRequestProfileAction } from '../../actions/userAction';
import { fetchListChildStartAction } from '../../actions/authAction';
import { makeRequestProfileParentAction, fetchFlashCardStartAction, fetchPackageListStartAction , getSaveParentAvatarStartAction } from '../../actions/parentAction';

const mapStateToProps = state => {
    return {
        listChild: state.user.listChild,
        listGrade: state.common.listGrade,
        displayName: state.user.displayName,
        email: state.user.Email,
        listSubject: state.common.listSubject,
        isLoadingSubject: state.common.isLoadingSubject,
        gradeId: state.user.gradeId,
        gender: state.user.gender,
        userId: state.user.userId,
        UserName: state.user.userName,
        birthday: state.user.birthday,
        isLoadingGrade: state.user.isLoadingGrade,
        displayNameParent: state.parent.displayName,
        phoneNumberParent: state.parent.phoneNumber,
        genderParent: state.parent.gender,
        emailParent: state.parent.email,
        birthdayParent: state.parent.birthday,
        userParentId: state.parent.userId,
        userParentName: state.parent.userName,
        nav: state.nav,
        dataMission: state.common.excerciseMission,
        listPackage: state.package.listPackage,
        uriParent: state.parent.parentUri,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        makeRequestProfileAction: (payload) => {
            dispatch(makeRequestProfileAction(payload));
        },
        makeRequestProfileParentAction: (payload) => {
            dispatch(makeRequestProfileParentAction(payload));
        },
        fetchListSubjectStart: (payload) => {
            dispatch(fetchListSubjectStartAction(payload));
        },
        fetchListGradeStart: (payload) => {
            dispatch(fetListGradeStartAction(payload));
        },
        makeRequestListChild: (payload) => {
            dispatch(fetchListChildStartAction(payload));
        },
        makeRequestFlashCard: (payload) => {
            dispatch(fetchFlashCardStartAction(payload));
        },
        fetchPakageList: (payload) => {
            dispatch(fetchPackageListStartAction(payload));
        },
        createChildAction: (payload) => {
            dispatch(createFirstChildAction(payload))
        },
        fetchMissonData: (payload) => {
            dispatch(fetchMissonByPackageCodeStudentStartAction(payload))
        },
        saveParentAvatar: (payload) => {
            dispatch(getSaveParentAvatarStartAction(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
