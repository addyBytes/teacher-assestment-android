import { View, Text } from "react-native";

const chips = ["Primary", "Middle", "Secondary", "Higher"];

export default function ChipRow() {
  return (
    <View className="flex-row gap-2 px-4 mb-2">
      {chips.map((chip) => (
        <View
          key={chip}
          className="px-3 py-1 bg-white rounded-full border border-gray-200"
        >
          <Text className="text-xs text-gray-600">{chip}</Text>
        </View>
      ))}
    </View>
  );
}
