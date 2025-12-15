import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";

type Props = {
  onSendText: (text: string) => void;
  onSendAudio: (uri: string, duration: number) => void;
};

export default function ChatInput({ onSendText, onSendAudio }: Props) {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // ✅ React Native safe timer (NO NodeJS)
  const timerRef = useRef<number | null>(null);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000) as unknown as number;
    } else {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  /* ================= START RECORD ================= */
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setSeconds(0);
      setIsRecording(true);
    } catch (e) {
      console.log("startRecording error:", e);
    }
  }

  /* ================= STOP RECORD ================= */
  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const status = await recording.getStatusAsync();

      setRecording(null);
      setIsRecording(false);

      // ✅ PROPER TYPE NARROWING (NO RED LINE)
      if (
        uri &&
        typeof status === "object" &&
        "durationMillis" in status &&
        typeof status.durationMillis === "number"
      ) {
        const duration = Math.floor(status.durationMillis / 1000);
        onSendAudio(uri, duration);
      }
    } catch (e) {
      console.log("stopRecording error:", e);
    }
  }

  /* ================= SEND TEXT ================= */
  function sendText() {
    if (!text.trim()) return;
    onSendText(text.trim());
    setText("");
  }

  /* ================= FORMAT TIME ================= */
  function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  const isTyping = text.trim().length > 0;

  return (
    <View className="px-4 py-3 bg-[#FFF5E9]">
      <View className="flex-row items-center bg-white rounded-full px-4">
        {/* INPUT OR TIMER */}
        {isRecording ? (
          <Text className="flex-1 py-3 text-base text-red-600">
            ⏺ Recording… {formatTime(seconds)}
          </Text>
        ) : (
          <TextInput
            className="flex-1 py-3 text-base"
            placeholder="Enter your response"
            value={text}
            onChangeText={setText}
          />
        )}

        {/* ACTION BUTTON */}
        <TouchableOpacity
          onPress={
            isTyping
              ? sendText
              : isRecording
              ? stopRecording
              : startRecording
          }
        >
          <Ionicons
            name={
              isTyping
                ? "send"
                : isRecording
                ? "stop-circle"
                : "mic"
            }
            size={26}
            color={isRecording ? "red" : "#E68A12"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
