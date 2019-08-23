import { connect } from 'react-redux';
import SplashScreen from '../../components/splash/SplashScreen';
import { fetchListSubjectStartAction } from '../../actions/commonAction';

const mapStateToProps = state => {
    return {
       
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchListSubjectStart: (payload) => {
            dispatch(fetchListSubjectStartAction(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
