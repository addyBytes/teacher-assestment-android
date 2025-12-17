import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Onboarding() {
  return (
    <SafeAreaView className="flex-1 bg-[#FFF6EC]">
      {/* Background Sun Image */}
      <Image
        source={require("../../assets/sun1.png")}
        className="absolute top-[-110] left-[-110] w-[320px] h-[320px] opacity-[30%]"
        resizeMode="contain"
      />

      {/* Content */}
      <View className="flex-1 justify-end px-6 pb-10">
        
        {/* Powered by badge */}
        <View className="self-start border border-[#B86E0E] rounded-full px-3 py-1 mb-4">
          <Text className="text-[#B86E0E] text-xs">
            Powered by SIES Educational Society
          </Text>
        </View>

        {/* Heading */}
        <Text className="text-3xl font-bold text-black leading-tight">
          Test, Learn and Improve{"\n"}
          your <Text className="text-[#E68A12]">Teaching Skills</Text>
        </Text>

        {/* Description */}
        <Text className="text-gray-500 mt-3 text-sm leading-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry, Lorem Ipsum.
        </Text>

        {/* Sign up with Mail */}
        <TouchableOpacity
          activeOpacity={0.9}
          className="mt-6 bg-[#E68A12] rounded-xl py-4 flex-row "
        >
          <Ionicons className=" ml-4" name="mail-outline" size={20} color="white" />
          <Text className="text-white font-semibold ml-3  ">
            Sign up with Mail
          </Text>
        </TouchableOpacity>

        {/* Continue with Gmail */}
        <TouchableOpacity
  activeOpacity={0.9}
  className="mt-3 flex-row  border border-[#1A73E8] bg-white rounded-xl py-4"
>
  <Image
    source={{
      uri: "data:image/png;base64,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",
    }}
    className="w-5 h-5 ml-4"
    resizeMode="contain"
  />

  <Text className="ml-3 text-[#1A73E8] font-semibold text-base">
    Continue with Gmail
  </Text>
</TouchableOpacity>

        {/* Login */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-500 text-sm">
            Already have an account?
          </Text>
          <Text className="text-[#000000] font-semibold ml-1">
            Log in →
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
