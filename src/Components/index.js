import React, { Component } from 'react';
import { Platform,TextInput, StyleSheet, Text,Picker,View,ScrollView,AppState,Icon,KeyboardAvoidingView, TouchableOpacity, Alert,Image  } from 'react-native';
import Button from './common/Button';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Img from './common/background';
import CardSection from './common/CardSection';
import PushNotification from 'react-native-push-notification';
import PushController from './common/PushController';
//import IconBadge from 'react-native-icon-badge';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {withBadge} from 'react-native-elements';
//import WithBadge from './common/WithBadge';

class UserProfile extends Component {
  // static navigationOptions = {
  //   title: '',
  // };
  
  constructor(props) {
    super(props);

    // this.handleAppStateChange = this.handleAppStateChange.bind(this);
    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {
        user_email: '', user_password: '',seconds: 5,BadgeCount:2
        //error: '', loading: false
    };
}
componentDidMount() {
  AppState.addEventListener('change', this.handleAppStateChange);
}
componentWillUnmount() {
  AppState.removeEventListener('change', this.handleAppStateChange);
}
handleAppStateChange(appState) {
  if (appState === 'background') {
    let date = new Date(Date.now() + (this.state.seconds * 1000));

    // if (Platform.OS === 'ios') {
    //   date = date.toISOString();
    // }

    PushNotification.localNotificationSchedule({
      message: "My Notification Message",
      date,
    });
  }
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
                        }
        }).catch((error) => {
            Alert.alert(responseJson);
        });  }
   // navigate('UserView');
    // const { navigate } = this.props.navigation;
    // navigate('twoScreen');

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
    //const BadgedIcon = WithBadge(1)(Icon);
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
             <View style={styles.pickerContainer}>
            <Picker
          style={styles.picker}
          selectedValue={this.state.seconds}
          onValueChange={(seconds) => this.setState({ seconds })}
        >
          <Picker.Item label="5"  value={5} />
          <Picker.Item label="10"  value={10} />
          <Picker.Item label="15"  value={15} />
</Picker>
<PushController/> 
</View>

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

class AdminProfile extends Component {


//   static navigationOptions = () =>  {
//     const BadgedIcon = withBadge(1)(Icon);
//     return {
//     //title: '',
    
//     tabBarLabel: "Empty",
//       tabBarIcon: ({ tintColor }) => 
// <React.Fragment>
//         <BadgedIcon
//          //name={`${Platform.OS === "ios" ? "ios" : "md"}-square-outline`}
//           type="ionicon"
//           color={tintColor}
//         />
//       </React.Fragment>
//     };
//   };
     // navigationOptions = {
     
      
    //   tabBarLabel: "Empty",
    //   tabBarIcon: ({ tintColor }) => WithBadge(
    //     <Icon
    //     //name={`${Platform.OS === "ios" ? "ios" : "md"}-square-outline`}
    //       type="ionicon"
    //       color={tintColor}
    //     />
    //   )(1)
      
    // }

  constructor(props) {
    super(props);

    // this.handleAppStateChange = this.handleAppStateChange.bind(this);
    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
        user_email: '', user_password: '',BadgeCount:2
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
    //const BadgedIcon = WithBadge(1)(Icon);
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
class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};
const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'AdminProfile') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    // We want to add badges to home tab icon
    IconComponent = HomeIconWithBadge;
  } else if (routeName === 'UserProfile') {
    iconName = `ios-options${focused ? '' : '-outline'}`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};
//const BadgedIcon = withBadge(1)(Icon);
const Login = createBottomTabNavigator({
 
   AdminProfile: { screen: AdminProfile
  //  navigationOptions = () =>  {
  //     const BadgedIcon = withBadge(1)(Icon);
  //     return {
  //     //title: '',
      
  //     tabBarLabel: "Empty",
  //       tabBarIcon: ({ tintColor }) => 
  
  //         <BadgedIcon
  //          //name={`${Platform.OS === "ios" ? "ios" : "md"}-square-outline`}
  //           type="ionicon"
  //           color={tintColor}
  //         />
        
  //     };
  //   }
  
  
  
  
  },
   //BadgedIcon = WithBadge(1)(Icon),
    // navigationOptions = {
     
      
    //   tabBarLabel: "Empty",
    //   tabBarIcon: ({ tintColor }) => WithBadge(
    //     <Icon
    //     //name={`${Platform.OS === "ios" ? "ios" : "md"}-square-outline`}
    //       type="ionicon"
    //       color={tintColor}
    //     />
    //   )(1)
      
    // }

  //   navigationOptions: () => ({
  //     tabBarIcon: ({tintColor}) =>
  //       <IconBadge
  //         MainElement={<Icon name='AdminProfile' size={22} color={tintColor} />}
  //         BadgeElement={<Text style={{ color: 'white' }}>5</Text>}
  //         //Hidden={this.state.BadgeCount === 0}
  //       />
  //   })
  
  
 
  UserProfile: { screen: UserProfile }
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
}

);
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
  picker: {
    width: 100,
 
},
  iconStyle: {
    height: 30,
    width: 30,
    marginRight: 30,
    marginLeft: 30
  },
  pickerContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
backgroundColor: '#F5FCFF',

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
