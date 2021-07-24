import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { orderStatus } from "../../clone/DataClone";
import { GetMyOrder } from "../../service/CartService";
import { AppContext } from "../HomeScreen";
import i18n from 'i18n-js';

export default function OrderScreen({ navigation }) {
  const orderContext = useContext(AppContext);

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getOrderList = async () => {
      GetMyOrder(orderContext.user.accessToken).then((res) => {
        setOrderList(res.data);
      });
    };

    getOrderList();
  }, []);

  function getOrderId(id) {
    return id.substring(2, 8);
  }

  function getDateOrder(date) {
    return new Date(date).toLocaleString();
  }

  function getOrderStatus(status) {
    var orderStt = orderStatus.find((item) => item.status === status);
    return orderStt.content;
  }

  function OrderItem({ item }) {
    return (
      <>
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() => alert("heheh")}
        >
          <View
            style={{
              width: "85%",
              height: 140,
              backgroundColor: "#fff",
              marginTop: 20,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: "#bcbcbc",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <View style={{ flex: 1.2, flexDirection: "row", marginTop: 10 }}>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginLeft: 10,
                }}
              >
                <Text>{item.user.username}</Text>
              </View>
              <View style={{ flex: 0.5 }}></View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{getOrderStatus(item.status)}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text>------------------------------------------</Text>
            </View>
            <View style={{ flex: 3.7, flexDirection: "row" }}>
              <View
                style={{
                  flex: 2.2,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 15,
                }}
              >
                <TitleText title={i18n.t('phone')} value={item.user.phone} />
                <TitleText title={i18n.t('total_price')} value={item.totalrice} />
                <TitleText
                  title={i18n.t('date_create')}
                  value={getDateOrder(item.createdAt)}
                />
                <TitleText title={i18n.t('note')} value={item.note} />
              </View>

              <View
                style={{
                  flex: 1.5,
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginTop: 5,
                }}
              >
                <TitleText title={i18n.t('order_id')} value={getOrderId(item._id)} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }

  const filterList = orderList;

  function TitleText({ title, value }) {
    return (
      <>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: "Arial", color: "#aaa" }}>{title}: </Text>
          <Text style={{ fontFamily: "AppleSDGothicNeo-Light", color: "#000" }}>
            {value}
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 0.5, flexDirection: "row" }}>
          <View
            style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Arial-BoldMT",
              }}
            >
              {i18n.t('your_orders')}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            {/* <Text>Chờ xác nhận</Text> */}
          </View>
        </View>
        <View style={{ flex: 7.5 }}>
          <ScrollView style={{ marginTop: 5 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={false}
              numColumns={1}
              data={filterList}
              renderItem={({ item }) => <OrderItem item={item} />}
            />
          </ScrollView>
        </View>
        <View style={{ flex: 0.5 }}></View>
      </View>
    </>
  );
}
