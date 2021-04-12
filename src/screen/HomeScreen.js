import React, {useState} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";

// ANCHOR - Import screen
import BookScreen from '../screen/book/BookScreen';
import BookDetailScreen from '../screen/book/BookDetailScreen';
import BookSearchScreen from '../screen/book/BookSearchScreen';
import InformationScreen from './app/InformationSreen';
import LibraryScreen from './book/LibraryScreen';
import ProfileScreen from './user/ProfileScreen';
import CartScreen from './app/CartScreen';
import LoginScreen from './user/LoginScreen';


// ANCHOR - Declare const
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// init app context
export const AppContext = React.createContext();

export default function HomeScreen(){

    // app const
    const [isLogin, setIsLogin] = useState(false);


    // app context setting
    const appSetting = {
        isLogin: isLogin,
        setIsLogin
    };

    return(
        <AppContext.Provider value={appSetting}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name = "MainScreen"
                        component = {MainScreen}
                        options = {
                            {headerShown: false}
                        }
                    />
                    <Stack.Screen 
                        name = "InformationScreen"
                        component = {InformationScreen}
                        options = {
                            {headerShown: false}
                        }
                    />
                    <Stack.Screen 
                        name = "CartScreen"
                        component = {CartScreen}
                        options = {
                            {headerShown: false}
                        }
                    />
                    <Stack.Screen 
                        name = "BookDetailScreen"
                        component = {BookDetailScreen}
                        options = {
                            {headerShown: false}
                        }
                    />
                    <Stack.Screen 
                        name = "LoginScreen"
                        component = {LoginScreen}
                        options = {
                            {headerShown: false}
                        }
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
}

function MainScreen() {
    return (
      <>
        <Tab.Navigator
          initialRouteName="MainScreen"
          tabBarOptions={{
            activeTintColor: "#e91e63",
          }}
        >
          <Tab.Screen
            name="BookScreen"
            component={BookScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Feather name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="LibraryScreen"
            component={LibraryScreen}
            options={{
              tabBarLabel: "Library",
              tabBarIcon: ({ color, size }) => (
                <Feather name="book" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="BookSearchScreen"
            component={BookSearchScreen}
            options={{
              tabBarLabel: "Search",
              tabBarIcon: ({ color, size }) => (
                <Feather name="search" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              tabBarLabel: "User",
              tabBarIcon: ({ color, size }) => (
                <Feather name="user" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  }