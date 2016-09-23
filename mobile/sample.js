'use strict';

import React, { Component } from 'react';
import buffer from 'buffer';
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ActivityIndicatorIOS,
  TouchableHighlight

} from 'react-native';

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    }
  }

  render() {
    var errCtrl = <View />
    if(!this.state.success && this.state.badCredentials) {
      errCtrl = <Text style={styles.error}>
        That username and / or password is wrong
      </Text>
    }
    if(!this.state.success && this.state.unknowError) {
      errCtrl = <Text style={styles.error}>
        We have an unexpted error
      </Text>
    }
    return (
      <View style={styles.container}>
      <Image
      style={styles.logo}
      source={{uri:'https://bootstrapbay.com/blog/wp-content/uploads/2014/05/unslpash-desert-road_uvsq5s.png'}}
      />
      <Text style={styles.heading}> SMK Browser</Text>
      <TextInput
        onChangeText={(text) => this.setState({username: text})}
        style={styles.input}
        placeholder="SMKs username"
        />

      <TextInput
        onChangeText={(text) => this.setState({password: text})}
        secureTextEntry={true}
        style={styles.input}
        placeholder="SMK password" />
      <TouchableHighlight
        onPress={this.onLoginPressed.bind(this)}
        style={styles.button}>
        <Text style={styles.buttonText}>
        Log in
        </Text>
        </TouchableHighlight>
        {errCtrl}
        <ActivityIndicatorIOS
          animating={this.state.showProgress}
          size="large"
          style={styles.loader}
          />
      </View>
    );
  }
  onLoginPressed(){
    console.log('Try ' + this.state.username)
    this.setState({showProgress: true});
    var authService = require('./AuthService');
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, (results)=> {
      this.setState(Object.assign({
        showProgress: false
      }, results));
      console.log(results.success);
      if(results.success && this.props.onLogin) {
        console.log(this.props);
         this.props.onLogin()
      }
    });
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width:66,
    height:55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 4,
    padding: 4,
    fontSize:18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop:10
  },
  error: {
    color: 'red'
  }
})

module.exports = Login;
