import { useEffect, useState } from 'react';
import Splash from './src/components/Splash';
import Home from './src/components/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import RegistrationScreen from './features/Auth/Registration/registration_view';
import LoginScreen from './features/Auth/Login/login_view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from "react-native";
import RegistrationScreen from "./features/Auth/Registration/registration_view";
import LoginScreen from "./features/Auth/Login/login_view";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // simulate a 2-second loading process , later it should be until the data is fetched
  }, []);
  return (
    <SafeAreaProvider>{isLoading ? <Splash /> : <Home />}</SafeAreaProvider>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 42,
    alignItems: "center",
    justifyContent: "center",
  },
});
