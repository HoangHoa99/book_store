import React from "react";
import { View, Image } from "react-native";

export default function EmptyCart() {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#fff"
        }}
      >
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={require("../assets/image/empty_cart.png")}
        />
      </View>
    </>
  );
}
