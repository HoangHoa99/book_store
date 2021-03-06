import React, {useContext} from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import color from "../../assets/color/colors";
import RNPickerSelect from 'react-native-picker-select';
import i18n from 'i18n-js';
import { AppContext } from '../HomeScreen';
import { SimpleLineIcons } from "@expo/vector-icons";

// i18n.translations = {
//   en: { 
//     contact_us: 'Contact us',
//     lang: 'Language',
//     version: 'Version',
//     sign_in_to_continue: 'Sign in to continue',
//     welcome_back: 'Welcome Back',
//     sign_in: 'Sign in',
//     sign_up: 'Sign up',
//     forgot_password: 'Forgot password',
//     create_account: 'Create new account',
//     via_social: 'Login via social account',
//     username: 'username',
//     password: 'password',
//     your_orders: 'Your orders',
//     about_us: 'About us',
//     sign_out: 'Sign out',
//     hello: 'Hello',
//     welcome_to_out_store: 'Welcome to UTEStore',
//     confirm_password_is_require: 'Confirm your password',
//     password_is_require: 'Password must not be empty',
//     username_is_require: 'Username must not be empty',
//     email_is_require: 'Email must not be empty',
//     invalid_email: 'Invalid email',
//     password_length_warning: 'Password must be greater than 8 characters',
//     confirm_password_length_warning: 'Confirm password must be similar to password',
//     success: 'Success',
//     login_now: 'Login now',
//     cancel: 'Cancel',
//     become_us: 'Become to our customer',
//     confirm_password: 'Confirm password',
//     sir: 'Sir',
//     greeting_statement: 'Hope you have a greate day',
//     new_book: 'NEW BOOK',
//     new_book_desciption: 'Newest book at my store',
//     hot_book: 'BEST SELLER',
//     hot_book_description: 'Best seller of my store',
//     check_out: 'Checkout',
//     total_price: 'Total price',
//     confirm: 'Confirm',
//     user_info: 'User information',
//     remove_from_cart: 'Remove this book from your cart',
//     over_instock_quantity: 'Exceeding the remaining amount',
//     empty_cart: 'Empty cart',
//     at_least_one_item: 'Select at least one item',
//     confirm_order: 'Confirm your order',
//     order_id: 'Order ID',
//     note: 'Note',
//     date_create: 'Created at',
//     phone: 'Phone',
//     item_has_been_added: 'Item has been added',
//     out_of_stock: 'Out of stock',
//     in_stock: 'In stock',
//     author: 'Author',
//     state: 'Status',
//     category: 'Category',
//     add_to_cart: 'Add to cart',
//     overview: 'Overview',
//     search_item: 'Search book',
//   },
//   vi: { 
//     contact_us: 'Li??n h??? v???i ch??ng t??i',
//     lang: 'Ng??n ng???',
//     version: 'Phi??n b???n',    
//     sign_in_to_continue: '????ng nh???p ????? ti???p t???c',
//     welcome_back: 'Ch??o m???ng tr??? l???i',
//     sign_in: '????ng nh???p',
//     sign_up: '????ng k??',
//     forgot_password: 'Qu??n m???t kh???u',
//     create_account: '????ng k?? t??i kho???n m???i',
//     via_social: '????ng nh???p b???ng m???ng x?? h???i',
//     username: 'T??n ????ng nh???p',
//     password: 'M???t kh???u',
//     your_orders: '????n h??ng',
//     about_us: 'V??? ch??ng t??i',
//     sign_out: '????ng xu???t',
//     hello: 'Xin ch??o',
//     welcome_to_out_store: 'Ch??o b???n ?????n v???i UTEStore',
//     confirm_password_is_require: 'X??c nh???n l???i m???t kh???u',
//     password_is_require: 'M???t kh???u kh??ng ???????c ????? tr???ng',
//     username_is_require: 'T??n ????ng nh???p kh??ng ???????c ????? tr???ng',
//     email_is_require: 'Email kh??ng ???????c ????? tr???ng',
//     invalid_email: 'Email kh??ng h???p l???',
//     password_length_warning: 'M???t kh???u ph???i d??i h??n 8 k?? t???',
//     confirm_password_length_warning: 'X??c nh???n l???i m???t kh???u c???a b???n',
//     success: 'Th??nh c??ng',
//     login_now: '????ng nh???p ngay',
//     cancel: 'Hu???',
//     become_us: '????ng k?? kh??ch h??ng m???i',
//     confirm_password: 'X??c nh???n m???t kh???u',
//     sir: 'B???n',
//     greeting_statement: 'Ch??c b???n m???t ng??y t???t l??nh',
//     new_book: 'S??CH M???I',
//     new_book_desciption: 'Nh???ng ?????u s??ch v???a m???i c???p b???n',
//     hot_book: 'B??N CH???Y NH???T',
//     hot_book_description: 'Nh???ng ?????u s??ch hot nh???t c???a c???a h??ng',
//     check_out: 'Thanh to??n',
//     total_price: 'Th??nh ti???n',
//     confirm: 'X??c nh???n',
//     user_info: 'Th??ng tin kh??ch h??ng',
//     remove_from_cart: 'B??? cu???n s??ch n??y kh???i gi??? h??ng',
//     over_instock_quantity: 'V?????t qu?? s??? l?????ng c??n l???i',
//     empty_cart: 'Gi??? h??ng tr???ng',
//     at_least_one_item: 'Ch???n ??t nh???t m???t s???n ph???m',
//     confirm_order: 'X??c nh???n ?????t h??ng',
//     order_id: 'M?? ????n h??ng',
//     note: 'Ghi ch??',
//     date_create: 'T???o ng??y',
//     phone: 'S??T',
//     item_has_been_added: 'S???n ph???m ???? c?? trong gi??? h??ng',
//     out_of_stock: 'T???m h???t h??ng',
//     in_stock: 'C??n h??ng',
//     author: 'T??c gi???',
//     state: 'T??nh tr???ng',
//     category: 'Th??? lo???i',
//     add_to_cart: 'Th??m v??o gi??? h??ng',
//     overview: 'T??m t???t n???i dung',
//     search_item: 'T??m ki???m s??ch',
//   },
// };
// i18n.fallbacks = true;

export default function InformationScreen({ navigation }) {

  const appContext = useContext(AppContext);
  
  // i18n.locale = appContext.language;

  var year = new Date().getFullYear();

  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 2, backgroundColor: "#fff", justifyContent: "center" }}
        >
          <Image
            style={{
              resizeMode: "contain",
              width: 180,
              height: 180,
            }}
            source={require("../../assets/image/ute.png")}
          />
        </View>
        <View
          style={{
            flex: 0.2,
            backgroundColor: "#fff",
            justifyContent: "center",
          }}
        ></View>
        <View
          style={{
            flex: 1.6,
            backgroundColor: "#fff",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginLeft: 20,
              marginTop: 15,
              marginBottom: 15,
              alignItems: "center",
            }}
            onPress={() =>
              Linking.openURL(
                "mailto:support@utestore.com?subject=[SERVICE] ????NH GI??/PH???N H???I"
              )
            }
          >
            <FontAwesome name="send" size="30" color={color.secondary} />
            <Text style={{ fontSize: 22, marginLeft: 20 }}>
              {i18n.t('contact_us')}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              marginTop: 15,
              marginBottom: 15,
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="align-left"
              size="30"
              color={color.classic_blue}
            />
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <Text style={{ fontSize: 22, marginLeft: 20 }}>
                  {i18n.t('version')}
                </Text>
              </View>
              <View
                style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}
              >
                <Text style={{ fontSize: 18, color: color.textLight }}>
                  1.1.0
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              marginTop: 15,
              marginBottom: 15,
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="language"
              size="30"
              color={color.blue_turquoise}
            />
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <Text style={{ fontSize: 22, marginLeft: 20 }}>
                  {i18n.t('lang')}
                </Text>
              </View>
              <View
                style={{ flex: 1, alignItems: "flex-end" }}
              >
                <View style={{ 
                  flex: 5,
                  backgroundColor: "#000"
                 }}>
                </View>
                <RNPickerSelect
                    onValueChange={(value) => appContext.setLanguage(value)}
                    items={[
                        { label: 'Ti???ng Vi???t', value: 'vi-VN' },
                        { label: 'English', value: 'en-US' }
                    ]}
                    style={{
                      inputIOS: {
                        fontSize: 18,
                        paddingVertical: 10,
                        color: '#bcbcbc',
                        textAlign:'right'
                      },
                      inputAndroid: {
                        fontSize: 18,
                        paddingVertical: 10,
                        color: '#bcbcbc',
                        textAlign:'right'
                      },
                      viewContainer: {
                        marginRight: 20
                      },
                      // iconContainer: {
                      //   top: 12,
                      // },
                    }}
                    value={appContext.language}
                    // Icon={() =>{return <SimpleLineIcons name="arrow-down" size={18} color="black" />}}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1.7,
            backgroundColor: "#fff",
            justifyContent: "center",
          }}
        ></View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Text>UTE Bookstore</Text>
          <Text>Copyright &copy; {year}. All rights reserved</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scroller: {
    flex: 1,
  },
});

// //     <>
// //         {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //             <Text>App info</Text>
// //         </View> */}
// //         <ScrollView style={styles.scroller}>
// //     <Text style={{fontFamily: 'Academy Engraved LET'}}>Academy Engraved LET </Text>
// //     <Text style={{fontFamily: 'AcademyEngravedLetPlain'}}>AcademyEngravedLetPlain </Text>
// //     <Text style={{fontFamily: 'Al Nile'}}>Al Nile </Text>
// //     <Text style={{fontFamily: 'AlNile-Bold'}}>AlNile-Bold </Text>
// //     <Text style={{fontFamily: 'American Typewriter'}}>American Typewriter </Text>
// //     <Text style={{fontFamily: 'AmericanTypewriter-Bold'}}>AmericanTypewriter-Bold </Text>
// //     <Text style={{fontFamily: 'AmericanTypewriter-Condensed'}}>AmericanTypewriter-Condensed </Text>
// //     <Text style={{fontFamily: 'AmericanTypewriter-CondensedBold'}}>AmericanTypewriter-CondensedBold </Text>
// //     <Text style={{fontFamily: 'AmericanTypewriter-CondensedLight'}}>AmericanTypewriter-CondensedLight </Text>
// //     <Text style={{fontFamily: 'AmericanTypewriter-Light'}}>AmericanTypewriter-Light </Text>
// //     <Text style={{fontFamily: 'Apple Color Emoji'}}>Apple Color Emoji </Text>
// //     <Text style={{fontFamily: 'Apple SD Gothic Neo'}}>Apple SD Gothic Neo </Text>
// //     <Text style={{fontFamily: 'AppleColorEmoji'}}>AppleColorEmoji </Text>
// //     <Text style={{fontFamily: 'AppleSDGothicNeo-Bold'}}>AppleSDGothicNeo-Bold </Text>
// //     <Text style={{fontFamily: 'AppleSDGothicNeo-Light'}}>AppleSDGothicNeo-Light </Text>
// //     <Text style={{fontFamily: 'AppleSDGothicNeo-Medium'}}>AppleSDGothicNeo-Medium </Text>
// //     <Text style={{fontFamily: 'AppleSDGothicNeo-Regular'}}>AppleSDGothicNeo-Regular </Text>
// //     <Text style={{fontFamily: 'AppleSDGothicNeo-SemiBold'}}>AppleSDGothicNeo-SemiBold </Text>
// //     <Text style={{fontFamily: 'AppleSDGothicNeo-Thin'}}>AppleSDGothicNeo-Thin </Text>
// //     <Text style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}}>AppleSDGothicNeo-UltraLight </Text>
// //     <Text style={{fontFamily: 'Arial'}}>Arial </Text>
// //     <Text style={{fontFamily: 'Arial Hebrew'}}>Arial Hebrew </Text>
// //     <Text style={{fontFamily: 'Arial Rounded MT Bold'}}>Arial Rounded MT Bold </Text>
// //     <Text style={{fontFamily: 'Arial-BoldItalicMT'}}>Arial-BoldItalicMT </Text>
// //     <Text style={{fontFamily: 'Arial-BoldMT'}}>Arial-BoldMT </Text>
// //     <Text style={{fontFamily: 'Arial-ItalicMT'}}>Arial-ItalicMT </Text>
// //     <Text style={{fontFamily: 'ArialHebrew'}}>ArialHebrew </Text>
// //     <Text style={{fontFamily: 'ArialHebrew-Bold'}}>ArialHebrew-Bold </Text>
// //     <Text style={{fontFamily: 'ArialHebrew-Light'}}>ArialHebrew-Light </Text>
// //     <Text style={{fontFamily: 'ArialMT'}}>ArialMT </Text>
// //     <Text style={{fontFamily: 'ArialRoundedMTBold'}}>ArialRoundedMTBold </Text>
// //     <Text style={{fontFamily: 'Avenir'}}>Avenir </Text>
// //     <Text style={{fontFamily: 'Avenir Next'}}>Avenir Next </Text>
// //     <Text style={{fontFamily: 'Avenir Next Condensed'}}>Avenir Next Condensed </Text>
// //     <Text style={{fontFamily: 'Avenir-Black'}}>Avenir-Black </Text>
// //     <Text style={{fontFamily: 'Avenir-BlackOblique'}}>Avenir-BlackOblique </Text>
// //     <Text style={{fontFamily: 'Avenir-Book'}}>Avenir-Book </Text>
// //     <Text style={{fontFamily: 'Avenir-BookOblique'}}>Avenir-BookOblique </Text>
// //     <Text style={{fontFamily: 'Avenir-Heavy'}}>Avenir-Heavy </Text>
// //     <Text style={{fontFamily: 'Avenir-HeavyOblique'}}>Avenir-HeavyOblique </Text>
// //     <Text style={{fontFamily: 'Avenir-Light'}}>Avenir-Light </Text>
// //     <Text style={{fontFamily: 'Avenir-LightOblique'}}>Avenir-LightOblique </Text>
// //     <Text style={{fontFamily: 'Avenir-Medium'}}>Avenir-Medium </Text>
// //     <Text style={{fontFamily: 'Avenir-MediumOblique'}}>Avenir-MediumOblique </Text>
// //     <Text style={{fontFamily: 'Avenir-Oblique'}}>Avenir-Oblique </Text>
// //     <Text style={{fontFamily: 'Avenir-Roman'}}>Avenir-Roman </Text>
// //     <Text style={{fontFamily: 'AvenirNext-Bold'}}>AvenirNext-Bold </Text>
// //     <Text style={{fontFamily: 'AvenirNext-BoldItalic'}}>AvenirNext-BoldItalic </Text>
// //     <Text style={{fontFamily: 'AvenirNext-DemiBold'}}>AvenirNext-DemiBold </Text>
// //     <Text style={{fontFamily: 'AvenirNext-DemiBoldItalic'}}>AvenirNext-DemiBoldItalic </Text>
// //     <Text style={{fontFamily: 'AvenirNext-Heavy'}}>AvenirNext-Heavy </Text>
// //     <Text style={{fontFamily: 'AvenirNext-HeavyItalic'}}>AvenirNext-HeavyItalic </Text>
// //     <Text style={{fontFamily: 'AvenirNext-Italic'}}>AvenirNext-Italic </Text>
// //     <Text style={{fontFamily: 'AvenirNext-Medium'}}>AvenirNext-Medium </Text>
// //     <Text style={{fontFamily: 'AvenirNext-MediumItalic'}}>AvenirNext-MediumItalic </Text>
// //     <Text style={{fontFamily: 'AvenirNext-Regular'}}>AvenirNext-Regular </Text>
// //     <Text style={{fontFamily: 'AvenirNext-UltraLight'}}>AvenirNext-UltraLight </Text>
// //     <Text style={{fontFamily: 'AvenirNext-UltraLightItalic'}}>AvenirNext-UltraLightItalic </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-Bold'}}>AvenirNextCondensed-Bold </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-BoldItalic'}}>AvenirNextCondensed-BoldItalic </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-DemiBold'}}>AvenirNextCondensed-DemiBold </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-DemiBoldItalic'}}>AvenirNextCondensed-DemiBoldItalic </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-Heavy'}}>AvenirNextCondensed-Heavy </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-HeavyItalic'}}>AvenirNextCondensed-HeavyItalic </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-Italic'}}>AvenirNextCondensed-Italic </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-Medium'}}>AvenirNextCondensed-Medium </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-MediumItalic'}}>AvenirNextCondensed-MediumItalic </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-Regular'}}>AvenirNextCondensed-Regular </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-UltraLight'}}>AvenirNextCondensed-UltraLight </Text>
// //     <Text style={{fontFamily: 'AvenirNextCondensed-UltraLightItalic'}}>AvenirNextCondensed-UltraLightItalic </Text>
// //     <Text style={{fontFamily: 'Bangla Sangam MN'}}>Bangla Sangam MN </Text>
// //     <Text style={{fontFamily: 'Baskerville'}}>Baskerville </Text>
// //     <Text style={{fontFamily: 'Baskerville-Bold'}}>Baskerville-Bold </Text>
// //     <Text style={{fontFamily: 'Baskerville-BoldItalic'}}>Baskerville-BoldItalic </Text>
// //     <Text style={{fontFamily: 'Baskerville-Italic'}}>Baskerville-Italic </Text>
// //     <Text style={{fontFamily: 'Baskerville-SemiBold'}}>Baskerville-SemiBold </Text>
// //     <Text style={{fontFamily: 'Baskerville-SemiBoldItalic'}}>Baskerville-SemiBoldItalic </Text>
// //     <Text style={{fontFamily: 'Bodoni 72'}}>Bodoni 72 </Text>
// //     <Text style={{fontFamily: 'Bodoni 72 Oldstyle'}}>Bodoni 72 Oldstyle </Text>
// //     <Text style={{fontFamily: 'Bodoni 72 Smallcaps'}}>Bodoni 72 Smallcaps </Text>
// //     <Text style={{fontFamily: 'Bodoni Ornaments'}}>Bodoni Ornaments </Text>
// //     <Text style={{fontFamily: 'BodoniOrnamentsITCTT'}}>BodoniOrnamentsITCTT </Text>
// //     <Text style={{fontFamily: 'BodoniSvtyTwoITCTT-Bold'}}>BodoniSvtyTwoITCTT-Bold </Text>
// //     <Text style={{fontFamily: 'BodoniSvtyTwoITCTT-Book'}}>BodoniSvtyTwoITCTT-Book </Text>
// //     <Text style={{fontFamily: 'BodoniSvtyTwoITCTT-BookIta'}}>BodoniSvtyTwoITCTT-BookIta </Text>
// //     <Text style={{fontFamily: 'BodoniSvtyTwoOSITCTT-Bold'}}>BodoniSvtyTwoOSITCTT-Bold </Text>
// //     <Text style={{fontFamily: 'BodoniSvtyTwoOSITCTT-Book'}}>BodoniSvtyTwoOSITCTT-Book </Text>
// //     <Text style={{fontFamily: 'BodoniSvtyTwoSCITCTT-Book'}}>BodoniSvtyTwoSCITCTT-Book </Text>
// //     <Text style={{fontFamily: 'Bradley Hand'}}>Bradley Hand </Text>
// //     <Text style={{fontFamily: 'BradleyHandITCTT-Bold'}}>BradleyHandITCTT-Bold </Text>
// //     <Text style={{fontFamily: 'Chalkboard SE'}}>Chalkboard SE </Text>
// //     <Text style={{fontFamily: 'ChalkboardSE-Bold'}}>ChalkboardSE-Bold </Text>
// //     <Text style={{fontFamily: 'ChalkboardSE-Light'}}>ChalkboardSE-Light </Text>
// //     <Text style={{fontFamily: 'ChalkboardSE-Regular'}}>ChalkboardSE-Regular </Text>
// //     <Text style={{fontFamily: 'Chalkduster'}}>Chalkduster </Text>
// //     <Text style={{fontFamily: 'Chalkduster'}}>Chalkduster </Text>
// //     <Text style={{fontFamily: 'Cochin'}}>Cochin </Text>
// //     <Text style={{fontFamily: 'Cochin-Bold'}}>Cochin-Bold </Text>
// //     <Text style={{fontFamily: 'Cochin-BoldItalic'}}>Cochin-BoldItalic </Text>
// //     <Text style={{fontFamily: 'Cochin-Italic'}}>Cochin-Italic </Text>
// //     <Text style={{fontFamily: 'Copperplate'}}>Copperplate </Text>
// //     <Text style={{fontFamily: 'Copperplate-Bold'}}>Copperplate-Bold </Text>
// //     <Text style={{fontFamily: 'Copperplate-Light'}}>Copperplate-Light </Text>
// //     <Text style={{fontFamily: 'Courier'}}>Courier </Text>
// //     <Text style={{fontFamily: 'Courier New'}}>Courier New </Text>
// //     <Text style={{fontFamily: 'Courier-Bold'}}>Courier-Bold </Text>
// //     <Text style={{fontFamily: 'Courier-BoldOblique'}}>Courier-BoldOblique </Text>
// //     <Text style={{fontFamily: 'Courier-Oblique'}}>Courier-Oblique </Text>
// //     <Text style={{fontFamily: 'CourierNewPS-BoldItalicMT'}}>CourierNewPS-BoldItalicMT </Text>
// //     <Text style={{fontFamily: 'CourierNewPS-BoldMT'}}>CourierNewPS-BoldMT </Text>
// //     <Text style={{fontFamily: 'CourierNewPS-ItalicMT'}}>CourierNewPS-ItalicMT </Text>
// //     <Text style={{fontFamily: 'CourierNewPSMT'}}>CourierNewPSMT </Text>
// //     <Text style={{fontFamily: 'Damascus'}}>Damascus </Text>
// //     <Text style={{fontFamily: 'DamascusBold'}}>DamascusBold </Text>
// //     <Text style={{fontFamily: 'DamascusLight'}}>DamascusLight </Text>
// //     <Text style={{fontFamily: 'DamascusMedium'}}>DamascusMedium </Text>
// //     <Text style={{fontFamily: 'DamascusSemiBold'}}>DamascusSemiBold </Text>
// //     <Text style={{fontFamily: 'Devanagari Sangam MN'}}>Devanagari Sangam MN </Text>
// //     <Text style={{fontFamily: 'DevanagariSangamMN'}}>DevanagariSangamMN </Text>
// //     <Text style={{fontFamily: 'DevanagariSangamMN-Bold'}}>DevanagariSangamMN-Bold </Text>
// //     <Text style={{fontFamily: 'Didot'}}>Didot </Text>
// //     <Text style={{fontFamily: 'Didot-Bold'}}>Didot-Bold </Text>
// //     <Text style={{fontFamily: 'Didot-Italic'}}>Didot-Italic </Text>
// //     <Text style={{fontFamily: 'DiwanMishafi'}}>DiwanMishafi </Text>
// //     <Text style={{fontFamily: 'Euphemia UCAS'}}>Euphemia UCAS </Text>
// //     <Text style={{fontFamily: 'EuphemiaUCAS-Bold'}}>EuphemiaUCAS-Bold </Text>
// //     <Text style={{fontFamily: 'EuphemiaUCAS-Italic'}}>EuphemiaUCAS-Italic </Text>
// //     <Text style={{fontFamily: 'Farah'}}>Farah </Text>
// //     <Text style={{fontFamily: 'Futura'}}>Futura </Text>
// //     <Text style={{fontFamily: 'Futura-CondensedExtraBold'}}>Futura-CondensedExtraBold </Text>
// //     <Text style={{fontFamily: 'Futura-CondensedMedium'}}>Futura-CondensedMedium </Text>
// //     <Text style={{fontFamily: 'Futura-Medium'}}>Futura-Medium </Text>
// //     <Text style={{fontFamily: 'Futura-MediumItalic'}}>Futura-MediumItalic </Text>
// //     <Text style={{fontFamily: 'Geeza Pro'}}>Geeza Pro </Text>
// //     <Text style={{fontFamily: 'GeezaPro-Bold'}}>GeezaPro-Bold </Text>
// //     <Text style={{fontFamily: 'Georgia'}}>Georgia </Text>
// //     <Text style={{fontFamily: 'Georgia-Bold'}}>Georgia-Bold </Text>
// //     <Text style={{fontFamily: 'Georgia-BoldItalic'}}>Georgia-BoldItalic </Text>
// //     <Text style={{fontFamily: 'Georgia-Italic'}}>Georgia-Italic </Text>
// //     <Text style={{fontFamily: 'Gill Sans'}}>Gill Sans </Text>
// //     <Text style={{fontFamily: 'GillSans-Bold'}}>GillSans-Bold </Text>
// //     <Text style={{fontFamily: 'GillSans-BoldItalic'}}>GillSans-BoldItalic </Text>
// //     <Text style={{fontFamily: 'GillSans-Italic'}}>GillSans-Italic </Text>
// //     <Text style={{fontFamily: 'GillSans-Light'}}>GillSans-Light </Text>
// //     <Text style={{fontFamily: 'GillSans-LightItalic'}}>GillSans-LightItalic </Text>
// //     <Text style={{fontFamily: 'GillSans-SemiBold'}}>GillSans-SemiBold </Text>
// //     <Text style={{fontFamily: 'GillSans-SemiBoldItalic'}}>GillSans-SemiBoldItalic </Text>
// //     <Text style={{fontFamily: 'GillSans-UltraBold'}}>GillSans-UltraBold </Text>
// //     <Text style={{fontFamily: 'Gujarati Sangam MN'}}>Gujarati Sangam MN </Text>
// //     <Text style={{fontFamily: 'GujaratiSangamMN'}}>GujaratiSangamMN </Text>
// //     <Text style={{fontFamily: 'GujaratiSangamMN-Bold'}}>GujaratiSangamMN-Bold </Text>
// //     <Text style={{fontFamily: 'Gurmukhi MN'}}>Gurmukhi MN </Text>
// //     <Text style={{fontFamily: 'GurmukhiMN-Bold'}}>GurmukhiMN-Bold </Text>
// //     <Text style={{fontFamily: 'Heiti SC'}}>Heiti SC </Text>
// //     <Text style={{fontFamily: 'Heiti TC'}}>Heiti TC </Text>
// //     <Text style={{fontFamily: 'Helvetica'}}>Helvetica </Text>
// //     <Text style={{fontFamily: 'Helvetica Neue'}}>Helvetica Neue </Text>
// //     <Text style={{fontFamily: 'Helvetica-Bold'}}>Helvetica-Bold </Text>
// //     <Text style={{fontFamily: 'Helvetica-BoldOblique'}}>Helvetica-BoldOblique </Text>
// //     <Text style={{fontFamily: 'Helvetica-Light'}}>Helvetica-Light </Text>
// //     <Text style={{fontFamily: 'Helvetica-LightOblique'}}>Helvetica-LightOblique </Text>
// //     <Text style={{fontFamily: 'Helvetica-Oblique'}}>Helvetica-Oblique </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-Bold'}}>HelveticaNeue-Bold </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-BoldItalic'}}>HelveticaNeue-BoldItalic </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-CondensedBlack'}}>HelveticaNeue-CondensedBlack </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-CondensedBold'}}>HelveticaNeue-CondensedBold </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-Italic'}}>HelveticaNeue-Italic </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-Light'}}>HelveticaNeue-Light </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-LightItalic'}}>HelveticaNeue-LightItalic </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-Medium'}}>HelveticaNeue-Medium </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-MediumItalic'}}>HelveticaNeue-MediumItalic </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-Thin'}}>HelveticaNeue-Thin </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-ThinItalic'}}>HelveticaNeue-ThinItalic </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-UltraLight'}}>HelveticaNeue-UltraLight </Text>
// //     <Text style={{fontFamily: 'HelveticaNeue-UltraLightItalic'}}>HelveticaNeue-UltraLightItalic </Text>
// //     <Text style={{fontFamily: 'Hiragino Mincho ProN'}}>Hiragino Mincho ProN </Text>
// //     <Text style={{fontFamily: 'Hiragino Sans'}}>Hiragino Sans </Text>
// //     <Text style={{fontFamily: 'HiraginoSans-W3'}}>HiraginoSans-W3 </Text>
// //     <Text style={{fontFamily: 'HiraginoSans-W6'}}>HiraginoSans-W6 </Text>
// //     <Text style={{fontFamily: 'HiraMinProN-W3'}}>HiraMinProN-W3 </Text>
// //     <Text style={{fontFamily: 'HiraMinProN-W6'}}>HiraMinProN-W6 </Text>
// //     <Text style={{fontFamily: 'Hoefler Text'}}>Hoefler Text </Text>
// //     <Text style={{fontFamily: 'HoeflerText-Black'}}>HoeflerText-Black </Text>
// //     <Text style={{fontFamily: 'HoeflerText-BlackItalic'}}>HoeflerText-BlackItalic </Text>
// //     <Text style={{fontFamily: 'HoeflerText-Italic'}}>HoeflerText-Italic </Text>
// //     <Text style={{fontFamily: 'HoeflerText-Regular'}}>HoeflerText-Regular </Text>
// //     <Text style={{fontFamily: 'Iowan Old Style'}}>Iowan Old Style </Text>
// //     <Text style={{fontFamily: 'IowanOldStyle-Bold'}}>IowanOldStyle-Bold </Text>
// //     <Text style={{fontFamily: 'IowanOldStyle-BoldItalic'}}>IowanOldStyle-BoldItalic </Text>
// //     <Text style={{fontFamily: 'IowanOldStyle-Italic'}}>IowanOldStyle-Italic </Text>
// //     <Text style={{fontFamily: 'IowanOldStyle-Roman'}}>IowanOldStyle-Roman </Text>
// //     <Text style={{fontFamily: 'Kailasa'}}>Kailasa </Text>
// //     <Text style={{fontFamily: 'Kailasa-Bold'}}>Kailasa-Bold </Text>
// //     <Text style={{fontFamily: 'Kannada Sangam MN'}}>Kannada Sangam MN </Text>
// //     <Text style={{fontFamily: 'KannadaSangamMN'}}>KannadaSangamMN </Text>
// //     <Text style={{fontFamily: 'KannadaSangamMN-Bold'}}>KannadaSangamMN-Bold </Text>
// //     <Text style={{fontFamily: 'Khmer Sangam MN'}}>Khmer Sangam MN </Text>
// //     <Text style={{fontFamily: 'Kohinoor Bangla'}}>Kohinoor Bangla </Text>
// //     <Text style={{fontFamily: 'Kohinoor Devanagari'}}>Kohinoor Devanagari </Text>
// //     <Text style={{fontFamily: 'Kohinoor Telugu'}}>Kohinoor Telugu </Text>
// //     <Text style={{fontFamily: 'KohinoorBangla-Light'}}>KohinoorBangla-Light </Text>
// //     <Text style={{fontFamily: 'KohinoorBangla-Regular'}}>KohinoorBangla-Regular </Text>
// //     <Text style={{fontFamily: 'KohinoorBangla-Semibold'}}>KohinoorBangla-Semibold </Text>
// //     <Text style={{fontFamily: 'KohinoorDevanagari-Light'}}>KohinoorDevanagari-Light </Text>
// //     <Text style={{fontFamily: 'KohinoorDevanagari-Regular'}}>KohinoorDevanagari-Regular </Text>
// //     <Text style={{fontFamily: 'KohinoorDevanagari-Semibold'}}>KohinoorDevanagari-Semibold </Text>
// //     <Text style={{fontFamily: 'KohinoorTelugu-Light'}}>KohinoorTelugu-Light </Text>
// //     <Text style={{fontFamily: 'KohinoorTelugu-Medium'}}>KohinoorTelugu-Medium </Text>
// //     <Text style={{fontFamily: 'KohinoorTelugu-Regular'}}>KohinoorTelugu-Regular </Text>
// //     <Text style={{fontFamily: 'Lao Sangam MN'}}>Lao Sangam MN </Text>
// //     <Text style={{fontFamily: 'Malayalam Sangam MN'}}>Malayalam Sangam MN </Text>
// //     <Text style={{fontFamily: 'MalayalamSangamMN'}}>MalayalamSangamMN </Text>
// //     <Text style={{fontFamily: 'MalayalamSangamMN-Bold'}}>MalayalamSangamMN-Bold </Text>
// //     <Text style={{fontFamily: 'Marker Felt'}}>Marker Felt </Text>
// //     <Text style={{fontFamily: 'MarkerFelt-Thin'}}>MarkerFelt-Thin </Text>
// //     <Text style={{fontFamily: 'MarkerFelt-Wide'}}>MarkerFelt-Wide </Text>
// //     <Text style={{fontFamily: 'Menlo'}}>Menlo </Text>
// //     <Text style={{fontFamily: 'Menlo-Bold'}}>Menlo-Bold </Text>
// //     <Text style={{fontFamily: 'Menlo-BoldItalic'}}>Menlo-BoldItalic </Text>
// //     <Text style={{fontFamily: 'Menlo-Italic'}}>Menlo-Italic </Text>
// //     <Text style={{fontFamily: 'Menlo-Regular'}}>Menlo-Regular </Text>
// //     <Text style={{fontFamily: 'Mishafi'}}>Mishafi </Text>
// //     <Text style={{fontFamily: 'Noteworthy'}}>Noteworthy </Text>
// //     <Text style={{fontFamily: 'Noteworthy-Bold'}}>Noteworthy-Bold </Text>
// //     <Text style={{fontFamily: 'Noteworthy-Light'}}>Noteworthy-Light </Text>
// //     <Text style={{fontFamily: 'Optima'}}>Optima </Text>
// //     <Text style={{fontFamily: 'Optima-Bold'}}>Optima-Bold </Text>
// //     <Text style={{fontFamily: 'Optima-BoldItalic'}}>Optima-BoldItalic </Text>
// //     <Text style={{fontFamily: 'Optima-ExtraBlack'}}>Optima-ExtraBlack </Text>
// //     <Text style={{fontFamily: 'Optima-Italic'}}>Optima-Italic </Text>
// //     <Text style={{fontFamily: 'Optima-Regular'}}>Optima-Regular </Text>
// //     <Text style={{fontFamily: 'Oriya Sangam MN'}}>Oriya Sangam MN </Text>
// //     <Text style={{fontFamily: 'OriyaSangamMN'}}>OriyaSangamMN </Text>
// //     <Text style={{fontFamily: 'OriyaSangamMN-Bold'}}>OriyaSangamMN-Bold </Text>
// //     <Text style={{fontFamily: 'Palatino'}}>Palatino </Text>
// //     <Text style={{fontFamily: 'Palatino-Bold'}}>Palatino-Bold </Text>
// //     <Text style={{fontFamily: 'Palatino-BoldItalic'}}>Palatino-BoldItalic </Text>
// //     <Text style={{fontFamily: 'Palatino-Italic'}}>Palatino-Italic </Text>
// //     <Text style={{fontFamily: 'Palatino-Roman'}}>Palatino-Roman </Text>
// //     <Text style={{fontFamily: 'Papyrus'}}>Papyrus </Text>
// //     <Text style={{fontFamily: 'Papyrus-Condensed'}}>Papyrus-Condensed </Text>
// //     <Text style={{fontFamily: 'Party LET'}}>Party LET </Text>
// //     <Text style={{fontFamily: 'PartyLetPlain'}}>PartyLetPlain </Text>
// //     <Text style={{fontFamily: 'PingFang HK'}}>PingFang HK </Text>
// //     <Text style={{fontFamily: 'PingFang SC'}}>PingFang SC </Text>
// //     <Text style={{fontFamily: 'PingFang TC'}}>PingFang TC </Text>
// //     <Text style={{fontFamily: 'PingFangHK-Light'}}>PingFangHK-Light </Text>
// //     <Text style={{fontFamily: 'PingFangHK-Medium'}}>PingFangHK-Medium </Text>
// //     <Text style={{fontFamily: 'PingFangHK-Regular'}}>PingFangHK-Regular </Text>
// //     <Text style={{fontFamily: 'PingFangHK-Semibold'}}>PingFangHK-Semibold </Text>
// //     <Text style={{fontFamily: 'PingFangHK-Thin'}}>PingFangHK-Thin </Text>
// //     <Text style={{fontFamily: 'PingFangHK-Ultralight'}}>PingFangHK-Ultralight </Text>
// //     <Text style={{fontFamily: 'PingFangSC-Light'}}>PingFangSC-Light </Text>
// //     <Text style={{fontFamily: 'PingFangSC-Medium'}}>PingFangSC-Medium </Text>
// //     <Text style={{fontFamily: 'PingFangSC-Regular'}}>PingFangSC-Regular </Text>
// //     <Text style={{fontFamily: 'PingFangSC-Semibold'}}>PingFangSC-Semibold </Text>
// //     <Text style={{fontFamily: 'PingFangSC-Thin'}}>PingFangSC-Thin </Text>
// //     <Text style={{fontFamily: 'PingFangSC-Ultralight'}}>PingFangSC-Ultralight </Text>
// //     <Text style={{fontFamily: 'PingFangTC-Light'}}>PingFangTC-Light </Text>
// //     <Text style={{fontFamily: 'PingFangTC-Medium'}}>PingFangTC-Medium </Text>
// //     <Text style={{fontFamily: 'PingFangTC-Regular'}}>PingFangTC-Regular </Text>
// //     <Text style={{fontFamily: 'PingFangTC-Semibold'}}>PingFangTC-Semibold </Text>
// //     <Text style={{fontFamily: 'PingFangTC-Thin'}}>PingFangTC-Thin </Text>
// //     <Text style={{fontFamily: 'PingFangTC-Ultralight'}}>PingFangTC-Ultralight </Text>
// //     <Text style={{fontFamily: 'Savoye LET'}}>Savoye LET </Text>
// //     <Text style={{fontFamily: 'SavoyeLetPlain'}}>SavoyeLetPlain </Text>
// //     <Text style={{fontFamily: 'Sinhala Sangam MN'}}>Sinhala Sangam MN </Text>
// //     <Text style={{fontFamily: 'SinhalaSangamMN'}}>SinhalaSangamMN </Text>
// //     <Text style={{fontFamily: 'SinhalaSangamMN-Bold'}}>SinhalaSangamMN-Bold </Text>
// //     <Text style={{fontFamily: 'Snell Roundhand'}}>Snell Roundhand </Text>
// //     <Text style={{fontFamily: 'SnellRoundhand-Black'}}>SnellRoundhand-Black </Text>
// //     <Text style={{fontFamily: 'SnellRoundhand-Bold'}}>SnellRoundhand-Bold </Text>
// //     <Text style={{fontFamily: 'Symbol'}}>Symbol </Text>
// //     <Text style={{fontFamily: 'Tamil Sangam MN'}}>Tamil Sangam MN </Text>
// //     <Text style={{fontFamily: 'TamilSangamMN-Bold'}}>TamilSangamMN-Bold </Text>
// //     <Text style={{fontFamily: 'Telugu Sangam MN'}}>Telugu Sangam MN </Text>
// //     <Text style={{fontFamily: 'Thonburi'}}>Thonburi </Text>
// //     <Text style={{fontFamily: 'Thonburi-Bold'}}>Thonburi-Bold </Text>
// //     <Text style={{fontFamily: 'Thonburi-Light'}}>Thonburi-Light </Text>
// //     <Text style={{fontFamily: 'Times New Roman'}}>Times New Roman </Text>
// //     <Text style={{fontFamily: 'TimesNewRomanPS-BoldItalicMT'}}>TimesNewRomanPS-BoldItalicMT </Text>
// //     <Text style={{fontFamily: 'TimesNewRomanPS-BoldMT'}}>TimesNewRomanPS-BoldMT </Text>
// //     <Text style={{fontFamily: 'TimesNewRomanPS-ItalicMT'}}>TimesNewRomanPS-ItalicMT </Text>
// //     <Text style={{fontFamily: 'TimesNewRomanPSMT'}}>TimesNewRomanPSMT </Text>
// //     <Text style={{fontFamily: 'Trebuchet MS'}}>Trebuchet MS </Text>
// //     <Text style={{fontFamily: 'Trebuchet-BoldItalic'}}>Trebuchet-BoldItalic </Text>
// //     <Text style={{fontFamily: 'TrebuchetMS-Bold'}}>TrebuchetMS-Bold </Text>
// //     <Text style={{fontFamily: 'TrebuchetMS-Italic'}}>TrebuchetMS-Italic </Text>
// //     <Text style={{fontFamily: 'Verdana'}}>Verdana </Text>
// //     <Text style={{fontFamily: 'Verdana-Bold'}}>Verdana-Bold </Text>
// //     <Text style={{fontFamily: 'Verdana-BoldItalic'}}>Verdana-BoldItalic </Text>
// //     <Text style={{fontFamily: 'Verdana-Italic'}}>Verdana-Italic </Text>
// //     <Text style={{fontFamily: 'Zapf Dingbats'}}>Zapf Dingbats </Text>
// //     <Text style={{fontFamily: 'ZapfDingbatsITC'}}>ZapfDingbatsITC </Text>
// //     <Text style={{fontFamily: 'Zapfino'}}>Zapfino </Text>
// //   </ScrollView>
// //     </>