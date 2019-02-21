import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from 'react-native';
import Button from './common/Button';
import { TabViewAnimated, TabViewPage, TabBarTop } from 'react-native-tab-view';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Img from './common/background';

class CompanyRegister extends Component {
    static navigationOptions =
    {
      title: '',
      headerStyle: { backgroundColor: 'transparent', height: 0 }
    };
    constructor(props) {
      super(props);
    this.state = {
         companyName: '',
         password: '',
        
        
    };
  }
  onButtonPress() {
    const { companyName, password } = this.state;
    console.log("Working");
    //const { navigate } = this.props.navigation;
    // navigate('threeScreen', { Email: email,Password: password,Date: date,Date1: date1, Date2: date2,Name: name,Number: number });
    fetch('https://unconsidered-baths.000webhostapp.com/ribelz/companyRegister.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: companyName,
        password: password,
      })

    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      }).catch((error) => {
        Alert.alert(responseJson);
      });
}
  renderButton() {
    // if (this.state.loading) {
    //     return <Spinner size="small" spinnerStyle={styles.spinnerStyle} />;
    // }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Submit
          </Button>
    );

  }

    render(){
        return(
          <View style={styles.bGround}>
          <Img/>
          <View style={styles.regform}>
      
          <Text style={styles.header}>Company Registration</Text>
      
            <TextInput
            style={styles.textinput}
            placeholder="Enter Company name"
            placeholderTextColor="#ffffff"
            //underlineColorAndroid={'Transparent'}
            onChangeText={companyName => this.setState({ companyName })}
            value={this.state.companyName}
            />
      
          
             
              <TextInput
               style={styles.textinput}
                placeholder="Password"
                placeholderTextColor="#ffffff"
                //underlineColorAndroid={'Transparent'}
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                />
                 
     
     
     <View style={styles.buttonStyle}>
                            {this.renderButton()}
                        </View>
     
      
    
      {/* <Button
          title="Submit"
          onPress={this.nextPress.bind(this)}
          color="#e62739"
      /> */}
      
      </View>
          </View>
        
        );
    }
}
const styles = StyleSheet.create(
    {
    header: {
      fontSize: 24,
      color: '#fff',
      marginBottom: 40,
      paddingBottom: 10,
     borderBottomColor: '#199187',
     borderBottomWidth: 1,
    },
    regform: {
      alignSelf: 'stretch',
    },
    textinput: {
      alignSelf: 'stretch',
      color: '#fff',
      marginBottom: 30,
      paddingBottom: 10,
     borderBottomColor: '#f8f8f8',
     borderBottomWidth: 1,
   },
   buttonStyle: {
    marginTop: 20,
    // borderBottomWidth: 1,
    padding: 5,
    borderRadius: 60,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
   bGround: {
  flex: 1,
  paddingLeft: 60,
  paddingRight: 60,
  justifyContent: 'center',
  backgroundColor: '#e62739'
  }
  });
  

export default CompanyRegister;