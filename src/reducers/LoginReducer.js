import firebase from 'react-native-firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

initialState = {
    usr: "",
    pass: "",
    user: null,

    toRegister: false
}

const config = {
    apiKey: 'AIzaSyCzXOqCcFl-_jSg9T0sV_j3lcqx8G-Hseo',
    authDomain: 'https://brdoc-b3d40.firebaseapp.com/',
    databaseURL: 'https://brdoc-b3d40.firebaseio.com/'

}

const tryLogEmail = (usr, pass) => {
    if (usr !== "" && pass !== "") {
        const user = firebase.auth().signInAndRetrieveDataWithEmailAndPassword(usr, pass).catch(
            function (error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
        return user

    } else {
        alert('Wrong password.');
    }
}

const tryLogFB = async () => {
    try{
        const result = await LoginManager.logInWithReadPermissions(['email', 'public_profile']);
        const tokenData = await AccessToken.getCurrentAccessToken();
        const token = await tokenData.accessToken.toString();
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);
        const user = await firebase.auth().signInAndRetrieveDataWithCredential(credential)
        return user;
    } catch(error) {
        alert(error)
    }
}

const LoginReducer = (state = initialState, action) => {
    let user = null;
    switch (action.type) {

        case "LOGON_EMAIL":
            user = tryLogEmail(action.usr, action.pass);
            state = {
                ...state,
                user: user,
            }
            break;

        case "LOGON_FB":
            user = tryLogFB();
            state = {
                ...state,
                user: user,
            }
            break;

        case "REGISTER":
            state = {
                ...state,
                toRegister: true,
            }
    };
    return state;
}


export default LoginReducer;