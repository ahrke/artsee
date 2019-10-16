import React, { useState } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TextInput
} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../styles/variables';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LoginScreen({navigation}) {
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  let [errorMessage, setErrorMessage] = useState('');

  var {height, width} = Dimensions.get('window');

  _handleLogin = () => {
    if (email && password) {
       fetch(`https://artsee-back-end.herokuapp.com/auth/login`, {
         method: "POST",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           email,
           password
         })
       })
         .then(res => res.json())
         .then(data => {
           _storeToken(data);
         })
         .then(navigation.navigate("Splash"))
         .catch(err => err);
    } else {
      setErrorMessage("Email and/or password missing")
    }
   
  };
  
  _storeToken = async data => {
    try {
      console.log("==|==|> data:",data)
      await AsyncStorage.setItem('userId', (data.user_id).toString());
      await AsyncStorage.setItem('token', data.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/auth_2.jpeg")}
        style={{
          flex: 1,
          width: width,
          height: height,
          alignItems: "center",
          resizeMode: "cover"
        }}
      >
        <View
          style={{
            flex: 1,
            width: "90%",
            height: "50%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(52, 52, 52, 0.5)"
          }}
        >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
              Login
            </Text>
          <View>
            <Icon
              name="email-outline"
              size={40}
              style={styles.icon}
            />
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <TextInput
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                style={styles.textInput}
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <View>
            <Icon
              name="lock"
              size={40}
              style={styles.icon}
            />
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="grey"
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
              />
            </View>
          </View>
          {errorMessage ? <Text style={{color: 'white'}}>{errorMessage}</Text> : <Text />}
          <TouchableOpacity
            onPress={() => _handleLogin()}
            style={styles.button}
          >
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={styles.button}
          >
            <Text style={{ color: 'white' }}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  textInput: {
    paddingHorizontal: 65,
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 20,
    // padding: 10,
    backgroundColor: 'black',
    // borderWidth: 2,
    borderColor: "white",
    // borderColor: colors.color3,
    color: colors.color3,
    width: 300
  },
  button: {
    width: 300,
    height: 50,
    margin: 10,
    borderRadius: 25,
    backgroundColor: colors.color5,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: colors.text,
  },
  buttonText: {
    color: colors.text
  },
  icon: {
    color: colors.text,
    paddingTop: 4.3,
    paddingBottom: 4.3,
    position: "absolute",
    left: 14,
    top: 19,
    zIndex: 1
  }
});
