/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Login from './Components/index';
import UserRegister from './Components/UserRegister';
import CompanyRegister from './Components/CompanyRegister';
import UserView from './Components/UserView';
import CustomizeList from './Components/CustomizeList';

import CompanyView from './Components/CompanyView';

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  UserRegister: {screen: UserRegister},
  CompanyRegister: {screen: CompanyRegister},
  UserView: {screen: UserView},
  CompanyView: {screen: CompanyView},
  CustomizeList: {screen: CustomizeList}
});

const App = createAppContainer(MainNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }

});
export default App;
//AppRegistry.registerComponent('ribelzApp', () => App);