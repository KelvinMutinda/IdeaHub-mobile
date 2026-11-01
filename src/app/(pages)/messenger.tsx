import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { C } from "@/constants/ideahub-theme";


/* ---- sample data: replace with your API later ---- */
type Msg = { id: string; mine: boolean; text: string; time: string };
type Chat = {
  id: string; name: string; initials: string; online?: boolean;
  last: string; time: string; unread: number; project?: string; tint: string; ink: string;
  messages: Msg[];
};

const CHATS: Chat[] = [
  { id: "1", name: "Maya Chen", initials: "MC", online: true, last: "Love the constellation idea!", time: "8m", unread: 2, project: "Orbit Notes", tint: C.tealSoft, ink: C.teal,
    messages: [
      { id: "a", mine: false, text: "Hey Kelvin, saw Orbit Notes. Really nice work.", time: "10:02" },
      { id: "b", mine: true, text: "Thank you! Still early, but I'm enjoying it.", time: "10:04" },
      { id: "c", mine: false, text: "Love the constellation idea!", time: "10:05" },
    ] },
  { id: "2", name: "Inez Okafor", initials: "IO", last: "Want to compare webhook flows?", time: "42m", unread: 1, project: "Patchwork API", tint: C.peachSoft, ink: C.rose,
    messages: [{ id: "a", mine: false, text: "Want to compare webhook flows?", time: "09:30" }] },
  { id: "3", name: "Jules Rivera", initials: "JR", online: true, last: "Thanks for the follow", time: "2h", unread: 0, tint: "#e6e3f6", ink: "#6a5fb0",
    messages: [{ id: "a", mine: false, text: "Thanks for the follow", time: "08:10" }] },
  { id: "4", name: "Theo Martin", initials: "TM", last: "Small Hours hit 100 saves", time: "Yesterday", unread: 0, project: "Small Hours", tint: C.goldSoft, ink: "#a98a1f",
    messages: [{ id: "a", mine: false, text: "Small Hours hit 100 saves", time: "Yesterday" }] },
];

const FILTERS = ["All", "Unread", "Projects"] as const;

function Avatar({ chat, size = 46 }: { chat: Chat; size?: number }) {
  return (
    <View>
      <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: chat.tint }]}>
        <Text style={[styles.avatarText, { color: chat.ink, fontSize: size * 0.3 }]}>{chat.initials}</Text>
      </View>
      {chat.online && <View style={styles.online} />}
    </View>
  );
}

export default function Messenger() {

  const [active, setActive] = useState<Chat | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<Record<string, Msg[]>>({});

  
  const unreadTotal = CHATS.reduce((n, c) => n + c.unread, 0);

  const list = useMemo(
    () =>
      CHATS.filter((c) => {
        if (filter === "Unread" && !c.unread) return false;
        if (filter === "Projects" && !c.project) return false;
        const q = query.trim().toLowerCase();
        return !q || c.name.toLowerCase().includes(q) || (c.project || "").toLowerCase().includes(q);
      }),
    [filter, query]
  );

  const send = () => {
    if (!active || !draft.trim()) return;
    const msg: Msg = { id: String(Date.now()), mine: true, text: draft.trim(), time: "now" };
    setExtra((e) => ({ ...e, [active.id]: [...(e[active.id] || []), msg] }));
    setDraft("");
  };

  /* ---------------- conversation view ---------------- */
  if (active) {
    const msgs = [...active.messages, ...(extra[active.id] || [])];
    return (
       
      <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.threadHead}>
          <Pressable onPress={() => setActive(null)} hitSlop={10}>
            <Ionicons name="chevron-back" size={24} color={C.ink} />
          </Pressable>
          <Avatar chat={active} size={38} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{active.name}</Text>
            <Text style={styles.status}>{active.online ? "Online" : "Offline"}</Text>
          </View>
        </View>

        <FlatList
          data={msgs}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.mine ? styles.mine : styles.theirs]}>
              <Text style={[styles.bubbleText, item.mine && { color: "white" }]}>{item.text}</Text>
              <Text style={[styles.bubbleTime, item.mine && { color: "#cfe7df" }]}>{item.time}</Text>
            </View>
          )}
        />

        <View style={styles.composer}>
          <TextInput
            style={styles.composerInput}
            placeholder="Write a message..."
            placeholderTextColor="#98a8a3"
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <Pressable onPress={send} style={[styles.sendBtn, !draft.trim() && { opacity: 0.5 }]}>
            <Ionicons name="send" size={18} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
     
    );
  }

  /* ---------------- conversation list ---------------- */
  return (
    <>
   <AppShell searchPlaceholder="Search conversations...">
    <View style={styles.page}>
      <View style={styles.listHead}>
        <Text style={styles.title}>Messages</Text>
        <Pressable style={styles.iconBtn}>
          <Ionicons name="create-outline" size={20} color={C.ink} />
        </Pressable>
      </View>

      <View style={styles.search}>
        <Ionicons name="search-outline" size={18} color={C.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search people or projects"
          placeholderTextColor="#98a8a3"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <Pressable key={f} onPress={() => setFilter(f)} style={[styles.filter, filter === f && styles.filterOn]}>
            <Text style={[styles.filterText, filter === f && styles.filterTextOn]}>
              {f}{f === "Unread" ? ` ${unreadTotal}` : ""}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={list}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={<Text style={styles.empty}>No conversations found.</Text>}
        renderItem={({ item }) => (
          <Pressable style={styles.chatRow} onPress={() => setActive(item)}>
            <Avatar chat={item} />
            <View style={{ flex: 1, gap: 2 }}>
              <View style={styles.rowTop}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <View style={styles.rowTop}>
                <Text style={[styles.last, item.unread > 0 && styles.lastUnread]} numberOfLines={1}>{item.last}</Text>
                {item.unread > 0 && (
                  <View style={styles.badge}><Text style={styles.badgeText}>{item.unread}</Text></View>
                )}
              </View>
              {item.project && (
                <View style={styles.tag}><Text style={styles.tagText}>{item.project}</Text></View>
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
    </AppShell>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.card },

  listHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 26, fontWeight: "800", color: C.ink },
  iconBtn: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center", backgroundColor: C.card },

  search: { flexDirection: "row", alignItems: "center", gap: 8, marginHorizontal: 16, marginTop: 14, paddingHorizontal: 12, height: 44, borderRadius: 12, backgroundColor: C.bg, borderWidth: 1, borderColor: C.border },
  searchInput: { flex: 1, color: C.ink, ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : null) },

  filters: { flexDirection: "row", gap: 8, paddingHorizontal: 16, marginVertical: 14 },
  filter: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 },
  filterOn: { backgroundColor: C.tealSoft },
  filterText: { color: C.muted, fontWeight: "600", fontSize: 13 },
  filterTextOn: { color: C.teal },

  chatRow: { flexDirection: "row", gap: 12, paddingHorizontal: 16, paddingVertical: 12, alignItems: "flex-start" },
  avatar: { alignItems: "center", justifyContent: "center" },
  avatarText: { fontWeight: "800" },
  online: { position: "absolute", right: 0, bottom: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: "#35b37e", borderWidth: 2, borderColor: C.card },
  rowTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  name: { fontWeight: "800", color: C.ink, fontSize: 15 },
  time: { color: C.muted, fontSize: 11 },
  last: { flex: 1, color: C.muted, fontSize: 13 },
  lastUnread: { color: C.ink, fontWeight: "600" },
  badge: { minWidth: 22, height: 22, borderRadius: 11, backgroundColor: C.tealSoft, alignItems: "center", justifyContent: "center", paddingHorizontal: 6 },
  badgeText: { color: C.teal, fontWeight: "800", fontSize: 11 },
  tag: { alignSelf: "flex-start", backgroundColor: "#e6e3f6", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4 },
  tagText: { color: "#6a5fb0", fontWeight: "700", fontSize: 10 },
  empty: { textAlign: "center", color: C.muted, marginTop: 40 },

  threadHead: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.card },
  status: { color: C.muted, fontSize: 12 },
  bubble: { maxWidth: "78%", borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10, gap: 4 },
  theirs: { alignSelf: "flex-start", backgroundColor: C.bg, borderBottomLeftRadius: 4 },
  mine: { alignSelf: "flex-end", backgroundColor: C.teal, borderBottomRightRadius: 4 },
  bubbleText: { color: C.ink, fontSize: 14 },
  bubbleTime: { color: C.muted, fontSize: 10, alignSelf: "flex-end" },

  composer: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.card },
  composerInput: { flex: 1, height: 44, borderRadius: 22, paddingHorizontal: 16, backgroundColor: C.bg, color: C.ink, ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : null) },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: C.teal, alignItems: "center", justifyContent: "center" },
});