import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
// import { AppContext } from "../HomeScreen";

export default function RegisterScreen({ navigation }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const validateInput = React.createRef();

  //   const checkIsLogin = useContext(AppContext);

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
    if (emailOrPhone === "") {
      validateInput.current.shake(200);
      setErrorMsg("Email or phone is required");
    } else if (!emailRe.test(emailOrPhone) && !phoneRe.test(emailOrPhone)) {
      validateInput.current.shake(200);
      setErrorMsg("Invalid mail or phone");
    }

    return (
      emailOrPhone !== "" &&
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

  function onSignin() {
    var isValid = validatePassword() && validateInputValue();
    if (isValid) {
      navigation.navigate("LoginScreen");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, marginTop: 20 }}>Become our customer! </Text>
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
          placeholder="Email/Phone"
          onChangeText={(text) => setEmailOrPhone(text)}
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
        <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
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
          onPress={() => onSignin()}
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
          <Text style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}>
            Signup
          </Text>
        </TouchableOpacity>

        {/* <View style={{ flexDirection: "row", marginTop: 60 }}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              backgroundColor: "#3f51b5",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}>
              f
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              backgroundColor: "#f44336",
              marginHorizontal: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}>
              G
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              backgroundColor: "#1565c0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}>
              in
            </Text>
          </View>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
});
