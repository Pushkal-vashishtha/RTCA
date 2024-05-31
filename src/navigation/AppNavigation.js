import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"; // Import NavigationContainer
import auth from "@react-native-firebase/auth";
import Login from "../components/Auth/Login";
import Detail from "../components/Auth/Detail";
import Dashboard from "../components/Dashboard/Dashboard";
import ChatScreen from "../components/chat/ChatScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null); // Initialize user as null

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on component unmount
  }, []);

  // Show a loading indicator while initializing
  if (initializing) return null;

  return (
    <NavigationContainer> {/* Wrap your navigation with NavigationContainer */}
      <Stack.Navigator initialRouteName={user ? "Dashboard" : "Login"}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ title: "Chat" }} // Set title for ChatScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
