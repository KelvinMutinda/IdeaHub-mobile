import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import AppShell from "@/components/AppShell";
import { C } from "@/constants/ideahub-theme";

function Field({ label, ...props }: { label: string } & TextInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={[styles.input, props.multiline && styles.textarea, focused && styles.inputFocused]}
        placeholderTextColor="#98a8a3"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const EMPTY = { title: "", description: "", price: "", demo: "", tech: "", code: "" };

export default function Home() {
  const [open, setOpen] = useState(false);         
  const [form, setForm] = useState(EMPTY);
  const set = (key: keyof typeof EMPTY) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const close = () => setOpen(false);

  const submit = () => {
    
    setForm(EMPTY);
    close();
  };

  return (
    <AppShell searchPlaceholder="Search projects, people, or tech...">
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>See what people are making, take your idea out here.</Text>

      
        <Pressable style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.85 }]} onPress={() => setOpen(true)}>
          <Ionicons name="add-circle-outline" size={22} color="white" />
          <Text style={styles.addBtnText}>Post a project</Text>
        </Pressable>

      
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your feed goes here</Text>
          <Text style={styles.cardText}>Projects from other makers will appear in this list.</Text>
        </View>
      </ScrollView>

     
      <Modal visible={open} animationType="slide" transparent onRequestClose={close}>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={close} />  

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.sheetWrap}
          >
            <View style={styles.sheet}>
              <View style={styles.sheetHead}>
                <Text style={styles.sheetTitle}>Post your project</Text>
                <Pressable onPress={close} hitSlop={10} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color={C.ink} />
                </Pressable>
              </View>

              <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 12 }}>
                <Field label="Project title" placeholder="eg. Smart School Management System" value={form.title} onChangeText={set("title")} />
                <Field
                  label="Project description"
                  placeholder="Explain more about your project"
                  value={form.description}
                  onChangeText={set("description")}
                  multiline
                  textAlignVertical="top"
                />

                <View style={styles.twoCols}>
                  <View style={{ flex: 1 }}>
                    <Field label="Price" placeholder="eg. $40 or Free" value={form.price} onChangeText={set("price")} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Field label="Live link" placeholder="https://..." value={form.demo} onChangeText={set("demo")} autoCapitalize="none" keyboardType="url" />
                  </View>
                </View>

                <Field label="Tech stack" placeholder="eg. Laravel, MySQL" value={form.tech} onChangeText={set("tech")} autoCapitalize="none" />
                <Field label="Code link" placeholder="https://github.com/..." value={form.code} onChangeText={set("code")} autoCapitalize="none" keyboardType="url" />
              </ScrollView>

              <View style={styles.actions}>
                <Pressable style={styles.cancelBtn} onPress={close}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.postBtn} onPress={submit}>
                  <Text style={styles.postText}>Post project</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 14, maxWidth: 760, width: "100%", alignSelf: "center" },
  intro: { color: C.muted, fontSize: 15 },

  addBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: C.teal, height: 50, borderRadius: 14 },
  addBtnText: { color: "white", fontWeight: "800", fontSize: 16 },

  card: { backgroundColor: C.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.border, gap: 6 },
  cardTitle: { fontWeight: "800", color: C.ink, fontSize: 16 },
  cardText: { color: C.muted },

  overlay: { flex: 1, backgroundColor: "rgba(16,24,21,0.5)", justifyContent: "flex-end" },
  sheetWrap: { width: "100%", maxWidth: 560, alignSelf: "center" },
  sheet: { backgroundColor: C.card, borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 18, maxHeight: "92%" },
  sheetHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  sheetTitle: { fontSize: 20, fontWeight: "800", color: C.ink },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.bg, alignItems: "center", justifyContent: "center" },

  field: { marginTop: 10 },
  label: { color: "#344054", fontWeight: "600", fontSize: 14, marginBottom: 6 },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#d0d5dd",
    borderRadius: 10,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 12,
    color: "black",
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : null),
  },
  inputFocused: { borderColor: C.teal, backgroundColor: "white" },
  textarea: { height: 100, paddingTop: 12 },
  twoCols: { flexDirection: "row", gap: 12 },

  actions: { flexDirection: "row", gap: 10, marginTop: 12 },
  cancelBtn: { flex: 1, height: 48, borderRadius: 12, borderWidth: 1, borderColor: C.border, alignItems: "center", justifyContent: "center" },
  cancelText: { color: C.ink, fontWeight: "700" },
  postBtn: { flex: 2, height: 48, borderRadius: 12, backgroundColor: C.teal, alignItems: "center", justifyContent: "center" },
  postText: { color: "white", fontWeight: "800" },
});