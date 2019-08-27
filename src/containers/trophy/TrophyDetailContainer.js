import { connect } from 'react-redux';
import TropyDetailScreen from '../../components/trophy-detail/TropyDetailScreen';

const mapStateToProps = state => {
    return {
        displayName: state.user.displayName
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TropyDetailScreen);
