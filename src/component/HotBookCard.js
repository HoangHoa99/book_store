import React from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";

export default function HotBookCart({ item, navigation }) {
  const hotItem = item.books_Product[0];
  
  let imageUri = hotItem ? hotItem.images : '';
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BookDetailScreen", {
            book: hotItem,
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
              uri: imageUri
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
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {/* <Feather name="star" size={18} color="white" /> 4 */}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </>
  );
}
