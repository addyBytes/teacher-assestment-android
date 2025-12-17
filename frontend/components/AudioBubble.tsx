import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";

type Props = {
  uri: string;
};

export default function AudioBubble({ uri }: Props) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  /* ======================
     LOAD AUDIO + DURATION
  ====================== */
  useEffect(() => {
    let mounted = true;

    async function loadAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: false }
        );

        if (!mounted) return;

        const status = await sound.getStatusAsync();

        if (
          status.isLoaded &&
          typeof status.durationMillis === "number"
        ) {
          setDuration(Math.floor(status.durationMillis / 1000));
        }

        setSound(sound);
        setLoading(false);
      } catch (e) {
        console.log("Audio load error:", e);
        setLoading(false);
      }
    }

    loadAudio();

    return () => {
      mounted = false;
      if (sound) sound.unloadAsync();
    };
  }, [uri]);

  /* ======================
     PLAY / PAUSE
  ====================== */
  async function togglePlay() {
    if (!sound || loading) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    });
  }

  /* ======================
     FORMAT TIME
  ====================== */
  function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <View className="flex-row justify-end mb-3">
      <View className="bg-[#E68A12] rounded-2xl px-4 py-2.5 flex-row items-center max-w-[280px]">
        {/* PLAY / LOADING */}
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <TouchableOpacity onPress={togglePlay}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={18}
              color="white"
            />
          </TouchableOpacity>
        )}

        {/* PROGRESS BAR (STATIC UI BAR) */}
        <View className="mx-3 h-1 w-36 bg-white/40 rounded-full" />

        {/* TIMER / LOADING */}
        <Text className="text-white text-xs">
          {loading
            ? "Loading…"
            : duration !== null
            ? formatTime(duration)
            : "00:00"}
        </Text>
      </View>
    </View>
  );
}
