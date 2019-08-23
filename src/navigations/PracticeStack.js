import { StackNavigator } from 'react-navigation';
import transition from '../components/anim/Transition';

import PracticeStepScreen from '../containers/practice-steps/PracticeStepScreenContainer';
import PracticeProblemScreen from '../containers/practice-problem/PracticeProblemContainer';
import PracticeInfoScreen from '../containers/practice-info/PracticeInfoScreenContainer';
import PracticeLearnScreen from '../components/practice-learn/PracticeLearnScreen';
import PracticeInvokeScreenContainer from '../containers/practice-problem/PracticeInvokeScreenContainer';

const PracticeStack = StackNavigator({
    PracticeSteps: {
        screen: PracticeStepScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    PracticeProblem: {
        screen: PracticeProblemScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    PracticeInfo: {
        screen: PracticeInfoScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    PracticeLearn: {
        screen: PracticeLearnScreen,
        navigationOptions: { header: null, gesturesEnabled: false }
    },
    PracticeInvoke: {
        screen: PracticeInvokeScreenContainer,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
}, {
        header: null
    });

export default PracticeStack;