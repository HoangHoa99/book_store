import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { AppContext } from "../HomeScreen";
import i18n from 'i18n-js';

export default function ProfileScreen({ navigation }) {
  const checkIsLogin = useContext(AppContext);

  const userInfo = checkIsLogin.userProfile;

  function logout() {
    checkIsLogin.setIsLogin(false);
    navigation.navigate("HomeScreen");
  }

  function TitleName({ name }) {
    var whiteSpace = new RegExp("s+");
    if (whiteSpace.test(name)) {
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
            {words[words.length - 1]}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginLeft: 15,
            marginTop: 100,
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontFamily: "AppleSDGothicNeo-Medium",
              fontSize: 30,
            }}
          >
            {name}
          </Text>
        </View>
      );
    }
  }

  function Profile() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        {/** SECTION - Header */}
        <View style={{ flex: 0.3, backgroundColor: "#fff" }}></View>
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
            // (userInfo.avatar != "") ? {uri: userInfo.avatar} :
          />
          <TitleName name={userInfo.username} />
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditProfileScreen", { data: userInfo })
            }
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
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
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
                style={{ fontSize: 22 }}
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
                style={{ fontSize: 22 }}
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
                style={{ fontSize: 22 }}
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
                style={{ fontSize: 22 }}
              >
                {i18n.t('your_orders')}
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
                style={{ fontSize: 22 }}
              >
                {i18n.t('about_us')}
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
            onPress={() => logout()}
            style={{
              backgroundColor: "#f8f8f8",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              height: 60,
              width: 150,
              flexDirection: "row",
              marginTop: 30,
              marginLeft: 33,
            }}
          >
            <MaterialIcons name="logout" size={25} color="#ea1203" />
            <Text style={{ fontSize: 20, marginLeft: 5 }}>{i18n.t('sign_out')}</Text>
          </TouchableOpacity>
        </View>
        {/** !SECTION */}
      </View>
    );
  }

  return (
    <>
      {checkIsLogin.isLogin ? (
        <>
          <Profile />
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Image
              style={{ width: "100%", height: 300 }}
              source={require("../../assets/image/login-logo.png")}
              resizeMode="contain"
            />

            <Text style={{ fontSize: 40, fontWeight: "bold" }}>{i18n.t('hello')}!</Text>
            <Text
              style={{
                fontSize: 16,
                color: "gray",
                textAlign: "center",
                marginHorizontal: 20,
              }}
            >
              {i18n.t('welcome_to_out_store')}!
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
                  {i18n.t('sign_in')}
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
                  {i18n.t('sign_up')}
                </Text>
              </TouchableOpacity>
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
