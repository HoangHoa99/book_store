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

import { GetBookAsync, GetCategories, GetBookCategory } from "../service/BookService";

import i18n from 'i18n-js';

// ANCHOR - Declare const
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// SECTION multi language
i18n.translations = {
  en: { 
    contact_us: 'Contact us',
    lang: 'Language',
    version: 'Version',
    sign_in_to_continue: 'Sign in to continue',
    welcome_back: 'Welcome Back',
    sign_in: 'Sign in',
    sign_up: 'Sign up',
    forgot_password: 'Forgot password',
    create_account: 'Create new account',
    via_social: 'Login via social account',
    username: 'username',
    password: 'password',
    your_orders: 'Your orders',
    about_us: 'About us',
    sign_out: 'Sign out',
    hello: 'Hello',
    welcome_to_out_store: 'Welcome to UTEStore',
    confirm_password_is_require: 'Confirm your password',
    password_is_require: 'Password must not be empty',
    username_is_require: 'Username must not be empty',
    email_is_require: 'Email must not be empty',
    invalid_email: 'Invalid email',
    password_length_warning: 'Password must be greater than 8 characters',
    confirm_password_length_warning: 'Confirm password must be similar to password',
    success: 'Success',
    login_now: 'Login now',
    cancel: 'Cancel',
    become_us: 'Become to our customer',
    confirm_password: 'Confirm password',
    sir: 'Sir',
    greeting_statement: 'Hope you have a greate day',
    new_book: 'NEW BOOK',
    new_book_desciption: 'Newest book at my store',
    hot_book: 'BEST SELLER',
    hot_book_description: 'Best seller of my store',
    check_out: 'Checkout',
    total_price: 'Total price',
    confirm: 'Confirm',
    user_info: 'User information',
    remove_from_cart: 'Remove this book from your cart',
    over_instock_quantity: 'Exceeding the remaining amount',
    empty_cart: 'Empty cart',
    at_least_one_item: 'Select at least one item',
    confirm_order: 'Confirm your order',
    order_id: 'Order ID',
    note: 'Note',
    date_create: 'Created at',
    phone: 'Phone',
    item_has_been_added: 'Item has been added',
    out_of_stock: 'Out of stock',
    in_stock: 'In stock',
    author: 'Author',
    state: 'Status',
    category: 'Category',
    add_to_cart: 'Add to cart',
    overview: 'Overview',
    search_item: 'Search book',
  },
  vi: { 
    contact_us: 'Li??n h??? v???i ch??ng t??i',
    lang: 'Ng??n ng???',
    version: 'Phi??n b???n',    
    sign_in_to_continue: '????ng nh???p ????? ti???p t???c',
    welcome_back: 'Ch??o m???ng tr??? l???i',
    sign_in: '????ng nh???p',
    sign_up: '????ng k??',
    forgot_password: 'Qu??n m???t kh???u',
    create_account: '????ng k?? t??i kho???n m???i',
    via_social: '????ng nh???p b???ng m???ng x?? h???i',
    username: 'T??n ????ng nh???p',
    password: 'M???t kh???u',
    your_orders: '????n h??ng',
    about_us: 'V??? ch??ng t??i',
    sign_out: '????ng xu???t',
    hello: 'Xin ch??o',
    welcome_to_out_store: 'Ch??o b???n ?????n v???i UTEStore',
    confirm_password_is_require: 'X??c nh???n l???i m???t kh???u',
    password_is_require: 'M???t kh???u kh??ng ???????c ????? tr???ng',
    username_is_require: 'T??n ????ng nh???p kh??ng ???????c ????? tr???ng',
    email_is_require: 'Email kh??ng ???????c ????? tr???ng',
    invalid_email: 'Email kh??ng h???p l???',
    password_length_warning: 'M???t kh???u ph???i d??i h??n 8 k?? t???',
    confirm_password_length_warning: 'X??c nh???n l???i m???t kh???u c???a b???n',
    success: 'Th??nh c??ng',
    login_now: '????ng nh???p ngay',
    cancel: 'Hu???',
    become_us: '????ng k?? kh??ch h??ng m???i',
    confirm_password: 'X??c nh???n m???t kh???u',
    sir: 'B???n',
    greeting_statement: 'Ch??c b???n m???t ng??y t???t l??nh',
    new_book: 'S??CH M???I',
    new_book_desciption: 'Nh???ng ?????u s??ch v???a m???i c???p b???n',
    hot_book: 'B??N CH???Y NH???T',
    hot_book_description: 'Nh???ng ?????u s??ch hot nh???t c???a c???a h??ng',
    check_out: 'Thanh to??n',
    total_price: 'Th??nh ti???n',
    confirm: 'X??c nh???n',
    user_info: 'Th??ng tin kh??ch h??ng',
    remove_from_cart: 'B??? cu???n s??ch n??y kh???i gi??? h??ng',
    over_instock_quantity: 'V?????t qu?? s??? l?????ng c??n l???i',
    empty_cart: 'Gi??? h??ng tr???ng',
    at_least_one_item: 'Ch???n ??t nh???t m???t s???n ph???m',
    confirm_order: 'X??c nh???n ?????t h??ng',
    order_id: 'M?? ????n h??ng',
    note: 'Ghi ch??',
    date_create: 'T???o ng??y',
    phone: 'S??T',
    item_has_been_added: 'S???n ph???m ???? c?? trong gi??? h??ng',
    out_of_stock: 'T???m h???t h??ng',
    in_stock: 'C??n h??ng',
    author: 'T??c gi???',
    state: 'T??nh tr???ng',
    category: 'Th??? lo???i',
    add_to_cart: 'Th??m v??o gi??? h??ng',
    overview: 'T??m t???t n???i dung',
    search_item: 'T??m ki???m s??ch',
  },
};
i18n.fallbacks = true;
// !SECTION multi language

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
  const [kinhte, setKinhte] = useState([]);
  const [sachthieunhi, setSachthieunhi] = useState([]);
  const [tieusuhoiky, setTieusuhoiky] = useState([]);
  const [tamly, setTamly] = useState([]);
  const [ngoaingu, setNgoaingu] = useState([]);
  const [vanhoc, setVanhoc] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [categories, setCategory] = useState([]);
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("vi-VN");

  
  i18n.locale = language;

  useEffect(() => {
    const getBookLists = async () => {
      GetBookAsync().then((res) => {
        setHotBook(res.hotBook);
        setNewBook(res.newBook);
        setBooks(res.books);

        setLoading(!loading);
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

    const getBookByCate = async () => {
      GetBookCategory().then((res) => {
        var listBookByCate = res.data;
        setKinhte(listBookByCate.kinhte);
        setSachthieunhi(listBookByCate.sachthieunhi);
        setTieusuhoiky(listBookByCate.tieusuhoiky);
        setTamly(listBookByCate.tamly);
        setNgoaingu(listBookByCate.ngoaingu);
        setVanhoc(listBookByCate.vanhoc);
      });
    };

    getBookLists();
    getCategoryList();
    getBookByCate();
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
    setUserCart,
    loading: loading,
    setLoading,
    kinhte,
    sachthieunhi,
    tieusuhoiky,
    tamly,
    ngoaingu,
    vanhoc,
    searchResult,
    setSearchResult,
    language: language,
    setLanguage
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
