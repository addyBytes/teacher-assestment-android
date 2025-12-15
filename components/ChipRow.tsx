// components/ChipRow.tsx
import { Text, TouchableOpacity, View } from "react-native"; // <-- Import TouchableOpacity

const chips = ["Primary", "Middle", "Secondary", "Higher"];

// Define props type
type Props = {
  onChipPress: (chipText: string) => void;
};

// Update function signature
export default function ChipRow({ onChipPress }: Props) {
  return (
    <View className="flex-row gap-2 px-3 mb-1">
      {chips.map((chip) => (
        // Wrap in TouchableOpacity and add onPress handler
        <TouchableOpacity
          key={chip}
          onPress={() => onChipPress(chip)}
          activeOpacity={0.7}
          className="px-4 py-3 bg-white rounded-full border border-gray-200"
        >
          <Text className="text-xs text-gray-600">{chip}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}