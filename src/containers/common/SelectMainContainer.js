import { connect } from 'react-redux';
import SelectMain from '../../components/common/SelectMain';

const mapStateToProps = state => {
    return {
        gradeId: state.user.GradeId,
        listGrade: state.common.listGrade,
    };
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectMain);
