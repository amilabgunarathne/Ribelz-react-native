import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Button from './common/Button';
import { TabViewAnimated, TabViewPage, TabBarTop } from 'react-native-tab-view';

class Advert extends Component {
 
    static navigationOptions =
    {
      title: '',
      //headerStyle: { backgroundColor: 'transparent', height: 0 }
    };

     

    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
          </View>
        );
    }
}

export default Advert;