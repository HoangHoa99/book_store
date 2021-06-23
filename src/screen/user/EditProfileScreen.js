import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

export default function EditProfileScreen({ route, navigation }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    let { data } = route.params;
    setProfile(data);
  }, [profile]);

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
      ></View>
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
            <TextInput
              style={{ fontSize: 22, fontFamily: "AppleSDGothicNeo-Regular" }}
            >
              {profile.phone}
            </TextInput>
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
            <TextInput
              style={{ fontSize: 22, fontFamily: "AppleSDGothicNeo-Regular" }}
            >
              {profile.email}
            </TextInput>
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
            <TextInput
              style={{ fontSize: 22, fontFamily: "AppleSDGothicNeo-Regular" }}
            >
              {profile.address}
            </TextInput>
          </View>

          <View style={{ flex: 0.5, backgroundColor: "#4dcaf3" }}></View>
        </View>

      </View>
    </View>
  );
}
