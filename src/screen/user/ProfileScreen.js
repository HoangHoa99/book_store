import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { PrimaryButton } from "../../component/Button";
import { AppContext } from "../HomeScreen";

export default function ProfileScreen({ navigation }) {
  const checkIsLogin = useContext(AppContext);

  const [userInfo, setUserInfo] = useState({
    phone: "012345678",
    email: "ute@gmail.com",
    address: "Thu Duc city",
    name: "benedict cumberbatch",
  });

  function logout() {
    checkIsLogin.setIsLogin(false);
    navigation.navigate("HomeScreen");
  }

  function TitleName({ name }) {
    const words = name.split(" ");

    return (
      <View
        style={{
          marginLeft: 15,
          marginTop: 80,
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            fontFamily: "AppleSDGothicNeo-Medium",
            fontSize: 30,
          }}
        >
          {words[0]}
        </Text>
        <Text
          style={{
            marginTop: -5,
            fontFamily: "AppleSDGothicNeo-Thin",
            fontSize: 25,
          }}
        >
          {words[1]}
        </Text>
      </View>
    );
  }

  function Profile() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        {/** SECTION - Header */}
        <View style={{ flex: 0.3, backgroundColor: "#fff" }}>
          
        </View>
        {/** !SECTION */}
        {/** SECTION - Name */}
        <View
          style={{
            flex: 1.3,
            flexDirection: "row",
            backgroundColor: "#fff",
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginLeft: 25,
              marginTop: 50,
            }}
            source={require("../../assets/image/default_avt.png")}
          />
          <TitleName name={userInfo.name} />
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfileScreen")}
            style={{
              marginLeft: 45,
              marginTop: 90,
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: 12,
            }}
          >
            <MaterialIcons name="create" size={25} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
        </View>
        {/** !SECTION */}
        {/** SECTION - Info */}
        <View style={{ flex: 3.2, backgroundColor: "#fff" }}>
          {/** Phone */}
          <View
            style={{
              flex: 0.64,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 0.5 }}></View>
            <View
              style={{
                backgroundColor: "#f8f8f8",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 60,
                
                height: 50,
                width: 50,
              }}
            >
              <FontAwesome name="phone" size={25} color="#0ca400" />
            </View>
            <View
              style={{
                flex: 3,
                backgroundColor: "#fff",
                alignItems: "flex-start",
                marginLeft: 15,
              }}
            >
              <Text
                style={{ fontSize: 22, fontFamily: "AppleSDGothicNeo-Regular" }}
              >
                {userInfo.phone}
              </Text>
            </View>

            <View style={{ flex: 0.5, backgroundColor: "#4dcaf3" }}></View>
          </View>

          {/** Email */}
          <View
            style={{
              flex: 0.64,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 0.5 }}></View>
            <View
              style={{
                backgroundColor: "#f8f8f8",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 60,
                
                height: 50,
                width: 50,
              }}
            >
              <Feather name="mail" size={25} color="#ea1203" />
            </View>
            <View
              style={{
                flex: 3,
                backgroundColor: "#fff",
                alignItems: "flex-start",
                marginLeft: 15,
              }}
            >
              <Text
                style={{ fontSize: 22, fontFamily: "AppleSDGothicNeo-Regular" }}
              >
                {userInfo.email}
              </Text>
            </View>

            <View style={{ flex: 0.5, backgroundColor: "#4dcaf3" }}></View>
          </View>

          {/** Address */}
          <View
            style={{
              flex: 0.64,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 0.5 }}></View>
            <View
              style={{
                backgroundColor: "#f8f8f8",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 60,
                
                height: 50,
                width: 50,
              }}
            >
              <Ionicons name="ios-location" size={25} color="#0999c9" />
            </View>
            <View
              style={{
                flex: 3,
                backgroundColor: "#fff",
                alignItems: "flex-start",
                marginLeft: 15,
              }}
            >
              <Text
                style={{ fontSize: 22, fontFamily: "AppleSDGothicNeo-Regular" }}
              >
                {userInfo.address}
              </Text>
            </View>

            <View style={{ flex: 0.5, backgroundColor: "#4dcaf3" }}></View>
          </View>

          {/** Order */}
          <View
            style={{
              flex: 0.64,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 0.5 }}></View>
            <View
              style={{
                backgroundColor: "#f8f8f8",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 60,
                
                height: 50,
                width: 50,
              }}
            >
              <Feather name="package" size={25} color="#f4ba05" />
            </View>
            <View
              style={{
                flex: 2.8,
                backgroundColor: "#fff",
                alignItems: "flex-start",
                marginLeft: 15,
              }}
            >
              <Text
                style={{ fontSize: 22, fontFamily: "AppleSDGothicNeo-Regular" }}
              >
                Your orders
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("OrderScreen")}
              style={{
                backgroundColor: "#f5f5f5",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,                
                height: 45,
                width: 45,
                marginRight: 8,
              }}
            >
              <Feather name="chevron-right" size={25} />
            </TouchableOpacity>
          </View>
          {/** SECTION - About us */}
          <View
            style={{
              flex: 0.64,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 0.5 }}></View>
            <View
              style={{
                backgroundColor: "#f8f8f8",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 60,                
                height: 50,
                width: 50,
              }}
            >
              <FontAwesome name="info-circle" size={25} color="#0999c9" />
            </View>
            <View
              style={{
                flex: 2.8,
                backgroundColor: "#fff",
                alignItems: "flex-start",
                marginLeft: 15,
              }}
            >
              <Text
                style={{ fontSize: 22, fontFamily: "AppleSDGothicNeo-Regular" }}
              >
                About us
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("InformationScreen")}
              style={{
                backgroundColor: "#f5f5f5",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,                
                height: 45,
                width: 45,
                marginRight: 8,
              }}
            >
              <Feather name="chevron-right" size={25} />
            </TouchableOpacity>

          </View>
        </View>
        
        {/** !SECTION */}
        {/** SECTION - Footer */}
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <TouchableOpacity
              onPress = {() => logout()}
              style={{
                backgroundColor: "#f8f8f8",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                height: 60,
                width: 150,
                flexDirection: "row",
                marginTop: 30, 
                marginLeft: 33
              }}
            >
              <MaterialIcons name="logout" size={25} color="#ea1203" />
              <Text style={{fontSize: 20, marginLeft: 5}}>Sign Out</Text>
            </TouchableOpacity>
        </View>
        {/** !SECTION */}
      </View>
    );
  }
  return (
    <>
      {checkIsLogin.isLogin ? (
        <Profile />
      ) : (
        <>
          <View style={styles.container}>
            <Image
              style={{ width: "100%", height: 300 }}
              source={require("../../assets/image/login-logo.png")}
              resizeMode="contain"
            />

            <Text style={{ fontSize: 40, fontWeight: "bold" }}>Hello!</Text>
            <Text
              style={{
                fontSize: 16,
                color: "gray",
                textAlign: "center",
                marginHorizontal: 20,
              }}
            >
              Welcome to UTE Store!
            </Text>

            <View
              style={{ flexDirection: "row", margin: 20, paddingVertical: 20 }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                style={{
                  backgroundColor: "#0d47a1",
                  padding: 10,
                  width: 150,
                  borderRadius: 30,
                  marginHorizontal: 2,
                }}
              >
                <Text
                  style={{ textAlign: "center", color: "#FFF", fontSize: 18 }}
                >
                  Login
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreen")}
                style={{
                  backgroundColor: "#FFF",
                  padding: 10,
                  width: 150,
                  borderRadius: 30,
                  marginHorizontal: 2,
                  borderWidth: 1,
                  borderColor: "#0d47a1",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#0d47a1",
                    fontSize: 18,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 16, marginTop: 10 }}>
              Or via social media
            </Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
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
                <Text
                  style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}
                >
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
                <Text
                  style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}
                >
                  G
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
}

/** NOTE - Edit icon */
{
  /* <View
      style={{
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        
        height: 50,
        width: 50,
    }}
  >
    <MaterialIcons name="update" size={25} />
  </View> */
}
/** !NOTE */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
