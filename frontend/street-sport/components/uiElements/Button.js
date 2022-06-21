import React from "react";
import { StyleSheet, Pressable, Text, ActivityIndicator } from "react-native";

const Button = (props) => {
  
  return (
    <Pressable
      disabled={props.disabled}
      onPress={props.onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? props.colorOnPress : props.color,
        },
        styles.button,
      ]}
    >
      {props.isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text
          style={[
            { color: props.textColor == null ? "#fff" : props.textColor },
            styles.buttonText,
          ]}
        >
          {props.text}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 60,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Button;
