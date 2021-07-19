import { Feather, Entypo, FontAwesome } from "@expo/vector-icons";
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
  ScrollView,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../../assets/color/colors";
import { PrimaryButton } from "../../component/Button";
import { AppContext } from "../HomeScreen";
import {
  AddToCartFromLg,
  DeleteCartItem,
  OrderAdd,
} from "../../service/CartService";
import Loading from "../Loading";

export default function CartScreen({ navigation }) {
  // ANCHOR - Declare state
  const cartContext = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [key, setKey] = useState(0);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  function loadCartData() {
    setKey((preKey) => preKey + 1);
    setPhone(cartContext.userProfile.phone);
    setName(cartContext.userProfile.username);
    setAddress(cartContext.userProfile.address);
  }

  // reload data
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadCartData();
    });

    return unsubscribe;
  }, [navigation, key]);

  function clearCart() {
    Alert.alert(
      "Xác nhận đặt hàng?",
      "",
      [
        {
          text: "Huỷ",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: () => {
            confirmOrder();
            setModalVisible(false);
            cartContext.setUserCart([]);
          },
        },
      ],
      { cancelable: false }
    );
  }

  async function checkoutBtn() {

    var userLogin = cartContext.isLogin;
    var userCart = cartContext.cartItems;
    if(userLogin){
      userCart = cartContext.userCart;
    }
    if (
      userCart.length === 0
    ) {
      Alert.alert("Giỏ hàng trống", "Thêm ít nhất một sản phẩm");
    } else {
      if (userLogin) {
        var cartAdd = [];

        cartContext.userCart.forEach((item) => {
          var addItem = {
            book: item._id,
            amount: item.amount,
          };

          cartAdd.push(addItem);
        });

        cartContext.setCartItems([]);
        await AddToCartFromLg(cartAdd, cartContext.user.accessToken);
        setModalVisible(!modalVisible);
      }
      else{
        Alert.alert(
          "Đăng nhập để tiếp tục",
          "",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Ok",
              onPress: () => {
                navigation.navigate("ProfileScreen");
              },
            },
          ],
          { cancelable: false }
        );
      }
    }
  }

  async function confirmOrder() {
    
    var cartList = cartContext.userCart;

    var orderList = [];

    if (cartList.length > 0) {
      cartList.forEach((cart) => {
        var orderItem = {
          book: cart._id,
          quantity: cart.amount,
          totalPrice: cart.amount * cart.book.price,
        };

        orderList.push(orderItem);
      });

      OrderAdd(
        orderList,
        address,
        note,
        totalPrice(),
        cartContext.user.accessToken
      );
    }
  }

  /** SECTION - Handle cart item */

  /** tinh total bill */
  function totalPrice() {
    var cart = cartContext.isLogin
      ? cartContext.userCart
      : cartContext.cartItems;
    return cart.reduce(
      (sum, calcItem) => sum + calcItem.book.price * calcItem.amount,
      0
    );
  }

  /**tang giam so luong item */
  function quantityHandler(action, index) {
    let newCartItems = cartContext.isLogin
      ? cartContext.userCart
      : cartContext.cartItems;

    const currentItem = newCartItems.find((element) => element._id === index);
    let indexOfCurItem = newCartItems.indexOf(currentItem);
    let currentQty = currentItem.amount;

    if (action == "more") {
      currentItem.amount = currentQty + 1;
    } else if (action == "less") {
      currentItem.amount = currentQty > 1 ? currentQty - 1 : 1;
    }
    newCartItems[indexOfCurItem] = currentItem;

    cartContext.isLogin
      ? cartContext.setUserCart(newCartItems)
      : cartContext.setCartItems(newCartItems);

    loadCartData();
  }

  /** xoa item trong cart */
  function deleteHandler(index) {
    Alert.alert(
      "Bạn không mua cuốn sách này nữa?",
      "",
      [
        {
          text: "Không",
          style: "cancel",
        },
        {
          text: "Chuẩn",
          onPress: () => {
            let updatedCart = cartContext.isLogin
              ? cartContext.userCart
              : cartContext.cartItems; /* Clone it first */

            const delItem = updatedCart.find(
              (element) => element._id === index
            );
            let indexOfDelItem = updatedCart.indexOf(delItem);
            updatedCart.splice(indexOfDelItem, 1);
            cartContext.isLogin
              ? cartContext.setUserCart(updatedCart)
              : cartContext.setCartItems(updatedCart);
            DeleteCartItem(delItem._id, cartContext.user.accessToken);
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
        <Image
          source={{ uri: item.book.images }}
          style={{ height: 80, width: 60 }}
        />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {item.book.title}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            ${item.book.price}
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
            {item.amount}
          </Text>
          <View style={style.actionBtn}>
            <TouchableOpacity onPress={() => quantityHandler("less", item._id)}>
              <Icon name="remove" size={25} color={colors.white} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => quantityHandler("more", item._id)}>
              <Icon name="add" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => deleteHandler(item._id)}>
          <Feather name="trash" size="28" color={colors.red} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      {cartContext.loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
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
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  marginRight: 10,
                }}
              >
                <Feather
                  name="x-circle"
                  size={35}
                  color={colors.red}
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#FFF",
                  padding: 20,
                }}
              >
                <Text style={{ fontSize: 25, marginTop: 20 }}>
                  Thông tin khách hàng
                </Text>

                <FontAwesome
                  name="phone"
                  size="28"
                  color={colors.black}
                  style={{ marginTop: 25 }}
                />
                <TextInput
                  style={{
                    marginTop: 15,
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    paddingBottom: 20,
                  }}
                  placeholder={phone}
                  onChangeText={(text) => setPhone(text)}
                />

                <FontAwesome
                  name="user"
                  size="28"
                  color={colors.black}
                  style={{ marginTop: 25 }}
                />
                <TextInput
                  style={{
                    marginTop: 15,
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    paddingBottom: 20,
                  }}
                  placeholder={name}
                  onChangeText={(text) => setName(text)}
                />

                <Entypo
                  name="address"
                  size="28"
                  color={colors.black}
                  style={{ marginTop: 25 }}
                />
                <TextInput
                  style={{
                    marginTop: 15,
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    paddingBottom: 20,
                  }}
                  placeholder={address}
                  onChangeText={(text) => setAddress(text)}
                />

                <FontAwesome
                  name="sticky-note"
                  size="28"
                  color={colors.black}
                  style={{ marginTop: 25 }}
                />
                <TextInput
                  style={{
                    marginTop: 15,
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                    paddingBottom: 20,
                  }}
                  placeholder="Ghi chú"
                  onChangeText={(text) => setNote(text)}
                />

                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 40,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => clearCart()}
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
                      style={{
                        textAlign: "center",
                        color: "#FFF",
                        fontSize: 16,
                      }}
                    >
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={style.header}>
              <Icon
                name="arrow-back-ios"
                size={28}
                onPress={navigation.goBack}
              />
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
              data={
                cartContext.isLogin
                  ? cartContext.userCart
                  : cartContext.cartItems
              }
              renderItem={({ item }) => <CartCard item={item} />}
              ListFooterComponentStyle={{
                paddingHorizontal: 20,
                marginTop: 20,
              }}
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 15,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginLeft: 45 }}
                >
                  Total Price
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginRight: 45 }}
                >
                  ${totalPrice()}
                </Text>
              </View>
              <View style={{ marginHorizontal: 30 }}>
                <PrimaryButton title="CHECKOUT" onPress={() => checkoutBtn()} />
              </View>
            </View>
          </SafeAreaView>
        </>
      )}
    </>
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
