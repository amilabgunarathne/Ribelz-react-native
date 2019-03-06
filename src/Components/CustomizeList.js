import React, { Component } from 'react';
import { Image,View,StyleSheet, Text } from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';


class CustomizeList extends Component {
    
    static navigationOptions =
    {
      title: '',
      headerStyle: { backgroundColor: 'transparent', height: 0 }
    };
    constructor(props) {
      super(props);
    this.state = {
    //  email: this.props.navigation.state.params.data,
      //data: []
            };
  }

render(){
  const {params} = this.props.navigation.state;
    const {navigate}= this.props.navigation;
    return(
        
          <View  style={{flex: 1,width: '100%', height: '100%',alignItems:'center'}}>
        <Image
  style={{ width: '100%', height: '100%',alignItems:'center'}}
  source={{uri:params.item.image}}
 
/>
</View>



    );
}
   
}



const styles = StyleSheet.create({
    arrangeStyle:{
flexDirection: 'column',
justifyContent: 'space-around'

    },
    iconStyle:{
        height:30,
width: 30,

    },
    iconViewStyle:{
        justifyContent:'center',
        alignItems: 'center',
        marginLeft: 200
//paddingLeft=40

    }

});
export default CustomizeList;