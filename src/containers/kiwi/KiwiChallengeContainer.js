import { connect } from 'react-redux';
import KiwiChallengeScreen from '../../components/kiwi-challenge/KiwiChallengeScreen';

const mapStateToProps = state => {
    return {
        //Mokup state demo
        practiceInfo: state.practice.practiceInfo
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KiwiChallengeScreen);
