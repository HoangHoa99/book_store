import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import Loading from "../Loading";
import { AppContext } from "../HomeScreen";

export default function RegisterScreen({ navigation }) {
  const appContext = useContext(AppContext);

  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const validateInput = React.createRef();

  function validateInputValue() {
    const emailRe = /^[^\s@]+@[^\s@]+$/;
    const phoneRe = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

    // confirm
    if (confirmPassword === "") {
      validateInput.current.shake(200);
      setErrorMsg("Confirm your password");
    }

    // password
    if (password === "") {
      validateInput.current.shake(200);
      setErrorMsg("Password must be not blank");
    }
    // username
    if (username === "") {
      validateInput.current.shake(200);
      setErrorMsg("Username must be not blank");
    }

    // phone or email
    if (email === "" || phone === "") {
      validateInput.current.shake(200);
      setErrorMsg("Email or phone is required");
    } else if (!emailRe.test(email) && !phoneRe.test(phone)) {
      validateInput.current.shake(200);
      setErrorMsg("Invalid mail or phone");
    }

    return (
      email !== "" &&
      phone !== "" &&
      username !== "" &&
      password !== "" &&
      confirmPassword !== ""
    );
  }
  // validate password
  function validatePassword() {
    if (password.length < 8) {
      validateInput.current.shake(200);
      setErrorMsg("Password must be greater than 8 character");
    } else if (password !== confirmPassword) {
      validateInput.current.shake(200);
      setErrorMsg("Confirm password is not similar to password");
    }

    return password.length >= 8 && password === confirmPassword;
  }

  function onSignup() {
    appContext.setLoading(true);

    var isValid = validatePassword() && validateInputValue();
    if (isValid) {
      fetch("https://utebookstore.herokuapp.com/user/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wrongLoginCount: 0,
          status: 1,
          wallet: 0,
          username: username,
          password: password,
          email: email,
          phone: phone,
          address: address,
          __v: 0,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          appContext.setLoading(false);
          if (json != "create success") {
            setErrorMsg(json);
          } else {
            Alert.alert(
              "Success!",
              "Login now",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("LoginScreen"),
                },
                {
                  text: "Cancel",
                  onPress: () => navigation.navigate("MainScreen"),
                },
              ],
              { cancelable: false }
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  return (
    <>
      {appContext.loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={{ fontSize: 25, marginTop: 20 }}>
              Become our customer!{" "}
            </Text>
            <Text style={{ fontSize: 16, color: "gray", marginTop: 20 }}>
              Sign up to continue
            </Text>

            <Animatable.View ref={validateInput}>
              <TextInput
                style={{
                  marginTop: 40,
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                }}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
              />

              <TextInput
                style={{
                  marginTop: 40,
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                }}
                placeholder="Phone"
                onChangeText={(text) => setPhone(text)}
              />

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

              <TextInput
                style={{
                  marginTop: 40,
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                }}
                placeholder="Confirm password"
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
              />

              <TextInput
                style={{
                  marginTop: 40,
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                }}
                placeholder="Address"
                onChangeText={(text) => setAddress(text)}
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
                onPress={() => onSignup()}
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
                  Sign up
                </Text>
              </TouchableOpacity>
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
