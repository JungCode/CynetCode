import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

function CheckerForm({ website }) {
  return (
    <View>
      <View>
        <Text style={styles.text}>Website</Text>
        <TextInput
          value={website}
          mode="outlined"
          editable={false}
          style={{ fontSize: 25, padding: 0 }}
          outlineColor="transparent"
          right={<TextInput.Icon icon="content-copy" />}></TextInput>
      </View>
      <View>
        <Text style={styles.text}>Account</Text>
        <TextInput
          value={website}
          mode="outlined"
          editable={false}
          style={{ fontSize: 25, padding: 0 }}
          outlineColor="transparent"
          right={<TextInput.Icon icon="content-copy" />}></TextInput>
      </View>
      <View>
        <Text style={styles.text}>Password</Text>
        <TextInput
          value={website}
          mode="outlined"
          editable={false}
          style={{ fontSize: 25, padding: 0 }}
          outlineColor="transparent"
          right={
            <View>
              <TextInput.Icon icon="content-copy" />
              <TextInput.Icon icon="eye" />
            </View>
          }></TextInput>
      </View>
    </View>
  );
}

export default CheckerForm;
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
