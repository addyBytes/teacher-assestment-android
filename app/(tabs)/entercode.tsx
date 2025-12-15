// app/(tabs)/entercode.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function EnterCode() {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);

  const isValid = code.length > 0;

  const handleContinue = () => {
    if (!isValid) return;
    Keyboard.dismiss();
    console.log("Entered code:", code);
  };

  return (
    <LinearGradient
      colors={["#f7d8b0ff", "#f8f7f5ff"]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior="padding" // Changed from {Platform.OS === "ios" ? "padding" : "height"} to "padding"
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}
            <Image
              source={require("../../assets/sun1.png")}
              className="absolute top-[-150] left-[-170] w-[360px] h-[360px] opacity-[30%]"
              resizeMode="contain"
            />

            {/* Bottom Content */}
            <View className="flex-1 justify-end px-6 pb-8">
              <Text className="text-[28px] font-bold text-[#E68A12]">
                Enter Code
              </Text>

              <Text className="text-gray-500 mt-2 text-[13px] leading-5">
                We have sent a 4 digit code to your email.
              </Text>

              {/* Input */}
              <View className="mt-6">
                <Text className="text-[13px] font-semibold text-gray-700 mb-2">
                  Enter Code
                </Text>

                <View className="relative">
                  <TextInput
                    className="h-14 bg-white border border-gray-200 rounded-xl px-4 pr-12 text-[15px]"
                    placeholder="• • • • • • • • "
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showCode}
                    keyboardType="number-pad"
                    value={code}
                    onChangeText={setCode}
                    style={{ letterSpacing: 6 }}
                  />

                  <TouchableOpacity
                    className="absolute right-4 top-[18px]"
                    onPress={() => setShowCode(!showCode)}
                  >
                    <Ionicons
                      name={showCode ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Button */}
              <TouchableOpacity
                activeOpacity={0.9}
                disabled={!isValid}
                onPress={handleContinue}
                className={`mt-6 rounded-xl py-4 ${
                  isValid ? "bg-[#E68A12]" : "bg-orange-400"
                }`}
              >
                <Text className="text-white font-semibold text-center text-[16px]">
                  Continue
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="mt-5">
                <Text className="text-gray-600 text-[13px] mb-8">
                  Forgot Password? &gt;
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}