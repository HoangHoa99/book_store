import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import colors from "../../assets/color/colors";
import { ScrollView } from "react-native-gesture-handler";
import {AppContext} from '../HomeScreen';
import i18n from 'i18n-js';

export default function BookDetailScreen({ route, navigation }) {

  let cartContext = useContext(AppContext);

  const [item, setItem] = useState({});
  let instock = true;

  useEffect(() => {
    let { book } = route.params;
    setItem(book);
  }, [item]);


  const addToCart = async () => {
    if(instock){
      try {
        const res = cartContext.isLogin
        ? cartContext.userCart
        : cartContext.cartItems;
        const itemCopy = res.find((existedItem) => existedItem._id === item._id);
        if (itemCopy) {
          Alert.alert(i18n.t('item_has_been_added'));
        } else {
          let newItem = {
            _id: item._id,
            book: {            
              title: item.title,
              price: item.price,
              images: item.images,
              quantity: item.quantity,
            },
            amount: 1,
          };
          res.push(newItem);
        }
        
        cartContext.isLogin
              ? cartContext.setUserCart(res)
              : cartContext.setCartItems(res);
      } catch (e) {
        console.error(e);
      }
    }
    else{
      Alert.alert(i18n.t('out_of_stock') + "!", i18n.t('contact_us'));
    }
    
  }

  function getCategoryName(value){
    var category = cartContext.categories.find((cate) => cate._id === value);
    if(category){
      return category.name;
    }

    var a = {...value};
    if(a instanceof Object){
      return a.name;
    }
  }

  function productStatus(itemQuantity){
    if(itemQuantity > 0){
      return i18n.t('in_stock');
    }
    instock = false;
    return i18n.t('out_of_stock');
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
              <Text style={styles.infoItemTitle}>{i18n.t('author')}</Text>
              <Text style={styles.infoItemText}>{item.author}</Text>
            </View>
            <View style={styles.infoItemWrapper}>
              <Text style={styles.infoItemTitle}>{i18n.t('state')}</Text>
              <Text style={styles.infoItemText}>{productStatus(item.quantity)}</Text>
            </View>
            <View style={styles.infoItemWrapper}>
              <Text style={styles.infoItemTitle}>{i18n.t('category')}</Text>
              <Text style={styles.infoItemText}>
                {getCategoryName(item.category)}
                
              </Text>
            </View>
          </View>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.images }} style={styles.itemImage} />
          </View>
        </View>

        {/* Place an order */}
        <TouchableOpacity onPress={() => addToCart()}>
          <View style={styles.orderWrapper}>
            <Text style={styles.orderText}>{i18n.t('add_to_cart')}</Text>
            <Feather name="chevron-right" size={18} color={colors.black} />
          </View>
        </TouchableOpacity>

        <View
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.titleOverview}>{i18n.t('overview')}</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Feather name="star" size={16} color= {colors.primary} />
              <Text style={{marginHorizontal: 2}}>4</Text>
              <Text>(100)</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionLarge}>
          <Text style={styles.sectionContent}>{item.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
    flex: 1
  },
  infoLeftWrapper: {
    paddingLeft: 20,
    flex: 3
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
    flex: 5
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
    fontSize: 20,
    textAlign: 'auto',
  },
  sectionLarge: {
    padding: 30, 
    margin: 5
  },
  titleOverview: {
    fontSize: 28,
  },
});
