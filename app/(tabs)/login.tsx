// app/(tabs)/login.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView, // <-- Added
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValid = email.length > 0 && password.length > 0;

  return (
    <LinearGradient
          colors={["#f7d8b0ff", "#f8f7f5ff"]}
          className="flex-1"
        >
          <SafeAreaView className="flex-1">
            {/* Wrap content in KeyboardAvoidingView and ScrollView */}
            <KeyboardAvoidingView
              behavior="padding" // Use 'padding' for better cross-platform results
              className="flex-1"
            >
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }} // Makes content view fill the screen height
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >

   {/* Logo  */}
      <Image
        source={require("../../assets/sun1.png")}
        className="absolute top-[-150] left-[-170] w-[360px] h-[360px] opacity-[30%]"
        resizeMode="contain"
      />

    
      <View className="flex-1 justify-end px-6 pb-10">

        {/* Title */}
        <Text className="text-3xl font-bold text-[#E68A12]">
          Login
        </Text>

        {/* Description */}
        <Text className="text-gray-500 mt-1 text-sm leading-5">
          Login to see out vast majority of the items in the neighbourhood of sies
        </Text>

        {/* Email */}
        <View className="mt-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Email
          </Text>
          <TextInput
            className="h-14 bg-white border border-gray-200 rounded-xl px-4"
            placeholder="Placeholder text..."
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View className="mt-3">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Password
          </Text>

          <View className="relative">
            <TextInput
              className="h-14 bg-white border border-gray-200 rounded-xl px-4 pr-12"
              placeholder="• • • • • • • • • •"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Button */}
        <TouchableOpacity
          disabled={!isValid}
          className={`mt-5 rounded-xl py-4 ${
            isValid ? "bg-[#E68A12]" : "bg-gray-300"
          }`}
        >
          <Text className="text-white font-semibold text-base ml-5">
            Next
          </Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity className="mt-2">
          <Text className="text-gray-600 text-sm mb-1">
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