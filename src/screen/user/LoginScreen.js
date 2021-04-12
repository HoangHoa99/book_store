import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { AppContext } from "../HomeScreen";

export default function LoginScreen({ navigation }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateInput = React.createRef();

  const checkIsLogin = useContext(AppContext);

  function onLogin() {
    console.log(password);
    if (username === "hoa" && password === "12345") {
      console.log(true);
      checkIsLogin.setIsLogin(true);
      navigation.navigate("MainScreen");
    } else {
      validateInput.current.shake(500);
      setErrorMsg("Invalid login account. Try again!");
    }
  }
  return (
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
          <Text style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}>
            Login
          </Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 20 }}>Forgot Password ?</Text>

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

        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <Text style={{ color: "gray" }}>Don't have an account?</Text>
          <Text style={{ fontWeight: "bold" }}> Sign Up</Text>
        </View>
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
