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
    contact_us: 'Liên hệ với chúng tôi',
    lang: 'Ngôn ngữ',
    version: 'Phiên bản',    
    sign_in_to_continue: 'Đăng nhập để tiếp tục',
    welcome_back: 'Chào mừng trở lại',
    sign_in: 'Đăng nhập',
    sign_up: 'Đăng ký',
    forgot_password: 'Quên mật khẩu',
    create_account: 'Đăng ký tài khoản mới',
    via_social: 'Đăng nhập bằng mạng xã hội',
    username: 'Tên đăng nhập',
    password: 'Mật khẩu',
    your_orders: 'Đơn hàng',
    about_us: 'Về chúng tôi',
    sign_out: 'Đăng xuất',
    hello: 'Xin chào',
    welcome_to_out_store: 'Chào bạn đến với UTEStore',
    confirm_password_is_require: 'Xác nhận lại mật khẩu',
    password_is_require: 'Mật khẩu không được để trống',
    username_is_require: 'Tên đăng nhập không được để trống',
    email_is_require: 'Email không được để trống',
    invalid_email: 'Email không hợp lệ',
    password_length_warning: 'Mật khẩu phải dài hơn 8 kí tự',
    confirm_password_length_warning: 'Xác nhận lại mật khẩu của bạn',
    success: 'Thành công',
    login_now: 'Đăng nhập ngay',
    cancel: 'Huỷ',
    become_us: 'Đăng ký khách hàng mới',
    confirm_password: 'Xác nhận mật khẩu',
    sir: 'Bạn',
    greeting_statement: 'Chúc bạn một ngày tốt lành',
    new_book: 'SÁCH MỚI',
    new_book_desciption: 'Những đầu sách vừa mới cập bến',
    hot_book: 'BÁN CHẠY NHẤT',
    hot_book_description: 'Những đầu sách hot nhất của cửa hàng',
    check_out: 'Thanh toán',
    total_price: 'Thành tiền',
    confirm: 'Xác nhận',
    user_info: 'Thông tin khách hàng',
    remove_from_cart: 'Bỏ cuốn sách này khỏi giỏ hàng',
    over_instock_quantity: 'Vượt quá số lượng còn lại',
    empty_cart: 'Giỏ hàng trống',
    at_least_one_item: 'Chọn ít nhất một sản phẩm',
    confirm_order: 'Xác nhận đặt hàng',
    order_id: 'Mã đơn hàng',
    note: 'Ghi chú',
    date_create: 'Tạo ngày',
    phone: 'SĐT',
    item_has_been_added: 'Sản phẩm đã có trong giỏ hàng',
    out_of_stock: 'Tạm hết hàng',
    in_stock: 'Còn hàng',
    author: 'Tác giả',
    state: 'Tình trạng',
    category: 'Thể loại',
    add_to_cart: 'Thêm vào giỏ hàng',
    overview: 'Tóm tắt nội dung',
    search_item: 'Tìm kiếm sách',
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
