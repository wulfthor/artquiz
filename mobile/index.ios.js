
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighLight
} from 'react-native';

import Login from './sample';
import ViewContainer from './app/components/ViewContainer';
import StatusBarBackground from './app/components/StatusBarBackground';

const people = [
  {firstName:"kurt", lastName:"leigh", roomNumber:31},
  {firstName:"Bob", lastName:"leigh", roomNumber:31},
  {firstName:"Verner", lastName:"leigh", roomNumber:31}
  ]

  class SMKProject extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false
      }
      this.onLogin = this.onLogin.bind(this);
    }

    onLogin() {
      console.log('did it');
      this.setState({isLoggedIn:true});
      console.log("IS " + this.state);
    }
    render() {
      if(this.state.isLoggedIn){
        return (
          <ViewContainer>
            <StatusBarBackground />
            <Text style={{backgroundColor:'coral'}}>{'Hi from viewContainer'}</Text>
          </ViewContainer>
        );
      } else {
        return(
          <Login onLogin={this.onLogin} />
        );

      }
      return (
        <ViewContainer>
          <StatusBarBackground />
          <Text style={{backgroundColor:'coral'}}>{'Hi from viewContainer'}</Text>
          <Login onLogin={this.onLogin}> test
          </Login>
        </ViewContainer>
      );
    }
  }



const mystyle = StyleSheet.create({
  container: {
    flex:1
  }
})


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

AppRegistry.registerComponent('SMKProject', () => SMKProject);
