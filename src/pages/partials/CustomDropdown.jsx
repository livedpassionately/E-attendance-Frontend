import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Dropdown({ data, onChange, placeholder }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);
  const [value, setValue] = useState("");
  const buttonRef = useRef(null);
  const [top, setTop] = useState(0);

  const onSelect = useCallback((item) => {
    onChange(item);
    setValue(item.label);
    setExpanded(false);
  }, []);

  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOfComponent = layout.height;
        const finalValue =
          topOffset + heightOfComponent + (Platform.OS === "android" ? -32 : 3);
        setTop(finalValue);
      }}
    >
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.text}>{value || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View
                style={[
                  styles.options,
                  {
                    top,
                  },
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  backdrop: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  optionItem: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "black",
    height: 40,
    justifyContent: "center",
  },
  separator: {
    height: 0,
  },
  options: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    borderRadius: 6,
    maxHeight: 250,
  },
  text: {
    fontSize: 15,
    opacity: 0.8,
  },
  button: {
    height: 50,
    borderColor: "gray",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
  },
});

// const styles = StyleSheet.create({
//   backdrop: {
//     borderColor: "#000",
//     borderWidth: 1,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     padding: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//   },
//   optionItem: {
//     height: 40,
//     justifyContent: "center",
//   },
//   separator: {
//     height: 4,
//   },
//   options: {
//     position: "absolute",
//     backgroundColor: "white",
//     width: "100%",
//     padding: 10,
//     borderRadius: 6,
//     maxHeight: 250,
//   },
//   text: {
//     fontSize: 15,
//     opacity: 0.8,
//   },
//   button: {
//     height: 50,
//     justifyContent: "space-between",
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     width: "100%",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     borderRadius: 8,
//   },
// });
