// app/(tabs)/chat.tsx
import { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from "react-native";

import AudioBubble from "../../components/AudioBubble";
import ChatBubble from "../../components/ChatBubble";
import ChatInput from "../../components/ChatInput";
import ChipRow from "../../components/ChipRow";

/* =======================
   Message Types
======================= */
type Message =
  | {
      id: string;
      type: "text" | "chip";
      side: "left" | "right";
      text: string;
    }
  | {
      id: string;
      type: "audio";
      side: "left" | "right";
      uri: string;
    };

const initialMessages: Message[] = [
  {
    id: "1",
    type: "text",
    side: "left",
    text: "Hi teacher! What's your teaching Experience like? How many years?",
  },
  {
    id: "2",
    type: "chip",
    side: "right",
    text: "Secondary",
  },
  {
    id: "3",
    type: "text",
    side: "left",
    text: "Do you have any specific goals you'd like help with?",
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [showChips, setShowChips] = useState(true);
  const listRef = useRef<FlatList>(null);

  function sendText(text: string) {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "text", side: "right", text },
    ]);
  }

  function sendAudio(uri: string, duration: number) {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "audio", side: "right", uri },
    ]);
  }

  function sendChipMessage(text: string) {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "chip", side: "right", text },
    ]);
    setShowChips(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFF5E9]">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        {/* CHAT LIST */}
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.type === "audio" ? (
              <AudioBubble uri={item.uri} />
            ) : (
              <ChatBubble
                side={item.side}
                text={item.text}
                isChip={item.type === "chip"}
              />
            )
          }
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 80,
            paddingBottom: 5,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* BOTTOM SECTION (MOVES WITH KEYBOARD) */}
        <View className="mt-40">
          {showChips && <ChipRow onChipPress={sendChipMessage} />}
          <ChatInput onSendText={sendText} onSendAudio={sendAudio} />
        </View>
      <View className="mt-500"></View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
