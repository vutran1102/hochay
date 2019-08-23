import { StackNavigator } from 'react-navigation';
import HomeScreen from '../containers/main/HomeScreenContainer';
import PracticeStepScreen from '../containers/practice-steps/PracticeStepScreenContainer';
import PracticeProblemScreen from '../containers/practice-problem/PracticeProblemContainer';
import PracticeInfoScreen from '../containers/practice-info/PracticeInfoScreenContainer';
import PracticeLearnScreen from '../components/practice-learn/PracticeLearnScreen';
import PracticeInvokeScreenContainer from '../containers/practice-problem/PracticeInvokeScreenContainer';
import ExamSlaScreen from '../containers/exam/ExamSlaScreenContainer';
import ExamInfoScreen from '../containers/exam/ExamInfoScreenContainer';
import ExamResultScreen from '../containers/exam/ExamResultScreenContainer';
import ExamLearnScreen from '../components/exam-learn/ExamLearnScreen';
import ExamAnswerScreen from '../components/exam-answer/ExamAnswerScreen';
import ExamNumeralScreen from '../components/exam-numeral/ExamNumeralScreen';
import KiwiExamScreen from '../components/kiwi-exam/KiwiExamScreen';
import KiwiChallengeScreen from '../containers/kiwi/KiwiChallengeContainer';
import VideoScreen from '../containers/practice-problem/PracticeVideoScreenContainer';
import SettingScreen from '../components/settings/SettingScreen';
import ParentAccountScreen from '../containers/parent/ParentAccountContainer';
import ParentStatisticalScreen from '../containers/parent/ParentStatisticalScreenContainer';
import ParentSettingScreen from '../containers/parent/ParentSettingContainer';
import ParentChartContainer from '../containers/parent/ParentChartContainer';
import ParentHelpScreen from '../containers/parent/ParentHelpContainer';
import ParentNotifyContainer from '../containers/parent/ParentNotifyContainer';
import ParentProgramScreen from '../components/parent-program/ParentProgramScreen';
import TrophyDetailContainer from '../containers/trophy/TrophyDetailContainer';
import transition from '../components/anim/Transition';
import ParentInfoScreen from '../components/parent-info/ParentInfoScreen';
import ParentPackageContainer from '../containers/parent/ParentPackageContainer';
import ParentPackageInfoContainer from '../containers/parent/ParentPackageInfoContainer';
import ParentPackageManagerContainer from '../containers/parent/ParentPackageManagerContainer';
import ProblemInfo from '../components/practice-problem/ProblemInfo';
import BottomTab from '../components/parent-student/BottomTabNavigatorParent';


const AppStack = StackNavigator({
    App: {
        screen: HomeScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    //Practice
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
    //Exam
    ExamSla: {
        screen: ExamSlaScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ExamInfo: {
        screen: ExamInfoScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ExamLearn: {
        screen: ExamLearnScreen,
        navigationOptions: { header: null, gesturesEnabled: false }
    },
    ExamResult: {
        screen: ExamResultScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ExamAnswer: {
        screen: ExamAnswerScreen,
        navigationOptions: { header: null, gesturesEnabled: false }
    },
    ExamNumeral: {
        screen: ExamNumeralScreen,
        navigationOptions: { header: null, gesturesEnabled: false }
    },
    //Kiwi
    KiwiChallenge: {
        screen: KiwiChallengeScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    KiwiExam: {
        screen: KiwiExamScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    //Trophy
    Trophy: {
        screen: TrophyDetailContainer,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    //Video
    Video: {
        screen: VideoScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    //Parent
    Settings: {
        screen: SettingScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ParentAccount: {
        screen: ParentAccountScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ParentScience: {
        screen: ParentPackageContainer,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ParentPackageInfo:{
        screen: ParentPackageInfoContainer,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ParentPackageManager:{
        screen: ParentPackageManagerContainer,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ParentStatistical: {
        screen: ParentStatisticalScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ParentChart: {
        screen: ParentChartContainer,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ParentProgram: {
        screen: ParentProgramScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ParentHelp: {
        screen: ParentHelpScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ParentNotify: {
        screen: ParentNotifyContainer,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ParentSetting: {
        screen: ParentSettingScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    },
    ParentInfo: {
        screen: ParentInfoScreen,
        navigationOptions: { header: null, gesturesEnabled: true }
    }, 
    TabBottom: {
        screen: BottomTab,
        navigationOptions: { header: null, gesturesEnabled: false}
    }
}, transition);

export default AppStack;