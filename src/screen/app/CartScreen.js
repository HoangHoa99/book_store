import { Feather } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, Alert } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../../assets/color/colors";
import { PrimaryButton } from "../../component/Button";
import { AppContext } from "../HomeScreen";

export default function CartScreen({ navigation }) {
  const cartContext = useContext(AppContext);

  const [key, setKey] = useState(0);

  function loadCartData() {
    setKey((preKey) => preKey + 1);
  }

  // reload data
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadCartData();
    });

    return unsubscribe;
  }, [navigation, key]);

  async function clearCart() {
    cartContext.setCartItems([]);
  }

  /** SECTION - Handle cart item */

  /** tinh total bill */
  function totalPrice() {
    return cartContext.cartItems.reduce(
      (sum, calcItem) =>
        sum + (calcItem.checked == 1 ? calcItem.price * calcItem.qty : 0),
      0
    );
  }

  /**tang giam so luong item */
  function quantityHandler(action, index) {
    let newCartItems = cartContext.cartItems;

    const currentItem = newCartItems.find((element) => element.id === index);
    let indexOfCurItem = newCartItems.indexOf(currentItem);
    let currentQty = currentItem.qty;

    if (action == "more") {
      currentItem.qty = currentQty + 1;
    } else if (action == "less") {
      currentItem.qty = currentQty > 1 ? currentQty - 1 : 1;
    }
    newCartItems[indexOfCurItem] = currentItem;

    cartContext.setCartItems(newCartItems);

    loadCartData();
  }

  /** xoa item trong cart */
  function deleteHandler(index) {
    Alert.alert(
      "Are you sure to delete this item from your cart?",
      "",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            let updatedCart = cartContext.cartItems; /* Clone it first */

            const delItem = updatedCart.find((element) => element.id === index);
            let indexOfDelItem = updatedCart.indexOf(delItem);
            updatedCart.splice(indexOfDelItem, 1);
            cartContext.setCartItems(updatedCart);
            loadCartData();
          },
        },
      ],
      { cancelable: false }
    );
  }

  /** !SECTION */

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <Image source={{ uri: item.image }} style={{ height: 80, width: 60 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.title}</Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            ${item.price}
          </Text>
        </View>
        <View style={{ marginRight: 30, alignItems: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            {item.qty}
          </Text>
          <View style={style.actionBtn}>
            <TouchableOpacity onPress={() => quantityHandler("less", item.id)}>
              <Icon name="remove" size={25} color={colors.white} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => quantityHandler("more", item.id)}>
              <Icon name="add" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => deleteHandler(item.id)}>
          <Feather name="trash" size="28" color={colors.red} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={cartContext.cartItems}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 45 }}>
            Total Price
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginRight: 45 }}>
            ${totalPrice()}
          </Text>
        </View>
        <View style={{ marginHorizontal: 30 }}>
          <PrimaryButton title="CHECKOUT" onPress={() => clearCart()} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 120,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
