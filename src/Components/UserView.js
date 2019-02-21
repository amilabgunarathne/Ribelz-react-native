import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, Alert, FlatList, ScrollView } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Button from './common/Button';
import { TabViewAnimated, TabViewPage, TabBarTop } from 'react-native-tab-view';
import axios from 'axios';
import CustomizeList from './CustomizeList';
import card from './common/Card';
import Img from './common/background';
import Card from './common/Card';

class UserView extends Component {
  static navigationOptions =
    {
      title: '',
      headerStyle: { backgroundColor: 'transparent', height: 0 }
    };
  state = {
    scrollEnabled: true,
    data: []
  };

  componentWillMount() {
    this.fetchData();

  }
  renderButton() {

    return (
      <Button onPress={this.logoutPress.bind(this)}>
        logout
          </Button>
    );

  }
goToNextScreen(){
  console.log("work");
  // const { navigate } = this.props.navigation;
  // navigate('CustomizeList');

}
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
          const { navigate } = this.props.navigation;
          navigate('Login');
        }
      }).catch((error) => {
        // console.error(error);
        // Alert.alert(error);
        Alert.alert("No internet connection");
        // this.setState({ loading: false });
      });
  }

  renderListItem = ({ item }) => (
    <TouchableOpacity style={styles.linkStyle} >

      <View style={{ width: '80%', height: 60, alignItems: 'flex-start', justifyContent: 'center',flexDirection: 'column' }}>
        <View style={{
          width: '50%', height: 50, alignItems: 'flex-end', justifyContent: 'center',
        }} >
          <Text style={styles.textStyle1}>{item.post}</Text>
          <Text style={styles.textStyle1}>{item.description}</Text>
        </View>
        <View style={{ width: '80%', height: 30, alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row' }}>
          <Text style={styles.textStyle2}>{item.company_name}</Text>
          <Text style={styles.textStyle2}>{item.url}</Text>
        </View>

      </View>
      <View style={styles.iconViewStyle}>
        <Image
          style={styles.iconStyle}
          source={require('./pics/right-arrow.png')}
        />
      </View>

    </TouchableOpacity>
  )



  render() {
    return (
      <View style={styles.bGround}>
        <Img />
       
          <View>
            <FlatList
              data={this.state.data}
              keyExtractor={(x, i) => i}
              renderItem={this.renderListItem}
              scrollEnabled={this.state.scrollEnabled}
            />
            {/* {this.renderAlbums()} */}
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
    color: '#000'
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
    marginLeft: 40
    //paddingLeft=40

  },
  buttonStyle: {
    height: 30,
    width: 30,

  }


});
export default UserView;