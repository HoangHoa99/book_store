import React from "react";
import { View, Text, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { orderList } from "../../clone/DataClone";

export default function OrderScreen({ navigation }) {
  function OrderItem({ item }) {
    return (
      <>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              height: 130,
              backgroundColor: "#fff",
              marginTop: 20,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: "#bcbcbc",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <View style={{ flex: 1.5, flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                <Text>{item.cusName}</Text>
              </View>
              <View style={{ flex: 0.5 }}></View>
              <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                <Text>Chờ xác nhận</Text>
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
            <View style={{ flex: 3.5, flexDirection: "row" }}>
                <View style={{ flex: 2, flexDirection: "column", justifyContent: "space-between", marginTop: 5, marginBottom: 5, marginLeft: 15 }}>
                    <TitleText title = "SDT" value = {item.phone} />
                    <TitleText title = "Tổng giá trị" value = {item.totalPrice}/>
                    <TitleText title = "Ngày tạo" value = {item.createDate}/>
                </View>
                
                <View style={{ flex: 1.5, flexDirection: "column", alignItems: "flex-start", marginTop: 5 }}>
                <TitleText title = {"OrderId"} value = {item.orderId}/>
                </View>
            </View>
          </View>
        </View>
      </>
    );
  }

//   const filterList = orderList.filter(item => item.status === "1");
  const filterList = orderList;

  function TitleText({title, value}){
      return (
          <>
            <View style = {{flexDirection: "row"}}>
            <Text style = {{fontFamily: "Arial", color: "#aaa"}}>{title}: </Text>
            <Text style = {{fontFamily: "AppleSDGothicNeo-Light", color: "#000"}}>{value}</Text>
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
              <Text style={{
                  fontSize: 25,
                  fontFamily: "Arial-BoldMT"
              }}>ĐƠN HÀNG</Text>
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
        <View style={{ flex: 0.5 }}>
        </View>
      </View>
    </>
  );
}
