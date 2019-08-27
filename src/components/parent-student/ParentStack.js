import { StackNavigator} from 'react-navigation';
import StudentList from '../../containers/parent-student/StudentListContainer';
import StudentPage from './StudentPage';
const Appstack = StackNavigator({
    Student: {
        screen: StudentList,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    },
    StudentInfo: {
        screen: StudentPage,
        navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
    }
})

export default Appstack;