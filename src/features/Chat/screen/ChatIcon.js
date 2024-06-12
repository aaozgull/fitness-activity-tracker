// ChatIcon.js
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../../infrastructure/theme";
import ChatModal from "../component/ChatModal"; // Import the ChatModal component

const ChatIcon = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openChatModal = () => {
    setIsModalVisible(true);
  };

  const closeChatModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.chatIcon} onPress={openChatModal}>
        <Ionicons name="chatbox-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <ChatModal isVisible={isModalVisible} onClose={closeChatModal} />
    </>
  );
};

const styles = StyleSheet.create({
  chatIcon: {
    position: "absolute",
    bottom: theme.sizesInNumber[5], //16,
    right: theme.sizesInNumber[3], // 16,
    backgroundColor: theme.colors.ui.accent, //"#2196F3",
    padding: theme.sizesInNumber[3], //12,
    borderRadius: 30,
    elevation: 4,
  },
});

export default ChatIcon;
