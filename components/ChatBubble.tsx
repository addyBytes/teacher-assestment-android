import { View, Text, Image } from "react-native";

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
    >
      {isLeft && (
        <Image
          
          className="w-7 h-7 mr-2 mt-1"
        />
      )}

      <View
        className={`px-4 py-2 rounded-2xl max-w-[75%] ${
          isChip
            ? "bg-[#E68A12]"
            : isLeft
            ? "bg-white"
            : "bg-[#E68A12]"
        }`}
      >
        <Text className={`${isLeft ? "text-black" : "text-white"} text-sm`}>
          {text}
        </Text>
      </View>
    </View>
  );
}
