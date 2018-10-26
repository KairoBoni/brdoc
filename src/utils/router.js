import Login from '../components/Login';
import Doctor from '../components/Doctor';
import Register from '../components/Register';
import Search from '../components/Search';
import { createStackNavigator } from 'react-navigation'

export default AppStackNavigator = createStackNavigator(
  {
    LoginScreen: Login,
    DoctorScreen: Doctor,
    RegisterScreen: Register,
    SearchScreen: Search,
  },

  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
)