import { connect } from 'react-redux';
import MissionModal from '../../components/mission/MissionModal';

const mapStateToProps = state => {
    return {
        //Mokup state demo
        practiceInfo: state.practice.practiceInfo,
        dataMission: state.common.excerciseMission
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MissionModal);
