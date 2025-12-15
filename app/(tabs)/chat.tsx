import {
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRef, useState } from "react";

import ChatBubble from "../../components/ChatBubble";
import AudioBubble from "../../components/AudioBubble";
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

/* =======================
   Initial Messages
======================= */
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

/* =======================
   Chat Screen
======================= */
export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const listRef = useRef<FlatList>(null);

  /* ---- send text ---- */
  function sendText(text: string) {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "text",
        side: "right",
        text,
      },
    ]);
  }

  /* ---- send audio ---- */
  function sendAudio(uri: string) {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "audio",
        side: "right",
        uri,
      },
    ]);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFF5E9]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
          renderItem={({ item }) => {
            if (item.type === "audio") {
              return <AudioBubble uri={item.uri} />;
            }

            return (
              <ChatBubble
                side={item.side}
                text={item.text}
                isChip={item.type === "chip"}
              />
            );
          }}
        />

        <ChipRow />
        <ChatInput onSendText={sendText} onSendAudio={sendAudio} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
