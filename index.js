import { AppRegistry, YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', '']);
import App from './src/App';

AppRegistry.registerComponent('hochay_newVersion', () => App);
