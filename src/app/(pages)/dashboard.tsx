import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import AppShell from "@/components/AppShell";
import { C } from "@/constants/ideahub-theme";

/* ---- sample data: replace with a fetch() to your API later ---- */
const STATS = [
  { label: "Project views", value: "1,248", icon: "eye-outline", tint: C.tealSoft, color: C.teal },
  { label: "Saves", value: "86", icon: "bookmark-outline", tint: C.goldSoft, color: "#a98a1f" },
  { label: "New followers", value: "24", icon: "people-outline", tint: C.peachSoft, color: C.rose },
  { label: "Likes", value: "312", icon: "heart-outline", tint: C.peachSoft, color: C.rose },
] as const;

const WEEK = [
  { d: "Mon", views: 40, saves: 10 },
  { d: "Tue", views: 65, saves: 18 },
  { d: "Wed", views: 52, saves: 12 },
  { d: "Thu", views: 90, saves: 30 },
  { d: "Fri", views: 75, saves: 22 },
  { d: "Sat", views: 45, saves: 9 },
  { d: "Sun", views: 60, saves: 15 },
];

const NOTICED = [
  { name: "Orbit Notes", saves: 42 },
  { name: "Patchwork API", saves: 27 },
  { name: "Small Hours", saves: 17 },
];

const ACTIVITY = [
  { text: "Maya Chen saved Orbit Notes", time: "8m ago" },
  { text: "Inez Okafor started following you", time: "42m ago" },
  { text: "Patchwork API got 12 new views", time: "2h ago" },
];

const RANGES = ["Today", "This week", "This month"];

export default function Dashboard() {
  const [range, setRange] = useState("This week");
  const max = Math.max(...WEEK.map((w) => w.views));
  const totalViews = WEEK.reduce((s, w) => s + w.views, 0);
  const peak = WEEK.reduce((a, b) => (b.views > a.views ? b : a));

  return (
    <AppShell searchPlaceholder="Search your projects...">
    <ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Greeting */}
      <Text style={styles.eyebrow}>YOUR WORK, FINDING ITS PEOPLE</Text>
      <Text style={styles.title}>A good week, Kelvin.</Text>
      <Text style={styles.sub}>Small signals add up. Here's what your projects are doing.</Text>

      {/* Range chips */}
      <View style={styles.chips}>
        {RANGES.map((r) => (
          <Pressable key={r} onPress={() => setRange(r)} style={[styles.chip, range === r && styles.chipOn]}>
            <Text style={[styles.chipText, range === r && styles.chipTextOn]}>{r}</Text>
          </Pressable>
        ))}
      </View>

      {/* Stat cards (2 x 2) */}
      <View style={styles.grid}>
        {STATS.map((s) => (
          <View key={s.label} style={styles.stat}>
            <View style={styles.statTop}>
              <Text style={styles.statLabel}>{s.label}</Text>
              <View style={[styles.statIcon, { backgroundColor: s.tint }]}>
                <Ionicons name={s.icon as any} size={16} color={s.color} />
              </View>
            </View>
            <Text style={styles.statValue}>{s.value}</Text>
          </View>
        ))}
      </View>

      {/* Chart */}
      <View style={styles.card}>
        <View style={styles.cardHead}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>People are finding your work</Text>
            <Text style={styles.cardSub}>Project views and saves · {range.toLowerCase()}</Text>
          </View>
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: C.teal }]} /><Text style={styles.legendText}>Views</Text></View>
          <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: C.peach }]} /><Text style={styles.legendText}>Saves</Text></View>
        </View>

        <View style={styles.chart}>
          {WEEK.map((w) => (
            <View key={w.d} style={styles.barCol}>
              <View style={styles.bars}>
                <View style={[styles.bar, { height: `${(w.views / max) * 100}%`, backgroundColor: C.teal }]} />
                <View style={[styles.bar, { height: `${(w.saves / max) * 100}%`, backgroundColor: C.peach }]} />
              </View>
              <Text style={styles.barLabel}>{w.d}</Text>
            </View>
          ))}
        </View>

        <View style={styles.cardFoot}>
          <Text style={styles.footText}><Text style={styles.footBold}>{totalViews}</Text> people stopped by</Text>
          <Text style={styles.footText}>Peak · {peak.d}</Text>
        </View>
      </View>

      {/* Projects getting noticed */}
      <View style={styles.card}>
        <View style={styles.cardHead}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Projects getting noticed</Text>
            <Text style={styles.cardSub}>Your most-saved work</Text>
          </View>
          <Ionicons name="bar-chart-outline" size={18} color={C.teal} />
        </View>
        {NOTICED.map((p, i) => (
          <View key={p.name} style={styles.row}>
            <Text style={styles.rank}>{i + 1}</Text>
            <Text style={styles.rowName}>{p.name}</Text>
            <View style={styles.saveBadge}>
              <Ionicons name="bookmark" size={12} color={C.teal} />
              <Text style={styles.saveText}>{p.saves}</Text>
            </View>
          </View>
        ))}
        <Pressable style={styles.linkRow}>
          <Text style={styles.link}>View all projects</Text>
          <Ionicons name="arrow-up-outline" size={14} color={C.ink} style={{ transform: [{ rotate: "45deg" }] }} />
        </Pressable>
      </View>

      {/* Recent activity */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent activity</Text>
        <Text style={styles.cardSub}>A little momentum, lately</Text>
        {ACTIVITY.map((a) => (
          <View key={a.text} style={styles.activity}>
            <View style={styles.activityDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.activityText}>{a.text}</Text>
              <Text style={styles.activityTime}>{a.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Promo card */}
      <View style={styles.promo}>
        <Ionicons name="sparkles-outline" size={20} color={C.lime} />
        <Text style={styles.promoTitle}>Good things grow together.</Text>
        <Text style={styles.promoText}>See what your small steps set in motion.</Text>
        <Pressable style={styles.linkRow}>
          <Text style={styles.promoLink}>Find your next spark</Text>
          <Ionicons name="arrow-up-outline" size={14} color={C.lime} style={{ transform: [{ rotate: "45deg" }] }} />
        </Pressable>
      </View>
    </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 40, gap: 14, maxWidth: 760, width: "100%", alignSelf: "center" },

  eyebrow: { fontSize: 11, letterSpacing: 1.2, fontWeight: "700", color: C.muted },
  title: { fontSize: 30, fontWeight: "800", color: C.ink, marginTop: -6 },
  sub: { color: C.muted, marginTop: -8 },

  chips: { flexDirection: "row", gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: C.card, borderWidth: 1, borderColor: C.border },
  chipOn: { backgroundColor: C.teal, borderColor: C.teal },
  chipText: { color: C.ink, fontWeight: "600", fontSize: 13 },
  chipTextOn: { color: "white" },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  stat: { flexBasis: "47%", flexGrow: 1, backgroundColor: C.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: C.border, gap: 14 },
  statTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statLabel: { color: C.ink, fontWeight: "600", fontSize: 12 },
  statIcon: { width: 30, height: 30, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  statValue: { fontSize: 26, fontWeight: "800", color: C.ink },

  card: { backgroundColor: C.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.border },
  cardHead: { flexDirection: "row", alignItems: "flex-start" },
  cardTitle: { fontSize: 16, fontWeight: "800", color: C.ink },
  cardSub: { fontSize: 12, color: C.muted, marginTop: 2 },

  legend: { flexDirection: "row", gap: 14, marginTop: 12 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: C.muted },

  chart: { flexDirection: "row", alignItems: "flex-end", height: 150, gap: 8, marginTop: 12, paddingTop: 8 },
  barCol: { flex: 1, alignItems: "center", height: "100%", justifyContent: "flex-end" },
  bars: { flex: 1, width: "100%", flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 3 },
  bar: { width: "36%", borderRadius: 4, minHeight: 4 },
  barLabel: { fontSize: 11, color: C.muted, marginTop: 6 },

  cardFoot: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: C.border, marginTop: 14, paddingTop: 12 },
  footText: { fontSize: 12, color: C.muted },
  footBold: { fontWeight: "800", color: C.teal },

  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  rank: { width: 22, color: C.muted, fontWeight: "700" },
  rowName: { flex: 1, color: C.ink, fontWeight: "600" },
  saveBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: C.tealSoft, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  saveText: { color: C.teal, fontWeight: "700", fontSize: 12 },

  linkRow: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-end", marginTop: 14 },
  link: { color: C.ink, fontWeight: "800", fontSize: 13 },

  activity: { flexDirection: "row", gap: 12, alignItems: "flex-start", marginTop: 14 },
  activityDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.teal, marginTop: 6 },
  activityText: { color: C.ink, fontWeight: "600" },
  activityTime: { color: C.muted, fontSize: 12, marginTop: 2 },

  promo: { backgroundColor: C.dark, borderRadius: 16, padding: 18, gap: 6 },
  promoTitle: { color: "white", fontSize: 18, fontWeight: "800", marginTop: 6 },
  promoText: { color: "#b8c9c4", fontSize: 13 },
  promoLink: { color: C.lime, fontWeight: "800", fontSize: 13 },
});