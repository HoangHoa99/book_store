import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { AppContext } from "../HomeScreen";
import jwt_decode from "jwt-decode";
import { UserInfoAsync } from "../../service/UserService";
import { AddToCartFromLg } from "../../service/CartService";
import Loading from "../Loading";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
export const isAndroid = () => Platform.OS === "android";

export default function LoginScreen({ navigation }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateInput = React.createRef();

  const checkIsLogin = useContext(AppContext);

  async function addToCartFromLg(accessToken) {
    var cartItem = checkIsLogin.cartItems;

    var cartAdd = [];

    if (cartItem.length != 0) {
      cartItem.forEach((item) => {
        var addItem = {
          book: item._id,
          amount: item.amount,
        };

        cartAdd.push(addItem);
      });

      await AddToCartFromLg(cartAdd, accessToken);
      checkIsLogin.setCartItems([]);
    }
  }

  //facebook
  async function FBlogIn() {
    try {
      await Facebook.initializeAsync({
        appId: '813439129284540',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const userId = (await response.json()).id;
        signInWithFacebook(userId, token);
      } else {
        console.log(`Facebook Login Error: Cancelled`);
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }

  async function signInWithFacebook(id, token) {
    fetch("https://utebookstore.herokuapp.com/user/signinfb2", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userID: id,
        token: token
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.msg != null) {
          
          checkIsLogin.setLoading(false);
          validateInput.current.shake(500);
          setErrorMsg(json.msg);
        } else {
          checkIsLogin.setIsLogin(true);
          checkIsLogin.setUser(json);
          addToCartFromLg(json.accessToken);
          var tokendecode = jwt_decode(json.accessToken);
          var userDecode = tokendecode.user;
          if (userDecode.id != null) {
            UserInfoAsync(userDecode.id).then((res) => {
              checkIsLogin.setUserProfile(res);
              checkIsLogin.setUserCart(res.cart);
            });
          }

          checkIsLogin.setLoading(false);
          navigation.navigate("MainScreen");
        }

        return json;
      });
  }

  //google
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        clientId: isAndroid()
          ? "46698234435-2cjnkk9oqnvslr8dshm71jcvahlogqia.apps.googleusercontent.com"
          : "46698234435-touiselncq02ceen7cpngahojgoefsff.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  async function signInWithGoogle() {
    let res = await signInWithGoogleAsync();
    checkIsLogin.setLoading(true);
    fetch("https://utebookstore.herokuapp.com/user/signingg", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: res.idToken,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.msg != null) {
          
          checkIsLogin.setLoading(false);
          validateInput.current.shake(500);
          setErrorMsg(json.msg);
        } else {
          checkIsLogin.setIsLogin(true);
          checkIsLogin.setUser(json);
          addToCartFromLg(json.accessToken);
          var tokendecode = jwt_decode(json.accessToken);
          var userDecode = tokendecode.user;
          if (userDecode.id != null) {
            UserInfoAsync(userDecode.id).then((res) => {
              checkIsLogin.setUserProfile(res);
              checkIsLogin.setUserCart(res.cart);
            });
          }

          checkIsLogin.setLoading(false);
          navigation.navigate("MainScreen");
        }

        return json;
      });
  }

  async function onLogin() {
    checkIsLogin.setLoading(true);

    fetch("https://utebookstore.herokuapp.com/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.msg != null) {
          validateInput.current.shake(500);
          setErrorMsg(json.msg);
        } else {
          checkIsLogin.setIsLogin(true);
          checkIsLogin.setUser(json);
          addToCartFromLg(json.accessToken);
          var tokendecode = jwt_decode(json.accessToken);
          var userDecode = tokendecode.user;
          if (userDecode.id != null) {
            UserInfoAsync(userDecode.id).then((res) => {
              checkIsLogin.setUserProfile(res);
              checkIsLogin.setUserCart(res.cart);
            });
          }

          checkIsLogin.setLoading(false);
          navigation.navigate("MainScreen");
        }

        return json;
      });
  }

  return (
    <>
      {checkIsLogin.loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={{ fontSize: 25, marginTop: 20 }}>Welcome Back! </Text>
            <Text style={{ fontSize: 16, color: "gray", marginTop: 20 }}>
              Sign in to continue
            </Text>

            <Animatable.View ref={validateInput}>
              <TextInput
                style={{
                  marginTop: 40,
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                }}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
              />

              <TextInput
                style={{
                  marginTop: 40,
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                }}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
              <Text
                style={{ color: "red", textAlign: "center", marginTop: 10 }}
              >
                {errorMsg}
              </Text>
            </Animatable.View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              <TouchableOpacity
                onPress={() => onLogin()}
                style={{
                  width: 200,
                  backgroundColor: "#0d47a1",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 40,
                  marginTop: 30,
                }}
              >
                <Text
                  style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}
                >
                  Login
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPasswordScreen")}
              >
                <Text style={{ marginTop: 20 }}>Forgot Password ?</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", marginTop: 40 }}>
                <Text style={{ color: "gray" }}>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("RegisterScreen")}
                >
                  <Text style={{ fontWeight: "bold" }}> Sign Up</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 40,
                }}
              ></View>
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                Or via social media
              </Text>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40 / 2,
                    backgroundColor: "#3f51b5",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => FBlogIn()}
                >
                  <Text
                    style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}
                  >
                    f
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40 / 2,
                    backgroundColor: "#f44336",
                    marginHorizontal: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => signInWithGoogle()}
                >
                  <Text
                    style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}
                  >
                    G
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
});
