import { Image, Text, View } from "react-native";

type ChatBubbleProps = {
  side: "left" | "right";
  text: string;
  isChip?: boolean;
};

export default function ChatBubble({
  side,
  text,
  isChip = false,
}: ChatBubbleProps) {
  const isLeft = side === "left";

  return (
    <View
      className={`flex-row mb-3 ${
        isLeft ? "justify-start" : "justify-end"
      }`}
      // FIX: Ensure the outer container respects 100% of the screen width to prevent horizontal overflow
      style={{ maxWidth: "100%" }} 
    >
      {isLeft && (
        <Image
          source={require("../assets/images/chatbot.png")}
          className="w-7 h-7 mr-2 mt-1"
          style={{ flexShrink: 0, borderRadius: 14 }}
        />
      )}

      <View
        className={`px-4 py-2 rounded-lg ${
          isChip
            ? "bg-[#E68A12]"
            : isLeft
            ? "bg-white"
            : "bg-[#E68A12]"
        }`}
        style={{ maxWidth: isLeft ? "75%" : "80%", flexShrink: 1 }}
      >
        <Text 
          className={`${isLeft ? "text-black" : "text-white"} text-sm`}
          style={{ flexWrap: "wrap" }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}