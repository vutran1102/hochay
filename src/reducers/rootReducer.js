import { combineReducers } from 'redux';
import navReducer from './navReducer';
import commonReducer from './commonReducer';
import practiceReducer from './practiceReducer';
import trophyReducer from './trophyReducer';
import examReducer from './examReducer';
import parentReducer from './parentReducer';
import userReducer from './userReducer';
import packageReducer from './packageReducer';

export default combineReducers({
  nav: navReducer,
  common: commonReducer,
  practice: practiceReducer,
  trophy: trophyReducer,
  exam: examReducer,
  parent: parentReducer,
  user: userReducer,
  package: packageReducer
});