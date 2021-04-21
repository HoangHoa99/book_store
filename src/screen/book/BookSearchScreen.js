import React, {useState} from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import COLORS from "../../assets/color/colors";
import categories from "../../clone/Categories";
import { bestSellers } from "../../clone/DataClone";
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

export default function BookSearchScreen({ navigation }) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  // ANCHOR - Declare refresh item

  const addToCart = async (item) => {
    try {
      const cartList = await AsyncStorage.getItem("@cartList");
      let res = cartList != null ? JSON.parse(cartList) : [];
      const itemCopy = res.find((existedItem) => existedItem.id === item.id);
      if (itemCopy) {
        alert("Item have already added");
      } else {
        let newItem = {
          id: item.id,
          title: item.title,
          qty: 1,
          checked: 1,
          price: item.price,
          image: item.image,
        };
        res.push(newItem);
      }

      AsyncStorage.setItem("@cartList", JSON.stringify(res));
    } catch (e) {}
  }

  function ListCategories() {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}
            >
              <View style={style.categoryBtnImgCon}>
                <Feather name="tag" size={25} color={COLORS.price} />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}
              >
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  function Card({ item }) {
    function formatTitle(title) {
      var returnTitle = title;
      var dotdotdot = "...";
      if (title.length > 15) {
        returnTitle = title.substring(0, 16) + dotdotdot;
      }

      return returnTitle;
    }
    return (
      <TouchableOpacity
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("BookDetailScreen", { book: item })}
      >
        <View style={style.card}>
          <View>
            <View
              style={{
                overflow: "hidden",
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ height: 200, width: 160 }}
              />
            </View>

            <View style={{ marginTop: 5 }}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: COLORS.black,
                  }}
                >
                  {formatTitle(item.title)}
                </Text>
                <Text
                  style={{ fontSize: 14, color: COLORS.black, marginTop: 2 }}
                >
                  {item.author}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", marginLeft: 0 }}
                  >
                    ${item.price}
                  </Text>
                  <TouchableOpacity
                  onPress={() => addToCart(item)}>
                  <View style={style.addToCartBtn}>
                    <Feather name="plus" size={20} color={COLORS.white} />
                  </View>
                  </TouchableOpacity>
                  
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <View style={style.inputContainer}>
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search for item"
          />
        </View>
        <View style={style.sortBtn}>
          <Feather name="search" size={28} color={COLORS.white} />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={bestSellers}
        renderItem={({ item }) => <Card item={item} />}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.textLight,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 280,
    width: cardWidth,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
});
