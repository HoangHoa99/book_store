import React from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

export default function BookCart({ item, navigation }) {
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BookDetailScreen", {
            book: item,
          })
        }
      >
        <View
          style={{
            overflow: "hidden",
            borderRadius: 10,
            marginRight: 10,
            maxHeight: 200,
          }}
        >
          <ImageBackground
            style={{
              width: 150,
              height: 200,
            }}
            source={{
              uri: item.image,
            }}
          >
            <View style={{ position: "absolute", bottom: 20, left: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <Feather name="star" size={18} color="white" /> {item.rating}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </>
  );
}
