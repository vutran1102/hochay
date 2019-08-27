import { SwitchNavigator } from 'react-navigation';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import SplashScreenContainer from '../containers/splash/SplashScreenContainer';
import Orientation from 'react-native-orientation';

Orientation.lockToLandscape();


const RootAppNavigator = SwitchNavigator(
    {
        AuthLoading: SplashScreenContainer,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default RootAppNavigator;