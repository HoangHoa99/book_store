import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import colors from "../../assets/color/colors";
import { ScrollView } from "react-native-gesture-handler";
import {AppContext} from '../HomeScreen';

export default function BookDetailScreen({ route, navigation }) {

  let cartContext = useContext(AppContext);

  const [item, setItem] = useState({});

  useEffect(() => {
    let { book } = route.params;
    setItem(book);
  }, [item]);

  const addToCart = async () => {
    try {
      const res = cartContext.cartItems;
      const itemCopy = res.find((existedItem) => existedItem.id === item.id);
      if (itemCopy) {
        alert("Item have been added");
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

      cartContext.setCartItems(res);
    } catch (e) {}
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.headerLeft}>
                <Feather
                  name="chevron-left"
                  size={15}
                  color={colors.textDark}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
              <View style={styles.headerRight}>
                <MaterialCommunityIcons
                  name="shopping"
                  size={30}
                  color={colors.black}
                />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Titles */}
        <View style={styles.titlesWrapper}>
          <Text style={styles.title}>{item.title}</Text>
        </View>

        {/* Price */}
        <View style={styles.priceWrapper}>
          <Text style={styles.priceText}>${item.price}</Text>
        </View>

        {/* Pizza info */}
        <View style={styles.infoWrapper}>
          <View style={styles.infoLeftWrapper}>
            <View style={styles.infoItemWrapper}>
              <Text style={styles.infoItemTitle}>Tác giả</Text>
              <Text style={styles.infoItemText}>{item.author}</Text>
            </View>
            <View style={styles.infoItemWrapper}>
              <Text style={styles.infoItemTitle}>Nhà xuất bản</Text>
              <Text style={styles.infoItemText}>{item.publisher}</Text>
            </View>
            <View style={styles.infoItemWrapper}>
              <Text style={styles.infoItemTitle}>Thể loại</Text>
              <Text style={styles.infoItemText}>
                {item.category}
                
              </Text>
            </View>
          </View>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
          </View>
        </View>

        {/* Place an order */}
        <TouchableOpacity onPress={() => addToCart()}>
          <View style={styles.orderWrapper}>
            <Text style={styles.orderText}>Add to cart</Text>
            <Feather name="chevron-right" size={18} color={colors.black} />
          </View>
        </TouchableOpacity>

        <View
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.titleOverview}>Overview</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Feather name="star" size={16} color= {colors.primary} />
              <Text style={{marginHorizontal: 2}}>{item.rating}</Text>
              <Text>({item.reviews})</Text>
            </View>
          </View>
        </View>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{item.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerLeft: {
    borderColor: colors.textLight,
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  headerRight: {
    // backgroundColor: colors.primary,
    padding: 10,
    // borderRadius: 10,
    // borderColor: colors.primary,
    // borderWidth: 2,
  },
  titlesWrapper: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 32,
    color: colors.textDark,
    width: "90%",
  },
  priceWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  priceText: {
    color: colors.price,
    fontFamily: "Montserrat-Bold",
    fontSize: 28,
  },
  infoWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLeftWrapper: {
    paddingLeft: 20,
  },
  infoItemWrapper: {
    marginBottom: 30,
  },
  infoItemTitle: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
    color: colors.subBlack,
  },
  infoItemText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    color: colors.textDark,
    marginTop: 5,
  },
  imageWrapper: {
    width: 280,
    height: 320,
  },
  itemImage: {
    resizeMode: "contain",
    marginLeft: 0,
    width: "100%",
    height: "100%",
  },
  orderWrapper: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  orderText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    marginRight: 10,
  },
  section: {
    marginTop: 10,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  sectionLarge: {
    minHeight: 300,
  },
  titleOverview: {
    fontSize: 28,
  },
});
