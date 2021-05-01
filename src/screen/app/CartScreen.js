import { Feather } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Modal,
} from "react-native";
import {
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../../assets/color/colors";
import { PrimaryButton } from "../../component/Button";
import { AppContext } from "../HomeScreen";

export default function CartScreen({ navigation }) {
  const cartContext = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);

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

  function clearCart() {
    // setModalVisible(false);
    // Alert.alert("Checkout", "Submit your order");
    // cartContext.setCartItems([]);
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
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={modalVisible}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 25, marginTop: 20 }}>
            Thông tin khách hàng{" "}
          </Text>
          {/* <Text style={{ fontSize: 16, color: "gray", marginTop: 20 }}>
        Sign up to continue
      </Text> */}

          <TextInput
            style={{
              marginTop: 40,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
            placeholder="Số điện thoại"
            onChangeText={(text) => setEmailOrPhone(text)}
          />

          <TextInput
            style={{
              marginTop: 40,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
            placeholder="Họ & Tên"
            onChangeText={(text) => setUsername(text)}
          />

          <TextInput
            style={{
              marginTop: 40,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
            placeholder="Địa chỉ"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
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
              <Text
                style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
          <PrimaryButton
            title="CHECKOUT"
            onPress={() => setModalVisible(!modalVisible)}
          />
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
