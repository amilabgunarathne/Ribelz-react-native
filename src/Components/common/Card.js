import React, { Component } from 'react';
import { View } from 'react-native';
import CardSection from './CardSection';


const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
        {props.children}
    </View>
  );  
};

const styles = {
    containerStyle: {
        //borderWidth: 1,
        borderRadius: 10,
        //borderColor: '#ddd',
        borderBottomWidth: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
};


export default Card;