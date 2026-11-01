import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { C } from "@/constants/ideahub-theme";


export const NAV = [
  { label: "Home", href: "/home", icon: "home-outline" },
  { label: "Messenger", href: "/messenger", icon: "chatbubble-outline", badge: 3 },
  { label: "Notifications", href: "/notifications", icon: "notifications-outline", badge: 3 },
  { label: "Trending", href: "/trending", icon: "trending-up-outline" },
  { label: "Top rated", href: "/toprated", icon: "star-outline" },
  { label: "Dashboard", href: "/dashboard", icon: "grid-outline" },
] as const;

type Props = {

  onNavigate?: () => void;
 
  compact?: boolean;
};

export default function Sidebar({ onNavigate, compact = false }: Props) {
  const router = useRouter();
  const pathname = usePathname(); 

  const go = (href: string) => {
    onNavigate?.();
    if (href !== pathname) router.replace(href as any); 
  };

  return (
    <View style={[styles.sidebar, compact && styles.sidebarCompact]}>
      <ScrollView contentContainerStyle={[styles.scroll, compact && styles.scrollCompact]} showsVerticalScrollIndicator={false}>
        {!compact && <Text style={styles.section}>WORKSPACE</Text>}

        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Pressable
              key={item.href}
              onPress={() => go(item.href)}
              style={[styles.item, compact && styles.itemCompact, active && styles.itemActive]}
              accessibilityLabel={item.label}
            >
              <Ionicons name={item.icon as any} size={compact ? 22 : 20} color={active ? C.teal : C.ink} />
              {/* labels only in the full menu */}
              {!compact && <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>}
              {"badge" in item && item.badge ? (
                compact ? (
                  <View style={styles.badgeDot} />            /* compact: just a small dot on the icon */
                ) : (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )
              ) : null}
            </Pressable>
          );
        })}

        {/* dark promo card at the bottom, like the web version (full menu only) */}
        {!compact && (
        <View style={styles.promo}>
          <Ionicons name="sparkles-outline" size={18} color={C.lime} />
          <Text style={styles.promoTitle}>Good things grow together.</Text>
          <Text style={styles.promoText}>See what your small steps set in motion.</Text>
          <Pressable style={styles.promoLinkRow}>
            <Text style={styles.promoLink}>Find your next spark</Text>
            <Ionicons name="arrow-up-outline" size={12} color={C.lime} style={{ transform: [{ rotate: "45deg" }] }} />
          </Pressable>
        </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: { width: 250, backgroundColor: C.bg, borderRightWidth: 1, borderRightColor: C.border, height: "100%" },
  sidebarCompact: { width: 68 },
  scroll: { padding: 14, paddingTop: 18, gap: 4 },
  scrollCompact: { padding: 10, paddingTop: 14, alignItems: "center", gap: 8 },
  section: { fontSize: 11, letterSpacing: 1.2, fontWeight: "700", color: C.muted, marginBottom: 8, marginLeft: 8 },

  item: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12 },
  itemCompact: { width: 48, height: 48, paddingVertical: 0, paddingHorizontal: 0, justifyContent: "center" },
  itemActive: { backgroundColor: C.tealSoft },
  label: { flex: 1, color: C.ink, fontWeight: "500", fontSize: 15 },
  labelActive: { color: C.teal, fontWeight: "800" },

  badge: { minWidth: 22, height: 22, borderRadius: 11, backgroundColor: C.tealSoft, alignItems: "center", justifyContent: "center", paddingHorizontal: 6 },
  badgeDot: { position: "absolute", top: 8, right: 8, width: 9, height: 9, borderRadius: 5, backgroundColor: C.rose, borderWidth: 1.5, borderColor: C.bg },
  badgeText: { color: C.teal, fontWeight: "800", fontSize: 11 },

  promo: { backgroundColor: C.dark, borderRadius: 16, padding: 16, gap: 6, marginTop: 18 },
  promoTitle: { color: "white", fontWeight: "800", fontSize: 15, marginTop: 4 },
  promoText: { color: "#b8c9c4", fontSize: 12 },
  promoLinkRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 },
  promoLink: { color: C.lime, fontWeight: "800", fontSize: 12 },
});