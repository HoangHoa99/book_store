import React, {useContext} from "react";
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
import {AppContext} from '../HomeScreen';

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

export default function BookSearchScreen({ navigation }) {

  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  
  let appContext = useContext(AppContext);

  function getBookByCate(){
    switch(selectedCategoryIndex){
      case 0:
        return appContext.vanhoc;
      case 1:
        return appContext.sachthieunhi;
      case 2:
        return appContext.kinhte;
      case 3:
        return appContext.tieusuhoiky;
      case 4:
        return appContext.tamly;
      case 5:
        return appContext.ngoaingu;
    }
  }

  // ANCHOR - Declare refresh item

  const addToCart = async (item) => {
    
    try {
      const res = appContext.isLogin
      ? appContext.userCart
      : appContext.cartItems;
      const itemCopy = res.find((existedItem) => existedItem._id === item._id);
      if (itemCopy) {
        alert("Item have been added");
      } else {
        let newItem = {
          _id: item._id,
          book: {            
            title: item.title,
            price: item.price,
            images: item.images,
          },
          amount: 1,
        };
        res.push(newItem);
      }
      
      appContext.isLogin
            ? appContext.setUserCart(res)
            : appContext.setCartItems(res);
    } catch (e) {}
  }

  function ListCategories() {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}
      >
        {appContext.categories.map((category, index) => (
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
      if (title.length > 12) {
        returnTitle = title.substring(0, 13) + dotdotdot;
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
                source={{ uri: item.images }}
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
            style={{ flex: 1, fontSize: 18, color: COLORS.black}}
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
        data={getBookByCate()}
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
    backgroundColor: COLORS.subTextLight,
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
    height: 50,
    width: 170,
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
