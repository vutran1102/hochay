import { StackNavigator } from 'react-navigation';
import transition from '../components/anim/Transition';
import SignIn from '../components/auth/LoginAllScreen';
import Forgot from '../components/auth/ForgotPasswordScreen';
import SignUpWithPhoneScreen from '../components/auth/SignUpWithPhoneScreen';
import SignUpAPISceen from '../components/auth/SignUpAPIScreen';
import CreateKidScreen from '../components/auth/CreateKidScreen';
// import PushNotificationScreen from '../components/auth/PushNotifyScreen';

const AuthStack = StackNavigator({
    // Push: {
    //     screen: PushNotificationScreen
    // },
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            header: null
        }
    },
    SignUp: {
        screen: SignUpWithPhoneScreen,
        navigationOptions: {
            header: null
        }
    },
    SignUpAPI: {
        screen: SignUpAPISceen,
        navigationOptions: {
            header: null
        }
    },
    CreateKids: {
        screen: CreateKidScreen,
        navigationOptions: {
            header: null
        }
    },
    Forgot: {
        screen: Forgot,
        navigationOptions: {
            header: null
        }
    }
}, transition);

export default AuthStack;
