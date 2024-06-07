import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon, IconButton } from "react-native-paper";
import Colors from "../../constants/Colors";
import CusButton from "../CusButton";

function CheckerForm({ app, userName, password, type }) {
  const [passwordSecure, setPasswordSecure] = useState(true);
  function handleSecure(password) {
    const hiddenPassword = password.replace(/./g, "•");
    return hiddenPassword;
  }
  function togglePasswordVisibility() {
    setPasswordSecure(!passwordSecure);
  }
  return (
    <View>
      <View>
        <Text style={styles.title}>{type}</Text>
        <View style={styles.textwrap}>
          <Text style={styles.content}>{app}</Text>
          <Icon source="content-copy" size={30} color={Colors.gray400}></Icon>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Account</Text>
        <View style={styles.textwrap}>
          <Text style={styles.content}>{userName}</Text>
          <Icon source="content-copy" size={30} color={Colors.gray400}></Icon>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Password</Text>
        <View style={styles.textwrap}>
          <Text style={styles.content}>
            {passwordSecure ? handleSecure(password) : password}
          </Text>
          <View style={styles.iconwrap}>
            <Pressable onPress={togglePasswordVisibility}>
              <Icon
                source={passwordSecure ? "eye-outline" : "eye-off-outline"}
                size={30}
                color={Colors.gray400}
              ></Icon>
            </Pressable>
            <Pressable style={{ marginLeft: 15 }}>
              <Icon
                source="content-copy"
                size={30}
                color={Colors.gray400}
              ></Icon>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CheckerForm;
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
    marginTop: 10,
  },
  textwrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
  },
  iconwrap: {
    flexDirection: "row",
  },
  content: {
    fontSize: 25,
    fontWeight: "300",
    fontStyle: "italic",
  },
});
