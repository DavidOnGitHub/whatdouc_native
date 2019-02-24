import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import MapView from './views/MapView';
import QuestionList from './components/QuestionList';
import Login from './views/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import SetPassword from './components/SetPassword';
import SetProfile from './components/SetProfile';
import AddQuestion from './views/AddQuestion';
import QuestionDetails from './views/QuestionDetails';

const appRoutes = createStackNavigator({
  Map: MapView,
  AddQuestion,
  QuestionDetails,
  QuestionList,
  Profile,
  Register,
  Activate: { screen: SetPassword, path: 'activate/:activationCode' },
  SetProfile,
});

const authRoutes = createStackNavigator({
  Login: { screen: Login }
});

export const Routes = createAppContainer(createSwitchNavigator({
  app: appRoutes,
  auth: authRoutes,
}, {
  initialRouteName: 'auth',
}));
