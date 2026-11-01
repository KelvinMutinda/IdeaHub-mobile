import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header: logo on the left, Messenger on the right */}
      <View style={styles.header}>
        <ThemedText style={styles.logo}>IdeaHub</ThemedText>
        <Pressable
          onPress={() => router.push("/messenger")}
          hitSlop={10}
          style={styles.iconBtn}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#101828" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.feed} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>Your feed goes here</ThemedText>
          <ThemedText style={styles.cardText}>
            Projects from other makers will appear in this list.
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f3f4f8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eaecf0",
  },
  logo: { fontSize: 22, fontWeight: "800", color: "#2563eb" },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f2f4f7",
    alignItems: "center",
    justifyContent: "center",
  },
  feed: { padding: 16, gap: 12 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eaecf0",
    gap: 6,
  },
  cardTitle: { fontWeight: "700", color: "#101828", fontSize: 16 },
  cardText: { color: "#667085" },
});