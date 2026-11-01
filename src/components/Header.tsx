import { Ionicons } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { C } from "@/constants/ideahub-theme";

type Props = {
  wide: boolean;            // true on a big screen / browser; false on a phone
  onMenu: () => void;       // opens the slide-in sidebar (phones only)
  placeholder: string;      // text inside the search box (differs per page)
  value?: string;           // optional: control the search text from the page
  onChangeText?: (t: string) => void;
};

export default function Header({ wide, onMenu, placeholder, value, onChangeText }: Props) {
  /* The search box is its own small piece so the phone layout can drop it onto a second row. */
  const search = (
    <View style={[styles.search, wide && styles.searchWide]}>
      <Ionicons name="search-outline" size={18} color={C.muted} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#98a8a3"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
    </View>
  );

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        {/* hamburger: only on phones, where the sidebar is hidden */}
        {!wide && (
          <Pressable onPress={onMenu} hitSlop={10} style={styles.iconBtn}>
            <Ionicons name="menu-outline" size={24} color={C.ink} />
          </Pressable>
        )}

        {/* logo */}
        <View style={styles.logoRow}>
          <View style={styles.logoMark}>
            <Ionicons name="sparkles" size={18} color="white" />
          </View>
          <Text style={styles.logoText}>ideahub</Text>
        </View>

        {/* search sits in the middle of the row on wide screens */}
        {wide ? search : <View style={{ flex: 1 }} />}

        {/* notification bell with the small orange dot */}
        <Pressable style={styles.iconBtn} hitSlop={6}>
          <Ionicons name="notifications-outline" size={20} color={C.ink} />
          <View style={styles.dot} />
        </Pressable>

        {/* profile: initials avatar, plus name and role on wide screens */}
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>KM</Text>
          </View>
          {wide && (
            <View>
              <Text style={styles.name}>Kelvin Mutinda</Text>
              <Text style={styles.role}>Software Engineer</Text>
            </View>
          )}
        </View>
      </View>

      {/* phones: search gets its own full-width second row */}
      {!wide && search}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border, paddingHorizontal: 14, paddingVertical: 10, gap: 10 },
  topRow: { flexDirection: "row", alignItems: "center", gap: 12 },

  iconBtn: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, borderColor: C.border, backgroundColor: C.card, alignItems: "center", justifyContent: "center" },
  dot: { position: "absolute", top: 8, right: 9, width: 8, height: 8, borderRadius: 4, backgroundColor: C.rose },

  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoMark: { width: 34, height: 34, borderRadius: 10, backgroundColor: C.teal, alignItems: "center", justifyContent: "center" },
  logoText: { fontSize: 22, fontWeight: "800", color: C.ink },

  search: { flexDirection: "row", alignItems: "center", gap: 8, height: 42, paddingHorizontal: 12, borderRadius: 12, backgroundColor: C.bg, borderWidth: 1, borderColor: C.border },
  searchWide: { flex: 1, maxWidth: 480, marginLeft: 24 },
  searchInput: { flex: 1, color: C.ink, ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : null) },

  profile: { flexDirection: "row", alignItems: "center", gap: 10, marginLeft: "auto" },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: C.peach, alignItems: "center", justifyContent: "center" },
  avatarText: { fontWeight: "800", color: "#7a3b25", fontSize: 13 },
  name: { fontWeight: "800", color: C.ink, fontSize: 13 },
  role: { color: C.muted, fontSize: 11 },
});