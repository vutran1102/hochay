import { connect } from 'react-redux';
import ParentChartScreen from '../../components/parent-statistical/ParentChartScreen';

const mapStateToProps = state => {
    return {
        listChild: state.parent.listChild
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentChartScreen);
