import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ReactNode, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Sidebar from "@/components/Sidebar";
import { C } from "@/constants/ideahub-theme";

const DRAWER_W = 250; // keep equal to the width in Sidebar.tsx
const WIDE_FROM = 900; // screens at least this wide show the menu permanently
const useNative = Platform.OS !== "web";

type Props = {
  children: ReactNode;
  searchPlaceholder?: string;
};

export default function AppShell({ children, searchPlaceholder = "Search projects, people..." }: Props) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_FROM;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const slide = useRef(new Animated.Value(-DRAWER_W)).current; // drawer position: -250 hidden, 0 shown

  const openMenu = () => {
    setOpen(true);
    Animated.timing(slide, { toValue: 0, duration: 220, useNativeDriver: useNative }).start();
  };

  const closeMenu = () => {
    Animated.timing(slide, { toValue: -DRAWER_W, duration: 180, useNativeDriver: useNative }).start(
      ({ finished }) => {
        if (finished) setOpen(false);
      }
    );
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.body}>
          {/* wide screens: the menu is always visible on the left */}
          {<Sidebar compact={!isWide} />}

          <View style={styles.main}>
            {/* ---------- the ONE top bar ---------- */}
            <View style={styles.header}>
              <View style={styles.topRow}>
                {!isWide && (
                  <Pressable onPress={openMenu} style={styles.iconBtn} accessibilityLabel="Open menu">
                    <Ionicons name="menu-outline" size={22} color={C.ink} />
                  </Pressable>
                )}

                <View style={styles.brand}>
                  <View style={styles.logo}>
                    <Ionicons name="sparkles" size={18} color="white" />
                  </View>
                  <Text style={styles.brandText}>ideahub</Text>
                </View>

                <View style={styles.spacer} />

                <Pressable
                  onPress={() => router.push("/notifications" as any)}
                  style={styles.iconBtn}
                  accessibilityLabel="Notifications"
                >
                  <Ionicons name="notifications-outline" size={20} color={C.ink} />
                  <View style={styles.dot} />
                </Pressable>

                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>KM</Text>
                </View>
              </View>

              <View style={styles.search}>
                <Ionicons name="search-outline" size={18} color={C.muted} />
                <TextInput
                  style={[styles.searchInput, Platform.OS === "web" && ({ outlineStyle: "none" } as any)]}
                  value={query}
                  onChangeText={setQuery}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={C.muted}
                  returnKeyType="search"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* ---------- the page ---------- */}
            <View style={styles.content}>{children}</View>
          </View>
        </View>
      </SafeAreaView>

      {/* phones: the slide-in menu, drawn on top of everything */}
      {!isWide && open && (
        <View style={styles.overlay}>
          <Pressable style={styles.backdrop} onPress={closeMenu} accessibilityLabel="Close menu" />
          <Animated.View style={[styles.drawer, { transform: [{ translateX: slide }] }]}>
            <SafeAreaView style={styles.drawerSafe} edges={["top"]}>
              <Sidebar onNavigate={closeMenu} />
            </SafeAreaView>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  safe: { flex: 1, backgroundColor: C.bg },
  body: { flex: 1, flexDirection: "row" },
  main: { flex: 1, minWidth: 0 },

  header: {
    backgroundColor: C.bg,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 12,
  },
  topRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 8 },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: C.teal,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: { fontSize: 24, fontWeight: "800", color: C.ink },
  spacer: { flex: 1 },
  dot: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.rose,
    borderWidth: 1.5,
    borderColor: C.card,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: C.peach,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontWeight: "800", color: "#7c2d12", fontSize: 14 },

  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 46,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: C.tealSoft,
    borderWidth: 1,
    borderColor: C.border,
  },
  searchInput: { flex: 1, fontSize: 15, color: C.ink, paddingVertical: 0 },

  content: { flex: 1 },

  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 50 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(16, 24, 21, 0.45)" },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_W,
    backgroundColor: C.bg,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 4, height: 0 },
    elevation: 16,
  },
  drawerSafe: { flex: 1 },
});