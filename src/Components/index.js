import React, { Component } from 'react';
import { Platform,TextInput, StyleSheet, Text, View,ScrollView,KeyboardAvoidingView, TouchableOpacity, Alert,Image  } from 'react-native';
import Button from './common/Button';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Img from './common/background';
import CardSection from './common/CardSection';


class UserProfile extends Component {
  constructor(props) {
    super(props);

    // this.handleAppStateChange = this.handleAppStateChange.bind(this);
    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
        user_email: '', user_password: '',
        //error: '', loading: false 
    };
}
  // static navigationOptions =
  // {
  //   title: '',
  //   headerStyle: { backgroundColor: 'transparent', height: 0 }
  // };
  onButtonPress() {
    console.log("Working");
    const { navigate } = this.props.navigation;
    //navigate('homePage1');
    fetch('https://unconsidered-baths.000webhostapp.com/ribelz/login.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.state.user_email,
            password: this.state.user_password
        })

    }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson === 'Data Matched') {

                //Then open Profile activity and send user email to profile activity.
                navigate('UserView', { email: this.state.user_email });
                // this.setState({ loading: false });

            }
            else {
                Alert.alert(responseJson);
                // this.setState({ loading: false });
            }
        }).catch((error) => {
            Alert.alert(responseJson);
        });
   // navigate('UserView');
    // const { navigate } = this.props.navigation;
    // navigate('twoScreen');
  }
  onButtonPress1() {
    
    const { navigate } = this.props.navigation;
    navigate('UserRegister');
}

  renderButton() {
    // if (this.state.loading) {
    //     return <Spinner size="small" spinnerStyle={styles.spinnerStyle} />;
    // }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
          </Button>
    );

  }
  renderButton1() {
    // if (this.state.loading) {
    //     return <Spinner size="small" spinnerStyle={styles.spinnerStyle} />;
    // }

    return (
      <Button onPress={this.onButtonPress1.bind(this)}>
        Sign up
          </Button>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Img />
        <ScrollView keyboardShouldPersistTaps='always'>
          <KeyboardAvoidingView behavior="padding" enabled>
            {/* <View style={styles.containerStyle2}>
                      <Image source={require('./pics/background.jpg')} style={styles.imageStyle} />
                  </View> */}
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Ribelz Jobs User Profile</Text>
            </View>
            <CardSection style={styles.containerStyle}>
              <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./pics/user.png')} style={styles.iconStyle} />
              </View>
              <TextInput
                ref="1"
                placeholder="Username"
                // placeholderTextColor="#fff"
                onChangeText={user_email => this.setState({ user_email })}
                value={this.state.user_email}
                style={styles.inputStyle}
                underlineColorAndroid='transparent'
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => this.focusNextField('2')}
              />
            </CardSection>
            <CardSection style={styles.containerStyle}>
              <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./pics/pwd.png')} style={styles.iconStyle} />
              </View>
              <TextInput
                ref="2"
                secureTextEntry
                placeholder="Password"
                // placeholderTextColor="#fff"
                autoCorrect={false}
                onChangeText={user_password => this.setState({ user_password })}
                value={this.state.user_password}
                style={styles.inputStyle}
                underlineColorAndroid='transparent'
                blurOnSubmit={true}
                returnKeyType="done"
              />
            </CardSection>
            <Text style={styles.errorStyle}>
              {this.state.error}
            </Text>
            <View style={styles.buttonStyle}>
              {this.renderButton()}
            </View>
            <View style={styles.buttonStyle}>
              {this.renderButton1()}
            </View>
            {/* <View style={styles.buttonStyle}>
              {this.renderButton2()}
            </View> */}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

class AdminProfile extends Component {
  constructor(props) {
    super(props);

    // this.handleAppStateChange = this.handleAppStateChange.bind(this);
    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
        user_email: '', user_password: '',
        //error: '', loading: false 
    };
}
  // static navigationOptions =
  // {
  //   title: '',
  //   headerStyle: { backgroundColor: 'transparent', height: 0 }
  // };
  onButtonPress() {
    const { navigate } = this.props.navigation;
    fetch('https://unconsidered-baths.000webhostapp.com/ribelz/companylogin.php', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          companyName: this.state.user_email,
          password: this.state.user_password
      })

  }).then((response) => response.json())
      .then((responseJson) => {
          if (responseJson === 'Data Matched') {

              //Then open Profile activity and send user email to profile activity.
              navigate('CompanyView', { COMPANYNAME: this.state.user_email });
              // this.setState({ loading: false });

          }
          else {
              Alert.alert(responseJson);
              // this.setState({ loading: false });
          }
      }).catch((error) => {
          Alert.alert(responseJson);
      });
    
  }
  onButtonPress1() {
    console.log("Working");
    const { navigate } = this.props.navigation;
    navigate('CompanyRegister');
}

  renderButton() {
    // if (this.state.loading) {
    //     return <Spinner size="small" spinnerStyle={styles.spinnerStyle} />;
    // }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
          </Button>
    );

  }
  renderButton1() {
    // if (this.state.loading) {
    //     return <Spinner size="small" spinnerStyle={styles.spinnerStyle} />;
    // }

    return (
      <Button onPress={this.onButtonPress1.bind(this)}>
        Sign up
          </Button>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Img />
        <ScrollView keyboardShouldPersistTaps='always'>
          <KeyboardAvoidingView behavior="padding" enabled>
          {/* <View style={styles.containerStyle2}>
                      <Image source={require('./pics/background.jpg')} style={styles.imageStyle} />
                  </View> */}
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Ribelz Jobs Company Profile</Text>
            </View>
            <CardSection style={styles.containerStyle}>
              <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./pics/user.png')} style={styles.iconStyle} />
              </View>
              <TextInput
                ref="1"
                placeholder="Company name"
                // placeholderTextColor="#fff"
                onChangeText={user_email => this.setState({ user_email })}
                value={this.state.user_email}
                style={styles.inputStyle}
                underlineColorAndroid='transparent'
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => this.focusNextField('2')}
              />
            </CardSection>
            <CardSection style={styles.containerStyle}>
              <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./pics/pwd.png')} style={styles.iconStyle} />
              </View>
              <TextInput
                ref="2"
                secureTextEntry
                placeholder="Password"
                // placeholderTextColor="#fff"
                autoCorrect={false}
                onChangeText={user_password => this.setState({ user_password })}
                value={this.state.user_password}
                style={styles.inputStyle}
                underlineColorAndroid='transparent'
                blurOnSubmit={true}
                returnKeyType="done"
              />
            </CardSection>
            <Text style={styles.errorStyle}>
              {this.state.error}
            </Text>
            <View style={styles.buttonStyle}>
              {this.renderButton()}
            </View>
            <View style={styles.buttonStyle}>
              {this.renderButton1()}
            </View>
            {/* <View style={styles.buttonStyle}>
              {this.renderButton2()}
            </View> */}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const Login = createBottomTabNavigator({
  AdminProfile: { screen: AdminProfile },
  UserProfile: { screen: UserProfile }
});
export default createAppContainer(Login);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    // borderBottomColor: 'transparent'
    // backgroundColor: 'red',
    // width: '100%'
  },
  containerStyle2: {
    marginTop: 10,
    marginLeft:50,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
},
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  iconStyle: {
    height: 30,
    width: 30,
    marginRight: 30,
    marginLeft: 30
  },
  containerStyle: {
    marginTop: 50,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  imageStyle: {
    height: 85,
    width: 60
  },
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
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
  spinnerStyle: {
    flex: 1,
    backgroundColor: 'rgba(253, 197, 24, 0.8)',
    alignSelf: 'stretch',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 60,
    paddingTop: 10,
    paddingBottom: 10
  }


});