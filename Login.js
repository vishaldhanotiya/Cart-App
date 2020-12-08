import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Welcome',
    //Remove header
    header: null,
    //change header text color
    headerTintColor: 'blue',
    //Change Headerstyle(headerbackground width,shadow)
    headerStyle: {
      elevation: 0,
      backgroundColor: '#fff000',
      shadowOpacity: 0,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      emailaddress: '',
      password: '',
    };
  }

  _onPressButton() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var emailaddress = this.state.emailaddress;
    var password = this.state.password;

    if (reg.test(emailaddress) === false) {
      ToastAndroid.showWithGravity(
        'Please Enter Valid Email Address',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else if (password == '') {
      ToastAndroid.showWithGravity(
        'Please Enter Password ',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      const {navigate} = this.props.navigation;
      navigate('Home');

      ToastAndroid.showWithGravity(
        'Login Up Successfully ',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }

  _onPressSignUp() {
    const {navigate} = this.props.navigation;
    navigate('SignUp');
  }

  _onPressForget() {
    const {navigate} = this.props.navigation;
    navigate('Forget');
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.container}
          source={require('./img/wallpaper.png')}>
          <View style={{marginBottom: 50}}>
            <Image
              style={styles.logoBackground}
              source={{
                uri:
                  'http://www.clker.com/cliparts/e/7/c/6/Y/L/shopping-cart-hi.png',
              }}
            />
            <Text style={styles.logoText}>React Native Market</Text>
          </View>

          <View style={styles.inputView}>
            <Image
              style={styles.imagePlaceholder}
              source={require('./img/username.png')}></Image>
            <TextInput
              onChangeText={(emailaddress) => this.setState({emailaddress})}
              maxLength={50}
              style={styles.inputText}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              placeholder="Email"></TextInput>
          </View>

          <View style={styles.inputView}>
            <Image
              style={styles.imagePlaceholder}
              source={require('./img/password.png')}></Image>
            <TextInput
              onChangeText={(password) => this.setState({password})}
              style={styles.inputText}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              placeholder="Password"
              secureTextEntry={true}></TextInput>
          </View>

          <View
            onPress={this._onPressButton.bind(this)}
            style={styles.buttonStyle}>
            <TouchableOpacity
              style={{width: 320, alignItems: 'center'}}
              onPress={this._onPressButton.bind(this)}>
              <Text
                onPress={this._onPressButton.bind(this)}
                style={{color: 'white', alignItems: 'center', margin: 5}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.check}>
            <TouchableOpacity
              onPress={this._onPressForget.bind(this)}
              style={{width: 300, alignItems: 'center'}}>
              <Text style={{color: 'white', alignItems: 'center', margin: 5}}>
                Forget Password ?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.check}>
            <TouchableOpacity
              onPress={this._onPressSignUp.bind(this)}
              style={{width: 300, alignItems: 'center'}}>
              <Text
                style={{color: 'white', alignItems: 'center', marginTop: 18}}>
                Sign Up{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  imagePlaceholder: {
    alignSelf: 'center',
    width: 30,
    marginLeft: 15,
    height: 30,
  },

  inputText: {
    width: 350,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },

  buttonStyle: {
    margin: 10,
    width: 320,
    borderRadius: 20,
    backgroundColor: '#e336d8',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
  },

  inputView: {
    marginTop: 10,
    width: 320,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 45,
  },

  check: {
    margin: 10,
    width: 320,
    alignSelf: 'center',
    alignItems: 'center',
    height: 45,
  },

  logoBackground: {
    width: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
    height: 100,
  },

  logoText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

AppRegistry.registerComponent('Login', () => Login);
