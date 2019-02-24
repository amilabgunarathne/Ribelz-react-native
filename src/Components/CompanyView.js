import React, { Component } from 'react';
import { Platform, ScrollView, StyleSheet, Text, Image, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import Button from './common/Button';
import { TabViewAnimated, TabViewPage, TabBarTop } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-picker';
import CardSection from './common/CardSection'
import Img from './common/background';
import DatePicker from 'react-native-datepicker';
import RNFetchBlob from 'react-native-fetch-blob';


const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle: 'take a photo',
    chooseFromLibraryButtonTitle: 'choose from camera roll',
    quality: 1
};

class CompanyView extends Component {

    static navigationOptions =
        {
            title: '',
            headerStyle: { backgroundColor: 'transparent', height: 0 }
        };
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            companyName: '',
            description: '',
            exp: '',
            avatarSource: null,
            data: null
        };

    }
    onButtonPress() {

        const { post, companyName, description, exp } = this.state;
        console.log("Working");
        //const { navigate } = this.props.navigation;
        // navigate('threeScreen', { Email: email,Password: password,Date: date,Date1: date1, Date2: date2,Name: name,Number: number });
        fetch('https://unconsidered-baths.000webhostapp.com/ribelz/postAdd.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post: post,
                companyName: companyName,
                description: description,
                exp: exp
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
            }).catch((error) => {
                Alert.alert(responseJson);
            });
        // this.setState({ avatarSource: source });

    }


    onButtonPress1() {
        // const { data } = this.state;
        RNFetchBlob.fetch('POST', 'https://unconsidered-baths.000webhostapp.com/ribelz/upload.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [

                // custom content type
                { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data }


            ]).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
            }).catch((error) => {
                Alert.alert(error);
            });
        // this.setState({ avatarSource: source });
    }
    onButtonPress2() {
        console.log("Working");
        fetch('https://unconsidered-baths.000webhostapp.com/ribelz/companylogout.php')
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
    onButtonPress3() {


        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                    data: response.data
                });
            }
        });
    }
    renderButton() {
        // if (this.state.loading) {
        //     return <Spinner size="small" spinnerStyle={styles.spinnerStyle} />;
        // }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Post
          </Button>
        );

    }
    renderButton1() {
        // if (this.state.loading) {
        //     return <Spinner size="small" spinnerStyle={styles.spinnerStyle} />;
        // }

        return (
            <Button onPress={this.onButtonPress1.bind(this)}>
                upload
          </Button>
        );

    }

    renderButton2() {
        // if (this.state.loading) {
        //     return <Spinner size="small" spinnerStyle={styles.spinnerStyle} />;
        // }

        return (
            <Button onPress={this.onButtonPress2.bind(this)}>
                logout
          </Button>
        );

    }
    renderButton3() {
        // if (this.state.loading) {
        //     return <Spinner size="small" spinnerStyle={styles.spinnerStyle} />;
        // }

        return (
            <Button onPress={this.onButtonPress3.bind(this)}>
              Choose
          </Button>
        );

    }

    render() {
        return (
            <View style={styles.bGround}>
                <Img />
                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={styles.regform}>

                        <Text style={styles.header}>Post Your Job</Text>

                        <TextInput
                            style={styles.textinput}
                            placeholder="Name of the post"
                            placeholderTextColor="#ffffff"
                            //underlineColorAndroid={'Transparent'}
                            onChangeText={post => this.setState({ post })}
                            value={this.state.post}
                        />
                        <TextInput
                            style={styles.textinput}
                            placeholder="companyName"
                            placeholderTextColor="#ffffff"
                            //underlineColorAndroid={'Transparent'}
                            onChangeText={companyName => this.setState({ companyName })}
                            value={this.state.companyName}
                        />
                        <TextInput
                            style={styles.textinput}
                            placeholder="Discription"
                            placeholderTextColor="#ffffff"
                            //underlineColorAndroid={'Transparent'}
                            onChangeText={description => this.setState({ description })}
                            value={this.state.description}
                        />
                        <DatePicker
                            style={{ width: 330 }}
                            date={this.state.exp}
                            mode="date"
                            width= '50'
                            placeholder="Expire date "
                            placeholderTextColor="#ffffff"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2030-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"

                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({exp: date }) }}
                        />
                        <CardSection style={styles.containerStyle}>
                            <Image source={this.state.avatarSource} style={{ width: 100, height: 100, margin: 3, alignItems: 'center' }} />
                            <View style={styles.chooseButtonStyle}>
                                {this.renderButton3()}
                            </View>
                        </CardSection>
                        <View style={styles.buttonStyle}>
                            {this.renderButton1()}
                        </View>

                        <View style={styles.buttonStyle}>
                            {this.renderButton()}
                        </View>
                        <View style={styles.buttonStyle}>
                            {this.renderButton2()}
                        </View>


                        {/* <Button
          title="Submit"
          onPress={this.nextPress.bind(this)}
          color="#e62739"
      /> */}

                    </View>
                    </ScrollView>
            </View>

        );
    }
}
const styles = StyleSheet.create(
    {
        header: {
            fontSize: 24,
            color: '#fff',
            marginBottom: 20,
            paddingBottom: 10,
            borderBottomColor: '#199187',
            borderBottomWidth: 1,
        },
        regform: {
            alignSelf: 'stretch',
        },
        containerStyle: {
            marginTop: 30,
            height: 40,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        },
        textinput: {
            alignSelf: 'stretch',
            color: '#fff',
            marginBottom: 10,
            paddingBottom: 10,
            borderBottomColor: '#f8f8f8',
            borderBottomWidth: 1,
        },
        buttonStyle: {
            marginTop: 5,
            // borderBottomWidth: 1,
            padding: 5,
            borderRadius: 60,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            position: 'relative',
        },
        chooseButtonStyle: {
            //marginTop: 10,
            // borderBottomWidth: 1,
            padding: 37,
            borderRadius: 40,
            justifyContent: 'flex-start',
            fontSize: 20,
            paddingLeft: 2,
            alignItems:'center',
            
            //flexDirection: 'row',
            //position: 'relative',
        },
        bGround: {
            flex: 1,
            paddingLeft: 50,
            paddingRight: 50,
            justifyContent: 'center',

        }
    });


export default CompanyView;