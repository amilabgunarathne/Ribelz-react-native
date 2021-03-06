import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, AppState, TouchableOpacity, Image, Alert, FlatList, RefreshControl, ScrollView, Linking } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Button from './common/Button';
import { TabViewAnimated, TabViewPage, TabBarTop } from 'react-native-tab-view';
import axios from 'axios';
import CustomizeList from './CustomizeList';
import card from './common/Card';
import Img from './common/background';
import Card from './common/Card';
import Modal from "react-native-modal";
import PushController from './common/PushController';
import PushNotification from 'react-native-push-notification';
import IconBadge from 'react-native-icon-badge';


class UserView extends Component {
  static navigationOptions =
    {
      title: '',
      headerStyle: { backgroundColor: 'transparent', height: 0 }
    };

  state = {
    scrollEnabled: true,
    data: [],
    isModalVisible: false,
    refreshing: false,
    BadgeCount:2
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillMount() {
    this.fetchData();

  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  handleAppStateChange(appState) {
    if (appState === 'background') {
      let date = new Date(Date.now());

      // if (Platform.OS === 'ios') {
      //   date = date.toISOString();
      // }

      PushNotification.localNotificationSchedule({
        message: "My Notification Message",
        date,
      });
    }
  }
  renderButton() {

    return (
      <Button onPress={this.logoutPress.bind(this)}>
        logout
          </Button>
    );

  }
  // renderWeb() {
  //   const goBack = () =>
  //   {
  //       this.props.navigation.goBack()
  //   }
  //   return (
  //     <View style={{paddingTop:20, flex:1}}>
  //     <Webbrowser
  //         url="https://facebook.github.io/react-native/docs/"
  //         hideHomeButton={false}
  //         hideToolbar={false}
  //         hideAddressBar={false}
  //         hideStatusBar={true}
  //         backButtonVisible={true}
  //         onBackPress= {() => {goBack()}}
  //         foregroundColor="#D61B5D"
  //         backgroundColor="#F3848A"
  //     />

  // </View>
  //   );

  // }
  // _toggleModal = () =>
  //   this.setState({ isModalVisible: !this.state.isModalVisible });
  // goToNextScreen(){
  //   console.log("work");
  // //   <WebView
  // //   source={{uri: 'https://github.com/facebook/react-native'}}
  // //   style={{marginTop: 20}}
  // // />
  //   // const { navigate } = this.props.navigation;
  //   // navigate('CustomizeList');

  // }
  fetchData = async () => {
    const response = await fetch("https://unconsidered-baths.000webhostapp.com/ribelz/list.php");
    const json = await response.json();
    this.setState({ data: json.results });
  };
  //  renderAlbums() {
  //    return this.state.albums.map(results=>
  //     <CustomizeList key={album.id} album={album}/>);
  //  }
  logoutPress() {

    fetch('https://unconsidered-baths.000webhostapp.com/ribelz/logout.php')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.results[0]);
        if (responseJson === 'NULL') { 
        }
      }).catch((error) => {
        // console.error(error);
        // Alert.alert(error);
        Alert.alert("No internet connection");
        // this.setState({ loading: false });
      });
  }
  _onRefresh() {
    this.setState({ refreshing: true });
    this.fetchData().then(() => {
      <PushController />
      this.setState({ refreshing: false })
    });
  }
  // touchablePress(){
  //   let path = item.image;
  //   const { navigate } = this.props.navigation;
  //   navigate('customizeList', {picture: path });
  // }
  // renderListItem = ({ item }) => (
  //      <View style={{ flex: 1,paddingLeft:10,paddingRight:10,paddingTop:10 }}>

  //   {/* <TouchableOpacity style={styles.linkStyle} onPress= { () => Linking.openURL(item.image)} > */}
  //   <TouchableOpacity style={styles.linkStyle} onPress= {()=> navigate('customizeList',{picture:item.image})} >
  //     <View style={{ width: '70%', height: 70, alignItems: 'flex-start',  flexDirection: 'column' }}>
  //       <View style={{
  //         width: '80%', height: 50, alignItems: 'flex-start', justifyContent: 'center',
  //       }} >
  //         <Text style={styles.textStyle1}>{item.post}</Text>
  //         <Text style={styles.textStyle1}>{item.description}</Text>
  //                 </View>
  //       <View style={{ width: '80%', height: 20, alignItems: 'flex-start', flexDirection: 'row' }}>
  //         <Text style={styles.textStyle2}>{item.company_name}</Text>
  //         <View style={styles.dateStyle}>
  //         <Text style={styles.textStyle2}>{item.exp}</Text>
  //         </View>
  //       </View>
  //     </View>
  //     <View style={styles.thumbnailViewStyle}>
  //           <Image
  //         style={styles.thumbnailStyle}
  //         source={{uri: item.image}}
  //       />
  //         </View>
  //     <View style={styles.iconViewStyle}>
  //           <Image
  //         style={styles.iconStyle}
  //         source={require('./pics/right-arrow.png')}
  //       />
  //         </View>
  //         </TouchableOpacity>
  //   </View>  )
  //   <View style={{flex=1}}>
  //   <Modal isVisible={this.state.isModalVisible}>
  // <View style={{ flex: 1 }}>
  //     <Text>Hello!</Text>
  //
  //     <TouchableOpacity onPress={this._toggleModal}>
  //       <Text>Hide me!</Text>
  //     </TouchableOpacity>
  //     </View>
  // </Modal>
  // </View>
  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.bGround}>
        <Img />

        <View>
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => i}
            // renderItem={this.renderListItem}
            renderItem={({ item }) =>
              <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>

                {/* <TouchableOpacity style={styles.linkStyle} onPress= { () => Linking.openURL(item.image)} > */}
                <TouchableOpacity style={styles.linkStyle} onPress={() => navigate('CustomizeList', { item })} >
                  <View style={{ width: '70%', height: 70, alignItems: 'flex-start', flexDirection: 'column' }}>
                    <View style={{
                      width: '80%', height: 50, alignItems: 'flex-start', justifyContent: 'center',
                    }} >
                      <Text style={styles.textStyle1}>{item.post}</Text>
                      <Text style={styles.textStyle1}>{item.description}</Text>
                    </View>
                    <View style={{ width: '80%', height: 20, alignItems: 'flex-start', flexDirection: 'row' }}>
                      <Text style={styles.textStyle2}>{item.company_name}</Text>
                      <View style={styles.dateStyle}>
                        <Text style={styles.textStyle2}>{item.exp}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.thumbnailViewStyle}>
                    <Image
                      style={styles.thumbnailStyle}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <View style={styles.iconViewStyle}>
                    <Image
                      style={styles.iconStyle}
                      source={require('./pics/right-arrow.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            }
            scrollEnabled={this.state.scrollEnabled}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          />
          {/* {this.renderAlbums()} */}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
          <IconBadge
            MainElement={
              <View style={{
                backgroundColor: '#489EFE',
                width: 50,
                height: 50,
                margin: 6
              }} />
            }
            BadgeElement={
              <Text style={{ color: '#FFFFFF' }}>{this.state.BadgeCount}</Text>
            }
            IconBadgeStyle={
              {
                width: 30,
                height: 30,
                backgroundColor: '#FF00EE'
              }
            }
            Hidden={this.state.BadgeCount == 0}
          />
        </View>
        <View style={styles.buttonStyle}>
          {this.renderButton()}
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  bGround: {
    flex: 1,
    // paddingLeft: 10,
    //paddingRight: 10,
    // justifyContent: 'center',

  },
  linkStyle: {
    width: '100%',
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'flex-start'

  },
  textStyle: {
    fontSize: 20,
    paddingLeft: 10,
    color: '#ff0000'
  },
  dateStyle: {

    paddingLeft: 50,
    color: '#00ffff'
  },
  textStyle1: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#000'
  },
  textStyle2: {
    fontSize: 15,
    paddingLeft: 10,
    color: '#000'
  },
  iconStyle: {
    height: 30,
    width: 30,

  },
  iconViewStyle: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30
    //paddingLeft=40

  },

  thumbnailStyle: {
    height: 60,
    width: 50,

  },
  thumbnailViewStyle: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
    //paddingLeft=40

  },
  buttonStyle: {
    height: 30,
    width: 30,

  }


});
export default UserView;
