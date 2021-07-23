import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import Loading from "../Loading";
import i18n from 'i18n-js';

export default function RegisterScreen({ navigation }) {

  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const behavior = Platform.OS === "ios" ? "padding" : "height";

  function validateInputValue() {
    const emailRe = /^[^\s@]+@[^\s@]+$/;

    // confirm
    if (confirmPassword === "") {
      setErrorMsg(i18n.t('confirm_password_is_require'));
    }

    // password
    if (password === "") {
      setErrorMsg(i18n.t('password_is_require'));
    }
    // username
    if (username === "") {
      setErrorMsg(i18n.t('username_is_require'));
    }

    // phone or email
    if (email === "") {
      setErrorMsg(i18n.t('email_is_require'));
    } else if (!emailRe.test(email)) {
      setErrorMsg(i18n.t('invalid_email'));
    }

    return (
      email !== "" &&
      username !== "" &&
      password !== "" &&
      confirmPassword !== ""
    );
  }
  // validate password
  function validatePassword() {
    if (password.length < 8) {
      setErrorMsg(i18n.t('password_length_warning'));
    } else if (password !== confirmPassword) {
      setErrorMsg(i18n.t('confirm_password_length_warning'));
    }

    return password.length >= 8 && password === confirmPassword;
  }

  function onSignup() {
    var isValid = validateInputValue() && validatePassword();
    if (isValid) {
      setLoading(true);
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
          __v: 0,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setLoading(false);
          if (json != "create user success!") {
            setErrorMsg(json);
          } else {
            Alert.alert(
              i18n.t('success') + '!',
              i18n.t('login_now'),
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("LoginScreen"),
                },
                {
                  text: i18n.t('cancel'),
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
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <KeyboardAvoidingView
          behavior={behavior}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Text style={styles.header}>{i18n.t('become_us')}!</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
              />

              <TextInput
                style={styles.textInput}
                placeholder={i18n.t('username')}
                onChangeText={(text) => setUsername(text)}
              />

              <TextInput
                style={styles.textInput}
                placeholder={i18n.t('password')}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />

              <TextInput
                style={styles.textInput}
                placeholder={i18n.t('confirm_password')}
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <Text
                    style={{ color: "red", textAlign: "center", marginTop: 10 }}
                  >
                    {errorMsg}
                  </Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={() => onSignup()}
                  style={{
                    width: 200,
                    backgroundColor: "#0d47a1",
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 40
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#FFF",
                      fontSize: 16,
                    }}
                  >
                    {i18n.t('sign_up')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 30,
  },
  textInput: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
});
