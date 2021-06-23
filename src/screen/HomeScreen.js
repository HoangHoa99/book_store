import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

// ANCHOR - Import screen
import BookScreen from "../screen/book/BookScreen";
import BookDetailScreen from "../screen/book/BookDetailScreen";
import BookSearchScreen from "../screen/book/BookSearchScreen";
import InformationScreen from "./app/InformationSreen";
import CheckoutScreen from "./app/CheckoutScreen";
import ProfileScreen from "./user/ProfileScreen";
import CartScreen from "./app/CartScreen";
import LoginScreen from "./user/LoginScreen";
import RegisterScreen from "./user/RegisterScreen";
import ForgotPasswordScreen from "./user/ForgotPasswordScreen";
import OrderScreen from "./app/OrderScreen";
import EditProfileScreen from "./user/EditProfileScreen";

import { GetBookAsync, GetCategories } from "../service/BookService";

// ANCHOR - Declare const
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// init app context
export const AppContext = React.createContext();

export default function HomeScreen() {
  // app const
  const [isLogin, setIsLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [newBook, setNewBook] = useState([]);
  const [hotBook, setHotBook] = useState([]);
  const [books, setBooks] = useState([]);
  const [categories, setCategory] = useState([]);
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const getBookLists = async () => {
      GetBookAsync().then((res) => {
        setNewBook(res.newBook);
        setHotBook(res.hotBook);
        setBooks(res.books);
      });
    };

    const getCategoryList = async () => {
      GetCategories().then((cate) => {
        var cateList = [];
        for(var i = 0; i< cate.length; i++){
          var cateItem = {
            index: i,
            name: cate[i].name,
            _id: cate[i]._id
          }

          cateList.push(cateItem);
        }
        setCategory(cateList);
      });
    };

    getBookLists();
    getCategoryList();
  }, []);

  // app context setting
  const appSetting = {
    isLogin: isLogin,
    setIsLogin,
    cartItems,
    setCartItems,
    newBook,
    hotBook,
    books,
    categories,
    user,
    setUser,
    userProfile,
    setUserProfile,
    userCart,
    setUserCart
  };

  return (
    <AppContext.Provider value={appSetting}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InformationScreen"
            component={InformationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookDetailScreen"
            component={BookDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CheckoutScreen"
            component={CheckoutScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderScreen"
            component={OrderScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{ headerShown: false }}
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
          name="CartScreen"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarIcon: ({ color, size }) => (
              <Feather name="shopping-cart" color={color} size={size} />
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
