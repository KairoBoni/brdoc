import firebase from 'react-native-firebase';
import {NavigationActions} from 'react-navigation';
import AppStackNavigator from '../utils/router';

initialState =  AppStackNavigator.router.getStateForAction(NavigationActions.init());;

const SearchReducer = (state = initialState, action) => {
    const nextState = AppStackNavigator.router.getStateForAction(action, state);
    return nextState || staste;
}


export default SearchReducer;