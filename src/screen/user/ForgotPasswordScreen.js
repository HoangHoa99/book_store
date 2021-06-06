import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AppContext } from "../HomeScreen";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  function sendEmail() {
    alert("hahaha" + email);
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, marginTop: 80 }}>Forgot your password?</Text>
      <Text style={{ fontSize: 16, color: "gray", marginTop: 20 }}>
        Your email 
      </Text>

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

        

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => sendEmail()}
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
            Send
          </Text>
        </TouchableOpacity>

        
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
