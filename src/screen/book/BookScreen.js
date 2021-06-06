import React, {useContext} from "react";
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import BookCart from "../../component/BookCart";
import { bestSellers } from "../../clone/DataClone";
import {AppContext} from '../HomeScreen';



export default function BookScreen({ navigation }) {

  const checkIsLogin = useContext(AppContext);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar hidden />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            overflow: "hidden",
            borderBottomRightRadius: 50,
          }}
        >
          <ImageBackground
            style={{
              width: "100%",
              height: 250,
            }}
            source={{
              uri:
                "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginTop: 20,
              }}
            >
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("InformationScreen")}
                >
                  <MaterialCommunityIcons name="text" size={25} color="white" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {/* <View
                  style={{
                    marginRight: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CartScreen")}
                  >
                    <MaterialCommunityIcons name="shopping" size={25} color="white" />
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                flex: 1,
                marginTop: -15,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Hello Haksa,
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Hope you have a great day!
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                    marginTop: 5,
                    backgroundColor: "grey",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    CASUAL MEMBER
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 16,
              color: "black",
              fontWeight: "bold",
            }}
          >
            BEST SELLER!,
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "grey",
              fontWeight: "bold",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          style={{
            paddingLeft: 20,
            paddingRight: 10,
            marginTop: 10,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              numColumns={1}
              data={bestSellers}
              renderItem={({ item }) => (
                <BookCart item={item} navigation={navigation} />
              )}
            />
            <View style={{ width: 30 }}></View>
          </View>
        </ScrollView>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 16,
              color: "black",
              fontWeight: "bold",
            }}
          >
            NEWEST BOOKS!,
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "grey",
              fontWeight: "bold",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          style={{
            paddingLeft: 20,
            paddingRight: 10,
            marginTop: 10,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                overflow: "hidden",
                borderRadius: 10,
                marginRight: 10,
                maxWidth: 250,
              }}
            >
              <ImageBackground
                style={{
                  width: 250,
                  height: 150,
                }}
                source={{
                  uri:
                    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
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
                    Lorem Ipsum
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    <Feather name="star" size={18} color="white" /> 5
                  </Text>
                </View>
              </ImageBackground>
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Lorem Ipsum
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "grey",
                  fontWeight: "bold",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor..
              </Text>
            </View>
            <View
              style={{
                overflow: "hidden",
                borderRadius: 10,
                marginRight: 10,
                maxWidth: 250,
              }}
            >
              <ImageBackground
                style={{
                  width: 250,
                  height: 150,
                }}
                source={{
                  uri:
                    "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
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
                    Lorem Ipsum
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    <Feather name="star" size={18} color="white" /> 5
                  </Text>
                </View>
              </ImageBackground>
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Lorem Ipsum
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "grey",
                  fontWeight: "bold",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor..
              </Text>
            </View>
            <View
              style={{
                overflow: "hidden",
                borderRadius: 10,
                marginRight: 10,
                maxWidth: 250,
              }}
            >
              <ImageBackground
                style={{
                  width: 250,
                  height: 150,
                }}
                source={{
                  uri:
                    "https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
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
                    Lorem Ipsum
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    <Feather name="star" size={18} color="white" /> 5
                  </Text>
                </View>
              </ImageBackground>
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Lorem Ipsum
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "grey",
                  fontWeight: "bold",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor..
              </Text>
            </View>
            <View
              style={{
                overflow: "hidden",
                borderRadius: 10,
                marginRight: 10,
                maxWidth: 250,
              }}
            >
              <ImageBackground
                style={{
                  width: 250,
                  height: 150,
                }}
                source={{
                  uri:
                    "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
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
                    Lorem Ipsum
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    <Feather name="star" size={18} color="white" /> 5
                  </Text>
                </View>
              </ImageBackground>
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Lorem Ipsum
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "grey",
                  fontWeight: "bold",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor..
              </Text>
            </View>
            <View style={{ width: 30 }}></View>
          </View>
        </ScrollView>

        {checkIsLogin.isLogin ? (
          <>
            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                YOUR FAVORITE!,
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "grey",
                  fontWeight: "bold",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              style={{
                paddingLeft: 20,
                paddingRight: 10,
                marginTop: 10,
              }}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  numColumns={1}
                  data={bestSellers}
                  renderItem={({ item }) => (
                    <BookCart item={item} navigation={navigation} />
                  )}
                />
                <View style={{ width: 30 }}></View>
              </View>
            </ScrollView>
          </>
        ) : (
          <></>
        )}
        <View
          style={{
            height: 30,
          }}
        ></View>
      </ScrollView>
    </View>
  );
}
