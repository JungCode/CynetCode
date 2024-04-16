function IconButton() {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bgc ? bgc : Colors.green500 },
        pressed && {
          backgroundColor: pressedbgc ? pressedbgc : Colors.green700,
        },
      ]}
      onPress={onPress}>
      <View>
        <Text
          style={[styles.buttonText, { color: color ? color : Colors.white }]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
    button: {
      borderRadius: 6,
      paddingVertical: 15,
      paddingHorizontal: 12,
      marginBottom: 8,
    },
    pressed: {
      backgroundColor: Colors.green700,
    },
  
    buttonText: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
  });