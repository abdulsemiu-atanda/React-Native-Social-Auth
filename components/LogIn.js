import React, {Component} from 'react';
import {LoginManager} from 'react-native-fbsdk';
import {TouchableOpacity, Text, View} from 'react-native';
import {GoogleSignin} from 'react-native-google-signin';
import settings from '../private/data/settings.json'

export default class LogIn extends Component {
  componentDidMount() {
    this.setupGoogleSignin();
  }

  googleAuth() {
    GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
  }

  async setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: settings.iOSClientId,
        webClientId: settings.webClientId,
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      // this.setState({user});
    }
    catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          console.log('Login was successful with permissions: '
            + result.grantedPermissions.toString());
        }
      },
      function (error) {
        console.log('Login failed with error: ' + error);
      }
    );
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.fbAuth.bind(this)}>
          <Text>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.googleAuth.bind(this)}>
          <Text>Login with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
}