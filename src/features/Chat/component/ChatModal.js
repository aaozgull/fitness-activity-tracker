import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { theme } from "../../../infrastructure/theme";

const ChatModal = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageItem}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          //inverted={true}
        />
        <View style={styles.messageContainer}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButtonContainer}
          >
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
          <TextInput
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
            placeholder="Type your message..."
            style={styles.messageTextInput}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={styles.sendButtonContainer}
          >
            <Text style={styles.sendButton}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChatModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.ui.secondary,
  },
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.accent, //"#ccc",
  },
  messageText: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: theme.fontSizesInNumber.body,
    color: theme.colors.text.secondary,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spaceInNumber[2], //10,
  },
  closeButtonContainer: { padding: 10 },
  closeButton: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: theme.fontSizesInNumber.button,
    color: theme.colors.ui.accent, //"blue"
  },
  messageTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.ui.primary, //"#ccc",
    borderRadius: 5,
    marginRight: theme.sizesInNumber[2], //10,
    padding: theme.spaceInNumber[2], //8,
  },
  sendButtonContainer: {
    backgroundColor: theme.colors.ui.primary, //"blue",
    padding: theme.spaceInNumber[2], // 10,
    borderRadius: 5,
  },
  sendButton: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: theme.fontSizesInNumber.button,
    color: theme.colors.ui.tertiary,
  },
});
