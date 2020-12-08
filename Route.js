'use strict';
//  Define All Route here
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import {navigationRef} from './NavigationService';
import Login from "./Login";
import HomeScreen from "./HomeScreen";
import SingleImage from "./SingleImage";
import SignUp from "./SignUp";
import CartDetail from "./CartDetail";
import ForgetPassword from "./ForgetPassword";
const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer ref={navigationRef} initialRouteName="Login">
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SingleImage" component={SingleImage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="CartDetail" component={CartDetail} />
        <Stack.Screen name="Forget" component={ForgetPassword} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
